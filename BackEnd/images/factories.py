import datetime
import factory.fuzzy

from .models import ProfileImage


class ProfileimageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ProfileImage

    uuid = factory.Faker("uuid4")
    created_at = factory.LazyFunction(datetime.date.today)
    created_by = factory.SubFactory("authentication.factories.UserFactory")
    image_type = factory.fuzzy.FuzzyChoice(
        ProfileImage.IMAGE_TYPES, getter=lambda c: c[0]
    )
    content_type = "JPEG"
    image_path = factory.django.ImageField(filename="test.jpeg")
    is_approved = False
    is_deleted = False
