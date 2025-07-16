from rest_framework import serializers
from .models import Category, Product, Order, OrderItem, TimeSale

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    current_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    discount_percentage = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'sale_price', 'stock',
            'category', 'category_id', 'image', 'status', 'is_featured',
            'current_price', 'discount_percentage', 'created_at', 'updated_at'
        ]

class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'sale_price', 'stock',
            'category', 'image', 'status', 'is_featured'
        ]

class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'sale_price', 'stock',
            'category', 'image', 'status', 'is_featured'
        ]

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'quantity', 'price', 'total_price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'status', 'payment_status',
            'total_price', 'shipping_address', 'shipping_phone', 'shipping_name',
            'notes', 'items', 'created_at', 'updated_at'
        ]

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'shipping_address', 'shipping_phone', 'shipping_name', 'notes', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        return order

class OrderUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status', 'payment_status', 'shipping_address', 'shipping_phone', 'shipping_name', 'notes']

class TimeSaleSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    is_currently_active = serializers.BooleanField(read_only=True)

    class Meta:
        model = TimeSale
        fields = [
            'id', 'product', 'product_id', 'start_time', 'end_time',
            'sale_price', 'is_active', 'is_currently_active', 'created_at', 'updated_at'
        ]

class TimeSaleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSale
        fields = ['product', 'start_time', 'end_time', 'sale_price', 'is_active']

class TimeSaleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSale
        fields = ['start_time', 'end_time', 'sale_price', 'is_active'] 