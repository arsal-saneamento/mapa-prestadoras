# Mapa das Prestadoras — ARSAL

Mapa interativo da prestação de serviços de saneamento nos 102 municípios de Alagoas.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Aplicação completa (mapa, filtros, busca). **Não precisa editar para atualizar dados.** |
| `dados.js` | **Dicionário de dados — edite APENAS este arquivo para atualizações.** |
| `img/` | Logos (`arsal.png`, `gov.png`). Se uma imagem não existir, ela é ocultada automaticamente. |
| `index_backup_original.html` | Backup da versão anterior (pode ser apagado quando não for mais necessário). |

## Como atualizar os dados de um município

1. Abra `dados.js` em qualquer editor de texto (Bloco de Notas serve).
2. Localize a linha do município — cada município ocupa **uma única linha**.
3. Altere os valores entre aspas e salve.
4. Recarregue a página (F5).

Campos: `producao`, `distribuicao` (define a **cor** no mapa), `esgoto`, `bloco` (`"Bloco A"`, `"Bloco B"`, `"Bloco C"` ou `"Sem Bloco"`) e `regulacao` (`"Regulado"` ou `"Não Regulado"`).

## Como adicionar uma nova prestadora

Em `dados.js`, acrescente uma linha no bloco `PRESTADORAS` com nome, cor (hex) e rótulo.
A legenda e os filtros do mapa são gerados automaticamente.

## Funcionalidades

- **Busca de município**: digite o nome (sem precisar de acentos) ou clique em ▾ para ver a lista completa. Ao selecionar, o mapa dá zoom no município.
- **Filtros combináveis** por prestadora (distribuição), bloco e regulação, com contagem de municípios em cada opção.
- **Zoom e navegação**: scroll do mouse, botões +/−/⟳, duplo clique aproxima, arrastar move (pinça em telas de toque).
- **Painel de detalhes**: clique em um município no mapa. `Esc` ou ✕ fecha.
