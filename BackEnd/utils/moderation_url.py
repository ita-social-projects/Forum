from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode


def encode_uid(pk):
    return force_str(urlsafe_base64_encode(force_bytes(pk)))


def decode_uid(pk):
    return force_str(urlsafe_base64_decode(pk))


def generate_profile_moderation_url(profile, action):
    timestamp = int(profile.status_updated_at.timestamp())
    uid = encode_uid(profile.id)
    return f"moderation/${uid}/{timestamp}/{action}"
