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
