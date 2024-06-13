from PIL import Image
from hashlib import md5
from rest_framework.generics import CreateAPIView, DestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema_view, extend_schema

from images.models import ProfileImage
from .serializers import ImageSerializer


@extend_schema_view(
    post=extend_schema(
        request={
            "multipart/form-data": {
                "type": "object",
                "properties": {
                    "banner": {"type": "string", "format": "binary"},
                    "banner_approved": {"type": "string", "format": "binary"},
                    "logo": {"type": "string", "format": "binary"},
                    "logo_approved": {"type": "string", "format": "binary"},
                },
            }
        },
        responses={
            201: ImageSerializer,
        },
    ),
)
class ImageCreateAPIView(CreateAPIView):
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = ImageSerializer
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        image = serializer.validated_data.get("image_path")
        if image:
            image_size = image.size
            with Image.open(image) as img:
                content_type = img.format
                hash_md5 = md5(img.tobytes()).hexdigest()
        else:
            image_size = None
            content_type = ""
            hash_md5 = ""
        user = self.request.user
        image_type = self.kwargs.get("image_type")
        serializer.save(
            image_type=image_type,
            content_type=content_type,
            hash_md5=hash_md5,
            image_size=image_size,
            created_by=user,
        )


class ImageDestroyAPIView(DestroyAPIView):
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = ImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = ProfileImage.objects.filter(is_deleted=False)

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()
