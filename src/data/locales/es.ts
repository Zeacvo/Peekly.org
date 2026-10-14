import type { HumanFeatureData } from './types';

export const esFeatures: Record<string, HumanFeatureData> = {
  "radar": {
    "id": "radar",
    "number": "01",
    "title": "Radar del pool de mapas en sala",
    "category": "SALA",
    "summary": "Muestra el radar de mapas de los equipos en la sala del partido según los últimos 30 juegos.",
    "overview": "Durante la votación de mapas en FACEIT, Peekly genera un intuitivo gráfico de radar basado en las últimas 30 partidas competitivas de cada jugador en la sala. Detecta al instante las zonas de confort y los puntos débiles de los rivales. Tu capitán elimina las cartas fuertes del oponente con total seguridad y guía al equipo hacia su mapa con mayor porcentaje de victoria.",
    "benefits": [
      {
        "title": "Evaluación inmediata del pool",
        "desc": "Comparación directa del nivel de preparación de ambos equipos en todos los mapas activos de CS2."
      },
      {
        "title": "Evitar mapas desfavorables",
        "desc": "Evita jugar por error en mapas donde los oponentes tienen más del 80% de victorias."
      },
      {
        "title": "Confianza antes del primer asalto",
        "desc": "Todo el equipo entra al servidor con un plan táctico claro y máxima confianza competitiva."
      }
    ],
    "audience": "Capitanes de equipo, grupos premade de 3 a 5 jugadores y jugadores en solitario."
  },
  "stats": {
    "id": "stats",
    "number": "02",
    "title": "Superposición de estadísticas en partida",
    "category": "SALA",
    "summary": "Muestra placas con estadísticas de 30 partidas y desglose de mapas bajo cada jugador.",
    "overview": "Olvídate de abrir 10 pestañas diferentes del navegador. Peekly muestra las métricas clave de combate directamente debajo de la tarjeta de cada jugador: ratio K/D, daño medio por ronda (ADR), porcentaje de tiros a la cabeza y tasa de victorias en las últimas 30 partidas. En dos segundos sabrás quién llega en racha ganadora y quién tiene una puntería irregular.",
    "benefits": [
      {
        "title": "Detección rápida de amenazas",
        "desc": "Identifica al instante a los entry fraggers y francotiradores más peligrosos del rival."
      },
      {
        "title": "Panel integral de rendimiento",
        "desc": "Todas las métricas de rendimiento en una sola pantalla sin abrir perfiles externos."
      },
      {
        "title": "Integración HUD limpia",
        "desc": "Integración visual limpia y elegante en la interfaz de la sala sin sobrecargarla."
      }
    ],
    "audience": "Jugadores competitivos que valoran la preparación analítica previa a cada ronda."
  },
  "avgEloPill": {
    "id": "avgEloPill",
    "number": "03",
    "title": "Insignia de ELO promedio del equipo",
    "category": "SALA",
    "summary": "Muestra insignias contrastadas de ELO promedio con icono de rango en el banner de puntuación.",
    "overview": "Calcula y muestra el ELO medio real de ambas escuadras directamente en el encabezado de la sala con iconos de rango. Ves de inmediato el balance de poder en el lobby, lo que ayuda a mentalizarse para enfrentar rivales difíciles o jugar con precaución para proteger tu puntuación.",
    "benefits": [
      {
        "title": "Claridad en el balance de sala",
        "desc": "Conoce con total precisión la diferencia de nivel entre equipos antes de la primera ronda."
      },
      {
        "title": "Conciencia de lo que está en juego",
        "desc": "Comprende el nivel del desafío y la importancia de la partida antes del primer asalto."
      },
      {
        "title": "Mentalidad táctica",
        "desc": "Evalúa la experiencia del oponente y adapta el ritmo de juego colectivo."
      }
    ],
    "audience": "Grinders de ELO, jugadores solitarios y equipos que aspiran al Nivel 10."
  },
  "autoCopyServer": {
    "id": "autoCopyServer",
    "number": "04",
    "title": "Copia automática de la IP del servidor",
    "category": "SALA",
    "summary": "Copia automáticamente el comando connect al portapapeles cuando se asigna el servidor.",
    "overview": "En el instante en que FACEIT asigna el servidor de la partida, el comando de consola connect completo se copia automáticamente en tu portapapeles. No pierdas tiempo buscando la dirección en la pantalla: abre CS2, despliega la consola (~) y pulsa Ctrl+V para conectarte el primero y calentar tu puntería antes de la ronda a cuchillo.",
    "benefits": [
      {
        "title": "Conexión en tiempo récord",
        "desc": "Entra al servidor en 3 segundos sin buscar direcciones ni botones adicionales."
      },
      {
        "title": "Consola lista para pegar",
        "desc": "Comando completo de consola con IP, puerto y contraseña listo para pegar."
      },
      {
        "title": "Ventaja en el calentamiento",
        "desc": "Entra antes al servidor y calienta la mira con tiempo antes de la ronda de pistolas."
      }
    ],
    "audience": "Cualquier jugador competitivo de FACEIT CS2 que busque rapidez y ventaja inicial."
  },
  "focusMode": {
    "id": "focusMode",
    "number": "05",
    "title": "Modo concentración de sala",
    "category": "SALA",
    "summary": "Oculta alineaciones y banners de puntuación, manteniendo visibles el servidor, mapa y radar.",
    "overview": "Oculta las alineaciones de jugadores y banners innecesarios de la sala, dejando a la vista únicamente lo fundamental: el mapa seleccionado, los datos de conexión al servidor y el radar táctico de mapas. Reduce el consumo de memoria del navegador en segundo plano y maximiza los FPS en CS2.",
    "benefits": [
      {
        "title": "Cero distracciones",
        "desc": "Atención 100% enfocada en el mapa, servidor y radar sin distracciones visuales."
      },
      {
        "title": "Bajo consumo de memoria",
        "desc": "Menor uso de memoria RAM del navegador en segundo plano durante la partida."
      },
      {
        "title": "Visualización táctica de alto contraste",
        "desc": "Diseño táctico oscuro de alto contraste optimizado para una lectura rápida."
      }
    ],
    "audience": "Jugadores que priorizan una interfaz minimalista y el máximo rendimiento de FPS."
  },
  "autoAcceptMatch": {
    "id": "autoAcceptMatch",
    "number": "06",
    "title": "Aceptación automática de partida",
    "category": "AUTOMATIZACIÓN",
    "summary": "Confirma automáticamente el diálogo de preparación al crearse la partida con retraso ajustable.",
    "overview": "Evita penalizaciones y tiempos de espera en la cola por no llegar a tiempo al botón de confirmación. Peekly confirma automáticamente la ventana de preparación tan pronto como se encuentra partida, incluso si te has levantado un momento del escritorio. Puedes definir un retraso realista de 0 a 10 segundos mediante el deslizador intuitivo.",
    "benefits": [
      {
        "title": "Protección ante sanciones de cola",
        "desc": "Cero penalizaciones de cola por perderte un control de preparación inesperado."
      },
      {
        "title": "Tranquilidad durante la espera",
        "desc": "Tranquilidad total para levantarte durante colas largas en horarios nocturnos."
      },
      {
        "title": "Deslizador configurable (0–10s)",
        "desc": "Deslizador ajustable desde respuesta inmediata (0s) hasta un retraso humano de 10s."
      }
    ],
    "audience": "Cualquier jugador que dispute sesiones prolongadas y busque seguridad en sus colas."
  },
  "autoAcceptParty": {
    "id": "autoAcceptParty",
    "number": "07",
    "title": "Aceptar invitaciones de grupo automáticamente",
    "category": "AUTOMATIZACIÓN",
    "summary": "Acepta automáticamente las invitaciones de grupo con un retraso configurable.",
    "overview": "Cuando tus compañeros o tu capitán te envían una invitación de grupo, Peekly la acepta de forma instantánea en segundo plano. Con un intervalo configurable de 0 a 10 segundos, te unes a la escuadra sin tener que buscar notificaciones en la pantalla.",
    "benefits": [
      {
        "title": "Reunión rápida de equipo",
        "desc": "Tu equipo de 5 jugadores se reúne en segundos sin esperar clics manuales."
      },
      {
        "title": "Retraso configurable a medida",
        "desc": "Intervalo de respuesta adaptable según tus preferencias de 0 a 10 segundos."
      },
      {
        "title": "Alta fiabilidad en segundo plano",
        "desc": "Funcionamiento seguro y fiable incluso con la ventana del navegador minimizada."
      }
    ],
    "audience": "Equipos cerrados, grupos de amigos y escuadras de torneos."
  },
  "enhancedHistory": {
    "id": "enhancedHistory",
    "number": "08",
    "title": "Historial de partidas ampliado",
    "category": "PERFIL",
    "summary": "Añade métricas K/R, ADR, PCR y un botón de descarga directa de demo a la tabla de partidas.",
    "overview": "Mejora el historial de partidas estándar de FACEIT con métricas competitivas (K/R, ADR, PCR) y descarga directa en un clic de repeticiones oficiales (.DEM). La métrica PCR (Peekly Contribution Rating) mide la contribución porcentual de un jugador al éxito del equipo, reemplazando al obsoleto sistema RWS. El algoritmo evalúa bajas, asistencias, daño medio por ronda (ADR), primeras bajas (entry frags), clutches ganados y uso de granadas (utility). La suma de los 5 integrantes siempre da 100%, fijando la norma equilibrada por jugador en exactamente un 20%. Las demos se descargan a máxima velocidad de CDN sin desvíos.",
    "benefits": [
      {
        "title": "Descarga de demos en 1 clic",
        "desc": "Acceso con 1 solo clic a los archivos .DEM oficiales desde la red rápida de FACEIT."
      },
      {
        "title": "Métrica de aporte PCR (norma 20%)",
        "desc": "PCR reemplaza a RWS y evalúa el impacto real (bajas, ADR, entrys, clutches, utilidad). Suma del equipo 100%, referencia por jugador 20%."
      },
      {
        "title": "Análisis rápido de repeticiones",
        "desc": "Revisa rondas clave, jugadas de clutch y uso de granadas justo al terminar la partida."
      }
    ],
    "audience": "Jugadores que revisan demos para mejorar, analistas tácticos y creadores de contenido."
  },
  "sidebarElo": {
    "id": "sidebarElo",
    "number": "09",
    "title": "Widget de ELO en barra lateral",
    "category": "PERFIL",
    "summary": "Muestra un widget compacto de 2 elementos con icono de nivel y puntuación en la barra lateral.",
    "overview": "Integra un elegante widget de 2 elementos directamente en la barra lateral izquierda de FACEIT. Mantente siempre al tanto de tu puntuación de ELO exacta, tu insignia de rango y tu progreso hacia el siguiente nivel sin necesidad de navegar entre diferentes páginas.",
    "benefits": [
      {
        "title": "Visibilidad constante del ELO",
        "desc": "Tu puntuación de ELO y rango permanecen siempre visibles en la barra lateral."
      },
      {
        "title": "Diseño compacto de 2 elementos",
        "desc": "Diseño minimalista de 2 elementos integrado de forma natural en la interfaz de FACEIT."
      },
      {
        "title": "Seguimiento ágil del progreso",
        "desc": "Seguimiento inmediato de tus ganancias y pérdidas de puntos tras cada partido."
      }
    ],
    "audience": "Todos los jugadores que hacen seguimiento activo de su evolución competitiva en FACEIT."
  },
  "mapSelectorStats": {
    "id": "mapSelectorStats",
    "number": "10",
    "title": "Porcentaje de victorias en selección de mapas",
    "category": "PERFIL",
    "summary": "Muestra insignias de victorias personales y de equipo en las tarjetas de mapa de la cola.",
    "overview": "Muestra tu porcentaje de victorias real y el de tu equipo directamente sobre las tarjetas de selección de mapas al buscar partida. Decide en segundos con tus compañeros qué mapas marcar y evita entrar en mapas donde tu rendimiento es bajo.",
    "benefits": [
      {
        "title": "Porcentajes de victoria precisos",
        "desc": "Comprueba tus porcentajes reales de victoria directamente en las tarjetas de la cola."
      },
      {
        "title": "Rápido acuerdo en equipo",
        "desc": "Consenso rápido con amigos sobre la elección de mapas antes de iniciar la búsqueda."
      },
      {
        "title": "Incremento del winrate a largo plazo",
        "desc": "Juega únicamente en tus mapas dominantes para subir de rango con mayor rapidez."
      }
    ],
    "audience": "Jugadores que desean gestionar su pool de mapas de manera estratégica y analítica."
  }
};
