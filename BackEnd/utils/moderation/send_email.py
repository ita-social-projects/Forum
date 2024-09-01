import os
from urllib.parse import urlencode

from decouple import config
from email.mime.image import MIMEImage
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from administration.models import AutoModeration
from .encode_decode_id import encode_id
from administration.models import ModerationEmail


EMAIL_CONTENT_SUBTYPE = "html"
PROTOCOL = "http"
DOMAIN = config("ALLOWED_ENV_HOST")


def define_ending(hours):
    result_of_hours = None
    if hours % 10 == 1 and hours != 11:
        result_of_hours = f"{hours} годину"
    elif hours % 10 in range(2, 5) and hours != 12:
        result_of_hours = f"{hours} години"
    else:
        result_of_hours = f"{hours} годин"
    return result_of_hours


def generate_profile_moderation_url(profile_id, banner, logo, action):
    query_params = {}
    if banner:
        query_params["banner"] = banner.uuid
    if logo:
        query_params["logo"] = logo.uuid
    params = urlencode(query_params)
    id = encode_id(profile_id)
    return f"moderation/{id}/{action}/?{params}"


def attach_image(email, image, content_id):
    image_name = os.path.basename(image.image_path.name)
    with open(image.image_path.path, "rb") as img_file:
        img = MIMEImage(img_file.read(), _subtype=image.content_type)
        img.add_header("Content-ID", f"<{content_id}>")
        img.add_header(
            "Content-Disposition", f'inline; filename="{image_name}"'
        )
        email.attach(img)


def send_moderation_email(profile, banner, logo, content_is_deleted):
    update_time = profile.status_updated_at.strftime("%d.%m.%Y %H:%M")
    update_date = profile.status_updated_at.strftime("%d.%m.%Y")
    context = {
        "profile_name": profile.name,
        "protocol": PROTOCOL,
        "domain": DOMAIN,
        "banner": banner,
        "logo": logo,
        "banner_logo_deleted": content_is_deleted,
        "updated_at": update_time,
        "moderation_time": define_ending(
            AutoModeration.get_auto_moderation_hours().auto_moderation_hours
        ),
        "approve_url": generate_profile_moderation_url(
            profile.id, banner, logo, "approve"
        ),
        "reject_url": generate_profile_moderation_url(
            profile.id, banner, logo, "reject"
        ),
    }

    email_body = render_to_string("profiles/email_template.html", context)
    email = EmailMultiAlternatives(
        subject=f"{profile.name} - {update_date}: Запит "
        "на затвердження змін в обліковому записі компанії",
        body=email_body,
        from_email=settings.EMAIL_HOST_USER,
        to=[
            ModerationEmail.objects.first(),
        ],
    )

    email.content_subtype = EMAIL_CONTENT_SUBTYPE

    if banner:
        attach_image(email, banner, banner.uuid)

    if logo:
        attach_image(email, logo, logo.uuid)

    email.send(fail_silently=False)
