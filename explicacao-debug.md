# Depuração de `debug.py`

## Contexto

O arquivo `debug.py` calcula totais de três itens, aplica imposto e desconto, e imprime um resumo de pagamento.

## Erros encontrados e correções

1. `item1 = float(input(Preço do item 1? ))`
   - Erro: falta de aspas na string do prompt.
   - Correção: `item1 = float(input("Preço do item 1? "))`

2. `desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))`
   - Erro: `input()` retorna uma string.
   - Consequência: `desconto_cupom / 100` e `desconto_cupom > 0` falham.
   - Correção: converter para número com `float(...)`.

3. `print(" Item 2:        R$ {total_item2:.2f}")`
   - Erro: string de formatação não é f-string.
   - Correção: `print(f" Item 2:        R$ {total_item2:.2f}")`

4. `if desconto_cupom > 0:`
   - Erro: falta indentação no bloco `if`.
   - Consequência: erro de sintaxe.
   - Correção: identar a linha de `print()` abaixo do `if`.

## Resultado
O código agora lê corretamente os valores numéricos, calcula subtotal, imposto e desconto, e imprime o resumo com formatação adequada.