import os

import pytesseract
from PIL import Image


# Windows local development:
# Use the installed Windows Tesseract executable when it exists.
WINDOWS_TESSERACT = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

if os.path.exists(WINDOWS_TESSERACT):
    pytesseract.pytesseract.tesseract_cmd = WINDOWS_TESSERACT


def extract_text_from_image(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)

    return text