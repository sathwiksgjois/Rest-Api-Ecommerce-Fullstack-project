from django.db import models
from django.conf import settings
from products.models import Product

User = settings.AUTH_USER_MODEL

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_completed = models.BooleanField(default=False)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    shipping_address = models.TextField(default="")
    phone = models.CharField(max_length=15, blank=True, null=True)
    STATUS_CHOICES = [
        ('PLACED', 'Placed'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    ]
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='PENDING'
    )
    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        related_name="items",
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # snapshot
    quantity = models.PositiveIntegerField()

    def subtotal(self):
        return self.price * self.quantity

    subtotal.short_description = "Subtotal"

    def __str__(self):
        return f"{self.product} × {self.quantity}"