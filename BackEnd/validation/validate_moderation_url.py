from django.core.exceptions import ValidationError


def validate_url(profile, timestamp):
    url_timestamp = int(timestamp)
    if url_timestamp < int(profile.status_updated_at.timestamp()):
        if profile.status == "pending":
            raise ValidationError(
                "There is a new request for moderation. URL is outdated"
            )
        else:
            raise ValidationError(
                "The change approval request has been processed. URL is outdated"
            )
