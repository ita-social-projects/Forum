from drf_spectacular.extensions import OpenApiViewExtension
from drf_spectacular.utils import extend_schema
from djoser.views import TokenDestroyView


class TokenDestroyViewExtension(OpenApiViewExtension):
    target_class = TokenDestroyView

    def view_replacement(self):
        class Fixed(self.target_class):
            serializer_class = None

            @extend_schema(responses={204: {}})
            def post(self, request, *args, **kwargs):
                pass

        return Fixed
