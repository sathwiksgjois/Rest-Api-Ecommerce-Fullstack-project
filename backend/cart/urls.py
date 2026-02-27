from django.urls import path
from .views import CartListView, CartAddView, CartUpdateView, CartDeleteView, CartClearView

urlpatterns = [
    path('', CartListView.as_view(), name='cart-list'),
    path('add/', CartAddView.as_view(), name='cart-add'),
    path('update/<int:pk>/', CartUpdateView.as_view(), name='cart-update'), 
    path('remove/<int:pk>/', CartDeleteView.as_view(), name='cart-delete'),
    path('clear/', CartClearView.as_view(), name='cart-clear'),
]
