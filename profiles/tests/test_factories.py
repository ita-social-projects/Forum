from django.test import TestCase
from profiles.factories import ProfileFactory, ProfileStartupFactory, ProfileCompanyFactory, CategoryFactory, ActivityFactory
from utils.dump_response import dump  # noqa


class TestFactories(TestCase):

    def test_profile_factory(self):
        profile = ProfileFactory()
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
        common_activities = ActivityFactory.create_batch(4)
        custom_activity = ActivityFactory(name="test")
        self.assertEqual("producer", common_activities[0].name)
        self.assertEqual("importer", common_activities[1].name)
        self.assertEqual("retail", common_activities[2].name)
        self.assertEqual("HORACE", common_activities[3].name)
        self.assertEqual("test", custom_activity.name)

    def test_profile_factory_activities(self):
        common_activities = ActivityFactory.create_batch(4)
        custom_activity = ActivityFactory(name="test")
        profile = ProfileFactory.create(comp_activity=(custom_activity, common_activities[0]))
        print(profile.comp_activity)
        print(profile.activity_set)
