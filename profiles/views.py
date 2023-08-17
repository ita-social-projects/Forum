from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import CompanySavedList, Profile
from .serializers import ProfileSerializer


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


class ProfileList(ListAPIView):
    """
    List all profiles depending on query parameters:
     include_deleted: bool
     include_all: bool.
    """
    serializer_class = ProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = Token.objects.get(key=self.request.auth.key).user_id
        include_deleted = self.request.query_params.get("include_deleted", False)
        include_all = self.request.query_params.get("include_all", False)
        if include_all:
            return Profile.objects.all()
        if include_deleted:
            return Profile.objects.filter(person_id=user_id)
        return Profile.objects.filter(is_deleted=False, person_id=user_id)


class ProfileDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrieve or delete a profile instance.
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.filter(is_deleted=False)
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, pk=None):
        user_id = Token.objects.get(key=request.auth.key).user_id
        profile = get_object_or_404(self.queryset, pk=pk, person_id=user_id)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        user_id = Token.objects.get(key=request.auth.key).user_id
        profile = get_object_or_404(self.queryset, pk=pk, person_id=user_id)
        profile.is_deleted = True
        profile.save()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
