# Lot P — relecture indépendante HL2

27 novembre 2026. Cinq fichiers produits par l’agent principal ont été affichés, puis comparés directement aux cinq images de référence originales. **Les cinq restent des candidats; aucune fidélité 1:1, animation ou intégration moteur n’est certifiée.** Aucun PNG n’a été modifié pendant cette revue.

| Candidat | Observation principale | Réserve ouverte |
|---|---|---|
| Combine Assassin | Optique rouge, respirateur, deux pistolets, posture et ressorts de talon cohérents avec la référence. | Microtexture et mains reconstruites; faible alpha résiduel à contrôler en moteur. |
| Combine Guard synth | Armure olive massive, tête humaine en retrait, antenne, points bleus, pieds et canon porté conservés. | Visage/usure plus détaillés que la petite source; ne pas confondre son canon coloré avec le modèle d’arme gris séparé. |
| Bullsquid coupé HL2 | Palette sombre rouille, cinq tentacules visibles, œil jaune et deux pattes cohérents. | Pores, ventouses et reliefs reconstruits; aucune animation ou projection validée. |
| Houndeye coupé HL2 | Vue frontale, œil composé violet/ocre et trois membres cohérents avec la prévisualisation. | Très petite portion utile de la référence: facettes interprétées. Étude frontale seulement, aucun profil de combat validé. |
| Combine Guard Gun non texturé | Géométrie grise facettée, boucles et panneaux conservés, aucune texture inventée. | Frange soupçonnée dans l’aperçu RGBA non reproduite sur composites opaques; marges étroites mais pas de coupe majeure observée. |

Aucun échange majeur de variante ni recadrage majeur n’a été observé. La présence d’une silhouette entière ne certifie pas les proportions 3D ou les faces cachées. Les relevés d’alpha détaillés de l’agent principal accompagnent cette revue; des résidus alpha faibles restent à contrôler en moteur.

## Correction du diagnostic de contour

Le liseré blanc initialement signalé sur l’aperçu RGBA du canon **ne se reproduit pas** après composition alpha correcte sur des fonds opaques noir, clair, gris sombre et violet. Le même contrôle de l’Assassin sur fonds noir et clair ne reproduit pas non plus le liseré soupçonné. Les JPEG de diagnostic ont été inspectés; aucune nouvelle génération ni retouche de ces PNG n’est nécessaire sur ce motif. Cette correction du faux positif ne certifie pas un alpha parfait, ni les bords après réduction ou animation. Les fichiers PNG originaux restent inchangés.

[Relevé détaillé et sources exactes](hl2_independent_review.json) · [Prompts et sources HL2](hl2_prompts_sources.json) · [Prompts et sources des armes](weapon_prompts_sources.json).
