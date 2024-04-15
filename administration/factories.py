import factory.django

from authentication.models import CustomUser
from profiles.models import Profile


class AdminUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CustomUser

    email = factory.Sequence(lambda n: f"test{n + 1}@test.com")
    name = factory.Sequence(lambda n: f"Test person {n + 1}")
    surname = factory.Sequence(lambda n: f"Test person {n + 1} surname")
    password = ""

    is_active = True
    is_staff = True


class AdminProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Profile

    person = factory.SubFactory("administration.factories.AdminUserFactory")
    name = factory.Sequence(lambda n: f"Test person {n + 1}")
    common_info = "test common info"
    phone = "380112909099"
    edrpou = factory.Sequence(lambda n: str(10000000 + n))
    founded = 2022
    service_info = "test service info"
    product_info = "test product info"
    address = "Test Country, Test City, St. Test, 1"
    person_position = "Test"
    is_deleted = False
