from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Product, Category, Wishlist
from .serializers import ProductSerializer, CategorySerializer, WishlistCreateSerializer, WishlistSerializer
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.filters import SearchFilter
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response


class ProductListView(ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name', 'description']
    authentication_classes = []
    permission_classes = [AllowAny]
    

    def get_queryset(self):
        queryset = Product.objects.all()

        category = self.request.query_params.get("category")
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")
        trending = self.request.query_params.get("trending")
        featured = self.request.query_params.get("featured")

        if category:
            queryset = queryset.filter(category__slug=category)

        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        if trending in ["true", "1", "True"]:
            queryset = queryset.filter(trending=True)

        if featured in ["true", "1", "True"]:
            queryset = queryset.filter(featured=True)

        return queryset


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    def get_queryset(self):
        return Category.objects.annotate(
            product_count=Count("products")  # related_name
        )

# List products by category slug
class CategoryProductsView(ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name', 'description']
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        slug = self.kwargs.get("slug")
        return Product.objects.filter(category__slug=slug)
    # or #def get_queryset(self):
    # slug = self.kwargs.get("slug")
    # category = Category.objects.get(slug=slug)
    # return category.products.all()


class WishlistCreateView(CreateAPIView):
    serializer_class = WishlistCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {"request": self.request}

class WishlistListView(ListAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user).select_related("product")
    
class WishlistDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        Wishlist.objects.filter(
            user=request.user,
            product_id=product_id
        ).delete()

        return Response({"message": "Removed from wishlist"})

class WishlistCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = Wishlist.objects.filter(user=request.user).count()
        return Response({"count": count})