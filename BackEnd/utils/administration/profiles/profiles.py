def get_company_type_as_string(obj):
    if obj.is_startup and obj.is_registered:
        return "Компанія і стартап"
    if obj.is_registered:
        return "Компанія"
    if obj.is_startup:
        return "Стартап"
    return None


def get_representative_as_string(obj):
    if obj.person:
        return f'{obj.person.name} {obj.person.surname}'
    return None


def get_business_entity_as_string(obj):
    if obj.is_fop:
        return "ФОП"
    return "Юридична особа"
