from enum import Enum


class ModerationActions(Enum):
    APPROVE = "approve"
    REJECT = "reject"

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]
