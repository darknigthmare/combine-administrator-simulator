# Lot P — créatures Half-Life coupées

27 novembre 2026. **Cinq appels, quatre PNG conservés, trois candidats retenus pour la prochaine revue et un refus outil sans image.** Aucune animation, intégration moteur ou fidélité 1:1 n’est déclarée terminée. Les dimensions réelles sont inférieures au format UHD 4K.

## Candidats

| Cible | Sortie | Décision et limites |
|---|---|---|
| Panther Eye rouge / Diablo | 1 448 × 1 086, RGBA | Pose latérale dérivée de la planche de modèle de Chuck Jones. Œil rouge lisse, plaques, crêtes et queue contrôlés. Dents, doigts, reliefs et échelle restent à comparer au modèle. |
| Archer | 1 448 × 1 086, RGBA | Palette rouge/noir, dômes bleus et nageoires conservés d’après le rendu historique. Pose proche de la référence; nage et projectile non produits. |
| Panther Eye bleu alpha — v2 | 1 254 × 1 254, RGBA | Étude de pose front-trois-quarts correspondant au seul angle de référence inspecté. Œil composé rouge distinct de celui de Diablo. Profil latéral, dos et surfaces masquées encore à documenter. |

Les trois candidats retenus présentent des zones alpha=0 et ont été composités sur des fonds clair et sombre pour revue. De faibles pixels alpha subsistent en dehors de leur silhouette utile; les originaux restent inchangés. Les pivots, bords en mouvement et dimensions relatives devront être validés en moteur.

## Sortie écartée mais conservée

La première image du Panther Eye bleu avait un voile blanc/gris, un alpha minimum de 6 et aucun pixel entièrement transparent. Elle est conservée avec `selected_for_next_review=false`. Une nouvelle édition par image_gen a supprimé ce voile; aucun détourage ni nettoyage des pixels par script n’a été appliqué aux PNG.

## Stukabat

La référence originale `Stukabat_model.jpg`, modèle historique avec ses textures en jeu, a été affichée et inspectée avant l’appel. La génération a été refusée au stade de sortie par le système de sécurité (`moderation_blocked`, catégorie `other`, identifiant `4cb21579-1cbd-49de-962d-cda998284dd5`). **Aucune image Stukabat n’a été reçue ni comptée.** La tentative et son prompt sont conservés dans le registre partiel; aucun nouvel essai de contournement n’a été effectué.

## Références et traçabilité

Les images d’origine ont été visualisées directement à partir des fichiers référencés, puis fournies au générateur intégré. Les rendus hébergés par Combine OverWiki restent des références secondaires du modèle original ou du travail de son auteur; ils ne prouvent pas à eux seuls une révision jouable précise. Aucune restauration communautaire n’a été utilisée comme modèle visuel.

- [Panther Eye rouge : planche Diablo de Chuck Jones](https://combineoverwiki.net/wiki/File:Diablopanther1.jpg)
- [Archer : rendu du modèle original](https://combineoverwiki.net/wiki/File:Archer_model.jpg)
- [Panther Eye bleu : modèle alpha](https://combineoverwiki.net/wiki/File:Blue_Panther_Eye_model.jpg)
- [Stukabat : modèle avec textures en jeu](https://combineoverwiki.net/wiki/File:Stukabat_model.jpg)

Les prompts complets, références, révisions, sommes SHA-256 et décisions figurent dans [hl1_generation.json](hl1_generation.json). Les mesures des pixels et de l’alpha sont dans [hl1_alpha_measurements.json](hl1_alpha_measurements.json). Les PNG historiques antérieurs au lot P n’ont pas été modifiés par cette production.
