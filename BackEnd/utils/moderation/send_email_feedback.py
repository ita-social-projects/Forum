from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

# Встановлюємо формат листа (HTML)
EMAIL_CONTENT_SUBTYPE = "html"


def send_email_feedback(user_email, message, category):
    """
    Функція для відправки листів адміністратору і користувачу про зворотній зв'язок.
    """
    # Створюємо контекст для шаблону листа
    context = {
        "category": category,
        "message": message,
        "user_email": user_email,
    }

    # Визначаємо адресу адміністратора
    admin_email = settings.ADMIN_EMAIL

    # Визначаємо лист для адміністратора
    email_body_admin = render_to_string("emails/admin_feedback_template.html", context)
    email_admin = EmailMultiAlternatives(
        subject=f"Нове повідомлення: {category}",
        body=email_body_admin,
        from_email=settings.EMAIL_HOST_USER,  # Відправник листа (твій SMTP сервер)
        to=[admin_email],
    )
    email_admin.content_subtype = EMAIL_CONTENT_SUBTYPE
    email_admin.send(fail_silently=False)

    # Визначаємо лист для користувача (копія повідомлення)
    email_body_user = render_to_string("emails/user_feedback_template.html", context)
    email_user = EmailMultiAlternatives(
        subject="Копія вашого повідомлення",
        body=email_body_user,
        from_email=settings.EMAIL_HOST_USER,  # Відправник - той самий SMTP сервер
        to=[user_email],
    )
    email_user.content_subtype = EMAIL_CONTENT_SUBTYPE
    email_user.send(fail_silently=False)
