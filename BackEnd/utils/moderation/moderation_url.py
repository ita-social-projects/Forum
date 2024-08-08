from django.core.signing import Signer, BadSignature

signer = Signer()


def encode_id(id):
    return signer.sign_object({"id": id})


def decode_id(signed_id):
    try:
        pk = signer.unsign_object(signed_id)["id"]
    except BadSignature:
        raise ValueError("Invalid pk")
    return pk


def generate_profile_moderation_url(profile, action):
    timestamp = int(profile.status_updated_at.timestamp())
    id = encode_id(profile.id)
    return f"moderation/{id}/{timestamp}/{action}"
