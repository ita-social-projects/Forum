import os
from email.mime.image import MIMEImage
from django.utils.timezone import now
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string

from .check_for_moderation import ModerationManager


def attach_image(email, image, content_id):
    image_name = os.path.basename(image.image_path.name)
    with open(image.image_path.path, "rb") as img_file:
        img = MIMEImage(img_file.read(), _subtype=image.content_type)
        img.add_header("Content-ID", f"<{content_id}>")
        img.add_header("Content-Disposition", f'inline; filename="{image_name}"')
        email.attach(img)


def send_moderation_email(profile):
    manager = ModerationManager(profile)
    if manager.check_for_moderation():
        update_time = now().strftime('%d.%m.%Y %H:%M')
        update_date = now().strftime("%d.%m.%Y")
        banner = profile.banner if profile.banner != profile.banner_approved else None
        logo = profile.logo if profile.logo != profile.logo_approved else None
        approve_url = None
        reject_url = None
        context = {
                "profile_name": profile.name,
                "protocol": "http",
                "banner": banner,
                "logo": logo,
                "updated_at": update_time,
                "date": update_date,
                "moderation_time": "",
                "approve_url": approve_url,
                "reject_url": reject_url,
            }

        email_body = render_to_string("profiles/email_template.html", context)
        email = EmailMultiAlternatives(
            subject=f"{profile.name} - {update_date}: Запит " \
            "на затвердження змін в обліковому записі компанії",
            body=email_body,
            from_email=settings.EMAIL_HOST_USER,
            to=["dancisinandrij@gmail.com",],
        )

        email.content_subtype = "html"


        if banner:
            attach_image(email, banner, banner.uuid)

        if logo:
            attach_image(email, logo, logo.uuid)

        email.send(fail_silently=False)
        