from django.test import TestCase
from profiles.factories import ProfileFactory, ProfileStartupFactory, ProfileCompanyFactory, CategoryFactory, \
    ActivityFactory, SavedCompanyFactory, ViewedCompanyFactory
from utils.dump_response import dump  # noqa


class TestFactories(TestCase):

    def test_profile_factory(self):
        activity = ActivityFactory()
        category = CategoryFactory()
        profile = ProfileFactory(comp_activity=(activity,), comp_category=(category,))
        self.assertIsNotNone(profile.profile_id)
        self.assertIsNotNone(profile.person)
        self.assertIsNotNone(profile.comp_name)
        self.assertIsNotNone(profile.comp_region)
        self.assertIsNotNone(profile.comp_common_info)
        self.assertIsNotNone(profile.comp_phone_number)
        self.assertIsNotNone(profile.comp_EDRPOU)
        self.assertIsNotNone(profile.comp_year_of_foundation)
        self.assertIsNotNone(profile.comp_service_info)
        self.assertIsNotNone(profile.comp_product_info)
        self.assertIsNotNone(profile.comp_address)
        self.assertIsNotNone(profile.person_position)
        self.assertEqual(1, profile.comp_category.all().count())
        self.assertEqual(1, profile.comp_activity.all().count())
        self.assertFalse(profile.is_deleted)

    def test_profile_startup_factory(self):
        startup = ProfileStartupFactory()
        self.assertIsNotNone(startup.comp_official_name)
        self.assertIsNotNone(startup.startup_idea)
        self.assertFalse(startup.comp_registered)
        self.assertTrue(startup.comp_is_startup)

    def test_profile_company_factory(self):
        company = ProfileCompanyFactory()
        self.assertIsNotNone(company.comp_official_name)
        self.assertTrue(company.comp_registered)
        self.assertFalse(company.comp_is_startup)

    def test_category_factory(self):
        category = CategoryFactory()
        self.assertIsNotNone(category.name)

    def test_activity_factory(self):
        activity = ActivityFactory()
        self.assertIsNotNone(activity.name)

    def test_saved_company_factory(self):
        saved_company = SavedCompanyFactory()
        self.assertIsNotNone(saved_company.user)
        self.assertIsNotNone(saved_company.company)
        self.assertIsNotNone(saved_company.added_at)

    def test_viewed_company(self):
        viewed_company = ViewedCompanyFactory()
        self.assertIsNotNone(viewed_company.user)
        self.assertIsNotNone(viewed_company.company)
        self.assertIsNotNone(viewed_company.date)
