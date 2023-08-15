from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import CompanySavedList, Profile


@login_required
def saved_list_state(request):
    saved_list_items = request.user.saved_list_items.select_related('company')

    saved_companies = []
    for saved_item in saved_list_items:
        saved_companies.append({
            'company_id': saved_item.company_id,
            'comp_official_name': saved_item.company.comp_official_name,
            'comp_region': saved_item.company.comp_region,
            'comp_common_info': saved_item.company.comp_common_info,
            'comp_phone_number': saved_item.company.comp_phone_number,
            'comp_EDRPOU': saved_item.company.comp_EDRPOU,
            'comp_year_of_foundation': saved_item.company.comp_year_of_foundation,
            'comp_address': saved_item.company.comp_address,
            'startup_idea': saved_item.company.startup_idea,
        })

    return JsonResponse({'saved_companies': saved_companies}, safe=False)


@login_required
def add_to_saved_list(request, profile_id):
    profile = get_object_or_404(Profile, pk=profile_id)

    # Check if the company is already in the user's saved list
    if request.user.saved_list_items.filter(company=profile).exists():
        return JsonResponse(
            {'status': 'success', 'message': f'{profile.comp_official_name} already in saved list'})

    # If the company is not in the saved list, create a new entry
    saved_list_item = request.user.saved_list_items.create(company=profile)
    return JsonResponse(
        {'status': 'success', 'message': f'{profile.comp_official_name} added to saved list'})


@login_required
def remove_from_saved_list(request, profile_id):
    try:
        saved_list_item = request.user.saved_list_items.get(company__pk=profile_id)
        saved_list_item.delete()
        return JsonResponse(
            {
                'status': 'success',
                'message': f'{saved_list_item.company.comp_official_name} removed from saved list',
            }
        )
    except CompanySavedList.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Item not found in saved list'})






