from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from .models import CompanySavedList
from .serializers import CompanySavedListSerializer


class SavedCompaniesList(ListAPIView):
    """
    List of saved companies.
    """
    def get(self, request):
        user = request.user
        saved_companies = CompanySavedList.objects.filter(user=user)
        serializer = CompanySavedListSerializer(saved_companies, many=True)
        return Response({'Companies': serializer.data})


class SavedCompaniesDetails(RetrieveUpdateDestroyAPIView):
    """
    Add a company to the saved list.
    Remove the company from the saved list.
    """
    def post(self, request, pk):
        user = request.user

        # Check if the company is already in the user's saved list
        if CompanySavedList.objects.filter(user=user, company_id=pk).exists():
            return Response({'error': 'Company already in saved list'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CompanySavedListSerializer(data={'company': pk, 'user': user.id})
        if serializer.is_valid():
            serializer.save()
            return Response({'Company added': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = request.user

        try:
            saved_company = CompanySavedList.objects.get(company_id=pk, user=user)
        except CompanySavedList.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        saved_company.delete()
        return Response(f'Company {pk} deleted', status=status.HTTP_204_NO_CONTENT)
