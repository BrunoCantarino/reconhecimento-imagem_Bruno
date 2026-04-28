def calcular_estatisticas(numeros):
    """
    Calcula estatísticas básicas de uma lista de números.
    
    Args:
        numeros (list): Lista de números inteiros ou floats.
    
    Returns:
        tuple: Tupla contendo (soma, media, maximo, minimo).
    """
    soma = sum(numeros)
    media = soma / len(numeros)
    maximo = max(numeros)
    minimo = min(numeros)
    
    return soma, media, maximo, minimo


if __name__ == '__main__':
    numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    
    soma, media, maximo, minimo = calcular_estatisticas(numeros)
    
    print(f"Total:  {soma}")
    print(f"Média:  {media:.2f}")
    print(f"Maior:  {maximo}")
    print(f"Menor:  {minimo}")