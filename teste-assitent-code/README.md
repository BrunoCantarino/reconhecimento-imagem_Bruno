# Reconhecimento de Imagem e IA - Projetos Educacionais

Um repositório com exemplos práticos de código Python focado em **depuração**, **otimização de algoritmos** e **refatoração de código**. Ideal para aprender boas práticas de desenvolvimento.

## 📁 Estrutura do Projeto

```
reconhecimento_imagem_ia/
├── debug.py                          # Código com erros para fins educacionais
├── explicacao-debug.md               # Análise detalhada dos erros e soluções
├── index.html                        # Página HTML (frontend)
└── teste-assitent-code/
    ├── num_primo.py                  # Função para verificar números primos
    ├── explicacao-num-primo.md       # Documentação da função
    ├── refatoracao.py                # Versão refatorada de algoritmos
    └── explicao_refatoracao.md       # Comparação antes/depois
```

## 📝 Descrição dos Arquivos

### 1. **debug.py** - Depuração de Código
Sistema de cálculo de pagamento com múltiplos erros intencionais.

**Funcionalidades:**
- Leitura de dados do cliente e itens de compra
- Cálculo de subtotal, imposto (10%) e desconto
- Exibição formatada do recibo

**Erros Identificados e Corrigidos:**
- ❌ String sem aspas no prompt de entrada
- ❌ Conversão de tipo faltando (input retorna string)
- ❌ F-string faltando em um print
- ❌ Indentação incorreta no bloco if

**Exemplo de Uso:**
```bash
python debug.py
```

---

### 2. **teste-assitent-code/num_primo.py** - Verificador de Números Primos
Implementação otimizada de algoritmo para verificação de primalidade.

**Funcionalidades:**
- Verifica se um número é primo ou não
- Implementação eficiente com otimizações matemáticas
- Testes automatizados

**Otimizações Utilizadas:**
- ✅ Descarta números ≤ 1 por definição
- ✅ Verifica apenas até √n (propriedade matemática)
- ✅ Pula números pares após testar 2
- ✅ Teste apenas com divisores ímpares

**Complexidade:** O(√n)

**Exemplo de Uso:**
```python
from num_primo import is_primo

print(is_primo(17))  # True
print(is_primo(20))  # False
```

**Teste Direto:**
```bash
python num_primo.py
```

---

### 3. **teste-assitent-code/refatoracao.py** - Cálculo de Estatísticas
Função que calcula estatísticas de listas numéricas com código bem estruturado.

**Funcionalidades:**
- Calcula soma, média, máximo e mínimo
- Nomes de variáveis descritivos
- Docstrings em estilo Google
- Usa funções built-in do Python

**Antes (código ruim):**
```python
def c(l):  # Nome não descritivo
    t=0
    for i in range(len(l)):
        t=t+l[i]
    m=t/len(l)
    # ... mais código confuso
```

**Depois (refatorado):**
```python
def calcular_estatisticas(numeros):
    """Calcula estatísticas básicas de uma lista."""
    soma = sum(numeros)
    media = soma / len(numeros)
    maximo = max(numeros)
    minimo = min(numeros)
    return soma, media, maximo, minimo
```

**Exemplo de Uso:**
```bash
python refatoracao.py
```

**Saída:**
```
Total:  346
Média:  34.60
Maior:  89
Menor:  2
```

---

## 📚 Documentação Complementar

| Arquivo | Descrição |
|---------|-----------|
| `explicacao-debug.md` | Análise linha a linha dos erros em debug.py |
| `explicacao-num-primo.md` | Explicação detalhada do algoritmo de primalidade |
| `explicao_refatoracao.md` | Comparação entre código ruim e refatorado |

## 🎯 Objetivos de Aprendizado

Este projeto demonstra:

1. **Depuração de Código**
   - Identificação de erros sintáticos e lógicos
   - Conversão de tipos de dados
   - Formatação de strings

2. **Otimização de Algoritmos**
   - Análise de complexidade (Big O)
   - Redução de operações desnecessárias
   - Utilização de propriedades matemáticas

3. **Refatoração e Boas Práticas**
   - Nomenclatura descritiva de variáveis
   - Docstrings em padrão Google
   - Uso de funções built-in do Python
   - Legibilidade e manutenibilidade

## 🚀 Como Executar

### Pré-requisitos
- Python 3.7+

### Rodando os Exemplos

```bash
# Depuração
python debug.py

# Verificador de Primos
python teste-assitent-code/num_primo.py

# Cálculo de Estatísticas
python teste-assitent-code/refatoracao.py
```

## 💡 Dicas de Estudo

1. **Para Debug:** Compare o `debug.py` com a `explicacao-debug.md` para entender cada erro
2. **Para Algoritmos:** Estude a função `is_primo()` e note as otimizações aplicadas
3. **Para Refatoração:** Veja a transformação do código confuso em código limpo e profissional

## 📖 Conceitos Principais

### Conversão de Tipos
```python
# Entrada é sempre string
valor = input("Digite um número: ")  # "10"

# Conversão necessária
numero = int(valor)    # 10
decimal = float(valor) # 10.0
```

### F-Strings
```python
# Correto (f-string)
print(f"Valor: {valor:.2f}")

# Incorreto (string comum)
print("Valor: {valor:.2f}")
```

### Algoritmo de Primalidade
Testa divisores apenas até √n porque:
- Se n = a × b e a > √n, então b < √n
- Logo, todo divisor > √n tem um correspondente < √n

## 📧 Contato e Suporte

Para dúvidas sobre os exemplos, consulte as documentações em markdown ou execute os scripts para ver a saída.

---

**Última atualização:** Maio de 2026  
**Nível:** Iniciante a Intermediário  
**Linguagem:** Python 3.7+
