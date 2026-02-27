from django.contrib import admin
from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "slug")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    list_editable = ("slug","name")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "price",
        "stock",
        "featured",
        "trending",
        "created_at",
    )
    list_filter = ("category", "featured", "trending")
    search_fields = ("name", "description")
    list_editable = ("price", "stock", "featured", "trending")
