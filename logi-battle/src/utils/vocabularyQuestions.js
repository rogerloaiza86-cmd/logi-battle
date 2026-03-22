/**
 * Base de données Vocabulaire Logistique & Transport
 * Format : mot → choix de définitions
 */

export const vocabularyQuestions = [
  // Acronymes logistiques
  {
    id: 'voc_001',
    term: "FLM",
    options: [
      'Fournisseur Logistique Mondial',
      'First Last Mile - Premier et Dernier Kilomètre',
      'Facilité Logistique Mobile',
      'Flux Logistique Mensuel'
    ],
    correctOption: 1,
    explanation: "FLM = First Last Mile. C'est la partie du transport la plus coûteuse et complexe (premier et dernier kilomètre).",
    category: "Acronymes",
    difficulty: 2
  },
  {
    id: 'voc_002',
    term: "TMS",
    options: [
      'Traffic Monitoring Solution',
      'Transportation Management System',
      'Transport Management Service',
      'Transit Modal System'
    ],
    correctOption: 1,
    explanation: "TMS = Transportation Management System. Logiciel de gestion du transport pour optimiser les expéditions.",
    category: "Acronymes",
    difficulty: 1
  },
  {
    id: 'voc_003',
    term: "WMS",
    options: [
      'Warehouse Monitoring Service',
      'Workflow Management Solution',
      'Warehouse Management System',
      'Worldwide Management System'
    ],
    correctOption: 2,
    explanation: "WMS = Warehouse Management System. Système de gestion d'entrepôt pour optimiser les flux de stock.",
    category: "Acronymes",
    difficulty: 1
  },
  {
    id: 'voc_004',
    term: "OTIF",
    options: [
      'On Time International Freight',
      'Operational Transit Inventory Flow',
      'On Time In Full - À temps et complet',
      'Optimized Transport In Factory'
    ],
    correctOption: 2,
    explanation: "OTIF = On Time In Full. Indicateur de performance clé mesurant les livraisons à temps et complètes.",
    category: "Acronymes",
    difficulty: 2
  },
  {
    id: 'voc_005',
    term: "SKU",
    options: [
      'Stock Keeping Unit - Unité de gestion de stock',
      'Shipping Key Unit',
      'Storage Known Unit',
      'Supply Knowledge Unit'
    ],
    correctOption: 0,
    explanation: "SKU = Stock Keeping Unit. Référence unique identifiant un produit dans la gestion des stocks.",
    category: "Acronymes",
    difficulty: 1
  },
  {
    id: 'voc_006',
    term: "EDI",
    options: [
      'Electronic Data Integration',
      'Electronic Data Interchange',
      'Efficient Delivery Interface',
      'Engineered Distribution Index'
    ],
    correctOption: 1,
    explanation: "EDI = Electronic Data Interchange. Échange électronique de données entre systèmes informatiques.",
    category: "Acronymes",
    difficulty: 2
  },
  {
    id: 'voc_007',
    term: "RFID",
    options: [
      'Radio Frequency Internal Device',
      'Remote Freight Identification',
      'Radio Frequency Identification',
      'Real-time Freight ID'
    ],
    correctOption: 2,
    explanation: "RFID = Radio Frequency Identification. Technologie d'identification par radiofréquence pour tracer les colis.",
    category: "Acronymes",
    difficulty: 1
  },
  {
    id: 'voc_008',
    term: "3PL",
    options: [
      'Third Party Logistics - Prestataire logistique externe',
      'Triple Point Location',
      'Third Party Location',
      'Transport Priority Level'
    ],
    correctOption: 0,
    explanation: "3PL = Third Party Logistics. Prestataire de services logistiques externe.",
    category: "Acronymes",
    difficulty: 2
  },
  {
    id: 'voc_009',
    term: "FTA",
    options: [
      'Freight Transport Association',
      'Free Trade Agreement - Accord de libre-échange',
      'Fast Transit Area',
      'Full Truck Available'
    ],
    correctOption: 1,
    explanation: "FTA = Free Trade Agreement (Accord de libre-échange) ou Free Trade Area.",
    category: "Acronymes",
    difficulty: 3
  },
  {
    id: 'voc_010',
    term: "LTL",
    options: [
      'Long Term Loading',
      'Less Than Load',
      'Less Than Truckload - Moins qu\'un camion complet',
      'Logistics Transit Level'
    ],
    correctOption: 2,
    explanation: "LTL = Less Than Truckload. Transport de marchandises ne remplissant pas un camion complet.",
    category: "Acronymes",
    difficulty: 2
  },
  {
    id: 'voc_011',
    term: "FTL",
    options: [
      'Full Truckload - Charge complète d\'un camion',
      'Fast Transport Line',
      'Freight Transit Link',
      'Full Time Logistics'
    ],
    correctOption: 0,
    explanation: "FTL = Full Truckload. Transport utilisant la capacité complète d'un camion.",
    category: "Acronymes",
    difficulty: 1
  },
  {
    id: 'voc_012',
    term: "VMI",
    options: [
      'Vehicle Management Interface',
      'Vendor Managed Inventory - Inventaire géré par le fournisseur',
      'Virtual Marketing Index',
      'Volume Management Indicator'
    ],
    correctOption: 1,
    explanation: "VMI = Vendor Managed Inventory. Le fournisseur gère lui-même les stocks de son client.",
    category: "Acronymes",
    difficulty: 2
  },
  {
    id: 'voc_013',
    term: "ATP",
    options: [
      'Available To Promise - Disponible à la vente',
      'Automated Transport Process',
      'Advanced Tracking Program',
      'Automatic Transfer Protocol'
    ],
    correctOption: 0,
    explanation: "ATP = Available To Promise. Quantité disponible pouvant être promise à un client.",
    category: "Acronymes",
    difficulty: 2
  },
  {
    id: 'voc_014',
    term: "CEP",
    options: [
      'Cargo Express Provider',
      'Central European Port',
      'Courier Express Parcel - Messagerie express',
      'Customer Experience Point'
    ],
    correctOption: 2,
    explanation: "CEP = Courier Express Parcel. Services de messagerie, express et colis.",
    category: "Acronymes",
    difficulty: 2
  },
  {
    id: 'voc_015',
    term: "DRP",
    options: [
      'Direct Route Planning',
      'Distribution Resource Planning - Planification des ressources',
      'Daily Route Processing',
      'Dynamic Replenishment Plan'
    ],
    correctOption: 1,
    explanation: "DRP = Distribution Resource Planning. Planification des ressources de distribution.",
    category: "Acronymes",
    difficulty: 3
  },
  {
    id: 'voc_016',
    term: "FIFO",
    options: [
      'First In First Out - Premier entré, premier sorti',
      'Fast Inventory Flow Optimization',
      'Freight In Freight Out',
      'Final Input First Output'
    ],
    correctOption: 0,
    explanation: "FIFO = First In First Out. Méthode de gestion de stock où le premier produit entré est le premier sorti.",
    category: "Méthodes de gestion",
    difficulty: 1
  },
  {
    id: 'voc_017',
    term: "LIFO",
    options: [
      'Last Input First Output',
      'Logistics Inventory Flow Optimization',
      'Last In First Out - Dernier entré, premier sorti',
      'Load In Freight Out'
    ],
    correctOption: 2,
    explanation: "LIFO = Last In First Out. Méthode de gestion de stock où le dernier produit entré est le premier sorti.",
    category: "Méthodes de gestion",
    difficulty: 1
  },
  {
    id: 'voc_018',
    term: "FEFO",
    options: [
      'First Expired First Out - Premier périmé, premier sorti',
      'Fast Expiry Flow Optimization',
      'First Entry First Output',
      'Final Expiry First Out'
    ],
    correctOption: 0,
    explanation: "FEFO = First Expired First Out. Méthode utilisée pour les produits avec date de péremption (DLC).",
    category: "Méthodes de gestion",
    difficulty: 2
  },
  {
    id: 'voc_019',
    term: "Kanban",
    options: [
      'Un type de conteneur maritime',
      'Système de signalisation visuelle pour la production',
      'Un logiciel de gestion de transport',
      'Une méthode de comptage rapide'
    ],
    correctOption: 1,
    explanation: "Kanban = Système de signalisation visuelle (carte, signal) pour piloter la production juste-à-temps.",
    category: "Méthodes de gestion",
    difficulty: 2
  },
  {
    id: 'voc_020',
    term: "Cross-docking",
    options: [
      'Un type de pont pour camions',
      'Technique de déchargement sans stockage intermédiaire',
      'Un système de diagnostic véhicule',
      'Méthode de chargement en croix'
    ],
    correctOption: 1,
    explanation: "Cross-docking = Technique où les marchandises sont transférées directement de la réception à l'expédition sans stockage.",
    category: "Techniques logistiques",
    difficulty: 2
  },
  {
    id: 'voc_021',
    term: "Picking",
    options: [
      'Le choix du transporteur',
      'La préparation de commande (prélèvement)',
      'La sélection des fournisseurs',
      'Le contrôle qualité'
    ],
    correctOption: 1,
    explanation: "Picking = Opération de prélèvement des articles en entrepôt pour constituer une commande.",
    category: "Opérations entrepôt",
    difficulty: 1
  },
  {
    id: 'voc_022',
    term: "Wave picking",
    options: [
      'Prélèvement par vagues regroupant plusieurs commandes',
      'Picking effectué par des robots',
      'Méthode de tri par ondes radio',
      'Technique de chargement par vagues'
    ],
    correctOption: 0,
    explanation: "Wave picking = Méthode de préparation où les commandes sont regroupées en vagues pour optimiser les déplacements.",
    category: "Opérations entrepôt",
    difficulty: 2
  },
  {
    id: 'voc_023',
    term: "Zone picking",
    options: [
      'Picking limité à une zone géographique',
      'Prélèvement où chaque opérateur travaille dans une zone spécifique',
      'Sélection de zones de livraison',
      'Technique de picking en extérieur'
    ],
    correctOption: 1,
    explanation: "Zone picking = L'entrepôt est divisé en zones, chaque opérateur prélève uniquement dans sa zone.",
    category: "Opérations entrepôt",
    difficulty: 2
  },
  {
    id: 'voc_024',
    term: "Batch picking",
    options: [
      'Prélèvement par lots optimisant les trajets',
      'Picking effectué par lots de travailleurs',
      'Prélèvement en mode batch informatique',
      'Technique de picking par groupes de clients'
    ],
    correctOption: 0,
    explanation: "Batch picking = Prélèvement de plusieurs commandes simultanément pour optimiser les déplacements.",
    category: "Opérations entrepôt",
    difficulty: 2
  },
  {
    id: 'voc_025',
    term: "Put-away",
    options: [
      'Action de jeter des produits',
      'Opération de rangement en stock',
      'Technique d\'emballage',
      'Méthode de contrôle qualité'
    ],
    correctOption: 1,
    explanation: "Put-away = Opération consistant à ranger les produits reçus dans leurs emplacements de stockage.",
    category: "Opérations entrepôt",
    difficulty: 1
  },
  {
    id: 'voc_026',
    term: "Kitting",
    options: [
      'Fabrication de kits de survie',
      'Opération d\'assemblage de composants en kit',
      'Technique d\'emballage plastique',
      'Méthode de picking rapide'
    ],
    correctOption: 1,
    explanation: "Kitting = Opération consistant à assembler plusieurs articles pour former un kit ou un ensemble.",
    category: "Opérations entrepôt",
    difficulty: 2
  },
  {
    id: 'voc_027',
    term: "Cycle counting",
    options: [
      'Comptage cyclique des stocks par rotation',
      'Décompte des cycles de production',
      'Comptage des vélos en stock',
      'Méthode de rotation des stocks'
    ],
    correctOption: 0,
    explanation: "Cycle counting = Inventaire permanent où des articles sont comptés régulièrement par rotation plutôt qu'en une seule fois.",
    category: "Inventaire",
    difficulty: 2
  },
  {
    id: 'voc_028',
    term: "Délai de livraison",
    options: [
      'Temps de déchargement d\'un camion',
      'Temps entre la commande et la réception',
      'Durée de vie d\'un produit',
      'Temps de transit maritime uniquement'
    ],
    correctOption: 1,
    explanation: "Délai de livraison = Temps écoulé entre la passation d'une commande et la réception des marchandises.",
    category: "Terminologie",
    difficulty: 1
  },
  {
    id: 'voc_029',
    term: "Lead time",
    options: [
      'Temps de conduite du chauffeur',
      'Délai total d\'approvisionnement',
      'Temps de chargement',
      'Durée de vie du produit'
    ],
    correctOption: 1,
    explanation: "Lead time = Délai total entre la commande et la livraison, incluant tous les processus.",
    category: "Terminologie",
    difficulty: 2
  },
  {
    id: 'voc_030',
    term: "Stock de sécurité",
    options: [
      'Stock stocké dans un coffre-fort',
      'Réserve pour faire face aux aléas',
      'Stock destiné aux soldes',
      'Produits dangereux isolés'
    ],
    correctOption: 1,
    explanation: "Stock de sécurité = Quantité supplémentaire maintenue pour éviter les ruptures en cas de variations de demande ou de délai.",
    category: "Gestion des stocks",
    difficulty: 1
  },
  {
    id: 'voc_031',
    term: "Point de commande",
    options: [
      'Lieu où passer une commande',
      'Niveau de stock déclenchant une commande',
      'Point de vente principal',
      'Endroit de réception des marchandises'
    ],
    correctOption: 1,
    explanation: "Point de commande = Niveau de stock à partir duquel une nouvelle commande doit être passée.",
    category: "Gestion des stocks",
    difficulty: 2
  },
  {
    id: 'voc_032',
    term: "ROP",
    options: [
      'Return On Purchase',
      'Reorder Point - Point de recommande',
      'Rate Of Production',
      'Request Of Payment'
    ],
    correctOption: 1,
    explanation: "ROP = Reorder Point. Niveau de stock déclenchant une nouvelle commande (synonyme de point de commande).",
    category: "Gestion des stocks",
    difficulty: 2
  },
  {
    id: 'voc_033',
    term: "EOQ",
    options: [
      'End Of Quantity',
      'Economic Order Quantity - Quantité économique de commande',
      'Estimated Output Quality',
      'Entry Order Query'
    ],
    correctOption: 1,
    explanation: "EOQ = Economic Order Quantity. Quantité optimale à commander pour minimiser les coûts totaux.",
    category: "Gestion des stocks",
    difficulty: 3
  },
  {
    id: 'voc_034',
    term: "Taux de service",
    options: [
      'Pourcentage de livraisons à temps et complètes',
      'Taux de satisfaction des employés',
      'Pourcentage de camions en service',
      'Taux de rendement des machines'
    ],
    correctOption: 0,
    explanation: "Taux de service = Pourcentage de commandes livrées dans les délais avec la quantité demandée.",
    category: "KPI",
    difficulty: 1
  },
  {
    id: 'voc_035',
    term: "Rotation des stocks",
    options: [
      'Changement d\'emplacement des produits',
      'Nombre de fois où le stock est renouvelé sur une période',
      'Rotation des équipes de travail',
      'Mouvement des chariots élévateurs'
    ],
    correctOption: 1,
    explanation: "Rotation des stocks = Nombre de fois que le stock est vendu et remplacé sur une période donnée.",
    category: "KPI",
    difficulty: 2
  },
  {
    id: 'voc_036',
    term: "GMAO",
    options: [
      'Gestion des Marchés Aux Ouvertures',
      'Gestion de Maintenance Assistée par Ordinateur',
      'Groupement des Magasins à Ouverture',
      'Gestion des Matériels Agricoles Organisés'
    ],
    correctOption: 1,
    explanation: "GMAO = Gestion de Maintenance Assistée par Ordinateur. Logiciel de gestion de la maintenance.",
    category: "Acronymes",
    difficulty: 2
  },
  {
    id: 'voc_037',
    term: "CMR",
    options: [
      'Convention Marchandises Routières',
      'Convention relative au contrat de transport international de marchandises par route',
      'Certificat de Mouvement Routier',
      'Convention Maritime Routière'
    ],
    correctOption: 1,
    explanation: "CMR = Convention sur le contrat de transport international de marchandises par route. Document obligatoire pour le transport international routier.",
    category: "Documents",
    difficulty: 2
  },
  {
    id: 'voc_038',
    term: "Lettre de voiture",
    options: [
      'Courrier envoyé par camion',
      'Document contractuel de transport terrestre',
      'Lettre de recommandation du chauffeur',
      'Autorisation de circuler'
    ],
    correctOption: 1,
    explanation: "Lettre de voiture = Document contractuel entre chargeur et transporteur pour le transport de marchandises.",
    category: "Documents",
    difficulty: 2
  },
  {
    id: 'voc_039',
    term: "LTL",
    options: [
      'Logistics Transport License',
      'Less Than Truckload - Groupage',
      'Long Term Logistics',
      'Load Transfer Level'
    ],
    correctOption: 1,
    explanation: "LTL = Less Than Truckload. Transport de groupage où plusieurs expéditeurs partagent un camion.",
    category: "Transport",
    difficulty: 2
  },
  {
    id: 'voc_040',
    term: "Palette Europe",
    options: [
      'Palette en bois français',
      'Palette standard 1200×800 mm',
      'Palette pour export UE uniquement',
      'Palette recyclable'
    ],
    correctOption: 1,
    explanation: "Palette Europe = Palette standardisée de 1200×800 mm utilisée principalement en Europe.",
    category: "Emballage",
    difficulty: 1
  },
  {
    id: 'voc_041',
    term: "Palette US",
    options: [
      'Palette fabriquée aux États-Unis',
      'Palette standard 1200×1000 mm',
      'Palette en plastique',
      'Palette pour conteneur maritime'
    ],
    correctOption: 1,
    explanation: "Palette US = Palette standardisée de 1200×1000 mm (aussi appelée palette industrielle).",
    category: "Emballage",
    difficulty: 1
  },
  {
    id: 'voc_042',
    term: "Colis",
    options: [
      'Marchandise en vrac',
      'Unité d\'expédition emballée pour le transport',
      'Conteneur maritime vide',
      'Palette non chargée'
    ],
    correctOption: 1,
    explanation: "Colis = Unité d'expédition constituée de marchandises emballées pour le transport.",
    category: "Emballage",
    difficulty: 1
  },
  {
    id: 'voc_043',
    term: "Unité de charge",
    options: [
      'La charge d\'un camion',
      'Ensemble de colis sur un support de manutention (palette, conteneur...)',
      'La capacité d\'un entrepôt',
      'Le poids maximum autorisé'
    ],
    correctOption: 1,
    explanation: "Unité de charge = Ensemble de colis regroupés sur un support de manutention (palette, conteneur, cage...).",
    category: "Manutention",
    difficulty: 2
  },
  {
    id: 'voc_044',
    term: "HU",
    options: [
      'Handling Unit - Unité de manutention',
      'Heavy Unit',
      'High Usage',
      'Handling User'
    ],
    correctOption: 0,
    explanation: "HU = Handling Unit. Synonyme d'unité de charge ou unité de manutention.",
    category: "Manutention",
    difficulty: 2
  },
  {
    id: 'voc_045',
    term: "SSCC",
    options: [
      'Standard Shipping Container Code',
      'Serial Shipping Container Code - Code à barres logistique',
      'Simple Standard Container Classification',
      'Shipping and Storage Container Code'
    ],
    correctOption: 1,
    explanation: "SSCC = Serial Shipping Container Code. Code à barres unique identifiant une unité de charge logistique.",
    category: "Traçabilité",
    difficulty: 2
  },
  {
    id: 'voc_046',
    term: "GS1",
    options: [
      'Global Standards One - Organisation de normalisation',
      'General Shipping One',
      'Global Supply Index',
      'General Standard Identification'
    ],
    correctOption: 0,
    explanation: "GS1 = Organisation internationale qui élabore des standards pour la chaîne logistique (codes-barres, RFID, etc.).",
    category: "Normes",
    difficulty: 2
  },
  {
    id: 'voc_047',
    term: "EAN",
    options: [
      'European Article Number - Code-barres produit',
      'Electronic Article Name',
      'European Article Name',
      'Electronic Automatic Numbering'
    ],
    correctOption: 0,
    explanation: "EAN = European Article Number. Code-barres standardisé identifiant un produit de consommation.",
    category: "Traçabilité",
    difficulty: 1
  },
  {
    id: 'voc_048',
    term: "DAT",
    options: [
      'Delivered At Terminal - Rendu au terminal',
      'Direct Air Transport',
      'Delivered After Transport',
      'Date of Arrival Time'
    ],
    correctOption: 0,
    explanation: "DAT = Delivered At Terminal. Incoterm où le vendeur livre les marchandises au terminal d'arrivée.",
    category: "Incoterms",
    difficulty: 3
  },
  {
    id: 'voc_049',
    term: "DAP",
    options: [
      'Delivered At Place - Rendu au lieu de destination',
      'Direct Air Parcel',
      'Delivered After Payment',
      'Date of Arrival Place'
    ],
    correctOption: 0,
    explanation: "DAP = Delivered At Place. Incoterm où le vendeur livre les marchandises au lieu convenu (non déchargées).",
    category: "Incoterms",
    difficulty: 2
  },
  {
    id: 'voc_050',
    term: "EXW",
    options: [
      'Express Way',
      'Ex Works - À l\'usine',
      'External Warehouse',
      'Express Warehouse'
    ],
    correctOption: 1,
    explanation: "EXW = Ex Works. Incoterm où l'acheteur prend en charge les marchandises chez le vendeur.",
    category: "Incoterms",
    difficulty: 2
  },
  {
    id: 'voc_051',
    term: "Chaîne du froid",
    options: [
      'Transport par camions réfrigérés uniquement',
      'Ensemble des opérations maintenant la température contrôlée',
      'Stockage dans des chambres froides',
      'Transport de glace uniquement'
    ],
    correctOption: 1,
    explanation: "Chaîne du froid = Ensemble des moyens et opérations permettant de maintenir une température contrôlée du producteur au consommateur.",
    category: "Spécifique",
    difficulty: 1
  },
  {
    id: 'voc_052',
    term: "Dangereux (ADR)",
    options: [
      'Produits interdits au transport',
      'Marchandises présentant des risques pour la sécurité (inflammables, toxiques...)',
      'Produits qui ne peuvent pas être stockés',
      'Marchandises de grande valeur'
    ],
    correctOption: 1,
    explanation: "Marchandises dangereuses = Produits présentant des risques pour la sécurité (inflammables, toxiques, explosifs...) réglementés par l'ADR.",
    category: "Réglementation",
    difficulty: 2
  },
  {
    id: 'voc_053',
    term: "Quai",
    options: [
      'Plateforme de débarquement maritime uniquement',
      'Zone de réception/expédition au niveau des véhicules',
      'Bureau des douanes',
      'Parking des camions'
    ],
    correctOption: 1,
    explanation: "Quai = Zone d'un entrepôt située au niveau des véhicules pour faciliter le chargement et le déchargement.",
    category: "Infrastructure",
    difficulty: 1
  },
  {
    id: 'voc_054',
    term: "Docks",
    options: [
      'Embarcadère maritime',
      'Portes de quai équipées pour le chargement',
      'Entrepôts de stockage',
      'Bureaux administratifs'
    ],
    correctOption: 1,
    explanation: "Docks = Portes de quai permettant l'accès des véhicules à l'entrepôt pour le chargement/déchargement.",
    category: "Infrastructure",
    difficulty: 1
  },
  {
    id: 'voc_055',
    term: "Aire de préparation",
    options: [
      'Parking pour les camions',
      'Zone dédiée au regroupement des commandes avant expédition',
      'Espace pour les pauses des opérateurs',
      'Zone de maintenance des chariots'
    ],
    correctOption: 1,
    explanation: "Aire de préparation = Zone où les commandes sont regroupées et préparées avant l'expédition.",
    category: "Infrastructure",
    difficulty: 2
  },
  {
    id: 'voc_056',
    term: "Zone de découvert",
    options: [
      'Zone extérieure non couverte',
      'Zone de réception temporaire avant contrôle',
      'Aire de stationnement des camions',
      'Zone de stockage des produits dangereux'
    ],
    correctOption: 1,
    explanation: "Zone de découvert = Zone de réception où les marchandises attendent le contrôle qualité avant d'être rangées.",
    category: "Infrastructure",
    difficulty: 3
  },
  {
    id: 'voc_057',
    term: "PTAC",
    options: [
      'Poids Total Autorisé en Charge',
      'Poids Total Autorisé de Charge',
      'Poids Total d\'Arrimage Calculé',
      'Poids Total d\'Assurance Commercial'
    ],
    correctOption: 0,
    explanation: "PTAC = Poids Total Autorisé en Charge. Poids maximum légal d'un véhicule chargé (véhicule + charge).",
    category: "Transport",
    difficulty: 2
  },
  {
    id: 'voc_058',
    term: "PV",
    options: [
      'Poids à Vide',
      'Poids du Véhicule',
      'Proces-Verbal',
      'Point de Vente'
    ],
    correctOption: 0,
    explanation: "PV = Poids à Vide. Poids d'un véhicule sans charge ni conducteur.",
    category: "Transport",
    difficulty: 2
  },
  {
    id: 'voc_059',
    term: "Portance",
    options: [
      'Capacité de levage d\'un chariot élévateur',
      'Charge maximale qu\'un sol peut supporter',
      'Capacité d\'un camion à transporter',
      'Poids maximum d\'une palette'
    ],
    correctOption: 1,
    explanation: "Portance = Charge maximale qu'un sol ou une structure peut supporter par unité de surface (généralement en tonnes/m²).",
    category: "Infrastructure",
    difficulty: 2
  },
  {
    id: 'voc_060',
    term: "Tare",
    options: [
      'Poids du contenu d\'un emballage',
      'Poids vide d\'un emballage ou véhicule',
      'Poids total d\'une expédition',
      'Différence entre poids brut et net'
    ],
    correctOption: 1,
    explanation: "Tare = Poids vide d'un emballage, d'un conteneur ou d'un véhicule (sans la marchandise).",
    category: "Métrologie",
    difficulty: 2
  },
  {
    id: 'voc_061',
    term: "Poids brut",
    options: [
      'Poids de la marchandise seule',
      'Poids total incluant emballage et marchandise',
      'Poids maximum autorisé',
      'Poids du camion vide'
    ],
    correctOption: 1,
    explanation: "Poids brut = Poids total d'une marchandise incluant son emballage (poids net + tare).",
    category: "Métrologie",
    difficulty: 1
  },
  {
    id: 'voc_062',
    term: "Poids net",
    options: [
      'Poids de la marchandise seule sans emballage',
      'Poids après déduction de la tare',
      'Poids minimum garanti',
      'Poids du colis entier'
    ],
    correctOption: 0,
    explanation: "Poids net = Poids de la marchandise seule, sans l'emballage (poids brut - tare).",
    category: "Métrologie",
    difficulty: 1
  },
  {
    id: 'voc_063',
    term: "CACES",
    options: [
      'Certificat d\'Aptitude à la Conduite En Sécurité',
      'Certificat d\'Aptitude à la Conduite de machines de manutention',
      'Certificat Automobile de Conduite et d\'Entretien Sécurisé',
      'Certificat Agréé de Conduite Européenne Standard'
    ],
    correctOption: 1,
    explanation: "CACES = Certificat d'Aptitude à la Conduite de machines de manutention (chariots élévateurs, gerbeurs...).",
    category: "Réglementation",
    difficulty: 2
  },
  {
    id: 'voc_064',
    term: "EPI",
    options: [
      'Équipement de Production Industrielle',
      'Équipement de Protection Individuelle',
      'Entrepôt de Produits Industriels',
      'Équipement Personnel Interdit'
    ],
    correctOption: 1,
    explanation: "EPI = Équipement de Protection Individuelle. Équipements protégeant le travailleur (casque, gants, chaussures...).",
    category: "Sécurité",
    difficulty: 1
  },
  {
    id: 'voc_065',
    term: "Consignation",
    options: [
      'Action de confier des marchandises à un transporteur',
      'Mise hors tension et verrouillage d\'une machine pour maintenance',
      'Rangement des produits en stock',
      'Envoi de marchandises par avion'
    ],
    correctOption: 1,
    explanation: "Consignation = Procédure de mise hors tension et verrouillage d'une machine pour éviter une mise en marche accidentelle pendant la maintenance.",
    category: "Sécurité",
    difficulty: 3
  }
];

// Fonctions utilitaires
export const getRandomVocabularyQuestion = () => {
  const randomIndex = Math.floor(Math.random() * vocabularyQuestions.length);
  return vocabularyQuestions[randomIndex];
};

export const getVocabularyQuestionsByCategory = (category) => {
  return vocabularyQuestions.filter(q => q.category === category);
};

export const getVocabularyQuestionsByDifficulty = (difficulty) => {
  return vocabularyQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomVocabularyQuestions = (count = 10) => {
  const shuffled = [...vocabularyQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default vocabularyQuestions;
