from django.db import models

class Tournament(models.Model):
    TOURNAMENT_TYPES = [
        ('WC', 'World Cup'),
        ('CT', 'Champions Trophy'),
        ('AC', 'Asia Cup'),
        ('T20', 'T20 World Cup'),
    ]
    
    name = models.CharField(max_length=100)
    year = models.IntegerField()
    tournament_type = models.CharField(max_length=3, choices=TOURNAMENT_TYPES)
    location = models.CharField(max_length=100)
    result = models.CharField(max_length=100)
    captain = models.CharField(max_length=100)
    coach = models.CharField(max_length=100)
    image_url = models.URLField(max_length=500)
    
    def __str__(self):
        return f"{self.name} {self.year}"

class Player(models.Model):
    ROLE_CHOICES = [
        ('BAT', 'Batsman'),
        ('BOWL', 'Bowler'),
        ('AR', 'All-rounder'),
        ('WK', 'Wicket-keeper'),
    ]
    
    name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    role = models.CharField(max_length=4, choices=ROLE_CHOICES)
    batting_style = models.CharField(max_length=50)
    bowling_style = models.CharField(max_length=50, blank=True, null=True)
    matches_played = models.IntegerField(default=0)
    runs = models.IntegerField(default=0)
    wickets = models.IntegerField(default=0)
    image_url = models.URLField(max_length=500)
    debut_year = models.IntegerField()
    tournaments = models.ManyToManyField(Tournament, through='TournamentSquad')
    
    def __str__(self):
        return self.name

class TournamentSquad(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    jersey_number = models.IntegerField()
    position = models.CharField(max_length=100)
    
    class Meta:
        unique_together = ['tournament', 'player']