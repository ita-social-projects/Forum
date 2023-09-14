from django.test import TestCase

from profiles.factories import (ProfileFactory, ProfileStartupFactory, ProfileCompanyFactory,
                                CategoryFactory, ActivityFactory,
                                SavedCompanyFactory, SavedStartupFactory, ViewedCompanyFactory)
from utils.dump_response import dump  # noqa


class TestFactories(TestCase):

    def test_profile_factory(self):
        activity = ActivityFactory()
        category = CategoryFactory()
        profile = ProfileFactory(activities=(activity,), categories=(category,))
        self.assertIsNotNone(profile.id)
        self.assertIsNotNone(profile.person)
        self.assertIsNotNone(profile.name)
        self.assertIsNotNone(profile.region)
        self.assertIsNotNone(profile.common_info)
        self.assertIsNotNone(profile.phone)
        self.assertIsNotNone(profile.edrpou)
        self.assertIsNotNone(profile.founded)
        self.assertIsNotNone(profile.service_info)
        self.assertIsNotNone(profile.product_info)
        self.assertIsNotNone(profile.address)
        self.assertIsNotNone(profile.person_position)
        self.assertEqual(1, profile.categories.all().count())
        self.assertEqual(1, profile.activities.all().count())
        self.assertFalse(profile.is_deleted)

    def test_profile_startup_factory(self):
        startup = ProfileStartupFactory()
        self.assertIsNotNone(startup.official_name)
        self.assertIsNotNone(startup.startup_idea)
        self.assertFalse(startup.is_registered)
        self.assertTrue(startup.is_startup)

    def test_profile_company_factory(self):
        company = ProfileCompanyFactory()
        self.assertIsNotNone(company.official_name)
        self.assertTrue(company.is_registered)
        self.assertFalse(company.is_startup)

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

    def test_saved_startup_factory(self):
        saved_startup = SavedStartupFactory()
        self.assertIsNotNone(saved_startup.user)
        self.assertIsNotNone(saved_startup.company)
        self.assertIsNotNone(saved_startup.added_at)

    def test_viewed_company(self):
        viewed_company = ViewedCompanyFactory()
        self.assertIsNotNone(viewed_company.user)
        self.assertIsNotNone(viewed_company.company)
        self.assertIsNotNone(viewed_company.date)
