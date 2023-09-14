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
        django_get_or_create = ('comp_EDRPOU',)

    person = factory.SubFactory("authentication.factories.UserFactory")
    comp_name = "Test Comp name"
    comp_region = factory.fuzzy.FuzzyChoice(Region, getter=lambda r: r[0])
    comp_common_info = "test common info"
    comp_phone_number = "380112909099"
    comp_EDRPOU = factory.Sequence(lambda n: 10000000 + n)
    comp_year_of_foundation = 2022
    comp_service_info = "test service info"
    comp_product_info = "test product info"
    comp_address = "Test Country, Test City, St. Test, 1"
    person_position = "Test"
    is_deleted = False

    @factory.post_generation
    def comp_activity(self, create, extracted):
        if not create or not extracted:
            return
        self.comp_activity.add(*extracted)

    @factory.post_generation
    def comp_category(self, create, extracted):
        if not create:
            return
        if extracted:
            for category in extracted:
                self.comp_category.add(category)


class ProfileStartupFactory(ProfileFactory):
    comp_official_name = factory.Sequence(lambda n: f"Test Official Startup {n}")
    startup_idea = "Test startup idea"
    comp_registered = False
    comp_is_startup = True


class ProfileCompanyFactory(ProfileFactory):
    comp_official_name = factory.Sequence(lambda n: f"Test Official Company {n}")
    comp_registered = True
    comp_is_startup = False


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
