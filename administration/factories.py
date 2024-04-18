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

    person = factory.SubFactory(AdminUserFactory)
    is_startup = True
    is_registered = True
    name = "Test person"
    common_info = "test common info"
    phone = "380112909099"
    edrpou = factory.Sequence(lambda n: str(10000000 + n))
    founded = 2022
    service_info = "test service info"
    product_info = "test product info"
    address = "Test Country, Test City, St. Test, 1"
    person_position = "Test person position"
    official_name = "Test official name"
    startup_idea = "Test startup idea"
    banner_image = "Test_banner_image"
    is_deleted = False
