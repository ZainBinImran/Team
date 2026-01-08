from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Tournament, Player, TournamentSquad
from .serializers import TournamentSerializer, PlayerSerializer, TournamentSquadSerializer

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all().order_by('-year')
    serializer_class = TournamentSerializer
    
    @action(detail=True)
    def squad(self, request, pk=None):
        tournament = get_object_or_404(Tournament, pk=pk)
        squad = TournamentSquad.objects.filter(tournament=tournament)
        serializer = TournamentSquadSerializer(squad, many=True)
        return Response(serializer.data)

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all().order_by('name')
    serializer_class = PlayerSerializer
    
    @action(detail=False)
    def batsmen(self, request):
        batsmen = Player.objects.filter(role='BAT')
        serializer = self.get_serializer(batsmen, many=True)
        return Response(serializer.data)
    
    @action(detail=False)
    def bowlers(self, request):
        bowlers = Player.objects.filter(role='BOWL')
        serializer = self.get_serializer(bowlers, many=True)
        return Response(serializer.data)