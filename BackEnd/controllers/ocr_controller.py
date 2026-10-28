from flask import request, jsonify
from services.ocr_service import extract_text_from_image
from services.url_api_aggregator import scan_url_with_apis
from services.url_service import analyze_url
from services.email_service import analyze_email
from services.sms_service import analyze_sms
from models import db, Scan
from services.scoring_service import calculate_final_score
import json
import os
import re
import tempfile


def summarize_url_results(api_results):
    """Summarize OCR-extracted URL evidence through the universal scorer."""
    if not api_results:
        return {
            "score": 0,
            "level": "Low",
            "verdict": "safe",
            "api_results": []
        }

    scored = calculate_final_score(api_results)
    score = int(scored.get("internal_score", 0))
    verdict = scored.get("verdict", "Unknown")

    if score >= 81:
        level = "High"
    elif score >= 51:
        level = "Medium"
    else:
        level = "Low"

    return {
        "score": score,
        "level": level,
        "verdict": verdict.lower(),
        "reasons": scored.get("reasons", []),
        "confidence": scored.get("confidence", "limited"),
        "api_results": api_results
    }


def scan_image():
    if "image" not in request.files:
        return jsonify({
            "status": "error",
            "message": "Screenshot is required"
        }), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({
            "status": "error",
            "message": "No screenshot selected"
        }), 400

    temp_path = os.path.join(
        tempfile.gettempdir(),
        image.filename
    )

    image.save(temp_path)

    try:
        extracted_text = extract_text_from_image(temp_path)

        if not extracted_text.strip():
            return jsonify({
                "status": "error",
                "message": "Could not extract text from screenshot"
            }), 400

        path = request.path

        # =========================
        # URL OCR
        # =========================
        if "/url/image" in path:

            url_pattern = (
                r'https?\s*:\s*/\s*/\s*'
                r'(?:[A-Za-z0-9-]+\s*\.\s*)+'
                r'[A-Za-z]{2,}'
                r'(?:/[^\s<>"\'\]\[()]*)?'
            )

            raw_urls = re.findall(
                url_pattern,
                extracted_text,
                re.IGNORECASE
            )

            extracted_urls = []

            for raw_url in raw_urls:
                cleaned_url = re.sub(
                    r'\s+',
                    '',
                    raw_url
                ).rstrip(".,;:!?")

                if cleaned_url not in extracted_urls:
                    extracted_urls.append(cleaned_url)

            if not extracted_urls:
                return jsonify({
                    "status": "error",
                    "message": "No URL found in screenshot",
                    "extracted_text": extracted_text
                }), 400

            url_results = []

            for url in extracted_urls:

                api_results = scan_url_with_apis(url)

                analyzed_results = analyze_url(
                    url,
                    api_results
                )

                summarized_result = summarize_url_results(
                    analyzed_results
                )

                url_results.append({
                    "url": url,
                    "result": summarized_result
                })

            scores = [
                item["result"]["score"]
                for item in url_results
                if isinstance(item.get("result", {}).get("score"), (int, float))
            ]
            overall_score = max(scores) if scores else 0

            if overall_score >= 81:
                overall_level = "High"
                overall_verdict = "dangerous"
            elif overall_score >= 51:
                overall_level = "Medium"
                overall_verdict = "suspicious"
            else:
                overall_level = "Low"
                overall_verdict = "safe"

            result = {
                "score": overall_score,
                "level": overall_level,
                "verdict": overall_verdict,
                "urls": url_results
            }

            scan_type = "url_ocr"

        # =========================
        # EMAIL OCR
        # =========================
        elif "/email/image" in path:

            result = analyze_email(
                extracted_text
            )

            scan_type = "email_ocr"

        # =========================
        # SMS OCR
        # =========================
        elif "/sms/image" in path:

            result = analyze_sms(
                extracted_text
            )

            scan_type = "sms_ocr"

        else:
            return jsonify({
                "status": "error",
                "message": "Invalid OCR scan type"
            }), 400

        # =========================
        # SAVE TO CLEAN DB
        # =========================

        final_verdict = result.get(
            "verdict",
            result.get(
                "level",
                "Unknown"
            )
        )

        final_score = result.get(
            "score",
            0
        )

        final_confidence = result.get(
            "confidence",
            "limited"
        )

        final_reasons = result.get(
            "reasons",
            []
        )

        api_results_to_store = []

        if scan_type == "url_ocr":

            for url_item in result.get(
                "urls",
                []
            ):
                nested_result = url_item.get(
                    "result",
                    {}
                )

                api_results_to_store.extend(
                    nested_result.get(
                        "api_results",
                        []
                    )
                )

                final_reasons.extend(
                    nested_result.get(
                        "reasons",
                        []
                    )
                )

        else:
            api_results_to_store = result.get(
                "api_results",
                []
            )

        new_scan = Scan(
            scan_type=scan_type,
            input_content=extracted_text,
            ocr_text=extracted_text,
            final_verdict=final_verdict,
            internal_score=final_score,
            confidence=final_confidence,
            reasons=json.dumps(
                final_reasons
            ),
            api_results=json.dumps(
                api_results_to_store
            )
        )

        db.session.add(new_scan)
        db.session.commit()

        return jsonify({
            "status": "success",
            "extracted_text": extracted_text,
            "result": result
        })

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)