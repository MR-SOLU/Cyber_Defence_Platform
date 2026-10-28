from services.hash_service import calculate_sha256
from services.ransomware_api_service import (
    check_virustotal,
    check_malwarebazaar,
    check_threatfox,
    check_hybrid_analysis,
    check_xexle,
)
from services.ml_detection_service import apply_ml_to_ransomware
from services.scoring_service import calculate_final_score

def analyze_ransomware(file_path):
    file_hash = calculate_sha256(file_path)
    api_results = [
        check_virustotal(file_hash),
        check_malwarebazaar(file_hash),
        check_threatfox(file_hash),
        check_hybrid_analysis(file_hash),
        check_xexle(file_hash),
    ]

    malicious = sum(1 for result in api_results if result.get("verdict") == "malicious")
    suspicious = sum(1 for result in api_results if result.get("verdict") == "suspicious")
    safe = sum(1 for result in api_results if result.get("verdict") == "safe")
    unknown = sum(1 for result in api_results if result.get("verdict") == "unknown")

    # Use the platform-wide scoring engine instead of the old fixed
    # "25 points per malicious API" calculation. A confirmed malicious
    # verdict must live in the 81-100 malicious band.
    scoring_results = [
        {
            "api": result.get("api", "Ransomware API"),
            "source": result.get("source", "api"),
            "verdict": result.get("verdict", "unknown"),
            "score": result.get("score"),
            "reasons": result.get("reasons", []),
        }
        for result in api_results
    ]
    scored = calculate_final_score(scoring_results)
    score = int(scored.get("internal_score", 0) or 0)
    verdict = str(scored.get("verdict", "Unknown")).lower()

    if malicious > 0 or verdict == "dangerous":
        level = "High"
        score = max(score, 81)
        verdict = "malicious"
    elif verdict == "suspicious":
        level = "Medium"
        score = max(51, min(score, 80))
        verdict = "suspicious"
    elif verdict == "safe":
        level = "Low"
        score = min(score, 50)
        verdict = "safe"
    else:
        level = "Unknown"
        score = 0
        verdict = "unknown"

    reasons = []
    for result in api_results:
        reasons.extend(result.get("reasons", []))

    result = {
        "score": score,
        "level": level,
        "verdict": verdict,
        "sha256": file_hash,
        "api_results": api_results,
        "reasons": list(dict.fromkeys(reasons)),
        "confidence": "normal" if any(r.get("verdict") != "unknown" for r in api_results) else "limited"
    }
    result = apply_ml_to_ransomware(file_path, result)

    # Keep the universal score bands authoritative even when the ransomware
    # ML model independently confirms the sample as ransomware.
    if str(result.get("verdict", "")).lower() in ("malicious", "dangerous"):
        result["verdict"] = "malicious"
        result["level"] = "High"
        result["score"] = max(int(result.get("score", 0) or 0), 81)
    elif str(result.get("verdict", "")).lower() == "suspicious":
        result["score"] = max(51, min(int(result.get("score", 0) or 0), 80))
        result["level"] = "Medium"

    return result
