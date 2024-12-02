from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

EMAIL_CONTENT_SUBTYPE = "html"
PROTOCOL = "http"


def send_email_to_user(user, category, message_content, template_name="administration/user_message_template.html"):
    """
    Надсилає лист користувачу з використанням HTML-шаблону.
    
    :param user: Об'єкт користувача (CustomUser)
    :param subject: Тема листа
    :param message_content: Текст повідомлення
    :param template_name: Шлях до HTML-шаблону (за замовчуванням: user_message_template.html)
    """

    context = {
        "user_name": f"{user.name} {user.surname}",
        "message": message_content,
        "category": category,
        "logo_url": f"{PROTOCOL}://178.212.110.52/craftMerge-logo.png",
    }

    email_body = render_to_string(template_name, context)

    email = EmailMultiAlternatives(
        category=category,
        body=email_body,
        from_email=settings.EMAIL_HOST_USER,
        to=[user.email],
    )
    email.content_subtype = EMAIL_CONTENT_SUBTYPE
    email.send(fail_silently=False)
