import factory.fuzzy

from .models import Profile, Activity, Category, SavedCompany, ViewedCompany, Region


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category
        django_get_or_create = ('name',)

    name = factory.Sequence(lambda n: f"test category {n}")


class ActivityFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Activity
        django_get_or_create = ('name',)

    name = factory.Sequence(lambda n: f"test activity {n}")


class ProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Profile
        django_get_or_create = ('edrpou',)

    person = factory.SubFactory("authentication.factories.UserFactory")
    name = "Test Comp name"
    region = factory.fuzzy.FuzzyChoice(Region, getter=lambda r: r[0])
    common_info = "test common info"
    phone = "380112909099"
    edrpou = factory.Sequence(lambda n: 10000000 + n)
    founded = 2022
    service_info = "test service info"
    product_info = "test product info"
    address = "Test Country, Test City, St. Test, 1"
    person_position = "Test"
    is_deleted = False

    @factory.post_generation
    def activities(self, create, extracted):
        if not create or not extracted:
            return
        self.activities.add(*extracted)

    @factory.post_generation
    def categories(self, create, extracted):
        if not create:
            return
        if extracted:
            for category in extracted:
                self.categories.add(category)


class ProfileStartupFactory(ProfileFactory):
    official_name = factory.Sequence(lambda n: f"Test Official Startup {n}")
    startup_idea = "Test startup idea"
    is_registered = False
    is_startup = True


class ProfileCompanyFactory(ProfileFactory):
    official_name = factory.Sequence(lambda n: f"Test Official Company {n}")
    is_registered = True
    is_startup = False


class SavedCompanyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = SavedCompany

    company = factory.SubFactory(ProfileCompanyFactory)
    user = factory.SubFactory("authentication.factories.UserFactory")


class SavedStartupFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = SavedCompany

    company = factory.SubFactory(ProfileStartupFactory)
    user = factory.SubFactory("authentication.factories.UserFactory")


class ViewedCompanyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ViewedCompany

    company = factory.SubFactory(ProfileFactory)
    user = factory.SubFactory("authentication.factories.UserFactory")
