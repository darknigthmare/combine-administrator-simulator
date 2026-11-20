# Portal / Aperture — kits, épreuve et production

**Continuation du 20 novembre 2026 — conception détaillée, non implémentée et non testée en jeu.** Ce chapitre enrichit huit cibles déjà présentes dans le catalogue. Il ne crée ni personnage de catalogue supplémentaire, ni image, ni animation terminée. Son contrat machine est [aperture_combat_design_20261120.json](../data/aperture_combat_design_20261120.json).


## 1. Périmètre et statut des références

La campagne coopérative officielle de Portal 2 possède ses personnages, ses chambres et son récit propres [AP01]. Resonance conserve cette provenance tout en proposant ici un duel original. Les valeurs de vie, les frappes, les projections, les portails limités, les dialogues, les rivaux et les fins de parcours ci-dessous sont des créations de game design pour ce mode annexe. Elles ne sont pas présentées comme des capacités de combat ou des événements attestés dans les jeux Valve.

| Objet | Conception livrée | État réel |
|---|---|---|
| ATLAS, P-body, Chell | 3 kits, 69 actions détaillées | Conception; aucun ajout au sélecteur de combattants |
| Chell, tenue Portal 2 | 1 profil cosmétique distinct | Références et animations propres requises |
| Wheatley autonome | 1 PNJ/assist, 8 états | Conception; pas de combattant humanoïde |
| Rocket Turret de Portal | 1 épreuve, 3 phases | Conception; pas de boss géant destructible |
| Hub coop et ancien Aperture | 2 arènes, 12 couches prévues | Aucun assemblage à six plans validé ici |
| Parcours et vérification | 12 routes proposées, 12 scénarios | Aucune route certifiée combo ni scénario exécuté |

Les huit identifiants sont `atlas_portal2`, `pbody_portal2`, `chell_portal1`, `costume_chell_portal2`, `wheatley_core_portal2`, `rocket_turret_portal1`, `STG_EXT_PORTAL2_COOP_HUB` et `STG_EXT_PORTAL2_OLD_APERTURE`. Le registre graphique courant reste la source des générations réussies, refusées ou à corriger; ce chapitre ne recopie aucun total d’images en cours de production.

Les pages Valve Bot Trust, Boots et Meet Wheatley sont des références officielles identifiées [AP02–AP04]. Les détails de modèle sont à contrôler sur des captures correspondant à la version retenue. Les pages secondaires utilisées pour les couleurs, silhouettes et la Rocket Turret sont étiquetées comme telles [AP06–AP10]. Une page qui nomme le sujet ne valide pas à elle seule une pose ni une architecture.


### Conventions communes

- Simulation proposée à **60 Hz**, vie de référence 10 000; ATLAS 10 500, P-body 9 500, Chell 10 000. Ces écarts restent à équilibrer après collisions.
- `P/A/R` signifie préparation / activité / récupération en ticks. La préparation inclut le premier tick actif. Pour une frappe, durée totale = P + A + R − 1.
- Avantage au premier tick actif = stun − (A − 1 + R), hors hitfreeze partagé. Pour une attaque aérienne, l’atterrissage peut changer le résultat; la table ne garantit pas l’avantage obtenu en jeu.
- Commandes relatives au personnage tourné à droite. `L`, `M`, `H`, `S` suivent le contrat existant; chaîne normale L → M → H, chaque niveau une fois. `6H` est un overhead annoncé.
- Les normales aériennes sont overhead; `2H` reste une frappe mid anti-air non gardable dans les airs. Au sol, un mid se garde debout ou accroupi; un low accroupi; un overhead debout.
- EX = **50**, super = **100**, ultime = **300** Résonance. Coût débité à l’entrée validée, sans remboursement après interruption; pas de gain de Résonance provenant de ces actions.
- Budget aérien initial 12, un rebond de mur et un rebond au sol au maximum par combo. Les routes ci-dessous n’ajoutent aucun rebond gratuit. La limite de 600 ticks actifs sans contrôle du contrat général reste applicable.
- Les portées sont des cibles en unités logiques. Elles ne sont pas des hitboxes déjà écrites et ne déterminent pas la résolution en pixels des sprites.


## 2. Système de portails de duel

L’appareil à portails sert au placement de passages; le rayon de placement ne devient pas une balle ou un rayon de dégâts [AP05, AP07]. La traduction en combat ci-dessous est volontairement bornée : elle garde des signaux lisibles et évite les déplacements sans réponse possible.

| Propriétaire | Paire de couleur source | Identification complémentaire |
|---|---|---|
| Chell | Bleu / orange | A/B et motif du joueur |
| ATLAS | Cyan / indigo | A/B et motif du joueur |
| P-body | Jaune / rouge | A/B et motif du joueur |

Les couleurs ci-dessus viennent de la description des portails [AP07]. L’œil orange de P-body ne signifie donc pas que sa paire de portails doit être une copie bleu/orange de celle de Chell. Les motifs additionnels, noms d’ancrage et contours sont des choix d’accessibilité de Resonance.


### Placement

Chaque combattant dispose d’une paire et d’un cube de kit au maximum. `5S` parcourt quatre emplacements de simulation, dont le choix est visible pour les deux joueurs. `236L` place A et `214L` place B. Un ancrage dure au plus 300 ticks; l’ouverture demande 12 ticks. Replacer une couleur remplace uniquement son ancien ancrage à la validation de l’événement; il n’existe jamais un troisième portail temporaire.

Sur une arène logique de 2 560 unités et une ligne de sol à y = 880, les sockets muraux sont placés à x = 320 et 2 240, centre y = 710; les sockets de sol à x = 760 et 1 800. Ces panneaux sont un équipement du simulateur créé pour le duel, indépendant de l’architecture d’arrière-plan. Ils restent les mêmes en tournoi et ne réactivent pas les accessoires mécaniques du stage.


### Traversée et réponse adverse

`214M` exige une paire ouverte, un acteur libre et une entrée à moins de 120 unités. La sortie est annoncée pendant 18 ticks puis laisse 18 ticks de récupération vulnérable. Il n’existe aucune invulnérabilité universelle. Un seul transit est autorisé par combo, avec 90 ticks de délai de paire après usage. L’EX `214L+M` conserve les 18 ticks d’annonce et raccourcit seulement la récupération à 12 ticks : il ne permet pas une arrivée sans signal.

Une sortie obstruée cherche le segment libre le plus proche dans la direction de l’entrée; si aucun n’est valide, la traversée est refusée. L’opération ne superpose pas les acteurs et ne repousse pas gratuitement le défenseur. Une fermeture de paire pendant un transit déjà engagé résout la sortie prévalidée; elle ne laisse jamais le combattant hors scène. La paire se ferme au KO et au changement de round.


### Objets, dégâts et prévention des boucles

Seuls le cube du kit et la roquette de l’épreuve dédiée sont initialement déclarés compatibles. Chacun ne traverse qu’une fois; la norme de vitesse autorisée est conservée et aucun multiplicateur de dégâts n’est ajouté. Les balles, les rayons et les attaques de boss ne sont pas convertis automatiquement. Un adversaire libre n’est jamais aspiré ni forcé à traverser à distance. Les transferts de victime appartiennent seulement à une projection ou une cinématique déjà confirmée.

Un hit peut interrompre une pose ou une traversée encore en préparation; une garde ne supprime pas arbitrairement la paire. Une commande reconnue mais impossible indique sa cause — ressources, paire, portée, état ou sortie — et ne se transforme pas en projection. Les jeux Portal possèdent leur propre physique; la durée des portails, les sockets et ces restrictions sont des règles proposées pour Resonance, sans prétention d’identité mécanique complète.


## 3. ATLAS — fiche de combattant

**ID : `atlas_portal2` · Vie proposée : 10 500 · Rôle : Contrôle compact  cube et occupation de l’espace · Prise en main : intermédiaire.


### Identité et lecture du kit

- Corps compact arrondi, œil bleu et structure mécanique propre au modèle coop.
- Appareil et pinces cohérents avec la même version; pas de châssis P-body.
- Un robot entier par image; le second robot n’est pas un membre du sprite.

Sources de référence : AP01, AP02, AP07. Les gestes de frappe et valeurs ci-dessous sont des adaptations originales.

| Atouts proposés | Faiblesses à préserver |
|---|---|
| Normales courtes fiables. | Atteint difficilement les longues allonges. |
| Cube du kit facile à suivre. | Transit interrompable avant engagement. |
| Placement défensif lisible. | Le châssis compact ne réduit pas automatiquement les collisions pour passer sous les attaques. |


### Normales

| Commande | Mouvement | P/A/R | Dégâts | Garde | Avantage hit/bloc | Portée |
|---|---|---|---|---|---|---|
| 5L | Contact du manipulateur | 7/3/11 | 320 | mid | +4/-1 | 85 |
| 5M | Poussée du châssis | 11/3/16 | 620 | mid | +5/-1 | 135 |
| 5H | Balancier du bras | 17/4/23 | 980 | mid | +4/-6 | 175 |
| 2L | Coup bas du pied | 7/2/12 | 290 | low | +4/-1 | 90 |
| 2M | Balayage compact | 12/3/18 | 590 | low | +5/-2 | 145 |
| 2H | Vérin ascendant | 15/5/26 | 900 | mid | +2/-10 | 130 |
| j.L | Tapotement aérien | 7/4/13 | 310 | overhead | +2/-2 | 80 |
| j.M | Bras déployé | 10/5/17 | 600 | overhead | +3/-4 | 135 |
| j.H | Châssis en arc | 14/6/23 | 930 | overhead | +2/-7 | 160 |
| 6H | Saut court du châssis | 25/3/26 | 1050 | overhead | +3/-8 | 145 |

`2H` lance la cible; les attaques `j.` ont une récupération d’atterrissage cible de 10 ticks. Les avantages affichés sont des calculs statiques au contact initial, pas des mesures de jeu. Les hurtboxes restent présentes sur les membres déployés. `6H` ne s’annule pas en pression de garde. Les annulations normales vers un spécial sont autorisées sur hit pour 5M, 5H, 2M et 2H; les supers sur hit de 5H ou 2H. Aucun whiff cancel n’est prévu.


### Trait, projections et spéciaux

**5S — Choix du point d’ancrage.** Action utilitaire de 12 ticks, sans dégâts; elle prévisualise le socket suivant. Son annulation vers la pose de portail n’arrive qu’après ces 12 ticks.

**L+M / 4+L+M — Dégagement.** Préparation 6 ticks, activité 2, fenêtre de déchoppe 7; 28 ticks de récupération à vide. La capture confirmée dure 36 ticks puis libère avec 16 ticks de récupération et un renversement de 40 ticks. Portée cible 80; dégâts 1100. La projection n’attrape pas à travers un portail et ne déclenche ni rebond de mur ni rebond de sol.

| Commande | Action | Préparation / récupération | Dégâts | Fonction | Réponse |
|---|---|---|---|---|---|
| 236L | Pose du portail A | 20 / 18 | 0 | Place l’ancrage A au socket prévisualisé; ouverture en 12 ticks; ne blesse pas. | Interrompre la préparation ou occuper la sortie. |
| 214L | Pose du portail B | 22 / 18 | 0 | Place l’ancrage B; la paire ne fonctionne que lorsque les deux bords sont ouverts. | Avancer pendant la récupération et limiter le temps de préparation. |
| 214M | Traversée préparée | 18 / 18 | 0 | Entre dans la paire existante, un transit par combo; sortie signalée et vulnérable. | Couvrir la sortie annoncée; ne pas poursuivre aveuglément à l’entrée. |
| 236H | Lancer du cube de test | 24 / 26 | 850 | Lance l’unique cube du kit; projectile à durée bornée, une seule traversée de portail. Ce cube fourni au duel est une adaptation. | Sauter sa trajectoire, le faire entrer en collision ou punir le lancer à courte distance. |
| 623H | Extension des vérins | 12 / 32 | 1100 | Frappe anti-air du corps; aucune invulnérabilité aux coups au sol. | Rester au sol puis punir la récupération. |

Le cube est un projectile visible de durée maximale 90 ticks, vitesse proposée 12 unités par tick et durabilité de collision 1. Il touche une fois et reste l’unique cube actif. Son avantage dépend de la distance de collision. L’anti-air a 5 ticks actifs, coûte 4 points de budget aérien et ne protège pas des frappes au sol. Le cube fourni au kit est une convention du duel; il ne prétend pas constituer un inventaire permanent du personnage source.


### Variantes EX et cinématiques de combat

| Commande | Coût | Variante | Détail |
|---|---|---|---|
| 236L+M | 50 | Pose A EX | Préparation 14 ticks, récupération 14; l’ouverture reste 12. Ne pose qu’un portail. |
| 214L+M | 50 | Traversée EX | Même préparation et signal de sortie de 18 ticks; récupération réduite à 12. Toujours vulnérable; paire préexistante obligatoire. |
| 623L+M | 50 | Anti-air EX | Même démarrage que l’anti-air, 1300 dégâts, récupération 36; couverture verticale accrue, aucune invulnérabilité universelle. |

Une variante EX par motion 236/214/623. 236L+M signifie Pose A EX, jamais le lancer de cube. 214L+M signifie Traversée EX, jamais Pose B EX. Une commande reconnue mais impossible ne devient pas une projection.

| Commande | Nom | Coût | Démarrage | Dégâts de base | Capture | Récupération sur garde/à vide |
|---|---|---|---|---|---|---|
| 236236H | Transfert contrôlé | 100 | 12 | 2400 | 120 | 38 |
| 236236S | Protocole de sortie | 300 | 18 | 4300 | 240 | 48 |

Une courte frappe corporelle mid doit confirmer le contact avant toute capture cinématique. Le super et l’ultime ont 3 ticks de contact, aucune invulnérabilité universelle et une sortie punissable si le départ manque ou est gardé. Les dégâts de base sont appliqués comme un impact logique unique après la mise en scène; les planchers de scaling restent 15 % et 20 %. Le trajet par portails et l’impact de cube sont une chorégraphie originale, jamais une attaque canonique ajoutée silencieusement.


### Routes à éprouver en entraînement

| Séquence | Coût | But et préconditions | État |
|---|---|---|---|
| 5L → 5M → 5H | 0 | Conversion simple au sol. Contact proche; L→M→H une fois chacun. | Dégâts théoriques 1662 si tous les contacts passent; À vérifier en collision |
| 2L → 2M → 2H → 623H | 0 | Conversion basse vers anti-air. Vérifier portée après lancement; coût aérien 4, une seule reprise de niveau H. | À vérifier en collision |
| 5M → 5H → 236236H | 100 | Confirmation du super. Annulation sur hit seulement; aucun super automatique en garde. | À vérifier en collision |
| 236L → 214L → 214M | 0 | Préparation de position, sans dégâts. Paire ouverte et entrée proche; cette séquence utilitaire ne constitue pas un combo. | À vérifier en collision |

La route de placement ne provoque pas de hitstun et n’est pas un combo. Les trois autres routes dépendent encore de la portée, du pushback, des fenêtres d’annulation, du budget aérien et de l’état réel de la cible; leur écriture ne garantit pas une chaîne sans échappatoire.


### Intro, rival, victoire et ending

**Intro —** ATLAS sort d’un appareil d’assemblage arrêté, vérifie ses deux pinces puis pointe la sortie du doigt. Un bip bref accompagne la sélection; aucun second robot n’est dessiné dans sa frame.

**Rivalité —** Le simulateur attribue le même dernier emplacement à deux partenaires. Le duel teste un protocole de coopération mal transcrit, sans affirmer une hostilité canonique.

**Scène de rival —** Les deux robots désignent tour à tour le même bouton; ATLAS pose un cube entre eux. Ils reculent sur leurs repères lorsque le signal de simulation retentit.

**Victoire sur le rival —** ATLAS avance la main puis attend que P-body se relève; le geste coopératif complet n’est lancé que si les deux acteurs sont disponibles.

**Ending —** ATLAS place le cube sur le bon capteur et maintient la porte ouverte. P-body passe, puis revient tenir le mécanisme. Les deux voyants indiquent enfin le même objectif.

**Finition après résultat —** Après victoire, transfère le perdant vers un sas de récupération vide. Pour une machine compatible, fermeture des bras de maintenance hors champ; pour un humain, désarmement et porte ouverte. Aucun score modifié.

Le rival désigné est `pbody_portal2`. Le parcours conserve le format de la bible : six combats ordinaires, un rival, un boss. La Rocket Turret peut occuper une épreuve intermédiaire de scénario; elle ne remplace pas automatiquement le boss final de tous les parcours. Le finisher n’est proposé qu’après la victoire de la partie, dans la fenêtre générale de 300 ticks; absence d’entrée ou victime incompatible mène à une courte pose de victoire.


## 4. P-body — fiche de combattant

**ID : `pbody_portal2` · Vie proposée : 9 500 · Rôle : Allonge et déplacements préparés · Prise en main : avancée.


### Identité et lecture du kit

- Silhouette verticale élancée et œil orange.
- Membres longs et minces; ne pas élargir le corps pour égaliser ATLAS.
- L’appareil, les articulations et les pieds viennent du modèle coop retenu.

Sources de référence : AP01, AP02, AP07, AP10. Les gestes de frappe et valeurs ci-dessous sont des adaptations originales.

| Atouts proposés | Faiblesses à préserver |
|---|---|
| Bonne allonge au sol et dans les airs. | Récupérations lourdes. |
| Menace de placement à distance. | Faible vie de référence. |
| Conversion de cube après lecture de saut. | Longs membres avec hurtboxes actives, pas de frappe à longue portée désincarnée. |


### Normales

| Commande | Mouvement | P/A/R | Dégâts | Garde | Avantage hit/bloc | Portée |
|---|---|---|---|---|---|---|
| 5L | Pointe du manipulateur | 8/3/12 | 330 | mid | +4/-2 | 105 |
| 5M | Allonge du bras | 12/3/18 | 660 | mid | +5/-3 | 170 |
| 5H | Fauchage du membre | 19/4/27 | 1080 | mid | +3/-9 | 225 |
| 2L | Contact du pied avant | 8/2/13 | 300 | low | +4/-2 | 100 |
| 2M | Balayage de jambe | 14/4/21 | 680 | low | +4/-5 | 200 |
| 2H | Déploiement vertical | 17/5/28 | 980 | mid | +2/-10 | 170 |
| j.L | Manipulateur descendant | 8/4/14 | 330 | overhead | +2/-3 | 100 |
| j.M | Jambe en diagonale | 12/5/20 | 660 | overhead | +3/-6 | 190 |
| j.H | Grand arc descendant | 17/6/26 | 1020 | overhead | +3/-9 | 215 |
| 6H | Pas enjambé | 28/4/29 | 1120 | overhead | +2/-11 | 180 |

`2H` lance la cible; les attaques `j.` ont une récupération d’atterrissage cible de 10 ticks. Les avantages affichés sont des calculs statiques au contact initial, pas des mesures de jeu. Les hurtboxes restent présentes sur les membres déployés. `6H` ne s’annule pas en pression de garde. Les annulations normales vers un spécial sont autorisées sur hit pour 5M, 5H, 2M et 2H; les supers sur hit de 5H ou 2H. Aucun whiff cancel n’est prévu.


### Trait, projections et spéciaux

**5S — Choix du point d’ancrage.** Action utilitaire de 12 ticks, sans dégâts; elle prévisualise le socket suivant. Son annulation vers la pose de portail n’arrive qu’après ces 12 ticks.

**L+M / 4+L+M — Dégagement.** Préparation 6 ticks, activité 2, fenêtre de déchoppe 7; 28 ticks de récupération à vide. La capture confirmée dure 36 ticks puis libère avec 16 ticks de récupération et un renversement de 40 ticks. Portée cible 80; dégâts 1150. La projection n’attrape pas à travers un portail et ne déclenche ni rebond de mur ni rebond de sol.

| Commande | Action | Préparation / récupération | Dégâts | Fonction | Réponse |
|---|---|---|---|---|---|
| 236L | Pose du portail A | 20 / 18 | 0 | Place l’ancrage A au socket prévisualisé; ouverture en 12 ticks; ne blesse pas. | Interrompre la préparation ou occuper la sortie. |
| 214L | Pose du portail B | 22 / 18 | 0 | Place l’ancrage B; la paire ne fonctionne que lorsque les deux bords sont ouverts. | Avancer pendant la récupération et limiter le temps de préparation. |
| 214M | Traversée préparée | 18 / 18 | 0 | Entre dans la paire existante, un transit par combo; sortie signalée et vulnérable. | Couvrir la sortie annoncée; ne pas poursuivre aveuglément à l’entrée. |
| 236H | Lancer du cube de test | 28 / 30 | 900 | Lance l’unique cube du kit; projectile à durée bornée, une seule traversée de portail. Ce cube fourni au duel est une adaptation. | Sauter sa trajectoire, le faire entrer en collision ou punir le lancer à courte distance. |
| 623H | Arc de la jambe | 15 / 35 | 1150 | Frappe anti-air du corps; aucune invulnérabilité aux coups au sol. | Rester au sol puis punir la récupération. |

Le cube est un projectile visible de durée maximale 90 ticks, vitesse proposée 12 unités par tick et durabilité de collision 1. Il touche une fois et reste l’unique cube actif. Son avantage dépend de la distance de collision. L’anti-air a 5 ticks actifs, coûte 4 points de budget aérien et ne protège pas des frappes au sol. Le cube fourni au kit est une convention du duel; il ne prétend pas constituer un inventaire permanent du personnage source.


### Variantes EX et cinématiques de combat

| Commande | Coût | Variante | Détail |
|---|---|---|---|
| 236L+M | 50 | Pose A EX | Préparation 14 ticks, récupération 14; l’ouverture reste 12. Ne pose qu’un portail. |
| 214L+M | 50 | Traversée EX | Même préparation et signal de sortie de 18 ticks; récupération réduite à 12. Toujours vulnérable; paire préexistante obligatoire. |
| 623L+M | 50 | Anti-air EX | Même démarrage que l’anti-air, 1300 dégâts, récupération 36; couverture verticale accrue, aucune invulnérabilité universelle. |

Une variante EX par motion 236/214/623. 236L+M signifie Pose A EX, jamais le lancer de cube. 214L+M signifie Traversée EX, jamais Pose B EX. Une commande reconnue mais impossible ne devient pas une projection.

| Commande | Nom | Coût | Démarrage | Dégâts de base | Capture | Récupération sur garde/à vide |
|---|---|---|---|---|---|---|
| 236236H | Transfert contrôlé | 100 | 12 | 2400 | 120 | 38 |
| 236236S | Protocole de sortie | 300 | 18 | 4300 | 240 | 48 |

Une courte frappe corporelle mid doit confirmer le contact avant toute capture cinématique. Le super et l’ultime ont 3 ticks de contact, aucune invulnérabilité universelle et une sortie punissable si le départ manque ou est gardé. Les dégâts de base sont appliqués comme un impact logique unique après la mise en scène; les planchers de scaling restent 15 % et 20 %. Le trajet par portails et l’impact de cube sont une chorégraphie originale, jamais une attaque canonique ajoutée silencieusement.


### Routes à éprouver en entraînement

| Séquence | Coût | But et préconditions | État |
|---|---|---|---|
| 5L → 5M → 5H | 0 | Conversion simple au sol. Contact proche; L→M→H une fois chacun. | Dégâts théoriques 1788 si tous les contacts passent; À vérifier en collision |
| 2L → 2M → 2H → 623H | 0 | Conversion basse vers anti-air. Vérifier portée après lancement; coût aérien 4, une seule reprise de niveau H. | À vérifier en collision |
| 5M → 5H → 236236H | 100 | Confirmation du super. Annulation sur hit seulement; aucun super automatique en garde. | À vérifier en collision |
| 236L → 214L → 214M | 0 | Préparation de position, sans dégâts. Paire ouverte et entrée proche; cette séquence utilitaire ne constitue pas un combo. | À vérifier en collision |

La route de placement ne provoque pas de hitstun et n’est pas un combo. Les trois autres routes dépendent encore de la portée, du pushback, des fenêtres d’annulation, du budget aérien et de l’état réel de la cible; leur écriture ne garantit pas une chaîne sans échappatoire.


### Intro, rival, victoire et ending

**Intro —** P-body se déplie de toute sa hauteur, observe la caméra puis pose un pied exactement sur le repère au sol. Le bras ajuste l’appareil sans le faire flotter.

**Rivalité —** Même erreur de protocole vue depuis l’autre robot; la rivalité reste une scène du mode annexe.

**Scène de rival —** P-body indique un passage trop haut pour ATLAS. Le panneau descend soudain jusqu’au sol et affiche les deux repères de duel; P-body incline la tête puis se prépare.

**Victoire sur le rival —** P-body propose une tape dans la main à hauteur d’ATLAS. Si le partenaire est absent ou incompatible, le geste devient un salut vers la caméra.

**Ending —** Au lieu de prendre la sortie seul, P-body redirige le cube vers le mécanisme d’ATLAS. Les robots utilisent ensuite un passage différent chacun et se retrouvent de l’autre côté.

**Finition après résultat —** Une pince du décor place le vaincu dans une nacelle ouverte à distance sûre. La variante machine peut montrer des étincelles, jamais une modification du résultat.

Le rival désigné est `atlas_portal2`. Le parcours conserve le format de la bible : six combats ordinaires, un rival, un boss. La Rocket Turret peut occuper une épreuve intermédiaire de scénario; elle ne remplace pas automatiquement le boss final de tous les parcours. Le finisher n’est proposé qu’après la victoire de la partie, dans la fenêtre générale de 300 ticks; absence d’entrée ou victime incompatible mène à une courte pose de victoire.


## 5. Chell — fiche de combattant

**ID : `chell_portal1` · Vie proposée : 10 000 · Rôle : Mobilité méthodique et punition proche · Prise en main : intermédiaire.


### Identité et lecture du kit

- Base: combinaison et protections de jambe de Portal, appareil de cette version.
- Le costume Portal 2 dispose de ses propres références et images.
- Silhouette humaine et gestuelle silencieuse; aucune force surhumaine ajoutée comme fait canon.

Sources de référence : AP03, AP05, AP07, AP08. Les gestes de frappe et valeurs ci-dessous sont des adaptations originales.

| Atouts proposés | Faiblesses à préserver |
|---|---|
| Meilleur démarrage léger de ces trois propositions. | Portée de frappe modeste. |
| Punition de récupération proche. | Installation de portails vulnérable. |
| Changements de position annoncés. | Pas de projectile direct blessant tiré par le Portal Gun. |


### Normales

| Commande | Mouvement | P/A/R | Dégâts | Garde | Avantage hit/bloc | Portée |
|---|---|---|---|---|---|---|
| 5L | Dégagement du coude | 6/3/10 | 300 | mid | +4/+0 | 80 |
| 5M | Paume de dégagement | 10/3/15 | 560 | mid | +5/-1 | 125 |
| 5H | Revers avec appui | 16/4/22 | 900 | mid | +4/-6 | 165 |
| 2L | Coup de pied bas | 6/2/11 | 270 | low | +4/-1 | 85 |
| 2M | Balayage glissé | 11/3/17 | 560 | low | +5/-2 | 145 |
| 2H | Genou ascendant | 14/4/25 | 850 | mid | +2/-9 | 120 |
| j.L | Coude aérien | 6/3/12 | 290 | overhead | +3/-2 | 75 |
| j.M | Coup de pied en travers | 9/4/16 | 550 | overhead | +4/-3 | 130 |
| j.H | Talon descendant | 13/5/22 | 870 | overhead | +3/-6 | 155 |
| 6H | Pas sauté | 24/3/25 | 970 | overhead | +3/-8 | 140 |

`2H` lance la cible; les attaques `j.` ont une récupération d’atterrissage cible de 10 ticks. Les avantages affichés sont des calculs statiques au contact initial, pas des mesures de jeu. Les hurtboxes restent présentes sur les membres déployés. `6H` ne s’annule pas en pression de garde. Les annulations normales vers un spécial sont autorisées sur hit pour 5M, 5H, 2M et 2H; les supers sur hit de 5H ou 2H. Aucun whiff cancel n’est prévu.


### Trait, projections et spéciaux

**5S — Choix du point d’ancrage.** Action utilitaire de 12 ticks, sans dégâts; elle prévisualise le socket suivant. Son annulation vers la pose de portail n’arrive qu’après ces 12 ticks.

**L+M / 4+L+M — Dégagement.** Préparation 6 ticks, activité 2, fenêtre de déchoppe 7; 28 ticks de récupération à vide. La capture confirmée dure 36 ticks puis libère avec 16 ticks de récupération et un renversement de 40 ticks. Portée cible 80; dégâts 1100. La projection n’attrape pas à travers un portail et ne déclenche ni rebond de mur ni rebond de sol.

| Commande | Action | Préparation / récupération | Dégâts | Fonction | Réponse |
|---|---|---|---|---|---|
| 236L | Pose du portail A | 20 / 18 | 0 | Place l’ancrage A au socket prévisualisé; ouverture en 12 ticks; ne blesse pas. | Interrompre la préparation ou occuper la sortie. |
| 214L | Pose du portail B | 22 / 18 | 0 | Place l’ancrage B; la paire ne fonctionne que lorsque les deux bords sont ouverts. | Avancer pendant la récupération et limiter le temps de préparation. |
| 214M | Traversée préparée | 18 / 18 | 0 | Entre dans la paire existante, un transit par combo; sortie signalée et vulnérable. | Couvrir la sortie annoncée; ne pas poursuivre aveuglément à l’entrée. |
| 236H | Lancer du cube de test | 24 / 26 | 800 | Lance l’unique cube du kit; projectile à durée bornée, une seule traversée de portail. Ce cube fourni au duel est une adaptation. | Sauter sa trajectoire, le faire entrer en collision ou punir le lancer à courte distance. |
| 623H | Dégagement vertical | 12 / 32 | 1000 | Frappe anti-air du corps; aucune invulnérabilité aux coups au sol. | Rester au sol puis punir la récupération. |

Le cube est un projectile visible de durée maximale 90 ticks, vitesse proposée 12 unités par tick et durabilité de collision 1. Il touche une fois et reste l’unique cube actif. Son avantage dépend de la distance de collision. L’anti-air a 5 ticks actifs, coûte 4 points de budget aérien et ne protège pas des frappes au sol. Le cube fourni au kit est une convention du duel; il ne prétend pas constituer un inventaire permanent du personnage source.


### Variantes EX et cinématiques de combat

| Commande | Coût | Variante | Détail |
|---|---|---|---|
| 236L+M | 50 | Pose A EX | Préparation 14 ticks, récupération 14; l’ouverture reste 12. Ne pose qu’un portail. |
| 214L+M | 50 | Traversée EX | Même préparation et signal de sortie de 18 ticks; récupération réduite à 12. Toujours vulnérable; paire préexistante obligatoire. |
| 623L+M | 50 | Anti-air EX | Même démarrage que l’anti-air, 1300 dégâts, récupération 36; couverture verticale accrue, aucune invulnérabilité universelle. |

Une variante EX par motion 236/214/623. 236L+M signifie Pose A EX, jamais le lancer de cube. 214L+M signifie Traversée EX, jamais Pose B EX. Une commande reconnue mais impossible ne devient pas une projection.

| Commande | Nom | Coût | Démarrage | Dégâts de base | Capture | Récupération sur garde/à vide |
|---|---|---|---|---|---|---|
| 236236H | Transfert contrôlé | 100 | 12 | 2400 | 120 | 38 |
| 236236S | Protocole de sortie | 300 | 18 | 4300 | 240 | 48 |

Une courte frappe corporelle mid doit confirmer le contact avant toute capture cinématique. Le super et l’ultime ont 3 ticks de contact, aucune invulnérabilité universelle et une sortie punissable si le départ manque ou est gardé. Les dégâts de base sont appliqués comme un impact logique unique après la mise en scène; les planchers de scaling restent 15 % et 20 %. Le trajet par portails et l’impact de cube sont une chorégraphie originale, jamais une attaque canonique ajoutée silencieusement.


### Routes à éprouver en entraînement

| Séquence | Coût | But et préconditions | État |
|---|---|---|---|
| 5L → 5M → 5H | 0 | Conversion simple au sol. Contact proche; L→M→H une fois chacun. | Dégâts théoriques 1524 si tous les contacts passent; À vérifier en collision |
| 2L → 2M → 2H → 623H | 0 | Conversion basse vers anti-air. Vérifier portée après lancement; coût aérien 4, une seule reprise de niveau H. | À vérifier en collision |
| 5M → 5H → 236236H | 100 | Confirmation du super. Annulation sur hit seulement; aucun super automatique en garde. | À vérifier en collision |
| 236L → 214L → 214M | 0 | Préparation de position, sans dégâts. Paire ouverte et entrée proche; cette séquence utilitaire ne constitue pas un combo. | À vérifier en collision |

La route de placement ne provoque pas de hitstun et n’est pas un combo. Les trois autres routes dépendent encore de la portée, du pushback, des fenêtres d’annulation, du budget aérien et de l’état réel de la cible; leur écriture ne garantit pas une chaîne sans échappatoire.


### Intro, rival, victoire et ending

**Intro —** Chell observe les panneaux, vérifie l’appareil puis avance sur le repère sans parler. La tenue sélectionnée conserve son jeu source durant toute la scène.

**Rivalité —** Deux sorties de simulation partagent une alimentation. Le conflit est écrit pour Resonance et ne prétend pas raconter une rencontre officielle.

**Scène de rival —** Gordon présente un débris à un capteur; Chell désigne l’autre face du panneau. Le protocole les sépare avant qu’ils puissent l’essayer ensemble. Aucun dialogue imposé.

**Victoire sur le rival —** Chell abaisse l’appareil et montre à Gordon le chemin encore praticable. Le geste remplace une réplique de victoire.

**Ending —** Chell ferme le circuit du simulateur, récupère l’appareil et franchit une porte de service. La caméra reste sur le panneau éteint; le récit ne fixe ni famille ni date future.

**Finition après résultat —** Redirige le vaincu vers une salle de confinement sûre après confirmation de victoire. La version à violence réduite garde la porte ouverte et se termine par une posture de garde; Chell reste silencieuse.

Le rival désigné est `gordon_hl2`. Le parcours conserve le format de la bible : six combats ordinaires, un rival, un boss. La Rocket Turret peut occuper une épreuve intermédiaire de scénario; elle ne remplace pas automatiquement le boss final de tous les parcours. Le finisher n’est proposé qu’après la victoire de la partie, dans la fenêtre générale de 300 ticks; absence d’entrée ou victime incompatible mène à une courte pose de victoire.


## 6. Chell — costume Portal 2

**Cible : `costume_chell_portal2` ; propriétaire : `chell_portal1`.** Ce profil change l’apparence, pas les règles du kit. La référence Portal 2 combine débardeur, combinaison à la taille et Long Fall Boots [AP03, AP08]. La base Portal conserve ses protections de jambe de cette version; un sprite hybride ne valide aucune des deux apparences.

- Débardeur et combinaison attachée à la taille de la référence retail Portal 2.
- Long Fall Boots et dispositif appartenant à cette version.
- Visage, cheveux, attaches et latéralité relevés sur captures cohérentes; aucun recoloriage de la base Portal 1 déclaré suffisant.

Créer un dossier d’animations propre pour cette tenue. Il doit couvrir les mêmes actions, transitions et orientations que la base, mais les vêtements, les bottes, les cheveux et la prise de l’appareil demandent leurs propres dessins et contrôles. Les collisions, dégâts, coûts et temps restent normalisés. La protection contre les chutes dans le jeu source ne devient pas une invulnérabilité des pieds en duel. Le miroir automatique d’une image ne suffit pas à certifier les détails asymétriques.


## 7. Wheatley — noyau narratif et assistance

**Cible : `wheatley_core_portal2`.** Le noyau autonome reste séparé du Wheatley installé dans le corps central, déjà traité comme une autre cible [AP04, AP09]. Il n’occupe pas une case de combattant et ne reçoit ni squelette humain, ni frappes de poing, ni bouche dessinée.

- Noyau sphérique autonome à œil bleu, coques et poignées propres à Wheatley.
- Vérifier les asymétries de façade sur la référence exacte; ne pas obtenir la seconde orientation par miroir validé d’office.
- Séparer le rail ou le support en prop; aucun corps humanoïde, bras de combattant ou corps central de boss ajouté.

| État | Production attendue |
|---|---|
| rail_idle | Présence sur rail, regard vers le joueur. |
| scan | Mouvement d’iris, sans rotation incohérente de la coque. |
| speak | Paupières mécaniques, iris et petites rotations; aucune bouche dessinée. |
| detach | Transition du rail vers l’objet porté, support rendu séparément. |
| carried | Pivot et poignées suivent la prise du porteur. |
| hint | Regard vers le socket utile sans flèche produite dans le bitmap. |
| startled | Rétraction légère de l’iris; pas de téléportation de la coque. |
| socketed | Noyau fixé dans une console de scène sans devenir le boss central. |

Dans une scène compatible, `6S` près de sa console demande une aide. Portée cible 140 unités, activation 30 ticks, deux usages maximum par rencontre et délai de 900 ticks. L’indice pointe un socket pendant 180 ticks, sans poser le portail, déplacer l’ennemi, infliger de dégâts ni masquer un danger. Un hit avant validation annule l’activation sans consommer l’indice. Cette assistance est désactivée en tournoi.

Exemples de textes **originaux proposés pour Resonance**, sans piste audio générée :

- Ce panneau. Enfin, celui qui tient encore au mur.
- J’avais prévu cette ouverture. À peu près à cette hauteur.
- Tu peux garder l’appareil en main pendant que je réfléchis ?

L’animation de parole utilise iris, paupières mécaniques et petites rotations de la sphère. L’état porté emploie un pivot cohérent avec les mains du porteur; le rail, la fixation et la console sont des assets distincts. Une pose du noyau ne produit pas les huit états ci-dessus.


## 8. Rocket Turret — épreuve d’évasion en trois phases

**Cible : `rocket_turret_portal1` ; référence : Portal.** La documentation consultée décrit une tourelle fixe dont les roquettes peuvent être redirigées vers des cibles du décor; un retour sur la tourelle est neutralisé [AP06]. Le contrat conserve ce comportement. L’épreuve ne comporte aucune barre de PV de tourelle et aucune victoire par sa propre destruction. GLaDOS reste une rencontre distincte.

Le joueur doit résoudre trois verrous environnementaux par trois redirections, puis activer et franchir le sas. Vie de référence proposée 10 000, temps actif 9 000 ticks (150 secondes). La géométrie, les trois phases et leurs compteurs sont une création Resonance à vérifier, pas la reproduction annoncée d’une salle précise du jeu.


### Accès pour tous les profils autorisés

Un combattant équipé d’un appareil à portails emploie sa paire sur les sockets de la rencontre. Les autres utilisent une console environnementale à deux ancrages prédéfinis : `6S` à moins de 150 unités, 24 ticks d’activation. Un hit avant la fin annule la commande. Le personnage conserve son équipement et ne reçoit pas artificiellement un Portal Gun. La rencontre ne peut être activée dans une rotation tant que chacun des profils proposés ne peut pas en résoudre les trois phases.


### Cycle de tir proposé

| État | Durée standard | Réponse attendue |
|---|---|---|
| Acquisition | 90 ticks | Préparer le trajet et attirer la ligne de visée |
| Verrouillage | 24 ticks | La position visée se fige; quitter la trajectoire |
| Départ | 1 événement | Roquette visible, un seul projectile actif |
| Récupération | 90 ticks | Déplacer les ancrages ou activer la console |

Une roquette dure au plus 180 ticks, ne traverse qu’un portail et ne cause qu’une application de dégâts. Dégâts proposés 1 800, garde inopérante; la réponse est le mouvement ou la redirection. Après un impact, 60 ticks empêchent une cascade d’autres dégâts du même cycle. Ligne, forme du réticule et signal sonore annoncent le tir. L’assistance porte l’acquisition à 120 ticks et le verrouillage à 36; l’expert réduit seulement l’acquisition à 72, conserve les 24 ticks de signal et retire les indices. Les solutions et l’indestructibilité de la tourelle restent identiques.


### Comprendre la redirection

**Cible —** Vitrage de service marqué au fond de la voie.

**Boucle —** Placer la sortie face au vitrage, attirer la visée vers l’entrée, quitter la trajectoire après verrouillage.

**Réponse et reprise —** Sortir de la ligne fixée; la roquette conserve une trajectoire lisible. Vitrage intact: nouveau cycle après dissipation; aucun état irréversible.

**Validation —** Vitrage brisé et relais A visible. Ouvrir le passage vers la console latérale; courte pause de tir de 120 ticks.


### Lire le volet

**Cible —** Verrou B derrière un volet au cycle annoncé.

**Boucle —** Une interaction de console ouvre le volet 180 ticks; le joueur doit préparer le trajet avant de déclencher la fenêtre.

**Réponse et reprise —** Ne pas rester près de la console après l’activation. Le volet se referme puis redevient activable après 120 ticks; une roquette échouée ne détruit aucun outil nécessaire.

**Validation —** Verrou B désengagé. Rendre accessible le socket final; pause de tir de 120 ticks.


### Ouvrir puis sortir

**Cible —** Verrou C du sas de sortie, à l’écart de la tourelle.

**Boucle —** Placer la dernière paire, obtenir une redirection, puis activer 6S au sas pendant 24 ticks et traverser la zone de sortie.

**Réponse et reprise —** La tourelle continue ses cycles tant que le sas n’est pas franchi; la sortie reste ouverte une fois le verrou détruit. Aucune fermeture punitive du sas; le joueur peut attendre le cycle suivant avant de traverser.

**Validation —** Acteur dans la zone de sortie avec trois verrous résolus. Figer le résultat, couper les nouvelles collisions de danger et jouer une sortie courte.

Les résultats sont `escaped`, `defeated`, `time_expired` ou `abandoned`. La sortie ouverte ne se referme pas pour punir un délai de déplacement. Une réussite fige d’abord le score et désactive les nouvelles collisions de danger avant la cinématique. Le classement peut utiliser temps actif, dégâts reçus et tirs nécessaires; il n’accorde aucun bonus permanent de dégâts. La production de tourelle prévoit repos, déploiement, acquisition, verrouillage, tir, recul, récupération et retour au repos. Aucune animation de mort de tourelle n’est requise pour cette épreuve.


## 9. Arène — Hub de la coopération

**Cible : `STG_EXT_PORTAL2_COOP_HUB`.** Hub officiel de Portal 2 coop; état précis du hub, passages déverrouillés et cadrage à capturer.

La page officielle confirme le contexte des laboratoires et de la coopération [AP01, AP05]; elle ne certifie pas la géométrie ci-dessous. Avant acceptation visuelle, rattacher des captures au lieu et à son état exacts. La bande de duel horizontale est une adaptation de composition explicitement déclarée.

| Couche | Parallaxe | Contenu prévu | Fichier |
|---|---|---|---|
| L00_ambience | 0 | Volume sombre et atmosphère industrielle de l’arrière-plan. | PNG distinct; opaque |
| L01_far | 0.12 | Structures éloignées et passerelles du hub de référence. | PNG distinct avec alpha |
| L02_mid | 0.3 | Accès aux parcours selon l’état du hub choisi. | PNG distinct avec alpha |
| L03_near | 0.55 | Consoles et cadres des zones d’assemblage derrière les combattants. | PNG distinct avec alpha |
| L04_ground | 1 | Voie horizontale continue adaptée au duel; repère sol stable. | PNG distinct avec alpha |
| L05_foreground | 1.1 | Raccords de câbles et bords de rail au bas du cadre, hors silhouettes. | PNG distinct avec alpha |

La scène logique utilise 2 560 × 1 080, fenêtre 1 920 × 1 080 et sol à y = 880. Le tournoi conserve un sol continu, aucune collision décorative aléatoire et aucun danger de stage. Les portails du kit suivent le même contrat normalisé que sur les autres arènes. Les six couches conservent le même canevas et la même origine; les zones masquées sont à reconstruire proprement avant séparation. Un panorama maître ne compte jamais comme six images de parallaxe.

**Variante spectacle — Signal de calibration.** 6S, 30 ticks d’activation et 120 ticks d’effet : Active un signal sur la console, utile à un objectif d’entraînement; aucune téléportation forcée ni piège de tournoi. Deux utilisations par joueur et par round au maximum. L’interaction reste éteinte en tournoi.

**Ambiance proposée —** Ventilation, appareils d’assemblage et bips courts espacés.

- Captures du lieu exact et état choisi archivés par référence.
- Six fichiers distincts et leur recomposition contrôlés.
- Sol et pieds stables aux deux extrémités de caméra.
- Pas d’élément opaque sur les silhouettes ou les télégraphes.
- Option de paralaxe réduite sans changement de collisions.
- Marquages du lieu contrôlés sur capture; aucun faux texte décoratif certifié.


## 10. Arène — Ancien Aperture — sphère de tests

**Cible : `STG_EXT_PORTAL2_OLD_APERTURE`.** Fixer une sphère et une période du secteur ancien avant validation. Les propositions de matière ci-dessous ne certifient aucune chambre précise.

La page officielle confirme le contexte des laboratoires et de la coopération [AP01, AP05]; elle ne certifie pas la géométrie ci-dessous. Avant acceptation visuelle, rattacher des captures au lieu et à son état exacts. La bande de duel horizontale est une adaptation de composition explicitement déclarée.

| Couche | Parallaxe | Contenu prévu | Fichier |
|---|---|---|---|
| L00_ambience | 0 | Profondeur de la cavité et brume légère loin du plan de combat. | PNG distinct; opaque |
| L01_far | 0.12 | Coque de la sphère et structure porteuse distante. | PNG distinct avec alpha |
| L02_mid | 0.3 | Passerelles, conduites et locaux du secteur source retenu. | PNG distinct avec alpha |
| L03_near | 0.55 | Paroi de maintenance et tuyaux proches en retrait. | PNG distinct avec alpha |
| L04_ground | 1 | Passerelle de duel horizontale; façade et dessus du sol alignés. | PNG distinct avec alpha |
| L05_foreground | 1.1 | Tranches de support et câbles sans masquer pieds ni télégraphes. | PNG distinct avec alpha |

La scène logique utilise 2 560 × 1 080, fenêtre 1 920 × 1 080 et sol à y = 880. Le tournoi conserve un sol continu, aucune collision décorative aléatoire et aucun danger de stage. Les portails du kit suivent le même contrat normalisé que sur les autres arènes. Les six couches conservent le même canevas et la même origine; les zones masquées sont à reconstruire proprement avant séparation. Un panorama maître ne compte jamais comme six images de parallaxe.

**Variante spectacle — Évacuation du conduit.** 6S, 36 ticks d’activation et 150 ticks d’effet : Ouvre une vanne décorative derrière la voie; indique une étape de scénario. Les gels et changements de friction ne sont pas activés dans ce premier contrat. Deux utilisations par joueur et par round au maximum. L’interaction reste éteinte en tournoi.

**Ambiance proposée —** Résonance métallique, tuyauterie, ventilation lointaine.

- Captures du lieu exact et état choisi archivés par référence.
- Six fichiers distincts et leur recomposition contrôlés.
- Sol et pieds stables aux deux extrémités de caméra.
- Pas d’élément opaque sur les silhouettes ou les télégraphes.
- Option de paralaxe réduite sans changement de collisions.
- Marquages du lieu contrôlés sur capture; aucun faux texte décoratif certifié.


## 11. Production des animations, poses et effets

Chaque frame de production contient **un sujet et une pose**, avec transparence pour les acteurs. Les fichiers se rangent par cible, orientation, clip et index stable : `assets/resonance/production/actors/{target_id}/{orientation}/{clip_id}/{frame_index:04d}.png`. Les deux orientations sont contrôlées séparément. La tenue Portal 2 de Chell possède son propre dossier; un partage du profil de gameplay ne vaut pas partage visuel validé.

Le pivot au sol reste entre les appuis, sur la ligne de sol. La bbox visible ne recentre pas chaque frame. Les frames aériennes gardent la même origine logique; la simulation porte la trajectoire. Wheatley pivote autour du centre mécanique de sa sphère. La Rocket Turret conserve son axe de socle entre la visée, le tir et le recul.

| Clip commun | Dessins cibles par orientation |
|---|---|
| idle | 8 |
| walk_forward | 8 |
| walk_back | 8 |
| dash_forward | 6 |
| dash_back | 6 |
| jump_takeoff | 3 |
| jump_rise | 3 |
| jump_apex | 2 |
| jump_fall | 3 |
| jump_land | 3 |
| crouch_enter | 3 |
| crouch_idle | 4 |
| crouch_exit | 3 |
| turn | 4 |
| guard_high | 4 |
| guard_low | 4 |
| air_guard | 4 |
| hit_light | 4 |
| hit_heavy | 6 |
| launch_react | 5 |
| knockdown | 6 |
| stand_up | 7 |
| throw_tech | 4 |
| taunt | 10 |
| victory | 10 |
| defeat | 8 |
| intro | 12 |

Ces **27 types de clips** décrivent locomotion, réactions et scènes. S’y ajoutent les clips d’action liés à chacun des 23 `move_id` d’un kit. Les budgets ci-dessous indiquent des dessins d’anticipation / contact ou événement / récupération; ils ne sont pas les ticks de simulation. Une même frame peut durer plusieurs ticks, sans que cette répétition crée de nouveaux dessins.

| Action | Budget dessins anticipation / contact / retour |
|---|---|
| normal_light | 2 / 1 / 3 |
| normal_medium | 3 / 2 / 4 |
| normal_heavy | 4 / 2 / 5 |
| throw | 3 / 5 / 4 |
| portal_placement | 4 / 2 / 4 |
| portal_transit | 3 / 4 / 4 |
| cube_throw | 4 / 2 / 5 |
| anti_air | 3 / 3 / 5 |
| ex | 4 / 3 / 5 |
| super | 4 / 8 / 5 |
| ultimate | 6 / 14 / 6 |
| trait | 2 / 1 / 3 |

Le retour vers idle, la transition vers garde, l’annulation autorisée et le changement de direction doivent être contrôlés; un clip dont seule l’attaque centrale existe n’est pas terminé. Les gestes de partenaire ne sont joués que si les deux acteurs existent avec la bonne distance, et chaque acteur conserve ses frames individuelles.


### Assets séparés

- Cube unique du kit, tenu et lancé avec pivot cohérent.
- Portail A: ouverture, boucle, fermeture.
- Portail B: ouverture, boucle, fermeture.
- Rayon de placement sans collision de dégâts.
- Effet de transit et aperçu de sortie.
- Ombre au sol et effets de contact séparés.
- Support ou rail Wheatley indépendant du noyau.
- Roquette, visée, fumée et impact de la rencontre Rocket Turret.

Événements à aligner sur les données : `portal_place`, `portal_open`, `portal_enter`, `portal_exit`, `cube_release`, `strike_contact`, `throw_capture`, `throw_release`, `rocket_lock`, `rocket_launch`, `environment_lock_break`, `exit_confirmed`. Un dessin d’effet ne définit pas l’instant de collision. Aucun clip terminé, aucun lot de six couches et aucune certification 1:1 ne sont produits par l’écriture de ce contrat.


## 12. Scénarios de vérification et ordre d’intégration

Les douze scénarios suivants sont des **critères de recette prévus**, sans exécution annoncée. Ils servent à vérifier les risques concrets de ce système une fois implémenté; ils ne remplacent pas l’inspection des images ou le contrôle des sources.

| ID / scénario | Préparation | Résultat attendu |
|---|---|---|
| AP_T01 — Lire la paire | Placer A puis B; attendre l’ouverture des deux. | Deux sockets distincts ouverts, sans dégâts ni déplacement inattendu. |
| AP_T02 — Refuser une sortie occupée | Préparer le transit vers un segment bloqué. | Refus explicite et retour stable; aucun acteur superposé. |
| AP_T03 — Punir l’installation | Enregistrer 236L puis attaquer la préparation. | Pose interrompue avant événement; ancien ancrage conservé jusqu’à remplacement validé. |
| AP_T04 — Réagir à la sortie | Enregistrer un transit puis garder ou attaquer l’arrivée. | Télégraphe visible au moins 18 ticks; aucune invulnérabilité cachée. |
| AP_T05 — Limiter la boucle | Faire traverser un cube puis tenter un second passage. | Deuxième traversée ignorée ou collision résolue; dégâts et vitesse non multipliés. |
| AP_T06 — Comprendre EX | Saisir 214L+M sans paire ou sans 50 Résonance. | Refus pour précondition/ressource; jamais projection ni Pose B de remplacement. |
| AP_T07 — Différencier les costumes | Rejouer un même état avec Chell P1 et tenue P2. | Mêmes coûts, collision et résultat; images et protections de jambe distinctes. |
| AP_T08 — Répondre à l’anti-air | Varier saut et approche au sol contre 623H. | Le saut peut être pris, mais une approche au sol peut punir la récupération. |
| AP_T09 — Résoudre la Rocket Turret | Renvoyer une roquette sur la tourelle puis sur le vitrage. | La première se neutralise sans victoire; seul le vitrage progresse. |
| AP_T10 — Sortir avec un autre profil | Sélectionner un combattant sans Portal Gun. | La console permet de résoudre les mêmes trois objectifs sans changer son identité. |
| AP_T11 — Lire sans couleur | Activer palette adaptée et couper les sons. | Pictogrammes de paire, forme de verrouillage et durée restent lisibles. |
| AP_T12 — Ne pas surcompter la production | Comparer un master, ses couches futures et une pose. | Aucune pose déclarée animation complète; un master n’est ni six plans ni une nouvelle arène par variante. |

L’intégration commence par un kit pilote, sa paire et un cube, puis l’épreuve de tourelle avec console. Les deux autres kits ne sont activés qu’après vérification du socle partagé. Les skins, Wheatley et les variantes de stage viennent ensuite avec leurs données propres. Les quatre boss et six profils déjà jouables dans le prototype Boss Battle ne sont pas modifiés par l’ajout de ces fichiers documentaires.

- Références de version et vues opposées approuvées.
- Frames individuelles, pivots, hitboxes, hurtboxes et événements rédigés.
- Simulation de portails déterministe et bornée implémentée dans un module distinct.
- Préconditions de transit, annulations, coûts et combos vérifiés en jeu.
- Rencontre Rocket Turret gagnable avec chaque profil autorisé.
- Contrastes, collisions et options de réduction visuelle contrôlés.


### Contrôles statiques effectués

Les huit cibles se résolvent dans les catalogues existants; les 69 commandes et identifiants d’action sont uniques par kit. Les coûts sont cohérents avec `combat_rules.json`. Les durées et avantages de 39 lignes de frappe, les six avantages sur garde des cinématiques et les six fenêtres de déchoppe ont été vérifiés arithmétiquement. Les trois compteurs de phase et les douze couches prévues sont cohérents. Ces contrôles ne valident ni les collisions, ni les combos, ni le rendu, ni la fidélité visuelle.

### Sources et portée

**AP01 — [Valve — Portal 2 sur Steam](https://store.steampowered.com/app/620/Portal_2/)** · officielle · consultée le 20 novembre 2026. Campagne coopérative distincte, deux personnages et chambres dédiées; ne valide pas les kits de duel.

**AP02 — [Valve — Bot Trust](https://www.thinkwithportals.com/media_16.php)** · officielle · consultée le 20 novembre 2026. Vidéo officielle de présentation des robots; la page est consultée, les captures de pose finales restent à rattacher au registre.

**AP03 — [Valve — Boots](https://www.thinkwithportals.com/media_14.php)** · officielle · consultée le 20 novembre 2026. Référence officielle Long Fall Boots; aucune invulnérabilité de combat déduite des protections de chute.

**AP04 — [Valve — Meet Wheatley](https://www.thinkwithportals.com/media.php)** · officielle · consultée le 20 novembre 2026. Présentation officielle du noyau Wheatley; état autonome à séparer du corps central.

**AP05 — [Valve — Portal 2, présentation](https://www.thinkwithportals.com/about.php)** · officielle · consultée le 20 novembre 2026. Identité du dispositif à portails et du jeu de réflexion; aucun coup chiffré ci-dessous ne provient de cette source.

**AP06 — [Portal Wiki — Turrets, Rocket Turret](https://theportalwiki.com/wiki/Rocket_Turret)** · secondaire · consultée le 20 novembre 2026. Tourelle fixe à verrouillage et roquettes; renvoi sur la tourelle neutralisé; redirection vers vitrages ou GLaDOS. À recouper avec capture du jeu avant fidélité validée.

**AP07 — [Portal Wiki — Portals](https://theportalwiki.com/wiki/Portals)** · secondaire · consultée le 20 novembre 2026. Paires et couleurs: Chell bleu/orange, ATLAS cyan/indigo, P-body jaune/rouge. Ne source ni les limites temporelles ni les ancrages de combat proposés.

**AP08 — [Portal Wiki — Chell](https://theportalwiki.com/wiki/Chell)** · secondaire · consultée le 20 novembre 2026. Protagoniste silencieuse; distinguer tenue et protections de jambe des deux jeux.

**AP09 — [Portal Wiki — Wheatley](https://theportalwiki.com/wiki/Wheatley)** · secondaire · consultée le 20 novembre 2026. Noyau autonome, rail et rôle narratif; pas de corps humanoïde.

**AP10 — [Portal Wiki — P-body](https://theportalwiki.com/wiki/P-body)** · secondaire · consultée le 20 novembre 2026. Robot élancé à œil orange; les gestes coopératifs doivent conserver leurs partenaires et leurs préconditions.

Les JSON de référence du projet restent `combat_rules.json`, `frame_data_pilote.json` et `catalogue_extension_20261120.json`. Les nouvelles valeurs sont contrôlables arithmétiquement, mais ne sont pas présentées comme équilibrées ni jouables. Les divergences de silhouette, de détail ou d’architecture restent visibles dans le suivi de production jusqu’à comparaison avec la référence exacte.
