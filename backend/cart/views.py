from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Cart, CartItem
from .serializers import CartItemSerializer
from products.models import Product

def get_user_cart(user):
    cart, created = Cart.objects.get_or_create(user=user)
    return cart

class CartListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart = get_user_cart(request.user)
        serializer = CartItemSerializer(cart.items.all(), many=True)
        return Response(serializer.data)

class CartAddView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart = get_user_cart(request.user)
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.validated_data['product']
            quantity = serializer.validated_data.get('quantity', 1)
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                defaults={'quantity': quantity}
            )
            if not created:
                cart_item.quantity += quantity
                cart_item.save()
            return Response(CartItemSerializer(cart_item).data, status=201)
        return Response(serializer.errors, status=400)

class CartUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        cart = get_user_cart(request.user)
        try:
            item = CartItem.objects.get(pk=pk, cart=cart)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=404)
        serializer = CartItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class CartDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        cart = get_user_cart(request.user)
        try:
            item = CartItem.objects.get(pk=pk, cart=cart)
            item.delete()
            return Response(status=204)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=404)

class CartClearView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart = get_user_cart(request.user)
        # Delete all items in the cart
        cart.items.all().delete()
        return Response({"detail": "Cart cleared successfully"})