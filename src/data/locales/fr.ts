import type { HumanFeatureData } from './types';

export const frFeatures: Record<string, HumanFeatureData> = {
  "radar": {
    "id": "radar",
    "number": "01",
    "title": "Radar du pool de cartes",
    "category": "SALON",
    "summary": "Affiche le radar du pool de cartes des équipes dans le lobby basé sur les 30 derniers matchs.",
    "overview": "Pendant le vote des cartes sur FACEIT, Peekly génère un graphique radar intuitif basé sur les 30 derniers matchs compétitifs de chaque joueur du salon. Vous repérez instantanément les points forts et les faiblesses exploitables des adversaires. Votre capitaine élimine les cartes dangereuses des rivaux et oriente votre escouade vers votre meilleure carte.",
    "benefits": [
      {
        "title": "Aperçu immédiat du pool",
        "desc": "Comparaison directe de la préparation tactique des deux équipes sur l'ensemble des cartes actives de CS2."
      },
      {
        "title": "Élimination des choix pièges",
        "desc": "Évite de tomber par mégarde sur la carte de prédilection des adversaires où ils affichent plus de 80% de victoires."
      },
      {
        "title": "Confiance tactique avant match",
        "desc": "Toute l'équipe aborde la partie avec un plan de jeu limpide et un net avantage psychologique."
      }
    ],
    "audience": "Capitaines d'équipe, escouades de 3 à 5 joueurs et compétiteurs solo."
  },
  "stats": {
    "id": "stats",
    "number": "02",
    "title": "Overlay des stats des joueurs en match",
    "category": "SALON",
    "summary": "Affiche les plaques de stats sur 30 matchs et les détails par carte sous chaque joueur.",
    "overview": "Plus besoin d'ouvrir 10 onglets de profil distincts. Peekly affiche les statistiques de combat essentielles directement sous chaque carte de joueur : ratio K/D, dégâts moyens par round (ADR), pourcentage de tirs à la tête et taux de victoire sur les 30 derniers matchs. En deux secondes, identifiez les adversaires en pleine série de victoires ou les tireurs fébriles.",
    "benefits": [
      {
        "title": "Identification des menaces clés",
        "desc": "Repérer immédiatement les entry-fraggers dangereux et les snipers à fort impact adverse."
      },
      {
        "title": "Tableau de bord tout-en-un",
        "desc": "Toutes les données de performance réunies sur un seul écran sans naviguer sur les profils."
      },
      {
        "title": "Intégration HUD fluide",
        "desc": "Intégration soignée dans l'interface native du salon sans encombrer la vue."
      }
    ],
    "audience": "Joueurs compétitifs privilégiant une préparation minutieuse avant le premier round."
  },
  "avgEloPill": {
    "id": "avgEloPill",
    "number": "03",
    "title": "Badge d'ELO moyen des équipes",
    "category": "SALON",
    "summary": "Affiche des badges contrastés d'ELO moyen avec icône de rang dans la bannière de score.",
    "overview": "Calcule et affiche l'ELO moyen réel des deux formations directement dans l'en-tête du salon avec les icônes de rang. Vous visualisez immédiatement l'équilibre des forces dans le lobby, ce qui permet à votre escouade d'adopter le bon rythme de jeu face à des adversaires redoutables ou de jouer prudemment pour protéger son classement.",
    "benefits": [
      {
        "title": "Clarté de l'équilibre du salon",
        "desc": "Évaluation précise de l'écart de niveau entre les équipes avant le tout premier round."
      },
      {
        "title": "Conscience des enjeux",
        "desc": "Comprenez le niveau de défi et l'importance de la rencontre avant le premier round."
      },
      {
        "title": "Préparation tactique d'équipe",
        "desc": "Ajustement du tempo et de la concentration tactique en fonction du niveau adverse."
      }
    ],
    "audience": "Joueurs en quête d'ELO, compétiteurs solo et équipes visant le niveau 10."
  },
  "autoCopyServer": {
    "id": "autoCopyServer",
    "number": "04",
    "title": "Copie automatique de l'IP du serveur",
    "category": "SALON",
    "summary": "Copie automatiquement la commande connect dans le presse-papier dès l'attribution du serveur.",
    "overview": "Dès que FACEIT attribue votre serveur dédié, la commande console connect complète est copiée instantanément dans votre presse-papier. Inutile de chercher l'adresse sur la page : lancez CS2, ouvrez la console (~) et appuyez sur Ctrl+V pour vous connecter avant tout le monde et vous échauffer avant le round de couteau.",
    "benefits": [
      {
        "title": "Connexion serveur ultra-rapide",
        "desc": "Connexion au serveur en 3 secondes sans chercher le moindre bouton sur l'écran."
      },
      {
        "title": "Prêt pour la console",
        "desc": "Ligne de commande console complète avec IP, port et mot de passe prête à coller."
      },
      {
        "title": "Avantage à l'échauffement",
        "desc": "Connexion anticipée pour chauffer votre visée bien avant le round au pistolet."
      }
    ],
    "audience": "Tous les joueurs compétitifs FACEIT CS2 à la recherche de rapidité et d'efficacité."
  },
  "focusMode": {
    "id": "focusMode",
    "number": "05",
    "title": "Mode focus salon",
    "category": "SALON",
    "summary": "Masque les compositions et la bannière de score pour ne garder que le serveur, la carte et le radar.",
    "overview": "Masque les listes de joueurs et les bannières superflues du salon pour ne conserver que les données vitales : la carte retenue, la commande de connexion et le radar tactique du pool de cartes. Réduit l'empreinte mémoire du navigateur en arrière-plan et maximise vos FPS en jeu.",
    "benefits": [
      {
        "title": "Zéro distraction",
        "desc": "Concentration maximale sur la carte, le serveur et le radar sans distractions visuelles."
      },
      {
        "title": "Faible impact mémoire",
        "desc": "Consommation mémoire réduite du navigateur en arrière-plan pendant vos sessions CS2."
      },
      {
        "title": "Visibilité tactique contrastée",
        "desc": "Thème sombre tactique à fort contraste pensé pour une lisibilité instantanée."
      }
    ],
    "audience": "Joueurs qui privilégient une interface épurée et un taux de rafraîchissement (FPS) optimal."
  },
  "autoAcceptMatch": {
    "id": "autoAcceptMatch",
    "number": "06",
    "title": "Acceptation automatique du match",
    "category": "AUTOMATISATION",
    "summary": "Confirme automatiquement la boîte de dialogue de préparation lors de la création d'un match.",
    "overview": "Ne subissez plus jamais de pénalité de file d'attente pour avoir manqué le bouton de confirmation. Peekly valide automatiquement la boîte de dialogue dès qu'un match est trouvé, même si vous vous êtes absenté un instant. Vous pouvez aussi régler un délai réaliste de 0 à 10 secondes via le curseur dédié.",
    "benefits": [
      {
        "title": "Protection contre les pénalités",
        "desc": "Protection totale contre les temps d'attente imposés suite à un ready-check manqué."
      },
      {
        "title": "Attente sans stress",
        "desc": "Tranquillité d'esprit pendant les longues files d'attente tardives."
      },
      {
        "title": "Curseur ajustable (0–10s)",
        "desc": "Curseur de délai personnalisable d'une réponse instantanée (0s) jusqu'à 10 secondes."
      }
    ],
    "audience": "Tout joueur enchaînant de longues sessions et souhaitant sécuriser ses files d'attente."
  },
  "autoAcceptParty": {
    "id": "autoAcceptParty",
    "number": "07",
    "title": "Acceptation automatique des invitations",
    "category": "AUTOMATISATION",
    "summary": "Accepte automatiquement les invitations d'escouade avec un délai configurable.",
    "overview": "Lorsque vos coéquipiers ou votre capitaine vous envoient une invitation de groupe, Peekly l'accepte instantanément en arrière-plan avec un délai réglable de 0 à 10 secondes. Vous rejoignez votre groupe sans devoir surveiller les notifications du navigateur.",
    "benefits": [
      {
        "title": "Création d'escouade instantanée",
        "desc": "Rassemblement de votre escouade de 5 joueurs en quelques secondes sans clics manuels."
      },
      {
        "title": "Délai de réponse ajustable",
        "desc": "Intervalle de réponse adaptable selon vos préférences de 0 à 10 secondes."
      },
      {
        "title": "Fiabilité en arrière-plan",
        "desc": "Fonctionnement fiable en arrière-plan, même lorsque le navigateur est réduit."
      }
    ],
    "audience": "Équipes constituées, groupes d'amis et joueurs de tournois réguliers."
  },
  "enhancedHistory": {
    "id": "enhancedHistory",
    "number": "08",
    "title": "Historique étendu des matchs",
    "category": "PROFIL",
    "summary": "Ajoute les colonnes K/R, ADR, PCR et un bouton de téléchargement direct de démo au tableau.",
    "overview": "Enrichit l'historique des matchs FACEIT avec des métriques compétitives (K/R, ADR, PCR) et le téléchargement direct en un clic des démos officielles (.DEM). La métrique PCR (Peekly Contribution Rating) mesure la contribution en pourcentage d'un joueur aux victoires de l'équipe, remplaçant l'ancien système RWS. L'algorithme prend en compte les éliminations, passes décisives, l'ADR, les éliminations d'ouverture, les clutches remportés et l'efficacité des grenades. La somme des 5 coéquipiers équivaut toujours à 100%, établissant la norme d'équilibre individuel à exactement 20%. Les démos se téléchargent instantanément à pleine vitesse CDN.",
    "benefits": [
      {
        "title": "Téléchargement démo en 1 clic",
        "desc": "Téléchargement en 1 clic des fichiers .DEM officiels directement depuis le CDN FACEIT."
      },
      {
        "title": "Métrique d'impact PCR (repère 20%)",
        "desc": "Le PCR remplace le RWS pour évaluer l'impact réel (kills, ADR, entrys, clutches, utility). Total équipe 100%, norme par joueur 20%."
      },
      {
        "title": "Revue accélérée des parties",
        "desc": "Analyse accélérée des rounds clés, des situations d'embuscade et des utilitaires dès la fin du match."
      }
    ],
    "audience": "Joueurs analysant leurs replays, entraîneurs tactiques et créateurs de highlights."
  },
  "sidebarElo": {
    "id": "sidebarElo",
    "number": "09",
    "title": "Widget ELO de barre latérale",
    "category": "PROFIL",
    "summary": "Affiche un widget compact à 2 éléments avec icône de niveau et score en direct dans la barre.",
    "overview": "Intègre un widget élégant à 2 éléments directement dans la barre latérale gauche de FACEIT. Suivez votre score ELO précis, votre badge de compétence et votre progression vers le niveau suivant en un coup d'œil, sans devoir charger plusieurs pages.",
    "benefits": [
      {
        "title": "Visibilité constante de l'ELO",
        "desc": "Votre classement et votre insigne de niveau restent visibles en permanence dans la barre."
      },
      {
        "title": "Format épuré à 2 éléments",
        "desc": "Format minimaliste à 2 éléments parfaitement intégré à l'interface originale de FACEIT."
      },
      {
        "title": "Suivi d'évolution instantané",
        "desc": "Suivi immédiat des gains et pertes de points après chaque rencontre disputée."
      }
    ],
    "audience": "Tous les joueurs suivant attentivement l'évolution de leur classement FACEIT CS2."
  },
  "mapSelectorStats": {
    "id": "mapSelectorStats",
    "number": "10",
    "title": "Taux de victoire sur sélection de cartes",
    "category": "PROFIL",
    "summary": "Affiche les badges de victoire personnels et d'équipe directement sur les cartes de la file.",
    "overview": "Superpose vos pourcentages réels de victoire directement sur les vignettes de sélection des cartes dans la file d'attente FACEIT. Convenez en quelques secondes des meilleures cartes à cocher avec votre équipe et évitez celles où votre taux de réussite est faible.",
    "benefits": [
      {
        "title": "Pourcentages de victoire nets",
        "desc": "Visualisation immédiate de vos pourcentages de réussite récents sur chaque carte."
      },
      {
        "title": "Consensus d'équipe immédiat",
        "desc": "Accord rapide entre coéquipiers sur les cartes à sélectionner avant de lancer la recherche."
      },
      {
        "title": "Hausse durable du ratio de victoires",
        "desc": "Progression plus rapide au classement en jouant exclusivement sur vos cartes fortes."
      }
    ],
    "audience": "Compétiteurs souhaitant optimiser rationnellement leur sélection de cartes sur CS2."
  }
};
