from django.core.signing import Signer, BadSignature

signer = Signer()


def encode_uid(pk):
    return signer.sign_object({"pk": pk})


def decode_uid(signed_pk):
    try:
        pk = signer.unsign_object(signed_pk)["pk"]
    except BadSignature:
        raise ValueError("Invalid pk")
    return pk


def generate_profile_moderation_url(profile, action):
    timestamp = int(profile.status_updated_at.timestamp())
    uid = encode_uid(profile.id)
    return f"moderation/{uid}/{timestamp}/{action}"
