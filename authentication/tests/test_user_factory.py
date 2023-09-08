from django.test import TestCase
from authentication.factories import UserFactory


class TestFactories(TestCase):

    def test_user_factory(self):
        user = UserFactory()
        self.assertIsNotNone(user.person_email)
        self.assertIsNotNone(user.person_name)
        self.assertIsNotNone(user.person_surname)
        self.assertTrue(user.is_active)
