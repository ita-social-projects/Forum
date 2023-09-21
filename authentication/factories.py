import factory.django

from .models import CustomUser


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CustomUser
        django_get_or_create = ('email',)

    email = factory.Sequence(lambda n: f"test{n + 1}@test.com")
    name = factory.Sequence(lambda n: f"Test person {n + 1}")
    surname = factory.Sequence(lambda n: f"Test person {n + 1} surname")
    password = ''

    is_active = True
