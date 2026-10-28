import os
import uuid
from pathlib import Path

import requests


SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
SUPABASE_BUCKET = "quarantine"


def quarantine_file(source_path: str, quarantine_root: str, original_name: str) -> dict:
    """
    Upload the quarantined file directly to Supabase Storage.

    The quarantine_root argument is kept for compatibility with the
    existing controller, but it is no longer used because Vercel's
    filesystem is read-only.
    """

    if not SUPABASE_URL:
        raise RuntimeError("SUPABASE_URL environment variable is missing.")

    if not SUPABASE_SERVICE_ROLE_KEY:
        raise RuntimeError(
            "SUPABASE_SERVICE_ROLE_KEY environment variable is missing."
        )

    source = Path(source_path).resolve()

    if not source.exists():
        raise FileNotFoundError("Uploaded file no longer exists.")

    clean_name = Path(original_name or "uploaded_file").name

    clean_name = "".join(
        ch if ch.isalnum() or ch in "._-" else "_"
        for ch in clean_name
    )[:120]

    storage_name = f"{uuid.uuid4().hex}_{clean_name}"

    upload_url = (
        f"{SUPABASE_URL.rstrip('/')}"
        f"/storage/v1/object/{SUPABASE_BUCKET}/{storage_name}"
    )

    headers = {
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Content-Type": "application/octet-stream",
        "x-upsert": "false",
    }

    with open(source, "rb") as file_handle:
        response = requests.post(
            upload_url,
            headers=headers,
            data=file_handle,
            timeout=60,
        )

    if not response.ok:
        raise RuntimeError(
            f"Supabase Storage upload failed: "
            f"{response.status_code} {response.text}"
        )

    return {
        "quarantined": True,
        "storage_bucket": SUPABASE_BUCKET,
        "storage_path": storage_name,
        "display_name": clean_name,
    }