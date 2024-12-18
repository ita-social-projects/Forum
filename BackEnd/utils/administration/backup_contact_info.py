import json
from django.utils.timezone import now
from django.core.cache import cache
from administration.models import ContactInformation
from administration.serializers import ContactInformationSerializer


def backup_contact_info():
    """
    Creates a backup of the latest contact information in a JSON file.
    """
    contact = ContactInformation.objects.last()
    if contact:
        data = {
            "company_name": contact.company_name,
            "address": contact.address,
            "email": contact.email,
            "phone": contact.phone,
            "updated_at": contact.updated_at.isoformat(),
        }
        filename = f"backup_contact_{now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=4)


def update_cache():
    """
    Updates the cache with the latest contact information.
    """
    contact = ContactInformation.objects.last()
    if contact:
        serializer = ContactInformationSerializer(contact)
        cache.set("contact_info", serializer.data, timeout=3600)
