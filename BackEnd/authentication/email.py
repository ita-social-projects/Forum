from djoser.email import ActivationEmail, PasswordResetEmail


class CustomActivationEmail(ActivationEmail):
    template_name = "email/custom_activation.html"


class CustomPasswordResetEmail(PasswordResetEmail):
    template_name = "email/custom_password_reset.html"
