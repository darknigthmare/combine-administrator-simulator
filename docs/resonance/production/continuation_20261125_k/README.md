# Lot K — reprise des 104 cibles sans PNG

**80 nouveaux PNG couvrant 76 cibles jusque-là sans fichier.** Les 104 cibles manquantes au début du lot ont une issue explicite : 76 reçoivent un candidat, 11 ont un refus de génération confirmé et 17 sont reportées sans appel avec le blocage documenté.

[Galerie des PNG](GALLERY.md) · [Revue de chaque cible](TARGET_REVIEW.md) · [Données de revue](target_review.json) · [Inventaire complet](../MISSING_TARGETS.md)

## Nouveaux fichiers

| Groupe K | PNG ajoutés | Cibles nouvellement couvertes |
|---|---:|---:|
| Personnages, créatures et petites machines | 25 | 25 |
| Costumes | 6 | 6 |
| Boss et grandes machines | 6 | 6 |
| Stages | 17 | 17 |
| Projectiles et effets | 19 | 15 |
| Archives | 7 | 7 |
| **Total K** | **80** | **76** |

Les personnages comprennent les trois zombies HL2, plusieurs personnages d’Alyx et des variantes de costume précisément identifiées. Les nouvelles machines et archives gardent leurs versions sources séparées. Les 18 panoramas comprennent les lieux d’Opposing Force, Decay PS2, Portal, Portal 2, Desk Job et le Borealis promotionnel E3 2002.

Les effets ajoutent les grenades Combine/Xen d’Alyx, le missile de Rocket Turret, une charge de Voltigore, le rayon du Pit Worm, une flamme et une particule de stomp Gargantua, les projectiles énergétique/téléporteur du Nihilanth, trois traceurs HL2, un flash Desk Job et les six contours de portail Portal 2.

## Inventaire consolidé

L’inventaire atteint **271 PNG distincts**, **323 entrées**, **36 refus**, **4 erreurs outil** et **12 sorties historiques perdues**. **231 des 259 cibles ont un PNG; 28 restent sans PNG.**

| Catégorie | Cibles | Avec PNG | Sans PNG |
|---|---:|---:|---:|
| Personnages, créatures et petites machines | 86 | 79 | 7 |
| Costumes | 18 | 18 | 0 |
| Boss et grandes machines | 28 | 26 | 2 |
| Stages | 50 | 50 | 0 |
| Projectiles et effets | 66 | 51 | 15 |
| Archives | 11 | 7 | 4 |
| **Total** | **259** | **231** | **28** |

Les **94 entrées K** se décomposent en 80 fichiers, 11 refus et 3 erreurs de paramètres avant génération. **91 appels de génération réels** ont eu lieu; les trois validations de paramètres échouées et les 17 reports ne sont pas comptés comme générations. Le total historique atteint 332 appels, dont les sorties perdues et les 13 itérations antérieures non retenues.

## Références et décisions de production

- [Personnages et costumes](character_reference_review.md) : références de modèle/capture, comparaison de silhouette et contrôle alpha.
- [Machines, boss et archives](machine_reference_review.md) : séparation des jeux, des variantes et des modèles abandonnés.
- [Stages](stage_reference_review.md) : capture source, composition latérale, sol et limites des panoramas.
- [Projectiles et effets](effects_reference_review.md) : états séparés, ressources SDK, références rejetées et vérification sur fonds clair/sombre.

Le code Valve justifie les identités de ressources; les captures ou previews inspectés fixent les indices graphiques disponibles. Les images générées restent des adaptations candidates. Les références externes sont identifiées par URL et empreinte, sans prétendre à une capture de jeu réalisée localement.

### Archives et reports

Air Exchange reste reporté : la capture de développement trouvée est marquée comme modifiée par des fans, et le concept disponible ne fixe pas une date de version suffisante. Blob, Ice Gun et Arctique restent soumis au verrou documentaire/timecode de leurs contrats. Les images inspectées et les limites d’accès sont consignées; aucune apparence finale de Half-Life 3 n’est inventée.

Treize familles de projectiles/effets restent reportées. Les scènes de soin vortigaunt, arcs de zombie possédé, modèles d’armes sans projectile et restaurations communautaires d’attaques coupées ne remplacent pas les frames exactes demandées. Le missile APC partage le modèle de vol RPG qui a été refusé dans ce lot; aucun nouvel appel sous un autre nom.

### Qualité visuelle encore ouverte

Les sorties sont conservées sans retouche de pixels. Des marges, des détails réinterprétés et de très faibles résidus alpha sont documentés. Les compositions sur fonds clair et sombre ne reproduisent pas les larges halos suggérés par certains aperçus RGB bruts; les franges fines restent à vérifier. Les centres des portails sont transparents mais nécessitent encore le contrôle des résidus et des bords. Une sélection pour revue ne constitue pas une validation finale.

La particule rouge Gargantua est un composant du stomp, pas une vague entière. Les contours de portail ne contiennent pas la destination. Les traceurs AR2/Strider s’appuient sur le matériau partagé du SDK et demandent encore des séquences de comparaison propres à chaque arme.

## Vérification et publication

- Signature PNG, dimensions, taille, SHA256 et SHA Git contrôlés pour chaque nouveau fichier.
- Les PNG historiques et leurs empreintes sont conservés; aucun doublon de contenu ajouté.
- Registre, catalogues, audit, file de production et suivi des 104 cibles réconciliés.
- Validateur design, audit des fichiers et synchronisation de la file exécutés après consolidation; résultats détaillés dans [validation.json](validation.json).
- La file conserve le seul avertissement historique : `layer_city17_distant_skyline` sans `layer_id`.

Ce lot ajoute des candidats et leurs dossiers de référence. Il conserve les neuf images déjà utilisées dans Boss Battle (sept poses et deux panoramas). Aucun nouveau clip, plan de parallaxe complet, combat ou comportement moteur n’est déclaré livré. Les vérifications runtime du lot J restent datées dans leur propre rapport; elles ne constituent pas une nouvelle exécution dans ce lot.

**Aucune certification 1:1, aucune animation complète et aucune arène à six couches n’est déclarée terminée.**
