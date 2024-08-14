class ModerationAction:
    approve = "approve"
    reject = "reject"

    @classmethod
    def choices(cls):
        return [
            (cls.approve, "approve"),
            (cls.reject, "reject"),
        ]
