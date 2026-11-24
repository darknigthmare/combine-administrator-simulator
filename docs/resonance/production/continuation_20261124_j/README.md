# Half-Life Resonance — reprise et lot J

24 novembre 2026. **44 PNG supplémentaires : 43 nouvelles images conservées et 1 décor historique récupéré.** L’inventaire passe de 147 à **191 PNG distincts**, avec **229 entrées de registre**. Le lot apporte une première image à **41 cibles** : 155 des 259 cibles ont désormais un fichier associé, 104 restent sans fichier.

La PR #7 conserve les 108 PNG ajoutés auparavant (récupération F/H et lot I) et ajoute ces 44 fichiers, soit **152 PNG ajoutés par rapport à master**. Aucun PNG déjà présent au début de cette reprise n’est supprimé ni remplacé.

## Contenu ajouté

| Groupe | PNG conservés | Cibles |
|---|---:|---:|
| Personnages et costume Eli Alyx | 13 | 12 |
| Créatures, petites machines et boss | 9 | 9 |
| Nouveaux panoramas de stages | 11 | 10 |
| Questionable Ethics, sortie historique récupérée | 1 | 1 |
| Projectiles et effets recréés après interruption | 10 | 9 |
| **Total** | **44** | **41** |

Les personnages comprennent Gordon HL1, Barney Blue Shift, HECU à cagoule, Assassin Black Ops, Medic et Engineer HECU, Otis, Rosenberg, Uriah, Griggs, Sheckley et le costume d’Eli dans Alyx. La révision d’Uriah conserve les marges complètes; l’ancienne image reste enregistrée mais non sélectionnée.

Les créatures et machines sont Baby Voltigore, Ichthyosaur, Stalker, Guardian des tunnels, Jeff, Voltigore, Barnacle, Shield Scanner et Frankenturret. La demande Strider HL2 a rencontré une **erreur d’outil sans fichier**, sans motif de refus de sécurité confirmé et sans relance.

Les décors couvrent le barrage Surface Tension, la zone de fret et le laboratoire de Rosenberg de Blue Shift, la Citadelle HL2, le réacteur EP1, les galeries de fourmilions EP2, le balcon et le Northern Star d’Alyx, la salle 17 de Portal et la chambre de relaxation de Portal 2. Le barrage possède deux révisions; seule la seconde est sélectionnée. Le décor récupéré de Questionable Ethics est ajouté avec son SHA-256 original et sans inventer le prompt perdu.

Les dix effets couvrent le dispositif Magnusson, le Phéropode, la bombe Aperture, la capsule de headcrabs ouverte, le faisceau Gluon, le boîtier et le rayon de mine laser HL1, le Shock Bolt et les deux sens du tunnel d’excursion.

[Galerie des 44 PNG](GALLERY.md) · [Registre du lot](generation_register.json) · [Audit de récupération](RECOVERY_AUDIT.md).

## Incident et traçabilité

L’environnement s’est interrompu avant la publication. Les sorties des personnages, des décors et des machines ont été récupérées avec leurs octets d’origine, puis leurs empreintes vérifiées. Le décor historique de Questionable Ethics a été retrouvé dans un ancien dossier.

**12 sorties d’effets stockées sur le disque temporaire sont devenues indisponibles.** Elles restent dans [lost_effect_outputs.json](lost_effect_outputs.json), avec leurs prompts et les dimensions, tailles et SHA-256 mesurés avant la panne. Elles n’ont ni chemin PNG actuel ni revendication d’intégration. Dix nouveaux appels ont recréé les états utiles à partir des mêmes références; ces nouvelles images ont de nouveaux identifiants et ne sont pas présentées comme les anciens octets retrouvés. Les deux autres sorties perdues étaient les premières révisions des tunnels.

Le lot documente **56 nouveaux appels : 55 réponses avec image, dont 12 sorties ensuite perdues, et 1 erreur d’outil**. Les 43 sorties nouvelles conservées et le PNG historique récupéré donnent les 44 fichiers réellement ajoutés. Les **25 refus antérieurs** restent distincts; aucun nouveau refus de sécurité n’a été confirmé. Les 13 itérations historiques écartées restent hors du registre courant des fichiers.

## Inventaire consolidé

| Catégorie | Cibles | Avec PNG | Sans PNG |
|---|---:|---:|---:|
| Personnages, créatures et petites machines | 86 | 54 | 32 |
| Costumes | 18 | 12 | 6 |
| Machines et boss | 28 | 20 | 8 |
| Stages | 50 | 33 | 17 |
| Projectiles et effets | 66 | 36 | 30 |
| Archives | 11 | 0 | 11 |
| **Total** | **259** | **155** | **104** |

Un PNG associé ne clôt pas une cible : les poses, transitions, états, collisions et contrôles de fidélité restent nécessaires. [Liste complète](../MISSING_TARGETS.md) · [Queue JSON](../../data/production_queue.json) · [Audit des fichiers](../asset_audit.md).

## Intégration effective dans le prototype

**Sept images fixes sont branchées au rendu Boss Battle** : Gordon HL2, Alyx HL2, Barney HL2, Shephard, Vortigaunt, Élite du Cartel et Gunship. Avec les deux panoramas déjà intégrés, neuf fichiers possèdent un scope d’intégration explicite.

Les pieds gardent leur ancrage lors du changement de sens; le Gunship conserve son ancrage de corps et ses traces de tir partent du canon visible. Les poses restent fixes. Les signaux d’attaque, d’invulnérabilité, d’impact et de défaite restent visibles, et le rendu vectoriel prend le relais pendant le chargement ou en cas d’erreur. Le moteur de simulation, les dégâts et les collisions ne changent pas.

Strider, Dropship et Gargantua gardent leur représentation vectorielle : la variante EP2 du Strider, le Dropship composé avec sa nacelle et le Gargantua vu de dos ne sont pas des remplacements adaptés aux rencontres actuelles. [Détail et validation du rendu](runtime_integration.md).

## Références et limites

Les références exactes ont été inspectées et rattachées aux catalogues pour 42 cibles, y compris le Strider sans sortie. Les captures hébergées par les wikis communautaires sont attribuées comme telles; elles ne sont pas requalifiées en publications officielles. Les prompts, liens, empreintes disponibles, variantes et états sont conservés dans les registres partiels.

- La salle 17 représente seulement la chambre des récepteurs; l’incinérateur manque encore.
- Les stages sont des panoramas maîtres, sans six plans de parallaxe terminés.
- La capture du Shock Bolt montre une décharge au contact; la forme exacte du projectile en vol reste à vérifier.
- Engineer, Rosenberg et Eli regardent vers la gauche; les orientations et détails fins restent à revoir.
- Les marges des effets sont parfois plus serrées que la consigne. Le compositing blanc/noir a été inspecté sans retoucher les pixels.
- Aucune fidélité **1:1**, animation complète ou arène à six couches n’est déclarée terminée.

## Vérifications

- Audit : **191 PNG, 191 contenus distincts, dimensions, tailles et SHA-256 cohérents; aucun fichier non enregistré, aucune erreur ni avertissement**.
- Synchronisation : **259 cibles, 155 avec fichier, 104 sans**; un avertissement historique persiste pour la skyline Cité 17 sans identifiant de couche.
- Validateurs design et Boss Battle : réussis.
- Tests Resonance : **19 sur 19 réussis**, dont 6 tests du nouveau rendu.
- Test isolé des statuts de production : réussi; une sortie perdue ou une erreur d’outil ne peut fournir de fichier fictif.
- Lint ciblé et compilation TypeScript/Vite : réussis.
- Revue indépendante : les 57 nouvelles entrées correspondent aux sept registres partiels; les identités, prompts et empreintes des entrées précédentes sont conservés.
- Le contrôle navigateur et les limites de ce contrôle sont consignés dans [runtime_integration.md](runtime_integration.md).

Les exports Word/Excel v1 restent des instantanés historiques; les sources Markdown/JSON font foi pour cet état de production.
