import type { HumanFeatureData } from './types';

export const ptFeatures: Record<string, HumanFeatureData> = {
  "radar": {
    "id": "radar",
    "number": "01",
    "title": "Radar do Map Pool no Lobby",
    "category": "SALA DE PARTIDA",
    "summary": "Exibe o radar do pool de mapas dos times na sala de partida com base nos últimos 30 jogos.",
    "overview": "Durante a votação de mapas na FACEIT, o Peekly gera um gráfico de radar intuitivo baseado nas últimas 30 partidas competitivas de cada jogador da sala. Você visualiza instantaneamente os pontos fortes e as fraquezas dos adversários. Seu capitão elimina os mapas mais perigosos do inimigo com precisão e direciona sua equipe para o mapa com a maior taxa de vitória.",
    "benefits": [
      {
        "title": "Visão geral instantânea do pool",
        "desc": "Comparação direta do nível de preparo tático dos dois times em todos os mapas ativos do CS2."
      },
      {
        "title": "Eliminação de escolhas indesejadas",
        "desc": "Evita entrar acidentalmente em mapas onde os adversários mantêm mais de 80% de vitórias."
      },
      {
        "title": "Confiança tática antes do início",
        "desc": "Toda a equipe entra no servidor com um plano de jogo definido e vantagem tática."
      }
    ],
    "audience": "Capitães de time, stacks de 3 a 5 jogadores e competidores solo."
  },
  "stats": {
    "id": "stats",
    "number": "02",
    "title": "Overlay de Estatísticas no Jogo",
    "category": "SALA DE PARTIDA",
    "summary": "Exibe placas de desempenho de 30 jogos e detalhes de mapas abaixo de cada jogador.",
    "overview": "Chega de abrir 10 abas diferentes de perfil no navegador. O Peekly exibe as principais métricas de combate diretamente sob o card de cada jogador: proporção K/D, dano médio por rodada (ADR), taxa de headshots e winrate das últimas 30 partidas. Em dois segundos, você identifica os adversários em alta e os que estão com mira instável.",
    "benefits": [
      {
        "title": "Identificação de ameaças principais",
        "desc": "Identifique rapidamente entry fraggers perigosos e snipers de alto impacto adversários."
      },
      {
        "title": "Painel completo em tela única",
        "desc": "Todas as estatísticas de desempenho reunidas em uma única tela sem abrir perfis."
      },
      {
        "title": "Integração limpa ao HUD",
        "desc": "Design moderno perfeitamente integrado à interface da sala sem poluição visual."
      }
    ],
    "audience": "Jogadores competitivos que valorizam a preparação analítica antes do primeiro round."
  },
  "avgEloPill": {
    "id": "avgEloPill",
    "number": "03",
    "title": "Badge de ELO Médio dos Times",
    "category": "SALA DE PARTIDA",
    "summary": "Exibe badges contrastantes de ELO médio com ícone de patente no banner do placar.",
    "overview": "Calcula e exibe o ELO médio real de ambas as equipes diretamente no cabeçalho da sala com ícones de patente. Veja o equilíbrio de forças da sala imediatamente, preparando sua equipe mentalmente para enfrentar adversários difíceis ou jogar com cautela para proteger sua pontuação.",
    "benefits": [
      {
        "title": "Clareza no equilíbrio da sala",
        "desc": "Compreensão exata da diferença de nível entre as equipes antes do primeiro round."
      },
      {
        "title": "Consciência dos riscos do confronto",
        "desc": "Entenda o nível de desafio e o peso da partida antes do primeiro round começar."
      },
      {
        "title": "Postura tática ajustada",
        "desc": "Avaliação da bagagem dos adversários para ajustar a cadência do jogo coletivo."
      }
    ],
    "audience": "Grinders de ELO, jogadores solo e equipes em busca do Nível 10."
  },
  "autoCopyServer": {
    "id": "autoCopyServer",
    "number": "04",
    "title": "Cópia Automática do IP do Servidor",
    "category": "SALA DE PARTIDA",
    "summary": "Copia automaticamente o comando connect para a área de transferência quando o servidor é alocado.",
    "overview": "Assim que a FACEIT aloca o servidor dedicado da partida, o comando de console connect completo é copiado automaticamente para a sua área de transferência. Não perca tempo procurando endereços na tela: abra o CS2, abra o console (~) e aperte Ctrl+V para conectar antes de todos e aquecer a mira antes do round de faca.",
    "benefits": [
      {
        "title": "Conexão rápida ao servidor",
        "desc": "Conecte-se ao servidor em 3 segundos sem procurar botões ou links na página."
      },
      {
        "title": "Console pronto para colar",
        "desc": "Comando completo de console com IP, porta e senha pronto para colar."
      },
      {
        "title": "Vantagem no aquecimento",
        "desc": "Vantagem no aquecimento de mira antes do início do round pistol."
      }
    ],
    "audience": "Todos os jogadores de CS2 na FACEIT que buscam rapidez e praticidade."
  },
  "focusMode": {
    "id": "focusMode",
    "number": "05",
    "title": "Modo Foco do Lobby",
    "category": "SALA DE PARTIDA",
    "summary": "Oculta escalações e banners de placar, mantendo servidor, mapa e radar visíveis.",
    "overview": "Oculta escalações de jogadores e banners desnecessários da sala, mantendo em foco apenas o essencial: o mapa escolhido, os dados de conexão do servidor e o radar tático de mapas. Reduz o consumo de memória do navegador em segundo plano e preserva os FPS do CS2.",
    "benefits": [
      {
        "title": "Zero distrações",
        "desc": "Foco absoluto no mapa, servidor e radar sem distrações visuais."
      },
      {
        "title": "Baixo consumo de memória",
        "desc": "Menor consumo de memória RAM pelo navegador enquanto o CS2 estiver rodando."
      },
      {
        "title": "Visual tático de alto contraste",
        "desc": "Visual tático escuro de alto contraste otimizado para leitura instantânea."
      }
    ],
    "audience": "Jogadores que priorizam interfaces limpas e máxima taxa de quadros (FPS)."
  },
  "autoAcceptMatch": {
    "id": "autoAcceptMatch",
    "number": "06",
    "title": "Aceitar Partida Automaticamente",
    "category": "AUTOMAÇÃO",
    "summary": "Confirma automaticamente o diálogo de prontidão na criação da partida com atraso configurável.",
    "overview": "Nunca mais receba penalidades de fila por perder o botão de confirmação. O Peekly confirma automaticamente a janela de prontidão assim que a partida é encontrada, mesmo que você tenha se afastado da tela. Você também pode ajustar um atraso humanizado de 0 a 10 segundos pelo controle deslizante.",
    "benefits": [
      {
        "title": "Proteção contra penalidades",
        "desc": "Proteção total contra penalidades de fila por perda inesperada do ready-check."
      },
      {
        "title": "Tranquilidade na espera",
        "desc": "Tranquilidade durante longas filas de espera em horários noturnos."
      },
      {
        "title": "Controle deslizante (0–10s)",
        "desc": "Controle deslizante ajustável: de resposta imediata (0s) até 10 segundos de atraso."
      }
    ],
    "audience": "Qualquer jogador em sessões longas que valoriza a segurança nas filas."
  },
  "autoAcceptParty": {
    "id": "autoAcceptParty",
    "number": "07",
    "title": "Aceitar Convites de Grupo Automaticamente",
    "category": "AUTOMAÇÃO",
    "summary": "Aceita convites de grupo automaticamente em segundo plano com atraso configurável.",
    "overview": "Quando seus companheiros ou seu capitão enviam um convite de grupo, o Peekly aceita imediatamente em segundo plano. Com um atraso ajustável de 0 a 10 segundos, você entra na equipe sem precisar caçar notificações na tela.",
    "benefits": [
      {
        "title": "Reunião rápida de equipe",
        "desc": "Sua equipe de 5 jogadores se reúne em segundos sem depender de cliques manuais."
      },
      {
        "title": "Intervalo de resposta flexível",
        "desc": "Intervalo de resposta personalizável de 0 a 10 segundos de acordo com sua preferência."
      },
      {
        "title": "Alta confiabilidade em segundo plano",
        "desc": "Funcionamento estável em segundo plano mesmo com o navegador minimizado."
      }
    ],
    "audience": "Equipes fechadas, grupos de amigos e times de campeonatos."
  },
  "enhancedHistory": {
    "id": "enhancedHistory",
    "number": "08",
    "title": "Histórico de Partidas Aprimorado",
    "category": "PERFIL",
    "summary": "Adiciona colunas K/R, ADR, PCR e botão de download direto de demo à tabela de partidas.",
    "overview": "Aprimora o histórico padrão da FACEIT com métricas competitivas (K/R, ADR, PCR) e download oficial de demos (.DEM) em um clique. A métrica PCR (Peekly Contribution Rating) mede a porcentagem de contribuição individual para as vitórias da equipe, substituindo o antigo sistema RWS. O algoritmo analisa abates, assistências, ADR, abates de abertura (entry frags), clutches vencidos e utilidade de granadas. A soma de todos os 5 jogadores totaliza sempre 100%, tornando o padrão de equilíbrio individual exatamente 20%. Demos são baixadas na velocidade máxima de CDN sem intermediários.",
    "benefits": [
      {
        "title": "Download de demo em 1 clique",
        "desc": "Acesso em 1 clique aos arquivos .DEM oficiais direto dos servidores CDN da FACEIT."
      },
      {
        "title": "Métrica de contribuição PCR (norma 20%)",
        "desc": "O PCR substitui o RWS e mede o impacto real (abates, ADR, entrys, clutches, granadas). Total do time é 100%, referência por jogador é 20%."
      },
      {
        "title": "Revisão rápida de jogadas",
        "desc": "Análise imediata de rounds decisivos, jogadas de clutch e uso de utilitários pós-jogo."
      }
    ],
    "audience": "Jogadores que revisam demos, técnicos táticos e criadores de conteúdo."
  },
  "sidebarElo": {
    "id": "sidebarElo",
    "number": "09",
    "title": "Widget de ELO na Barra Lateral",
    "category": "PERFIL",
    "summary": "Exibe widget compacto de 2 elementos com ícone de nível e pontuação na barra da FACEIT.",
    "overview": "Integra um widget elegante de 2 elementos diretamente na barra lateral esquerda da FACEIT. Acompanhe sua pontuação de ELO exata, sua insígnia de nível e o progresso para o próximo rank em um relance, sem navegar por várias telas de perfil.",
    "benefits": [
      {
        "title": "Visibilidade permanente do ELO",
        "desc": "Seu ELO atual e a insígnia de patente permanecem sempre visíveis na barra lateral."
      },
      {
        "title": "Formato compacto de 2 elementos",
        "desc": "Estrutura compacta de 2 elementos perfeitamente harmonizada com o design da FACEIT."
      },
      {
        "title": "Acompanhamento ágil de evolução",
        "desc": "Acompanhe ganhos e perdas de pontuação logo após o término de cada partida."
      }
    ],
    "audience": "Todos os jogadores focados em acompanhar sua evolução no ranking da FACEIT."
  },
  "mapSelectorStats": {
    "id": "mapSelectorStats",
    "number": "10",
    "title": "Taxa de Vitória na Seleção de Mapas",
    "category": "PERFIL",
    "summary": "Exibe badges de winrate pessoal e do time direto nos cards de mapa da fila de matchmaking.",
    "overview": "Projeta sua taxa de vitória real e a do seu time diretamente sobre os cards de seleção de mapas da fila na FACEIT. Em poucos segundos, decida quais mapas marcar com seus amigos e evite filas em mapas com baixo rendimento.",
    "benefits": [
      {
        "title": "Porcentagens de vitória transparentes",
        "desc": "Porcentagens de vitória reais exibidas diretamente sobre os cards da fila."
      },
      {
        "title": "Consenso rápido entre amigos",
        "desc": "Alinhamento rápido com o time sobre a escolha de mapas antes de iniciar a busca."
      },
      {
        "title": "Evolução estável de winrate",
        "desc": "Suba de nível mais rápido jogando exclusivamente nos seus mapas dominantes."
      }
    ],
    "audience": "Jogadores que buscam gerenciar seu pool de mapas com base em estatísticas reais."
  }
};
