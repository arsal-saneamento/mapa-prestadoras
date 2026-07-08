/* ════════════════════════════════════════════════════════════════════════════
   ARSAL — MAPA DE SANEAMENTO DE ALAGOAS
   ARQUIVO DE DADOS — edite SOMENTE este arquivo para atualizar o mapa.
   ════════════════════════════════════════════════════════════════════════════

   ► COMO ATUALIZAR UM MUNICÍPIO
     Localize a linha do município abaixo e altere os valores entre aspas.
     Cada município ocupa exatamente UMA linha. Campos:
       producao      → prestadora responsável pela produção de água
       distribuicao  → prestadora responsável pela distribuição (define a COR no mapa)
       esgoto        → prestadora responsável pelo esgotamento sanitário
       bloco         → "Bloco A", "Bloco B", "Bloco C" ou "Sem Bloco"
       regulacao     → "Regulado" ou "Não Regulado"

   ► VALORES ACEITOS PARA PRESTADORAS
     Use exatamente um dos nomes cadastrados em PRESTADORAS logo abaixo
     (ou "Sem informação" quando não houver dado).

   ► COMO ADICIONAR UMA NOVA PRESTADORA
     Acrescente uma linha em PRESTADORAS com o nome, a cor e o rótulo.
     A legenda e os filtros do mapa são gerados automaticamente a partir daqui.

   ► CUIDADOS
     - Não remova vírgulas, chaves ou aspas.
     - O nome do município deve ser idêntico ao do mapa (acentos incluídos).
     - Após salvar, basta recarregar a página (F5) para ver a atualização.
   ════════════════════════════════════════════════════════════════════════════ */

// ─── PRESTADORAS: nome → cor no mapa e rótulo exibido na legenda ─────────────
const PRESTADORAS = {
  "Casal":           { cor: "#2563EB", rotulo: "CASAL" },
  "Conasa":          { cor: "#1E293B", rotulo: "Conasa" },
  "BRK Ambiental":   { cor: "#7C3AED", rotulo: "BRK Ambiental" },
  "Verde Ambiental": { cor: "#059669", rotulo: "Verde Ambiental" },
  "Sem informação":  { cor: "#CBD5E1", rotulo: "Sem dados" }
};

// ─── DADOS POR MUNICÍPIO (um por linha — edite os valores entre aspas) ───────
const DADOS_MUNICIPIOS = {
  "Água Branca":               { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Anadia":                    { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Arapiraca":                 { producao: "Casal"           , distribuicao: "Casal"           , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Regulado"      },
  "Atalaia":                   { producao: "BRK Ambiental"   , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Barra de Santo Antônio":    { producao: "BRK Ambiental"   , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Barra de São Miguel":       { producao: "Casal"           , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Batalha":                   { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Belém":                     { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Belo Monte":                { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Boca da Mata":              { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Branquinha":                { producao: "Verde Ambiental" , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Cacimbinhas":               { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Cajueiro":                  { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Campestre":                 { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Campo Alegre":              { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Campo Grande":              { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Canapi":                    { producao: "Casal"           , distribuicao: "Casal"           , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Regulado"      },
  "Capela":                    { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Carneiros":                 { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Chã Preta":                 { producao: "Verde Ambiental" , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Coité do Nóia":             { producao: "Casal"           , distribuicao: "Casal"           , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Regulado"      },
  "Colônia Leopoldina":        { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Coqueiro Seco":             { producao: "Casal"           , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Coruripe":                  { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Craíbas":                   { producao: "Casal"           , distribuicao: "Casal"           , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Regulado"      },
  "Delmiro Gouveia":           { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Dois Riachos":              { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Estrela de Alagoas":        { producao: "Casal"           , distribuicao: "Casal"           , esgoto: "Casal"           , bloco: "Sem Bloco" , regulacao: "Regulado"      },
  "Feira Grande":              { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Feliz Deserto":             { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Flexeiras":                 { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Girau do Ponciano":         { producao: "Casal"           , distribuicao: "Casal"           , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Regulado"      },
  "Ibateguara":                { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Igaci":                     { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Igreja Nova":               { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Inhapi":                    { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Jacaré dos Homens":         { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Jacuípe":                   { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Japaratinga":               { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Jaramataia":                { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Jequiá da Praia":           { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Joaquim Gomes":             { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Jundiá":                    { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Junqueiro":                 { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Lagoa da Canoa":            { producao: "Casal"           , distribuicao: "Casal"           , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Regulado"      },
  "Limoeiro de Anadia":        { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Maceió":                    { producao: "Casal"           , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Major Isidoro":             { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Maragogi":                  { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Maravilha":                 { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Marechal Deodoro":          { producao: "BRK Ambiental"   , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Maribondo":                 { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Mar Vermelho":              { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Mata Grande":               { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Matriz de Camaragibe":      { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Messias":                   { producao: "Casal"           , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Minador do Negrão":         { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Monteirópolis":             { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Murici":                    { producao: "Casal"           , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Novo Lino":                 { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Olho d'Água das Flores":    { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Olho d'Água do Casado":     { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Olho d'Água Grande":        { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Olivença":                  { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Ouro Branco":               { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Palestina":                 { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Palmeira dos Índios":       { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Pão de Açúcar":             { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Pariconha":                 { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Paripueira":                { producao: "Casal"           , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Passo de Camaragibe":       { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Paulo Jacinto":             { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Penedo":                    { producao: "Conasa"          , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Piaçabuçu":                 { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Pilar":                     { producao: "Casal"           , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Pindoba":                   { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Piranhas":                  { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Poço das Trincheiras":      { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Porto Calvo":               { producao: "Verde Ambiental" , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Porto de Pedras":           { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Porto Real do Colégio":     { producao: "Conasa"          , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Quebrangulo":               { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Rio Largo":                 { producao: "Casal"           , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Roteiro":                   { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Santa Luzia do Norte":      { producao: "Casal"           , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Santana do Ipanema":        { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Santana do Mundaú":         { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "São Brás":                  { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "São José da Laje":          { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "São José da Tapera":        { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "São Luís do Quitunde":      { producao: "Verde Ambiental" , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "São Miguel dos Campos":     { producao: "Conasa"          , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "São Miguel dos Milagres":   { producao: "Verde Ambiental" , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "São Sebastião":             { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Satuba":                    { producao: "Casal"           , distribuicao: "BRK Ambiental"   , esgoto: "BRK Ambiental"   , bloco: "Bloco A"   , regulacao: "Regulado"      },
  "Senador Rui Palmeira":      { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "Tanque d'Arca":             { producao: "Verde Ambiental" , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Taquarana":                 { producao: "Casal"           , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Teotônio Vilela":           { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
  "Traipu":                    { producao: "Casal"           , distribuicao: "Conasa"          , esgoto: "Conasa"          , bloco: "Bloco B"   , regulacao: "Regulado"      },
  "União dos Palmares":        { producao: "Verde Ambiental" , distribuicao: "Verde Ambiental" , esgoto: "Verde Ambiental" , bloco: "Bloco C"   , regulacao: "Regulado"      },
  "Viçosa":                    { producao: "Sem informação"  , distribuicao: "Sem informação"  , esgoto: "Sem informação"  , bloco: "Sem Bloco" , regulacao: "Não Regulado"  },
};
