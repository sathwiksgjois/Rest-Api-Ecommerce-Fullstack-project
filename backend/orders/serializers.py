from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer
from products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']


class OrderItemCreateSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product'
    )

    class Meta:
        model = OrderItem
        fields = ['product_id', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)  # GET
    items_write = OrderItemCreateSerializer(
        source='items', many=True, write_only=True
    )  # POST

    class Meta:
        model = Order
        fields = [
            'id',
            'user',
            'created_at',
            'is_completed',
            'items',
            'items_write',
            'total_amount',
            'shipping_address',
            'phone',
            'status'
        ]
        read_only_fields = ['user', 'created_at']

    def create(self, validated_data):
        print("validated_data:", validated_data)
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        order = Order.objects.create(
            user=user,
            shipping_address=validated_data["shipping_address"],
            phone=validated_data["phone"],
            total_amount=0
        )
        total = 0
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data.get('quantity', 1)
            if product.stock < quantity:
                raise serializers.ValidationError(
                    f"Not enough stock for {product.name}"
                )
            product.stock -= quantity
            product.save()
            total += item_data['product'].price * item_data.get('quantity', 1)
            OrderItem.objects.create(
                order=order,
                product=item_data['product'],
                quantity=item_data.get('quantity', 1),
                price=item_data['product'].price
            )
        order.total_amount = total
        order.save()
        return order
