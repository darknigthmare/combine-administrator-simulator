# Lot P — contenu coupé, 27 novembre 2026

**81 nouvelles cibles d’archives, 80 notices de sources, 694 tâches, neuf PNG pour huit cibles.** La bible passe en **version 1.13**. Les onze archives déjà présentes sont réexaminées sans doublon : le périmètre comprend désormais **92 cibles d’archives**.

[Galerie et PNG](GALLERY.md) · [Chapitre détaillé](../../chapters/cut_content_20261127.md) · [Catalogue JSON](../../data/cut_content_catalog_20261127.json) · [File dédiée](CUT_CONTENT_QUEUE.md) · [Bible](../../BIBLE.md)

## Périmètre ajouté

| Famille | Nouvelles cibles |
| --- | ---: |
| Half-Life — alpha, modèles, concepts et lieux | 14 |
| Half-Life: Decay — missions abandonnées | 3 |
| Half-Life 2 et épisodes | 47 |
| Half-Life: Alyx — Combine Recon | 1 |
| Portal, Still Alive, Portal 2 et F-Stop | 16 |
| **Total** | **81** |

Ces dossiers couvrent 11 créatures, 15 personnages/PNJ, 20 lieux, cinq boss/concepts de boss, quatre machines, 18 armes/équipements, un véhicule, cinq mécaniques et deux props. Une fiche ne signifie pas que son identité visuelle est complètement établie. Les entrées à preuve secondaire restent classées en recherche.

Chaque cible précise sa révision, ses sources, les versions à ne pas mélanger et les inconnues. Les tâches couvrent, selon son rôle : référence, revue d’identité, image de base, déplacement, attaques/réactions, projectiles/effets, son, présentation/narration, phases de boss, états d’appareil, vue maîtresse, parallaxe, topologie, props et contrôle de livraison. Les tâches propres à Resonance ne sont jamais présentées comme des fonctionnalités Valve retrouvées.

## Images réellement produites

| Cible | Production | Limite principale |
| --- | --- | --- |
| Panther Eye rouge / Diablo | 1 PNG | Révision du rendu de Chuck Jones ; détails et projection à valider |
| Archer HL1 | 1 PNG | Modèle historique ; nage complète non animée |
| Panther Eye bleu alpha | 2 PNG, v2 retenue | Première sortie avec voile conservée ; profil combat absent |
| Combine Assassin HL2 | 1 PNG | Garde du modèle fassassin ; mains et équipement fin à revoir |
| Combine Guard Synth HL2 | 1 PNG | Visage et texture interpolés ; distinct du garde humain en manteau |
| Bullsquid HL2 coupé | 1 PNG | Palette et silhouette de la révision HL2 ; distinct du modèle HL1 |
| Houndeye HL2 coupé | 1 PNG | Étude frontale d’un petit aperçu, sans profil combat |
| Combine Guard Gun | 1 PNG | Étude du worldmodel non texturé, conservé gris |

**11 appels intégrés : neuf sorties, deux refus.** Stukabat et le Sniper Rifle coupé ont été refusés par le générateur au stade de sortie. Aucune image ne leur est attribuée et aucune relance sous un autre nom n’a eu lieu. Huit candidats sont retenus pour revue ; la première version bleue reste disponible. Ce lot ne fournit ni export 4K certifié ni animation complète.

Génération par **image_gen intégré**. Les prompts exacts, références inspectées, décisions, dimensions et empreintes sont conservés dans [generation_register.json](generation_register.json), [hl1_generation.json](hl1_generation.json) et [hl2_weapon_generation.json](hl2_weapon_generation.json). Les PNG ont été copiés sans réencodage. Le détourage du Panther Eye bleu a été corrigé par génération dans une deuxième version ; la première est conservée.

## État consolidé

| Mesure | Après O | Après P |
| --- | ---: | ---: |
| PNG distincts enregistrés | 318 | **327** |
| Demandes du registre | 370 | **381** |
| Cibles totales | 259 | **340** |
| Cibles avec au moins un PNG | 242 | **250** |
| Cibles sans PNG | 17 | **90** |
| Archives | 11 | **92** |
| Archives avec au moins un PNG | 11 | **19** |
| Archives activées dans le jeu | 0 | **0** |
| Images déjà utilisées dans le jeu | 12 | **12** |
| Certification 1:1 / clips complets / stages complets | 0 / 0 / 0 | **0 / 0 / 0** |

L’augmentation des manquants vient des **81 omissions nouvellement recensées**. Les 17 anciennes cibles sans PNG restent ouvertes ; 73 nouvelles archives attendent encore un fichier. Les 128 états d’effets, 131 plans des contrats connus et 24 stages sans contrat du périmètre antérieur restent également ouverts. Les nouveaux stages d’archives ont leurs propres tâches, sans être masqués dans les compteurs historiques.

## Fidélité et sources

Les révisions restent séparées : Panther rouge/bleu, Alien Assassin/Combine Assassin, garde humain/Synth, Bullsquid et Houndeye HL1/HL2, Hopwire et Vortex Hopwire. Les versions coupées de Depot/Wasteland ne font pas passer les portions publiées pour du contenu supprimé. Le Diversity Vent concerne l’aspiration de puzzle abandonnée ; les tubes du jeu publié gardent leur autre usage. Les expériences Episode Three ne définissent pas une apparence finale de Half-Life 3.

Le SDK officiel Valve est verrouillé au commit `3e957b70b167929f120360115d359d1ecb4c1699`. Il peut établir une entité ou une routine, sans prouver une silhouette ni une campagne jouable. Captures de modèles et planches d’auteur hébergées sur des wikis sont identifiées comme telles. Aucun build divulgué n’a été téléchargé pour cette reprise et aucune restauration de fan n’a servi de référence d’apparence.

La [revue indépendante HL2](hl2_independent_review.md), la [revue HL1](hl1_REVIEW.md) et les mesures alpha conservent les limites. Un liseré blanc apparent dans l’aperçu RGBA du Guard Gun a été rétracté après contrôle sur fonds opaques : il ne se reproduit pas dans le composite. Les faibles résidus alpha et le rendu en moteur restent à contrôler. **La fidélité 1:1 demeure un critère de validation, pas un statut déduit de la génération.**

## Préservation et reprise

Les **318 PNG antérieurs gardent leur SHA-256** ; les **370 entrées antérieures du registre sont identiques**. Les trois sources du guide commun et de ses deux extensions restent intactes. [Preuve de préservation](preservation_audit.json).

Le lot O de 25 PNG était encore préparé localement lors de cette reprise. Il est conservé dans un commit séparé avant P. Son TARGET_REVIEW.md manquant a été reconstitué depuis sa file de 259 cibles, avec provenance explicite. Le lot M annoncé antérieurement reste introuvable et n’est pas ajouté aux comptes.

L’environnement local a été temporairement indisponible. Les références ont pu être inspectées via un espace média, puis les fichiers et les contrôles natifs ont été repris à son retour. Le chapitre d’archives n’active aucun nouveau boss ni personnage dans le runtime. Les exports Word/Excel v1 restent historiques ; Markdown/JSON portent cette version courante.

## Vérification reproductible

```bash
node scripts/audit-resonance-production.mjs
node scripts/sync-resonance-production.mjs
node scripts/validate-resonance-design.mjs
node scripts/validate-resonance-boss-design.mjs
node scripts/validate-resonance-guides.mjs
node scripts/test-resonance-production-status.mjs
git diff --check
```

Les contrôles natifs vérifient les fichiers réels, dimensions, SHA-256, cibles/sources, absence de doublons et désactivation des archives. Le test de statuts vérifie qu’une archive ne peut être activée en changeant simplement son étiquette en contenu publié. [Résultats détaillés](validation_summary.json).

Le seul avertissement de synchronisation préexistant concerne la skyline de Cité 17 sans identifiant de plan. Il ne produit pas un faux plan terminé. Les contrôles de compilation et parcours de jeu de la révision publiée sont suivis dans la PR ; aucune validation visuelle ou animation complète n’est déduite de la CI.
