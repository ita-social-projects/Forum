from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

EMAIL_CONTENT_SUBTYPE = "html"
PROTOCOL = "http"


def send_email_to_user(
    user,
    category,
    message_content,
    email=None,
    template_name="administration/admin_message_template.html",
):
    """
    Sends an email message to the user using the specified template.

    :param user: The user object (CustomUser)
    :param category: The email category
    :param message_content: The message content
    :param email: (Optional) The recipient's email
    :param template_name: The path to the HTML template
    """
    context = {
        "user_name": f"{user.name} {user.surname}",
        "message": message_content,
        "category": category,
        "logo_url": f"{PROTOCOL}://178.212.110.52/craftMerge-logo.png",
    }

    email_body = render_to_string(template_name, context)
    recipient_email = email if email else user.email

    email = EmailMultiAlternatives(
        subject=category,
        body=email_body,
        from_email=settings.EMAIL_HOST_USER,
        to=[recipient_email],
    )
    email.content_subtype = EMAIL_CONTENT_SUBTYPE
    email.send(fail_silently=False)
