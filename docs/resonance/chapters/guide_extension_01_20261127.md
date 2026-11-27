# Extension 01 — Personnalité, équipes, entités et activités bonus

Application Half-Life / Portal du guide 30–49, bible 1.11, 27 novembre 2026. [Original complet](../guides/Combat_Games_Extension_01_Tag_Taunts_Bonus_v1.0.txt) · [JSON structuré](../data/combat_extensions_20261127.json) · [Sources et périmètre](guide_integration_20261127.md).

**Toutes les fonctions nouvelles de ce chapitre sont conçues, non implémentées.** Les valeurs sont des hypothèses à 60 pas de simulation par seconde. Aucune image, frame, voix, animation complète ou nouvelle intégration de combat n’est comptée par ce chapitre.

## Taunts : six gestes complets

Chaque provocation est de présentation : zéro dégât, zéro gain de jauge et aucune invulnérabilité. L’adversaire continue d’agir. Le contrôle revient après la sortie ; l’annulation volontaire ne commence qu’à cette phase. Un hit interrompt le geste et applique la réaction normale. Les répliques ne se répètent pas avant 600 ticks.

| ID / acteur | Geste | Entrée / maintien / sortie | Fidélité et audio |
| --- | --- | --- | --- |
| GUIDE_TAUNT_gordon_hl2 | Vérifie la prise du pied-de-biche, le relève brièvement puis reprend sa garde; aucun dialogue inventé. | 12 / 28 / 16 ticks | Conserver Mark V, lunettes, barbe, prise et latéralité du dossier HL2. Ne pas utiliser Mark IV ou le Gravity Gun amélioré comme tenue par défaut. Aucune réplique vocale; son bref de vêtement et d’outil, à produire. |
| GUIDE_TAUNT_alyx_hl2 | Petit signe de tête de défi, arme tenue en sécurité; revient au regard sur l’adversaire. | 10 / 30 / 14 ticks | Tenue et Alyx Gun du dossier HL2; aucun Gravity Glove de Half-Life: Alyx ajouté à cette version. Pas de citation officielle recopiée; éventuelle ligne originale signalée comme adaptation, non enregistrée. |
| GUIDE_TAUNT_gina_decay | Contrôle bref de l’équipement HEV puis geste de disponibilité à sa partenaire; pas de pouvoir scientifique surnaturel. | 14 / 24 / 18 ticks | Modèle et palette Decay à comparer aux captures approuvées; ne pas substituer une tenue de multijoueur ou l’hologramme du Hazard Course. Geste prioritaire; aucune personnalité nouvelle déduite du seul métier. |
| GUIDE_TAUNT_colette_decay | Observe l’indicateur de sa combinaison, confirme d’un geste bref puis revient à sa garde. | 14 / 26 / 18 ticks | Modèle campagne séparé de costume_colette_headtohead_ps2; couleurs et attaches exigent une comparaison de référence. Aucune citation ni performance vocale disponible dans ce lot. |
| GUIDE_TAUNT_atlas_portal2 | Incline son châssis compact et resserre l’iris, appareil pointé hors cible; pas de tir offensif fictif. | 14 / 26 / 16 ticks | Corps compact et œil bleu; ne pas reprendre le châssis élancé ou l’œil orange de P-body. Bruits mécaniques à produire; aucune parole humaine attribuée. |
| GUIDE_TAUNT_pbody_portal2 | Se penche légèrement, marque une pause expressive de l’œil et se redresse; aucune déformation comique qui change le modèle. | 16 / 28 / 18 ticks | Œil orange et grandes jambes; articulation, câble et appareil à vérifier indépendamment pour chaque orientation. Bruits mécaniques à produire; aucune parole humaine attribuée. |

Les séquences à produire sont `taunt_enter`, `taunt_hold`, `taunt_exit` et `taunt_hit_interrupt`. Elles demandent des images individuelles, pivots et orientations contrôlés. Les poses de base existantes ne sont pas requalifiées en clips de taunt. ATLAS et P-body restent bloqués par l’absence de fichiers acceptés ; aucun nouveau contournement de refus n’est tenté.

## Sélection et désélection

Le choix logique est pris immédiatement. La présentation accompagne ce choix sans retenir une commande pendant sa durée. Les neuf états sont : survol, aperçu, confirmation, attente confirmée, changement de costume, désélection complète, sortie abrégée, validation d’équipe, départ vers le versus. Les délais proposés sont respectivement 0, 24, 30, 60, 12, 36, 6, 48 et 18 ticks ; l’attente peut boucler sans nouvelle voix.

| Acteur | Sélection | Désélection dédiée |
| --- | --- | --- |
| Gordon Freeman — HL2 | Relève le regard puis pose le pied-de-biche à hauteur de garde. | Abaisse son outil, recule hors du cadre; aucun fondu de téléportation. |
| Alyx Vance — HL2 | Se tourne vers la menace avec son arme abaissée puis la ramène en position de départ. | Range ou abaisse l’arme suivant la référence d’animation, puis quitte le cadre par le côté. |
| Gina Cross — Decay | Vérifie son équipement puis présente son outil de travail en position basse. | Ferme le geste de vérification, remet l’outil en sécurité et recule. |
| Colette Green — Decay | Relève sa posture avec l’arme de son kit; la présentation reste distincte de celle de Gina. | Abaisse son arme, pivote et sort; l’indicateur visuel de menu s’éteint avec le personnage. |
| ATLAS — Portal 2 coop | Redresse son châssis, fait converger son regard puis stabilise l’appareil. | Baisse l’appareil et recule; aucun portail de menu laissé actif. |
| P-body — Portal 2 coop | Déplie sa posture élancée, fixe la caméra puis revient vers son partenaire. | Ramène les bras vers le châssis et quitte le cadre avec des appuis lisibles. |

Chaque aperçu possède ses voix, particules, compagnon éventuel, ombre, lumières et prévisualisations de portail. La fermeture retire exactement ces éléments. Deux curseurs n’utilisent pas le même propriétaire d’aperçu. Les costumes héritent du kit uniquement si le catalogue le prévoit ; l’apparence d’Alyx HLA ne remplace pas sa version HL2. En mouvement réduit, une pose et le texte d’état transmettent la même information. Un aperçu non disponible doit afficher son état technique, pas une animation vide présentée comme déblocage secret.

## Équipes, jauge et transfert du contrôle

Les trois paires ciblées utilisent un futur profil hybride à deux : actif et réserve avec vie propre. Le versus se termine après élimination des deux. Pour une mission qui restitue strictement Decay, la mort de l’une met fin à la mission [GE-S02] : cette règle est différente et doit apparaître dans le profil. Le `story_04` existant reste en duels alternés tant que sa variante tag n’a pas été réalisée.

La jauge Coordination est distincte de la Résonance individuelle : plafond 1 000, départ 250. Une assistance coûte 200, un relais volontaire 150, un relais de combo 300 et une super duo 700. Gain proposé : 2 tous les 60 ticks où l’équipe peut agir, et 4 par hit sans coût de jauge, limité à 12 par combo. La jauge ne progresse pas pendant pause, hitstop, cinématique, QTE ou résultat. Un passage automatique après KO est gratuit pour éviter de bloquer un survivant.

Le tag volontaire commence seulement depuis le neutre au sol : 20 ticks d’entrée, transfert au tick 21, 18 ticks de récupération de l’entrant et 240 ticks de délai de rappel. Le secours en hitstun/garde est différé. Le relais de combo exige une fenêtre explicitement autorisée et ne peut avoir lieu qu’une fois par combo. Il conserve réduction des dégâts, rebonds, captures et limites déjà consommés. La réserve ne récupère pas de vie dans ce profil initial et ses munitions, statuts et récupérations persistent.

L’état du partenaire est exclusif : disponible, appel engagé, arrivée, assistance, sortie, récupération, actif, touché ou KO. La validation réserve ensemble le partenaire et le coût. Un appel refusé ne coûte rien ; une interruption après engagement conserve son coût. Une super engage les deux membres, ce qui interdit un second appel simultané. Les humains entrent depuis un bord libre et visible ; aucun pouvoir de téléportation n’est ajouté pour justifier le tag.

| Profil | Participants et période | Restriction narrative |
| --- | --- | --- |
| GUIDE_TEAM_GORDON_ALYX | Gordon / Alyx — couverture coordonnée | Alliance de HL2 attestée; chorégraphie créée pour Resonance. Les chapitres existants restent inchangés tant que la variante équipe n’est pas implémentée. |
| GUIDE_TEAM_GINA_COLETTE | Gina / Colette — double procédure | Duo de Decay attesté. Le changement SELECT en solo ne constitue pas la preuve d’un tag de jeu de combat. story_04 reste en duels alternés. La variante tag est conçue séparément, désactivée. |
| GUIDE_TEAM_ATLAS_PBODY | ATLAS / P-body — coordination de tests | Coopération Portal 2 de référence; duel et dégâts de cubes sont des adaptations. Conception uniquement : assets de base refusés, simulateur de portails non implémenté; aucune entrée jouable annoncée. |

## Six assistances documentées

Les commandes logiques `ASSIST`, `TAG` et `DUO_SUPER` restent distinctes et remappables. Elles n’ont pas été ajoutées au clavier du Boss Battle existant. Chaque assistance possède un point d’entrée libre, un télégraphe, une vulnérabilité complète et un retrait. Une frappe qui touche actif et soutien répartit les dégâts selon les cibles mais ne double pas les gains d’une jauge partagée.

| Acteur / action de base | Action | Démarrage / actif / récupération | Dégâts proposés |
| --- | --- | --- | --- |
| gordon_hl2 / gordon_hl2.special_1 | Projette le débris de son propre kit sur une trajectoire annoncée; ne saisit ni adversaire ni synth géant. | 18 / 6 / 26 | 420 |
| alyx_hl2 / alyx_hl2.special_1 | Deux tirs de son kit, séparés et gardables; pas de visée automatique à travers le décor. | 16 / 10 / 24 | 360 |
| gina_decay / gina_decay.special_1 | Un tir de pistolet du kit existant, puis retrait vers son bord d’équipe. | 18 / 3 / 27 | 320 |
| colette_decay / colette_decay.special_1 | Un tir placé pour couvrir la récupération de Gina; ne transforme pas sa formation en pouvoir. | 20 / 3 / 25 | 340 |
| atlas_portal2 / adaptation documentée | Met le cube de son kit en mouvement depuis un socket valide; refus propre si aucun passage sûr. | 24 / 8 / 30 | 280 |
| pbody_portal2 / adaptation documentée | Redirige un objet autorisé par une paire existante; ne crée pas de projectile énergétique offensif. | 26 / 8 / 30 | 280 |

Le délai de rappel proposé est de 360 ticks après sortie. Les dégâts subis sont portés à la vie de réserve. Une réserve KO ne peut intervenir. Les attaques sur boss respectent ses immunités, sa morphologie et son objectif ; aucune prise de duel humanoïde n’est appliquée au Strider ou au Dropship sans variante spécifique. Les portails des robots exigent la simulation de sockets du contrat Aperture avant d’être actifs [GE-S04].

## Trois supers, trois finishers, trois fins dramatiques

Une super n’ouvre sa chorégraphie qu’après confirmation de son premier contact. Paramètres initiaux : démarrage 24 ticks, phase active 4, récupération sur échec 42, garde moyenne, pas de dégât de garde, maximum 180 ticks de mise en scène et 1 800 dégâts avant règles de réduction. Les deux acteurs doivent être disponibles. Les conditions, textes et dégâts sont créés pour Resonance ; aucune de ces techniques ne reçoit un nom officiel de la franchise.

| Duo | Super | Finisher | Fin dramatique et conditions |
| --- | --- | --- | --- |
| GUIDE_TEAM_GORDON_ALYX | Couloir dégagé — Gordon engage un débris physique de kit; Alyx couvre sa trajectoire par deux tirs gardables. Le débris, et non un corps humain aspiré, prépare le contact. | Interception conjointe — Après victoire, Gordon détourne l’arme ou l’objet de la cible compatible, Alyx contrôle la sortie. Une cible géante reçoit une pose de victoire sans prise corporelle. | Sortie du relais — Dernière action : frappe physique du kit. La scène concerne la simulation fan et n’affirme pas une rencontre supplémentaire du jeu Valve. |
| GUIDE_TEAM_GINA_COLETTE | Double contrôle — Gina repousse un débris de laboratoire prédéfini; Colette couvre l’ouverture avec un tir de pistolet. Aucun appareil futur ou rayon personnel ajouté. | Confinement du banc — La conclusion neutralise l’équipement de simulation puis laisse les deux scientifiques reprendre leurs relevés; aucune exécution d’une alliée. | Mesures stabilisées — Chapitre fan terminé avec les deux personnages disponibles; action finale sur le relais fictif, pas une réécriture de la fin de Decay. |
| GUIDE_TEAM_ATLAS_PBODY | Trajet concerté — Un cube autorisé traverse au plus une paire de chaque robot puis produit un impact borné. Les rayons d’ouverture font zéro dégât; sortie libre obligatoire. | Test terminé — Le cube rejoint une zone de réception fictive, les robots se saluent. Aucune désintégration inventée d’une personne par un Portal Gun. | Compte rendu coopératif — Seulement dans le bonus Aperture conçu, après objectifs de coopération; conclusion originale de simulation, aucune suite canonique inventée. |

Les finishers et fins dramatiques arrivent après une victoire confirmée : zéro dégât supplémentaire influençant le vainqueur, coût nul, durée maximale proposée 150 ticks. Ordre stable : fin dramatique compatible, finisher d’équipe, conclusion individuelle, pose courte. Si un membre manque, est KO, porte une mauvaise version ou si le stage/la cible ne conviennent pas, la victoire courte s’applique. La caméra abrégée conduit au même état final que la scène complète.

Gordon/Alyx utilisent leurs outils HL2 ; Dog ne participe pas à ces techniques. Gina/Colette conservent les équipements de leur époque ; un appareil de laboratoire est un objet de simulation, pas un pouvoir projeté depuis leurs mains. ATLAS/P-body se servent de cubes et passages ; le rayon d’ouverture inflige zéro dégât. Leurs scènes restent au stade de conception et n’ont aucun asset livré dans ce lot.

## Clashes et QTE

| Profil | Éligibilité | Résolution |
| --- | --- | --- |
| Contact d’outils | Deux frappes physiques autorisées, actives et en contact; le simple même nom de personnage ne déclenche rien. | Annulation mécanique et recul symétrique, sans QTE. |
| Collision de cubes | Objets physiques compatibles uniquement; les rayons de placement de portail ne deviennent pas des faisceaux de duel. | Rebond déterministe borné; aucune boucle de traversées ni multiplication de dégâts. |
| Confrontation énergétique — non retenue en P0 | Aucune équivalence universelle entre Vortessence et AR2 affirmée; groupe cinématique non activé sans contrat de capacités documenté. | Résolution habituelle des projectiles de leurs kits; aucune scène automatique. |

Le clash physique éventuel utilise un contact réel et une fenêtre de simultanéité de deux ticks, avec 600 ticks de délai entre scènes. En histoire, le QTE proposé dure au plus 72 ticks, dont une fenêtre de réussite de 18 ticks. Égalité : séparation sans dégâts. Absence de réponse : recul borné, jamais annulation d’une victoire déjà acquise. Le versus compétitif emploie la résolution mécanique commune sans QTE. Les impacts tiers sont ordonnés de façon reproductible, indépendamment du côté affiché.

La confrontation énergétique Vortigaunt/AR2 est différée : une simple proximité visuelle entre effets ne démontre ni compatibilité physique ni lutte de rayons canonique. Tant qu’un contrat de capacités n’existe pas, les attaques suivent leurs règles ordinaires.

## Entités, objets et projectiles persistants

| Entité | Propriétaire / cible de catalogue | Contrat | Réserve / KO |
| --- | --- | --- | --- |
| Débris physique du kit | gordon_hl2 / gordon_hl2 | Objet prédéfini de simulation, un seul; lancer et rappel gardent propriétaire et historique de combo. | return_or_drop_no_new_damage / remove_after_committed_hits |
| Balise fictive de duel | alyx_hl2 / alyx_hl2 | Dispositif inventé déjà décrit par le roster; ne pirate pas la manette, les organiques ou tous les systèmes Cartel par défaut. | deactivate_and_expire / remove_after_committed_hits |
| Charge télécommandée HL1 | gordon_hl1 / proj_satchel_hl1 | Charge physique et télécommande sont distinctes; coût et portée 2D proposés sans certifier le modèle. | remain_armed_no_orders_in_reserve / remove_after_committed_hits |
| Cube et passages coop | atlas_portal2 / atlas_portal2, pbody_portal2, fx_portals_coop_portal2 | Un cube de kit, deux paires possédées séparément; une traversée par paire et par lancement, sortie bloquée = refus annoncé. | return_no_new_portal_orders / remove_after_committed_hits |

Chaque objet conserve propriétaire, âge, coordonnées, vitesse, état de collision, budget et historique de touche. Au tag, il ne devient pas automatiquement l’objet de l’entrant. Une réflexion autorisée réattribue dégâts, gains et conditions au nouveau propriétaire. Une transition retire sans dégâts les objets non transférables avant de charger la destination. Fin de manche : nettoyage explicite. Un rollback futur doit restaurer ces champs sans apparition ni dommage doublés.

Le budget initial prévoit un objet persistant par acteur, deux projectiles persistants par acteur et un partenaire temporaire par équipe. Les options graphiques peuvent réduire les particules, pas supprimer les signaux d’un projectile dangereux. Une source de code, telle la charge HL1 [GE-S06], atteste des comportements de l’objet source ; elle ne prouve pas ses pixels ni les chiffres choisis ici.

## Cinq stages bonus reliés au catalogue

| ID / lieu | Objectif et durée | Contexte / reprise / résultat |
| --- | --- | --- |
| GUIDE_BONUS_BME_CLEARANCE / STG_13_HL2_BME | Dégager six obstacles de simulation avec des objets du kit, sans toucher les deux zones de matériel fragile. 60 s maximum. | Exercice original au sein de la simulation Resonance, pas scène manquante officielle de Black Mesa East. Temps dépassé ou zone protégée touchée; reprise immédiate sans dépense de progression. Vie et ressources du chapitre restaurées; aucun bonus de puissance en versus. |
| GUIDE_BONUS_RAVENHOLM_ROUTE / STG_14_HL2_RAVENHOLM | Tenir une issue pendant trois vagues de six zombies standard; jamais plus de six présents. 90 s maximum. | Les faibles PV sont un réglage de bonus. Ils ne redéfinissent pas la résistance canonique des zombies ni l’état officiel de Ravenholm. Issue perdue ou KO; reprise au début de l’épreuve, aucun décès canon ajouté. Progression de la route conservée; les ennemis utilisent une endurance propre au bonus, annoncée. |
| GUIDE_BONUS_DECAY_INTERLOCK / STG_10_DECAY_GAMMA | Actionner deux consoles dans la fenêtre affichée, puis rejoindre ensemble la sortie de simulation. 90 s maximum. | Coopération Decay comme référence; consoles, temps et séquence créés pour Resonance. Le décor Gamma n’est pas reconstruit 1:1 par cette fiche. Une scientifique KO ou temps dépassé; reset des consoles, pas des récompenses déjà gagnées. Prêt scénarisé des deux profils pour éviter un cycle de déblocage; retour aux duels alternés du chapitre actuel. |
| GUIDE_BONUS_APERTURE_ROUTE / STG_EXT_PORTAL2_COOP_HUB | Acheminer un cube entre deux stations de test, avec un passage valide fourni par chaque robot; l’arme de portail ne blesse personne. 120 s maximum. | Épreuve conçue seulement : robots sans PNG validé et simulateur non livré. Cube perdu : un reset gratuit sans duplication; dépassement : recommencer la chambre de simulation. Prêt des deux profils durant l’épreuve; accès de collection séparé, aucune suite canonique de Portal 2. |
| GUIDE_BONUS_COAST_TARGETS / STG_12_HL2_CANALS | Atteindre quatre cibles mécaniques d’exercice en choisissant la récupération du poste RPG; aucune nouvelle rencontre boss déclarée. 60 s maximum. | Extension de tutoriel conçue; les interactions RPG du Boss Battle existant ne prouvent pas que cette épreuve est implémentée. Fin de session d’entraînement sans record ni dossier de terrain accordé. Retour à l’entraînement; aucun événement de victoire enregistrable. |

Ces activités sont des créations de simulation ou des adaptations, pas des épisodes officiels retrouvés. La horde Ravenholm plafonne à six ennemis ; sa faible endurance est annoncée comme règle de bonus. Les épreuves Decay et Aperture prêtent les profils nécessaires avant leur acquisition de collection, ce qui évite une boucle de prérequis. Le bonus de visée ne génère pas les dossiers de victoire : une session d’entraînement reste exclue des records et des récompenses de terrain.

## Terminal des traces : exploration conçue

Quatre espaces sont définis : accueil, dossiers de terrain, archives Black Mesa, archives Aperture. L’accueil relie les trois collections par des liens bidirectionnels gratuits. Ce graph décrit une navigation et non une géographie du lore. Le panneau de dossiers réellement implémenté à côté n’est pas compté comme hub jouable.

Une version exploratoire future doit disposer de seuils mesurés, portes ancrées aux murs, retour praticable et règles d’interaction avant production des décors. Les trois collections partagent un catalogue unique ; consulter une archive ne crée pas une copie de l’asset ni un second objet de récompense. L’acquisition est sauvegardée avant sa révélation et se répète sans double facture.

## Production et validation

Les [données JSON](../data/combat_extensions_20261127.json) fournissent les champs d’entrée/sortie, ressources, versions, propriétaires, références et critères. Les dix familles de fiches de l’extension sont couvertes ; 26 scénarios d’acceptation sont conçus et restent à exécuter pour les nouvelles fonctions. La validation du JSON n’est pas une partie de test.

Priorités : un cycle de sélection et un taunt, puis une assistance/tag, une entité, un super confirmé, une conclusion conditionnelle, un bonus et une zone de collection. L’expansion à tout le roster exige des fiches et assets propres à chaque version. Les autres personnages restent dans le backlog existant ; six profils détaillés ne sont pas déclarés couverture visuelle du roster entier.
