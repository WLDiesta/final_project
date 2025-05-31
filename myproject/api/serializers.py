from rest_framework import serializers
from .models import User, Post, Comment, Profile
from django.core.files.images import get_image_dimensions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'photo']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_photo(self, photo):
        if photo.size > 2 * 1024 * 1024:
            raise serializers.ValidationError("Image file too large ( > 2MB )")
        if photo.image.format not in ['JPEG', 'PNG', 'WEBP']:
            raise serializers.ValidationError("Unsupported file format.")
        return photo

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims here
        token['username'] = user.username
        return token