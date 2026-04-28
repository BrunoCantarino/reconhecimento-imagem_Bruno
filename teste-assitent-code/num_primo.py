def is_primo(n):
    " \\Retorna True se n for primo caso contrário False.\\\
 if n <= 1:
 return False
 if n <= 3:
 return True
 if n % 2 == 0:
 return False
 i = 3
 while i * i <= n:
 if n % i == 0:
 return False
 i += 2
 return True

if __name__ == '__main__':
 numeros = [1, 2, 3, 4, 16, 17, 19, 20, 23]
 for num in numeros:
 print(f'{num} -> {is_primo(num)}')
