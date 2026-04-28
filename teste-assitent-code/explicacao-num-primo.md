# Explicação de `num_primo.py`

## Contexto geral

O arquivo define uma função `is_primo(n)` para verificar se um número inteiro `n` é primo. No final, há um bloco `if __name__ == '__main__':` que executa testes básicos quando o arquivo é rodado diretamente.

## Linha a linha

1. `def is_primo(n):`
   - Declara a função `is_primo` com o parâmetro `n`.

2. `    """Retorna True se n for primo, caso contrário False."""`
   - Docstring que descreve o propósito da função.

3. `    if n <= 1:`
   - Verifica se `n` é menor ou igual a 1.

4. `        return False`
   - Números menores ou iguais a 1 não são primos.

5. `    if n <= 3:`
   - Verifica se `n` é 2 ou 3.

6. `        return True`
   - 2 e 3 são primos, então retorna `True`.

7. `    if n % 2 == 0:`
   - Verifica se `n` é par.

8. `        return False`
   - Números pares maiores que 2 não são primos.

9. `    i = 3`
   - Inicia a verificação de divisores a partir de 3.

10. `    while i * i <= n:`
    - Continua enquanto `i` for menor ou igual à raiz quadrada de `n`.

11. `        if n % i == 0:`
    - Verifica se `n` é divisível por `i`.

12. `            return False`
    - Se encontrar um divisor, `n` não é primo.

13. `        i += 2`
    - Pula os números pares, testando apenas ímpares.

14. `    return True`
    - Se nenhum divisor for encontrado, `n` é primo.

15. `if __name__ == '__main__':`
    - Bloco executado somente quando o arquivo é rodado diretamente.

16. `    numeros = [1, 2, 3, 4, 16, 17, 19, 20, 23]`
    - Lista de valores usados para testar a função.

17. `    for num in numeros:`
    - Percorre cada número da lista.

18. `        print(f'{num} -> {is_primo(num)}')`
    - Imprime o número e se ele é primo.