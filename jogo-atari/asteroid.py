import pygame
import random
from settings import *

class Asteroid(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        # Tamanho aleatório para o asteroide
        size = random.randint(ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE)
        self.image = pygame.Surface((size, size))
        self.image.fill(ASTEROID_COLOR)
        self.rect = self.image.get_rect()
        
        # Posição inicial no topo da tela, em coordenada X aleatória
        self.rect.x = random.randint(0, SCREEN_WIDTH - size)
        self.rect.y = random.randint(-100, -40)
        
        # Velocidade aleatória
        self.speedy = random.randint(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED)

    def update(self):
        # Movimenta o asteroide para baixo
        self.rect.y += self.speedy
        
        # O asteroide não é removido aqui para podermos checar a condição
        # de Game Over na main.py (quando ele cruza o fundo da tela)
