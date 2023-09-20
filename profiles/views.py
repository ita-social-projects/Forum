import django_filters
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView, \
    ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from forum.pagination import ForumPagination
from .models import SavedCompany, Profile, ViewedCompany, Category, Activity, Region
from .permissions import UserIsProfileOwnerOrReadOnly, ReadOnly
from .serializers import (SavedCompanySerializer, ProfileSerializer, ViewedCompanySerializer,
                          ProfileSensitiveDataROSerializer, ProfileDetailSerializer, CategorySerializer,
                          ActivitySerializer, RegionSerializer)
from .filters import ProfileFilter


class SavedCompaniesCreate(CreateAPIView):
    """
    List of saved companies.
    Add a company to the saved list.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = SavedCompanySerializer
    pagination_class = ForumPagination

    def post(self, request):
        user = request.user
        pk = request.data.get("company_pk")

        # Check if the company is already in the user's saved list
        if SavedCompany.objects.filter(user=user, company_id=pk).exists():
            saved_company_destroyer = SavedCompaniesDestroy()
            return saved_company_destroyer.destroy(request, pk)

        serializer = SavedCompanySerializer(data={"company": pk, "user": user.id})
        if serializer.is_valid():
            serializer.save()
            return Response({"Company added": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SavedCompaniesDestroy(DestroyAPIView):
    """
    Remove the company from the saved list.
    """
    permission_classes = [IsAuthenticated]

    def destroy(self, request, pk):
        user = request.user
        saved_company = get_object_or_404(SavedCompany, company_id=pk, user=user)
        saved_company.delete()
        return Response(f"Company {pk} deleted", status=status.HTTP_204_NO_CONTENT)


class ProfileList(ListCreateAPIView):
    """
    List all profiles depending on query parameters:
     include_deleted: bool
     include_all: bool.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = ForumPagination
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = ProfileFilter

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.user.is_authenticated:
            saved_companies_pk = frozenset(SavedCompany.objects.filter(user=self.request.user).values_list("company_id", flat=True))
            context.update({"saved_companies_pk": saved_companies_pk})
        return context

    def get_queryset(self):
        user_id = self.request.query_params.get("userid")
        queryset = Profile.objects.filter(is_deleted=False).order_by("id")
        if user_id:
            try:
                return queryset.filter(person_id=user_id)
            except ValueError:
                pass
        return queryset

    def create(self, request):
        profile = Profile.objects.filter(person_id=self.request.user)
        if profile.exists():
            return Response(status=409)
        return super().create(request)


class ProfileDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a profile instance.
    Retrieve:
        If user is a person in the profile, full info returned.
        Else profile info without sensitive data returned.
        If user is authenticated, he can get sensitive data via query param 'with_contacts'.
    """
    queryset = Profile.objects.filter(is_deleted=False)
    permission_classes = [UserIsProfileOwnerOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.user.is_authenticated:
            saved_companies_pk = frozenset(SavedCompany.objects.filter(user=self.request.user).values_list("company_id", flat=True))
            context.update({"saved_companies_pk": saved_companies_pk})
        return context

    def get_serializer_class(self):
        get_contacts = self.request.query_params.get("with_contacts")

        profile_pk = self.kwargs.get('pk')
        profile_instance = Profile.objects.filter(id=profile_pk).first()
        user_pk = self.request.user.id

        if self.request.method == 'GET':
            if profile_instance.person.id == user_pk:
                return ProfileSerializer
            return ProfileSensitiveDataROSerializer if get_contacts else ProfileDetailSerializer
        else:
            return ProfileSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class ViewedCompanyList(ListCreateAPIView):
    serializer_class = ViewedCompanySerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = ForumPagination

    def get_queryset(self):
        user_id = self.request.user.id
        return ViewedCompany.objects.filter(user=user_id).order_by("company_id")


class CategoryList(ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = (ReadOnly | IsAdminUser,)
    queryset = Category.objects.all()


class ActivityList(ListCreateAPIView):
    serializer_class = ActivitySerializer
    permission_classes = (ReadOnly | IsAdminUser,)
    queryset = Activity.objects.all()


class RegionListView(ListAPIView):
    serializer_class = RegionSerializer
    queryset = Region.choices


class CategoryDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = (IsAdminUser,)
    queryset = Category.objects.all()


class ActivityDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = ActivitySerializer
    permission_classes = (IsAdminUser,)
    queryset = Activity.objects.all()

