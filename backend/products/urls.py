from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView, CategoryProductsView, WishlistListView, WishlistCreateView, WishlistDeleteView, WishlistCountView

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path("categories/", CategoryListView.as_view(), name="categories"),
    path("category/<slug:slug>/", CategoryProductsView.as_view(), name="category-products"),
    path("wishlist/", WishlistListView.as_view()),
    path("wishlist/add/", WishlistCreateView.as_view()),
    path("wishlist/remove/<int:product_id>/", WishlistDeleteView.as_view()),
    path("wishlist/count/", WishlistCountView.as_view()),
]
