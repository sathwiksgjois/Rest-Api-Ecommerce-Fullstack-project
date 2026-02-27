from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product", "price", "quantity", "subtotal")
    can_delete = False

    def subtotal(self, obj):
        return obj.subtotal()


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "total_amount",
        "status",
        "created_at",
    )
    list_filter = ("status", "created_at")
    search_fields = ("user__username", "id")
    readonly_fields = ("total_amount", "created_at")
    list_editable = ("status",)
    inlines = [OrderItemInline]

    fieldsets = (
        ("Order Info", {
            "fields": ("user", "status")
        }),
        ("Payment", {
            "fields": ("total_amount",)
        }),
        ("Timestamps", {
            "fields": ("created_at",)
        }),
    )
