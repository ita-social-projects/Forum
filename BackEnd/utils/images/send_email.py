from decouple import config
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

EMAIL_CONTENT_SUBTYPE = "html"
PROTOCOL = "http"
DOMAIN = config("ALLOWED_ENV_HOST")


def send_email_about_banners_and_logos(num_of_banners, num_of_logos, size_of_banners_kb, size_of_logos_kb):
    context = {
        'protocol': PROTOCOL,
        'num_of_banners': num_of_banners,
        'num_of_logos': num_of_logos,
        'size_of_banners': size_of_banners_kb,
        'size_of_logos': size_of_logos_kb,
    }

    email_body = render_to_string("images/email_template.html", context)
    email = EmailMultiAlternatives(
        subject="Information about number and size of banners and logos",
        body=email_body,
        from_email=settings.EMAIL_HOST_USER,
        to=[
            settings.EMAIL_HOST_USER,
        ],

    )

    email.content_subtype = EMAIL_CONTENT_SUBTYPE
    email.send(fail_silently=False)

