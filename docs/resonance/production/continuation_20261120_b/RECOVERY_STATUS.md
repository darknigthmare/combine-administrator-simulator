# État de récupération — reprise du 20 novembre 2026

## Référence vérifiée au début de cette reprise

- Dépôt : `darknigthmare/combine-administrator-simulator`.
- PR existante : [#1](https://github.com/darknigthmare/combine-administrator-simulator/pull/1), ouverte en brouillon.
- Branche : `feat/half-life-resonance-bible-v1`.
- Commit distant observé : [`aa2eb7224911be62214fc019b4a823269eb6252c`](https://github.com/darknigthmare/combine-administrator-simulator/tree/aa2eb7224911be62214fc019b4a823269eb6252c).
- Registre de cette référence : neuf demandes, six PNG produits, trois refus enregistrés et aucune certification 1:1.

Les six PNG récupérés depuis cette référence sont :

| Fichier | Nature |
|---|---|
| `combine_elite_hl2_idle_left.png` | Pose individuelle candidate |
| `stage_black_mesa_testchamber_master.png` | Panorama maître candidat |
| `stage_city17_station_master.png` | Panorama maître candidat |
| `layer_black_mesa_floor.png` | Couche candidate |
| `layer_city17_distant_skyline.png` | Couche candidate |
| `prop_hev_suit_charger.png` | Accessoire candidat |

Ils se trouvent dans `assets/resonance/candidates/`. Deux panoramas sont référencés par le prototype Boss Battle. Cette utilisation ne vaut pas validation de fidélité ni achèvement d’un stage à six plans.

## Travaux annoncés auparavant, non récupérés

Le contexte de la conversation précédente mentionne **68 PNG distincts**, un inventaire de **229 cibles**, des extensions Portal/Aperture et des contrôles supplémentaires. Ces informations décrivent une session antérieure : aucun registre ou fichier supplémentaire correspondant n’a été récupéré au début de cette reprise. Elles ne sont donc pas ajoutées aux totaux des fichiers effectivement présents.

Les recherches de fichiers persistants n’ont fourni aucun livrable Half-Life Resonance correspondant. La publication des lots annoncés le 20 novembre n’est pas prouvée par la tête de PR observée ci-dessus. Cette absence de récupération ne démontre pas que les travaux n’ont jamais existé ; elle empêche de les déclarer disponibles dans le dépôt actuel.

## Règle de continuation

Les anciennes images, poses et catalogues ne sont pas reconstruits automatiquement à partir d’un nombre ou d’un résumé de conversation. Tout fichier retrouvé ensuite doit être rapproché du registre avec son chemin, ses dimensions et son empreinte. Toute nouvelle génération est documentée comme nouvelle demande, avec son résultat réel, même si elle représente une cible déjà mentionnée auparavant.

Le registre `docs/resonance/data/generated_art_register.json` et l’audit `scripts/audit-resonance-production.mjs` distinguent demandes, refus et autres demandes non produites, fichiers physiques, contenus PNG distincts, fichiers recensés, certifications déclarées et intégration déclarée. Une image candidate ne ferme pas à elle seule un moveset, une animation ou un stage parallaxe.

Les fichiers créés pendant cette reprise sont comptés uniquement après leur présence vérifiée et leur ajout au registre. Le résultat courant peut être écrit avec :

```bash
node scripts/audit-resonance-production.mjs --write-report
```

L’audit écrit `docs/resonance/production/asset_audit.json` et `asset_audit.md`. Il vérifie les fichiers et métadonnées ; il ne certifie pas la fidélité visuelle 1:1.
