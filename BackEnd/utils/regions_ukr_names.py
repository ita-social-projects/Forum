def get_regions_ukr_names_as_string(obj):
    if not obj.regions:
        return ""
    regions_ukr_names = [region.name_ukr for region in obj.regions.all()]
    return ", ".join(regions_ukr_names)
