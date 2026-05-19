# settings.py
# Dimensões da tela
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Taxa de quadros
FPS = 60

# Cores (RGB)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Configurações do Jogador
PLAYER_SPEED = 5
PLAYER_WIDTH = 40
PLAYER_HEIGHT = 40
PLAYER_COLOR = GREEN

# Configurações do Tiro (Bullet)
BULLET_SPEED = 7
BULLET_WIDTH = 5
BULLET_HEIGHT = 15
BULLET_COLOR = WHITE

# Configurações do Asteroide
ASTEROID_MIN_SPEED = 2
ASTEROID_MAX_SPEED = 5
ASTEROID_MIN_SIZE = 20
ASTEROID_MAX_SIZE = 50
ASTEROID_COLOR = RED
ASTEROID_SPAWN_RATE = 40 # Menor = mais frequente (1 spawn a cada N frames)
