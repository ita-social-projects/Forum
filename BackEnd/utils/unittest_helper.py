from uuid import UUID

import pytz
from django.utils.datetime_safe import datetime


def utc_datetime(*args):
    return datetime(*args, tzinfo=pytz.timezone("UTC"))


class AnyStr:
    """Placeholder to put in unittests in case we expect some string
    (let's say, an date string) which is hard to determine and we don't
    care about specific value.
    """

    def __eq__(self, other):
        return type(other) == str


class AnyInt:
    """Placeholder to put in unittests in case we expect some integer
    (let's say, an object ID) which is hard to determine and we don't
    care about specific value.
    """

    def __eq__(self, other):
        return type(other) == int


class AnyUUID:
    """Placeholder to put in unittests in case we expect some integer
    (let's say, an object UUID) which is hard to determine and we don't
    care about specific value.
    """

    def __eq__(self, other):
        try:
            if type(other) == str:
                UUID(other, version=4)
                return True
        except ValueError:
            pass

        return False
