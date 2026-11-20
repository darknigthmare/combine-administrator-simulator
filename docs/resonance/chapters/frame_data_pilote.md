# Données de frames des six combattants pilotes

Ce jeu de données propose 66 mouvements pour le prototype de Half Life Resonance : neuf normales, un normal directionnel 6H et une projection avant par combattant. Les valeurs sont des créations de gameplay à équilibrer. Elles ne proviennent pas de mesures des jeux Half-Life et n’ont pas été exécutées dans un moteur de combat. Les spéciaux, EX, supers, ultimes et la projection arrière restent dans leurs contrats dédiés.

## Convention de comptage

La simulation cible 60 ticks par seconde. La commande validée entre dans l’action au tick 1. La colonne D donne le premier tick actif et inclut donc ce premier tick dans la durée de démarrage. A indique le nombre total de ticks actifs; R est la récupération après le dernier tick actif. Une attaque de D = 6, A = 3 et R = 10 est active aux ticks 6, 7 et 8, récupère aux ticks 9 à 18, puis permet une nouvelle action au tick 19. Sa durée totale vaut D + A + R − 1.

Le hitfreeze commun suspend les deux personnages et ne modifie pas l’avantage. Au premier tick actif, il reste (A − 1) + R ticks d’engagement à l’attaquant après cette pause. Les formules sont :

`avantage garde = blockstun − ((A − 1) + R)`

`avantage impact = hitstun − ((A − 1) + R)`

Un résultat positif signifie que l’attaquant retrouve le contrôle avant le défenseur. Un résultat nul signifie un retour simultané. Pour un contact plus tardif dans les frames actives, ajouter le décalage de contact à l’avantage nominal, tant qu’aucune autre durée ne change. Les annulations ne sont pas incluses.

Exemple : le 5L de Gordon possède A = 3, R = 10, un blockstun de 12 et un hitstun de 16. Il reste 12 ticks à l’attaquant après contact : son avantage vaut donc 0 en garde et +4 à l’impact. Il ne s’agit pas d’une preuve de combo; portée, pushback, hitboxes et conditions d’annulation doivent encore être vérifiés.

## Propriétés de garde

Les 5L, 5M et 5H sont médians et gardables debout ou accroupi. Les 2L et 2M sont bas. Les 2H sont des anti-aériens médians : ils restent gardables debout ou accroupi au sol et interdisent la garde aérienne. Tous les j.L, j.M et j.H sont overhead; ils demandent une garde debout au sol et acceptent une garde aérienne compatible. Le 6H est un overhead terrestre lent. Aucune normale de cette table n’utilise une propriété high distincte; cette propriété nécessiterait une règle explicite de collision avec un adversaire accroupi.

Les valeurs d’avantage des attaques aériennes sont nominales, sur un défenseur au sol, sans changement de récupération par atterrissage. Elles ne certifient pas l’avantage d’un saut entrant réel. Le moteur devra calculer l’engagement restant depuis le tick de contact et la politique d’atterrissage. La récupération de douze ticks après garde aérienne appartient à une autre situation et ne se remplace pas par ces colonnes.

Les 60 frappes infligent un seul impact de corps à corps, sans projectile et sans hitscan. Elles ne coûtent pas de Résonance et n’infligent aucun dégât de garde. L’armure, l’invulnérabilité, la portée et le pushback ne sont pas présumés à partir du nom du mouvement.

## Lecture des tableaux

La colonne D A R indique, en ticks, le démarrage, l’activité et la récupération. La dernière colonne donne les avantages à l’impact puis en garde, au premier tick actif. Les hitstuns et blockstuns exacts figurent dans frame_data_pilote.json. Les dégâts sont avant réduction de combo, sur une vie de référence de 10 000 PV. Les tirets des projections indiquent une propriété non applicable, pas une valeur nulle.

## Gordon Freeman HEV Mark V

| Entrée | Geste | D A R | Dégâts | Niveau | Impact garde |
|---|---|---|---:|---|---|
| 5L | Coude de la combinaison | 6 / 3 / 10 | 350 | Médiane | +4 / 0 |
| 5M | Revers du pied de biche | 10 / 3 / 15 | 650 | Médiane | +6 / 0 |
| 5H | Grand crochet de fer | 15 / 4 / 22 | 1000 | Médiane | +2 / -7 |
| 2L | Pointe de botte HEV | 7 / 2 / 11 | 300 | Basse | +3 / -1 |
| 2M | Fauchage de laboratoire | 11 / 3 / 18 | 600 | Basse | +3 / -5 |
| 2H | Remontée du levier | 12 / 4 / 25 | 900 | Médiane | 0 / -11 |
| j.L | Genou de la combinaison | 6 / 4 / 10 | 320 | Overhead | +6 / +2 |
| j.M | Botte en travers | 10 / 5 / 15 | 650 | Overhead | +5 / 0 |
| j.H | Fer descendant | 14 / 5 / 20 | 1000 | Overhead | +4 / -2 |
| 6H | Levier par dessus la garde | 23 / 3 / 24 | 850 | Overhead | +2 / -10 |
| L+M | Dégagement HEV | 7 / 2 / 25 | 1200 | Saisie | — / — |

Geste défini par le roster : Saisie d’épaule, renversement à gauche ou à droite; aucune télékinésie sur corps. La variante avant utilise L+M; la variante arrière 4+L+M appartient à la même famille mais reste hors de cette table. La projection avant propose 25 ticks de récupération sur raté. Sur saisie réussie, le verrou partagé dure 30 ticks, dont les sept premiers autorisent la déchoppe. Après libération, l’attaquant récupère pendant 14 ticks et le défenseur reste au sol pendant 24 ticks, soit +10 à la sortie. Ce +10 ne garantit aucune attaque supplémentaire; portée de sortie et protection de relevée restent à définir.

## Alyx Vance Half-Life 2

| Entrée | Geste | D A R | Dégâts | Niveau | Impact garde |
|---|---|---|---:|---|---|
| 5L | Jab de la main libre | 5 / 2 / 9 | 280 | Médiane | +4 / +1 |
| 5M | Crosse courte de résistance | 8 / 3 / 14 | 540 | Médiane | +6 / 0 |
| 5H | Coude en pivot | 13 / 3 / 21 | 820 | Médiane | +3 / -6 |
| 2L | Pointe de chaussure | 5 / 2 / 10 | 260 | Basse | +3 / 0 |
| 2M | Crochet de cheville | 9 / 3 / 16 | 500 | Basse | +4 / -3 |
| 2H | Crosse montante | 10 / 4 / 23 | 760 | Médiane | +2 / -10 |
| j.L | Genou suspendu | 5 / 4 / 9 | 260 | Overhead | +5 / +2 |
| j.M | Coup de pied croisé | 8 / 4 / 14 | 520 | Overhead | +5 / 0 |
| j.H | Talon plongeant | 12 / 5 / 19 | 850 | Overhead | +4 / -2 |
| 6H | Revers plongeant | 21 / 3 / 23 | 720 | Overhead | +3 / -9 |
| L+M | Prise de poignet | 6 / 2 / 24 | 1000 | Saisie | — / — |

Geste défini par le roster : Désarme puis fait pivoter l’adversaire; l’arme revient à son propriétaire à la reprise. La variante avant utilise L+M; la variante arrière 4+L+M appartient à la même famille mais reste hors de cette table. La projection avant propose 24 ticks de récupération sur raté. Sur saisie réussie, le verrou partagé dure 28 ticks, dont les sept premiers autorisent la déchoppe. Après libération, l’attaquant récupère pendant 13 ticks et le défenseur reste au sol pendant 23 ticks, soit +10 à la sortie. Ce +10 ne garantit aucune attaque supplémentaire; portée de sortie et protection de relevée restent à définir.

## Barney Calhoun Half-Life 2

| Entrée | Geste | D A R | Dégâts | Niveau | Impact garde |
|---|---|---|---:|---|---|
| 5L | Poing du garde | 7 / 3 / 11 | 330 | Médiane | +4 / 0 |
| 5M | Revers de crosse du garde | 11 / 3 / 16 | 620 | Médiane | +5 / -1 |
| 5H | Botte de maintien | 16 / 4 / 23 | 980 | Médiane | +2 / -8 |
| 2L | Chaussure basse du garde | 7 / 2 / 12 | 290 | Basse | +3 / -1 |
| 2M | Balayage de contrôle | 12 / 3 / 18 | 570 | Basse | +3 / -5 |
| 2H | Coude ascendant du garde | 13 / 4 / 25 | 880 | Médiane | +1 / -11 |
| j.L | Genou de patrouille | 7 / 4 / 11 | 300 | Overhead | +5 / +1 |
| j.M | Crosse en travers | 11 / 4 / 16 | 600 | Overhead | +4 / -1 |
| j.H | Botte d’interception | 15 / 5 / 21 | 950 | Overhead | +3 / -3 |
| 6H | Crosse verticale du garde | 24 / 3 / 24 | 830 | Overhead | +2 / -10 |
| L+M | Clé de sécurité | 7 / 2 / 26 | 1200 | Saisie | — / — |

Geste défini par le roster : Clé du bras et renversement; version arrière change de côté. La variante avant utilise L+M; la variante arrière 4+L+M appartient à la même famille mais reste hors de cette table. La projection avant propose 26 ticks de récupération sur raté. Sur saisie réussie, le verrou partagé dure 32 ticks, dont les sept premiers autorisent la déchoppe. Après libération, l’attaquant récupère pendant 15 ticks et le défenseur reste au sol pendant 25 ticks, soit +10 à la sortie. Ce +10 ne garantit aucune attaque supplémentaire; portée de sortie et protection de relevée restent à définir.

## Adrian Shephard Opposing Force

| Entrée | Geste | D A R | Dégâts | Niveau | Impact garde |
|---|---|---|---:|---|---|
| 5L | Poing tactique | 6 / 3 / 10 | 360 | Médiane | +4 / 0 |
| 5M | Coude HECU | 10 / 3 / 16 | 680 | Médiane | +5 / -1 |
| 5H | Revers de clé serre tube | 17 / 4 / 24 | 1080 | Médiane | +2 / -9 |
| 2L | Botte de ranger basse | 7 / 2 / 11 | 310 | Basse | +3 / -1 |
| 2M | Fauchage de ranger | 11 / 3 / 18 | 620 | Basse | +4 / -5 |
| 2H | Clé ascendante | 13 / 4 / 26 | 980 | Médiane | +1 / -12 |
| j.L | Genou militaire | 6 / 4 / 10 | 330 | Overhead | +5 / +1 |
| j.M | Botte d’assaut | 10 / 4 / 16 | 650 | Overhead | +5 / -1 |
| j.H | Clé en marteau | 15 / 5 / 22 | 1040 | Overhead | +3 / -3 |
| 6H | Assaut vertical à la clé | 25 / 3 / 25 | 930 | Overhead | +2 / -11 |
| L+M | Extraction manuelle | 7 / 2 / 26 | 1300 | Saisie | — / — |

Geste défini par le roster : Prise de gilet puis projection au sol; arme sécurisée pendant l’animation. La variante avant utilise L+M; la variante arrière 4+L+M appartient à la même famille mais reste hors de cette table. La projection avant propose 26 ticks de récupération sur raté. Sur saisie réussie, le verrou partagé dure 32 ticks, dont les sept premiers autorisent la déchoppe. Après libération, l’attaquant récupère pendant 16 ticks et le défenseur reste au sol pendant 26 ticks, soit +10 à la sortie. Ce +10 ne garantit aucune attaque supplémentaire; portée de sortie et protection de relevée restent à définir.

## Vortigaunt Half-Life 2

| Entrée | Geste | D A R | Dégâts | Niveau | Impact garde |
|---|---|---|---:|---|---|
| 5L | Paume courte | 8 / 3 / 12 | 380 | Médiane | +5 / 0 |
| 5M | Revers du bras principal | 12 / 4 / 17 | 700 | Médiane | +5 / -2 |
| 5H | Double paume lourde | 18 / 5 / 25 | 1150 | Médiane | +2 / -10 |
| 2L | Pied de Xen bas | 8 / 2 / 12 | 320 | Basse | +3 / -2 |
| 2M | Balayage allongé | 13 / 3 / 19 | 650 | Basse | +4 / -6 |
| 2H | Paume ascendante de Xen | 15 / 5 / 28 | 1100 | Médiane | +1 / -13 |
| j.L | Genou de Xen | 8 / 4 / 12 | 350 | Overhead | +5 / +1 |
| j.M | Paume en travers du saut | 12 / 5 / 17 | 680 | Overhead | +4 / -1 |
| j.H | Deux paumes descendantes | 17 / 6 / 23 | 1100 | Overhead | +3 / -4 |
| 6H | Arc des bras au dessus de la garde | 27 / 4 / 27 | 1000 | Overhead | +2 / -12 |
| L+M | Renversement vortique | 9 / 3 / 28 | 1350 | Saisie | — / — |

Geste défini par le roster : Saisie anatomiquement correcte avec main principale et appui; troisième bras non allongé magiquement. La variante avant utilise L+M; la variante arrière 4+L+M appartient à la même famille mais reste hors de cette table. La projection avant propose 28 ticks de récupération sur raté. Sur saisie réussie, le verrou partagé dure 36 ticks, dont les sept premiers autorisent la déchoppe. Après libération, l’attaquant récupère pendant 18 ticks et le défenseur reste au sol pendant 28 ticks, soit +10 à la sortie. Ce +10 ne garantit aucune attaque supplémentaire; portée de sortie et protection de relevée restent à définir.

## Combine Elite Half-Life 2

| Entrée | Geste | D A R | Dégâts | Niveau | Impact garde |
|---|---|---|---:|---|---|
| 5L | Gantelet de l’Élite | 8 / 3 / 12 | 400 | Médiane | +4 / -1 |
| 5M | Crosse de suppression | 12 / 3 / 18 | 720 | Médiane | +5 / -2 |
| 5H | Percussion blindée | 19 / 4 / 26 | 1200 | Médiane | +2 / -10 |
| 2L | Botte de suppression basse | 8 / 2 / 13 | 330 | Basse | +3 / -2 |
| 2M | Fauchage blindé | 13 / 3 / 20 | 680 | Basse | +3 / -6 |
| 2H | Crosse anti aérienne | 15 / 4 / 28 | 1050 | Médiane | +1 / -13 |
| j.L | Genou blindé | 8 / 4 / 12 | 360 | Overhead | +5 / 0 |
| j.M | Botte de descente | 12 / 4 / 18 | 700 | Overhead | +4 / -2 |
| j.H | Crosse aérienne lourde | 18 / 5 / 24 | 1150 | Overhead | +3 / -4 |
| 6H | Marteau de crosse de l’Élite | 26 / 3 / 28 | 1050 | Overhead | +2 / -12 |
| L+M | Contrôle physique | 8 / 3 / 29 | 1400 | Saisie | — / — |

Geste défini par le roster : Saisie au col et choc de crosse; la direction choisie avant contact fixe le côté final. La variante avant utilise L+M; la variante arrière 4+L+M appartient à la même famille mais reste hors de cette table. La projection avant propose 29 ticks de récupération sur raté. Sur saisie réussie, le verrou partagé dure 34 ticks, dont les sept premiers autorisent la déchoppe. Après libération, l’attaquant récupère pendant 18 ticks et le défenseur reste au sol pendant 28 ticks, soit +10 à la sortie. Ce +10 ne garantit aucune attaque supplémentaire; portée de sortie et protection de relevée restent à définir.

## Projection et déchoppe

La fenêtre de déchoppe couvre les sept premiers ticks de capture, numérotés de 0 à 6 inclus dans le compteur de saisie. Le dommage ne peut être validé qu’après l’expiration de cette fenêtre et si la capture reste valide. Une déchoppe réussie libère les deux personnages, sans dommage ni gain de Résonance. Une projection ne se garde pas : BS et avantage en garde restent absents dans le JSON. Elle ne cible ici que les adversaires au sol pouvant être saisis.

Pour une saisie réussie, le verrou commun et les récupérations de sortie remplacent les ticks actifs restants et la récupération de raté. La formule ordinaire utilisant hitstun ou blockstun ne s’applique pas. Le calcul après libération compare la durée de relevée du défenseur à la récupération de l’attaquant. La projection arrière 4+L+M est prévue par les règles globales et par le budget d’animation, mais ne fait pas partie de ces 66 lignes.

## Annulations et limites de validation

La chaîne de normales suit les niveaux L puis M puis H, avec une seule utilisation de chaque niveau. Les champs du JSON décrivent les niveaux suivants autorisés sur impact ou garde. Ils ne définissent aucun nouveau spécial et n’accordent aucune annulation sur raté. Les fenêtres précises d’annulation, les annulations vers spéciaux et supers et les états de jonglage doivent être harmonisés avec les contrats des personnages.

Les contrôles réalisés portent sur les 60 formules de frappe, les six exceptions de projection, la fenêtre de déchoppe de sept ticks, la positivité des durées et l’unicité des 66 identifiants. Ils vérifient une cohérence arithmétique de données. Ils ne constituent pas des tests de moteur, d’équilibrage, de collision, de rollback ou de sensation de jeu.
