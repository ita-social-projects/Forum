from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
)
from rest_framework.permissions import (
    IsAuthenticated,
)
from rest_framework.response import Response
from forum.pagination import ForumPagination
from ..models import SavedCompany
from ..permissions import IsOwnCompany
from ..serializers.saved_companys_serializer import SavedCompanySerializer


class SavedCompaniesCreate(CreateAPIView):
    """
    List of saved companies.
    Add a company to the saved list.
    """

    permission_classes = [IsAuthenticated, IsOwnCompany]
    serializer_class = SavedCompanySerializer
    pagination_class = ForumPagination

    def post(self, request):
        user = request.user
        pk = request.data.get("company_pk")

        # Check if the company is already in the user's saved list
        if SavedCompany.objects.filter(user=user, company_id=pk).exists():
            saved_company_destroyer = SavedCompaniesDestroy()
            return saved_company_destroyer.destroy(request, pk)

        serializer = SavedCompanySerializer(
            data={"company": pk, "user": user.id}
        )
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
        saved_company = get_object_or_404(
            SavedCompany, company_id=pk, user=user
        )
        saved_company.delete()
        return Response(
            f"Company {pk} deleted", status=status.HTTP_204_NO_CONTENT
        )
