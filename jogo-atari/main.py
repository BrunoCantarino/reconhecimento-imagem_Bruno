import pygame
import sys
import random
from settings import *
from player import Player
from bullet import Bullet
from asteroid import Asteroid

# Inicialização do Pygame
pygame.init()
pygame.font.init()

# Configuração da tela
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Jogo de Asteroides")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 24, bold=True)
game_over_font = pygame.font.SysFont("arial", 48, bold=True)

def draw_text(surface, text, size, x, y, color, font_obj):
    text_surface = font_obj.render(text, True, color)
    text_rect = text_surface.get_rect()
    text_rect.midtop = (x, y)
    surface.blit(text_surface, text_rect)

def main():
    # Grupos de sprites
    all_sprites = pygame.sprite.Group()
    asteroids = pygame.sprite.Group()
    bullets = pygame.sprite.Group()

    player = Player()
    all_sprites.add(player)

    score = 0
    frame_count = 0
    running = True
    game_over = False

    while running:
        # 1. Manter a taxa de quadros (FPS) constante
        clock.tick(FPS)

        # 2. Processar eventos
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and not game_over:
                    # O jogador atira pressionando ESPAÇO
                    bullet = Bullet(player.rect.centerx, player.rect.top)
                    all_sprites.add(bullet)
                    bullets.add(bullet)
                elif event.key == pygame.K_r and game_over:
                    # Reiniciar o jogo
                    game_over = False
                    score = 0
                    frame_count = 0
                    all_sprites.empty()
                    asteroids.empty()
                    bullets.empty()
                    player = Player()
                    all_sprites.add(player)

        if not game_over:
            # 3. Atualizar
            all_sprites.update()

            # Lógica de "spawn" (surgimento) de asteroides
            frame_count += 1
            if frame_count % ASTEROID_SPAWN_RATE == 0:
                asteroid = Asteroid()
                all_sprites.add(asteroid)
                asteroids.add(asteroid)

            # Verificar colisões: Tiro colide com Asteroide
            # pygame.sprite.groupcollide retorna um dicionário com as colisões
            # True, True indica que ambos (tiro e asteroide) devem ser deletados
            hits = pygame.sprite.groupcollide(asteroids, bullets, True, True)
            for hit in hits:
                score += 10 # Aumenta a pontuação por cada asteroide destruído

            # Verificar colisões: Asteroide colide com Jogador
            # True no último parâmetro removeria o asteroide, mas deixamos False
            if pygame.sprite.spritecollide(player, asteroids, False):
                game_over = True

            # Verificar se algum asteroide chegou ao fundo da tela
            for asteroid in asteroids:
                if asteroid.rect.top > SCREEN_HEIGHT:
                    asteroid.kill() # Remove o asteroide que passou
                    score -= 10 # Penalidade por deixar o asteroide passar

        # 4. Desenhar na tela (Renderizar)
        screen.fill(BLACK)
        all_sprites.draw(screen)

        # Desenhar a pontuação
        draw_text(screen, f"Pontuação: {score}", 24, 100, 10, WHITE, font)

        if game_over:
            draw_text(screen, "GAME OVER", 48, SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 30, RED, game_over_font)
            draw_text(screen, "Pressione 'R' para reiniciar", 24, SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 30, WHITE, font)

        # Atualizar o display após desenhar tudo
        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
