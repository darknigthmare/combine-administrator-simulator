# Reprise du 27 novembre — lot N et guides de combat

La reprise part du commit `f77c4a797cc4201a2b52921e44fd1a5b767a6b5b` de la PR n°7, dernier état effectivement publié : **286 PNG et bible 1.9**. Le lot M annoncé dans l'historique (24 PNG, bible 1.10) n'a pas été retrouvé dans les sources accessibles. Ses images ne sont pas comptées comme livrées ; son numéro est réservé, sans reconstituer ses anciens fichiers.

## Résultat de ce lot

| Livrable | État réel |
|---|---|
| Guide général et deux extensions | Trois originaux TXT copiés sans modification, empreintes vérifiées ; 68 sections raccordées à la bible 1.11 |
| Conception Half-Life / Portal | 63 fiches et 26 scénarios d'acceptation conçus ; décisions et statut de chaque module explicités |
| Poses graphiques | 7 nouveaux PNG, 6 poses retenues pour la prochaine revue et 1 premier cadrage conservé |
| Dossiers de terrain | 4 collections de boss déblocables après victoire admissible ou Boss Rush complet |
| Inventaire réel | 293 PNG distincts, 345 entrées ; 241 des 259 cibles ont au moins un PNG et 18 restent sans fichier |
| Préservation | Les 286 PNG de départ ont conservé leur SHA-256 ; les 338 entrées historiques sont préservées, avec seulement les métadonnées d'usage en galerie de quatre fichiers actualisées |

Les 36 refus, 4 erreurs outil et 12 sorties historiques indisponibles du registre antérieur restent inchangés. Le lot N a réalisé **7 appels de génération, sans nouveau refus ni erreur de génération**, et n'a pas redemandé les sujets précédemment refusés. Il ajoute des états de présentation à deux personnages déjà illustrés ; il ne réduit pas les 18 cibles sans premier PNG.

## Guide et extensions

- [Originaux, provenance et empreintes](../../guides/README.md).
- [Intégration du guide général](../../chapters/guide_integration_20261127.md).
- [Contrat et fiches des extensions](../../data/combat_extensions_20261127.json).
- [Bible complète 1.11](../../BIBLE.md).

Le contenu couvre les taunts, sélection et vraie désélection, assistances, relais, jauges d'équipe, supers et fins dramatiques, clashes/QTE, entités indépendantes, projectiles persistants, bonus et exploration. Le second module distingue découverte, droit d'accès, disponibilité technique et compatibilité ; il documente aussi personnages, costumes, stages, modes, acquisition permanente, accès temporaire, hors ligne et soutien.

Les duos et gestes de combat proposés sont des adaptations du projet. Les personnages, costumes et armes restent rattachés à leurs jeux et versions. Les archives de contenu abandonné ne deviennent pas du canon publié. Aucune intégration Patreon ni autre paiement n'est active.

## Poses individuelles

| Personnage | Confirmation | Désélection | Taunt |
|---|---|---|---|
| Adrian Shephard — Opposing Force | Ajustement d'une sangle, posture prête | Garde relâchée et recul | Invitation gestuelle silencieuse |
| Père Grigori — Half-Life 2 | Annabelle relevée, main sur le torse ; v2 de cadrage retenue | Arme en port bas et retrait | Index levé, admonestation |

[Galerie des fichiers](GALLERY.md) · [Registre du lot et prompts exacts](generation_register.json) · [États de présentation](presentation_states.json).

Une image correspond à un personnage et une pose. Les PNG originaux du générateur sont conservés, avec leur canal alpha, sans retouche de pixels par script. La première sélection de Grigori laissait seulement 9 pixels au-dessus du sujet au seuil alpha 128 ; une nouvelle génération de cadrage apporte une marge lisible. La première sortie reste archivée et n'est plus sélectionnée.

Les poses sont des **images clés candidates**. Il reste à valider les visages, mains, proportions, détails d'armes et contours ; à régler une échelle et un pivot communs ; puis à produire les entrées, sorties et dessins intermédiaires. Des pixels d'alpha très faible subsistent autour de certaines silhouettes. Aucun clip complet, aucune certification de fidélité 1:1 et aucune nouvelle arène à six couches ne sont déclarés terminés.

## Références et cohérence

Les modèles retail [Player_hlof](https://combineoverwiki.net/images/8/89/Player_hlof.png) et [Monk](https://combineoverwiki.net/images/9/9c/Monk_model.jpg) ont été inspectés. Ils sont hébergés par un wiki communautaire, pas directement par Valve. Les candidats du lot F servent seulement de continuité de style. Le masque, les verres verts, le camouflage urbain et la protection PCV de Shephard sont conservés comme invariants ; pour Grigori, veste à motifs, petit pendentif, baskets rouges et arme personnelle sont suivis.

Les sources primaires [Valve — npc_monk.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/npc_monk.cpp) et [weapon_annabelle.cpp](https://github.com/ValveSoftware/source-sdk-2013/blob/3e957b70b167929f120360115d359d1ecb4c1699/src/game/server/hl2/weapon_annabelle.cpp) confirment l'identité du modèle et de l'arme. Elles ne certifient pas les pixels des images générées. Annabelle conserve la relation canon/tube-magasin et le levier du modèle ; la géométrie fine de la bouche reste à comparer, sans reprendre comme spécification un « double canon » mentionné dans un ancien prompt.

## Ce qui fonctionne dans le prototype

Les dossiers Strider, Dropship, Gunship et Gargantua se consultent depuis Boss Battle. Une carte verrouillée reste accessible au clavier et ouvre ses conditions. Une victoire sur l'opération correspondante **OU** un Boss Rush de quatre victoires admissibles débloque le dossier définitivement. L'entraînement, la défaite et un parcours incomplet n'accordent rien. Les anciens records valides sont repris ; leur date d'origine n'est pas inventée.

La sauvegarde de collection est isolée de la gestion. L'attribution est idempotente et la persistance fusionne les acquisitions de plusieurs onglets. Une sauvegarde corrompue, un stockage refusé ou une version future sont gérés. La panne d'une illustration est annoncée séparément et n'enlève pas le droit acquis.

Les **six combattants, quatre opérations et trois modes existants restent accessibles**. Les nouvelles poses ne sont pas encore des animations du moteur. Les fonctions tag, assist, supers combinées, QTE, bonus et exploration sont conçues dans la bible ; elles ne sont pas présentées comme implémentées.

Quatre images déjà existantes servent aux dossiers. Une d'entre elles, le Gunship, était déjà utilisée en combat. Le registre compte donc **12 images distinctes utilisées dans l'application : 9 pour le rendu Boss Battle et 4 dans la galerie, avec une image commune**. Les illustrations de galerie ne changent ni collisions ni phases des boss.

## Vérification et reprise

- [Préservation des images historiques et usages de galerie](preservation_audit.json).
- [Résultat de recherche du lot M](lot_m_recovery_audit.json).
- [Audit global des fichiers](../asset_audit.md).
- [File des cibles restant à poursuivre](../MISSING_TARGETS.md).

Les validateurs des guides, de conception et de production contrôlent les sources, empreintes, identifiants, chemins et compteurs. Les tests du module couvrent les droits multiples, conditions ET/OU, dépendances, résultat de combat, migration, sauvegarde et cas de plusieurs onglets. La compilation, les tests Vitest et les parcours Playwright sont vérifiés par les contrôles de la PR ; leur résultat courant figure sur GitHub. Le réseau de cet environnement a refusé l'installation npm locale (HTTP 403), sans modification des dépendances pour contourner ce refus.

Les exports Word/Excel v1 restent les instantanés historiques explicitement désignés dans la bible. Les documents Markdown/JSON courants et les originaux du guide portent la version 1.11.
