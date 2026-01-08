from rest_framework import serializers
from .models import Tournament, Player, TournamentSquad

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    tournaments = TournamentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Player
        fields = '__all__'

class TournamentSquadSerializer(serializers.ModelSerializer):
    player = PlayerSerializer(read_only=True)
    
    class Meta:
        model = TournamentSquad
        fields = '__all__'