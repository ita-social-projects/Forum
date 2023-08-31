from django.utils.timezone import now
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token

from forum import settings


class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = Token.objects.get(key=key)
        except Token.DoesNotExist:
            raise AuthenticationFailed("Invalid token")
        
        if not token.user.is_active:
            raise AuthenticationFailed("User doesn't exist") 

        if token.created < now() - settings.TOKEN_EXPIRE_TIME:
            token.delete()
            raise AuthenticationFailed("Your session has expired. Please login again.")
        return token.user, token