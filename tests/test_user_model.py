import unittest
from app.models import User

class TestCaseForUserModel(unittest.TestCase):
    def test_password_setter(self):
        # test indeed that password setter is working as expected i.e the password_hash is being set
        user1 = User(password = 'cat')
        self.assertTrue(user.password_hash is not None)

    def test_password_getter(self):
        ensure that indeed that trying to access password attribute brings an error
        user1 = User(password = 'cat')
        with self.assertRaises(AttributeError):
            user1.password

    def test_password_verification(self):
        # test that indeed password verification is working correctly
        user1 = User(password = 'cat')
        self.assertTrue(user1.verify_password('cat'))
        self.assertFalse(user1.verify_password('dog'))

    def test_password_salts_are_not_equal(self):
        # test that indeed salting adds a unique element to each password
        u1 = User(password = 'cat')
        u2 = User(password = 'cat')
        self.assertTrue(u1.password_hash != u2.password_hash)
