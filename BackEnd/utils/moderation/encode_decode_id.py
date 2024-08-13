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
