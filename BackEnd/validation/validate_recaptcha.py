from django.conf import settings
import requests


def verify_recaptcha(token):
    """
    Validates the reCAPTCHA token with Google's API.
    """
    recaptcha_url = "https://www.google.com/recaptcha/api/siteverify"
    recaptcha_data = {
        "secret": settings.RECAPTCHA_V2_PRIVATE_KEY,
        "response": token,
    }
    response = requests.post(recaptcha_url, data=recaptcha_data)
    result = response.json()
    return result.get("success", False)
