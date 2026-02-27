from rest_framework import serializers
from .models import Product, Category, Wishlist

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(read_only=True)
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "image","product_count"]

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'image', 'category', 'featured', 'trending']

class WishlistCreateSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True
    )

    class Meta:
        model = Wishlist
        fields = ["product_id"]

    def create(self, validated_data):
        user = self.context["request"].user
        product = validated_data["product"]

        wishlist, created = Wishlist.objects.get_or_create(
            user=user,
            product=product
        )

        return wishlist

class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Wishlist
        fields = ["id", "product", "created_at"]
