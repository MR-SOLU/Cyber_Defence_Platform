def _verdict_from_score(score):
    """Map the universal 0-100 threat score to the platform bands."""
    if score <= 50:
        return "Safe"
    if score <= 80:
        return "Suspicious"
    return "Dangerous"


def calculate_final_score(results):
    """
    Universal evidence scoring engine.

    Score bands used everywhere:
      0-50   -> Safe
      51-80  -> Suspicious
      81-100 -> Dangerous

    A numeric score is authoritative when one is supplied. A textual verdict
    is only used to provide a fallback score when an evidence source did not
    return a usable numeric score.
    """
    if not results:
        return {
            "verdict": "Unknown",
            "reasons": ["No API evidence available"],
            "internal_score": 0,
            "confidence": "limited"
        }

    verdict_map = {
        "safe": "safe",
        "clean": "safe",
        "legitimate": "safe",
        "benign": "safe",
        "suspicious": "suspicious",
        "questionable": "suspicious",
        "malicious": "dangerous",
        "phishing": "dangerous",
        "spam": "dangerous",
        "dangerous": "dangerous",
        "malware": "dangerous",
        "unknown": "unknown",
        "not_found": "unknown",
        "undetected": "unknown",
    }

    evidence = []
    reasons = []
    has_fallback = False

    for result in results:
        if not isinstance(result, dict):
            continue

        api_name = result.get("api", "Unknown API")
        if result.get("source") == "fallback":
            has_fallback = True

        raw_verdict = str(result.get("verdict", "unknown")).strip().lower()
        normalized_verdict = verdict_map.get(raw_verdict, "unknown")

        raw_score = result.get("score")
        try:
            api_score = float(raw_score)
            api_score = max(0.0, min(api_score, 100.0))
            has_numeric_score = True
        except (TypeError, ValueError):
            api_score = None
            has_numeric_score = False

        if not has_numeric_score:
            if normalized_verdict == "safe":
                api_score = 0.0
            elif normalized_verdict == "suspicious":
                api_score = 65.0
            elif normalized_verdict == "dangerous":
                api_score = 100.0

        if normalized_verdict == "unknown":
            continue

        # A textual dangerous verdict with an unusable/contradictory low score
        # is still a confirmed threat signal. Keep it in the malicious band.
        if normalized_verdict == "dangerous" and api_score is not None and api_score < 81:
            api_score = 81.0

        evidence.append({
            "api": api_name,
            "verdict": normalized_verdict,
            "score": api_score,
        })

        for reason in result.get("reasons", []):
            reasons.append(f"{api_name}: {reason}")

    if not evidence:
        return {
            "verdict": "Unknown",
            "reasons": ["No API provided a useful threat verdict"],
            "internal_score": 0,
            "confidence": "limited"
        }

    scores = [item["score"] for item in evidence if item["score"] is not None]
    internal_score = round(sum(scores) / len(scores)) if scores else 0
    internal_score = max(0, min(internal_score, 100))

    # The score determines the final user-facing band. This prevents a single
    # weak "suspicious" label from forcing every otherwise-low-risk scan into
    # Suspicious.
    final_verdict = _verdict_from_score(internal_score)

    confidence = "limited" if has_fallback else "normal"

    return {
        "verdict": final_verdict,
        "reasons": reasons,
        "internal_score": internal_score,
        "confidence": confidence,
    }
