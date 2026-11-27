# Lot J — intégration des poses fixes au Boss Battle

Date : 24 novembre 2026.

Le prototype Boss Battle affiche désormais les PNG candidats de ses six combattants existants et du Gunship de Half-Life 2. Il s’agit de sept images fixes : cette intégration ne complète aucune animation et ne certifie pas la fidélité 1:1. Les comportements, dégâts, ressources, cibles et règles de collision du moteur restent inchangés.

## Assets effectivement branchés

Les imports explicites et leurs identifiants sont dans [spriteAssets.ts](../../../../src/features/resonance/bossBattle/spriteAssets.ts). Chaque entrée expose `assetId` et `repositoryPath` ; le validateur vérifie leur correspondance avec le PNG importé et le registre d’art.

| Rôle moteur | Identifiant d’asset | Chemin du PNG original |
| --- | --- | --- |
| Combattant `gordon_hl2` | `gordon_hl2_idle_h` | `assets/resonance/candidates/continuation_20261124_h/heroes/gordon_hl2_idle_h.png` |
| Combattant `alyx_hl2` | `alyx_hl2_idle_h` | `assets/resonance/candidates/continuation_20261124_h/heroes/alyx_hl2_idle_h.png` |
| Combattant `barney_hl2` | `barney_hl2_idle_h` | `assets/resonance/candidates/continuation_20261124_h/heroes/barney_hl2_idle_h.png` |
| Combattant `shephard_op4` | `shephard_op4_idle_h` | `assets/resonance/candidates/continuation_20261124_h/heroes/shephard_op4_idle_h.png` |
| Combattant `vortigaunt_hl2` | `vortigaunt_hl2_idle_h` | `assets/resonance/candidates/continuation_20261124_h/heroes/vortigaunt_hl2_idle_h.png` |
| Combattant `combine_elite_hl2` | `combine_elite_hl2_idle_left` | `assets/resonance/candidates/combine_elite_hl2_idle_left.png` |
| Boss `gunship_hl2` | `gunship_hl2_hover_left_f` | `assets/resonance/candidates/continuation_20261124_f/gunship_hl2_hover_left_f.png` |

Périmètre de registre : `integration_scope: "boss_battle_static_candidate_sprite"`, `integrated_in_game: true`, `runtime_enabled: true`, `animation_clip_complete: false`, `certified_one_to_one: false`. Ce périmètre désigne le chargement de la pose fixe dans ce prototype et conserve son statut de candidat à revue. Les deux décors déjà branchés gardent le périmètre distinct `boss_battle_prototype_background`. Aucun nouveau master de décor J n’est intégré.

## Mesures, orientations et ancrage

Les sept PNG ont été inspectés visuellement. Les cinq poses Gordon, Alyx, Barney, Shephard et Vortigaunt regardent à droite ; l’Elite et le Gunship regardent à gauche. Les limites visibles sont mesurées avec alpha ≥ 16 ; le rectangle prélevé ajoute huit pixels sur chaque bord pour conserver l’anticrénelage. Les fichiers source ne sont pas modifiés.

Pour les combattants, l’abscisse d’ancrage est la moyenne des centres des deux groupes de pieds détectés dans les 10 % inférieurs de la silhouette avec alpha ≥ 128, contrôlés visuellement. L’ordonnée est le bas de la silhouette à ce même seuil. L’ancre normalisée est calculée dans le rectangle prélevé, pas dans toute l’image. La légère différence de hauteur entre deux semelles d’une pose en trois quarts appartient au dessin source.

| Rôle | Dimensions source | Bounds α≥16 x0/y0/x1/y1 | Crop x/y/largeur/hauteur | Ancre source x/y | Ancre normalisée x/y | Sens source | Taille de dessin |
| --- | --- | --- | --- | --- | --- | --- | --- |
| gordon_hl2 | 1148 × 1370 | 193/65/930/1328 | 185/57/753/1279 | 545/1327 | 0.478088/0.992963 | droite | 58.87 × 100 px |
| alyx_hl2 | 1024 × 1536 | 64/33/911/1512 | 56/25/863/1495 | 463.75/1511 | 0.472480/0.993980 | droite | 57.73 × 100 px |
| barney_hl2 | 1060 × 1484 | 81/25/973/1466 | 73/17/908/1457 | 496.75/1465 | 0.466685/0.993823 | droite | 62.32 × 100 px |
| shephard_op4 | 1199 × 1312 | 232/75/873/1231 | 224/67/657/1172 | 530/1230 | 0.465753/0.992321 | droite | 56.06 × 100 px |
| vortigaunt_hl2 | 1234 × 1274 | 75/45/1166/1229 | 67/37/1107/1200 | 472.75/1228 | 0.366531/0.992500 | droite | 92.25 × 100 px |
| combine_elite_hl2 | 1245 × 1263 | 89/16/1073/1242 | 81/8/1000/1242 | 685.5/1242 | 0.604500/0.993559 | gauche | 80.52 × 100 px |
| gunship_hl2 | 2172 × 724 | 58/41/2121/695 | 50/33/2079/670 | 1000/390 | 0.456950/0.532836 | gauche | 335.12 × 108 px |

L’ancre des combattants est placée en `(player.x, 555 - player.y)`. Le facteur horizontal est `player.facing × sourceFacing`, ce qui retourne la pose autour de son ancre sans déplacer les pieds. L’esquive réduit seulement la hauteur de dessin à 78 %, avec les pieds conservés sur cette même ligne. La marche et les autres actions continuent à déplacer le personnage par le moteur ; aucune séquence dessinée de marche, saut, attaque, impact ou mort n’a été ajoutée. Le retournement miroir inverse aussi les asymétries et inscriptions du PNG ; il ne remplace pas une vraie pose de l’autre côté.

Le Gunship utilise l’ancre source `(1000, 390)` sur le corps, placée en `(boss.x, 555 - boss.y)`, plus le léger balancement de quatre pixels déjà présent dans le rendu antérieur. Le mode mouvement réduit fixe ce balancement à zéro. Le bout du canon nasal a été relevé en `(58, 462)` dans l’image source : les traces visuelles de rafale et de passe partent de ce point transformé, soit environ `(-151,85 ; +11,61)` pixels par rapport au corps quand il regarde à gauche. Les zones dangereuses au sol, leurs temps et leurs dégâts n’ont pas changé. Le rotor fait partie de l’image fixe ; il ne possède aucun clip animé.

## Chargement et repli

Le cache crée une seule `Image` par URL importée. La pose n’est utilisée qu’après chargement complet et lorsque les dimensions naturelles correspondent à la source auditée. Pendant le chargement, après une erreur, en l’absence de l’API navigateur `Image`, ou si les dimensions sont incohérentes, le dessin vectoriel antérieur reste disponible. Une erreur reste mémorisée jusqu’au rechargement du module pour éviter une répétition des requêtes à chaque image de rendu.

La pose fixe conserve les signaux de combat : cadre et halo d’invulnérabilité, transparence en cas de défaite, arc ou éclat d’attaque, projectiles, annonces de dégâts, réticule et télégraphes des boss. Ces signaux sont des indications du prototype ; ils ne sont pas comptés comme des dessins d’animation source.

## Boss laissés en rendu vectoriel

| Boss moteur | Motif |
| --- | --- |
| `strider_hl2` | Le PNG existant est un Strider de White Forest dans Episode Two. Il n’est pas réétiqueté Half-Life 2. |
| `dropship_hl2` | Le prototype distingue le corps invulnérable de la nacelle destructible ; une image composite non séparée ne représente pas correctement ces états. |
| `gargantua_hl1` | L’unique pose disponible, `boss_gargantua_hl1_rear_threequarter_e`, montre principalement le dos et masque l’œil. Elle a été inspectée puis écartée pour ce rôle. |

Aucun combattant, boss ou support supplémentaire n’est rendu jouable. Les catalogues et fonctions du moteur de combat ne sont pas modifiés.

## Validation ciblée

Commande exécutée : `./node_modules/.bin/vitest run src/features/resonance/bossBattle/renderer.test.ts --maxWorkers=1`.

Résultat : **6 tests réussis**. Ils vérifient le cache et les replis de chargement, le rejet des dimensions inattendues, les ancres mesurées des six combattants dans les deux sens et pendant l’esquive, les sept appels au rendu des PNG, la conservation des signaux de combat et de l’état simulé, l’ancrage corps/canon du Gunship, le mode aperçu et les trois boss conservés en vecteurs.

Le validateur des données exige les sept identifiants autorisés, leur propriétaire, leur chemin exact, un import PNG cohérent et le périmètre d’image fixe. Il refuse une déclaration de clip animé ou l’activation d’un autre asset. Après consolidation du registre, la passe principale confirme : **validateur des données, lint, compilation et 19 tests Resonance réussis** (13 tests moteur et 6 tests de rendu).

## Contrôle visuel sur Canvas natif

Un contrôle distinct a exécuté le vrai `renderer.ts`, transpilé avec TypeScript sans modification de son code, sur l’API Canvas 2D `@napi-rs/canvas` déjà installée. Ce contrôle n’utilise ni navigateur ni socket. Les sept PNG ont été décodés avec succès et leurs dimensions naturelles correspondent aux sources auditées.

Six captures temporaires ont été produites hors dépôt dans `/tmp/resonance-runtime-canvas-j/`, puis inspectées : Gordon à droite et à gauche, l’Elite à droite et à gauche, les signaux d’attaque/invulnérabilité face à une rafale du Gunship, et l’esquive. Sur les quatre vues de direction, les ancres mesurées restent exactement en `(240, 555)`. Les visages et armes suivent le sens demandé ; aucune dérive des pieds n’a été observée lors du miroir. Le Gunship est orienté vers la gauche dans les six vues, avec son réticule sur le corps et les traces de rafale attachées au canon nasal. Le cadre d’invulnérabilité, l’éclat d’attaque et le personnage comprimé par l’esquive restent visibles, avec les pieds au sol.

Les observations et matrices de dessin sont conservées avec les captures dans `observations.json`. Les SHA256 du code contrôlé sont : `renderer.ts` = `b2292bbabb0685a619f9f43d294a1bff435a91741b834f54f08b924a28dc263b` ; `spriteAssets.ts` = `4aa2199b746297c016350f791044d1c624fa411452a569537585dcf8c792198d`. Les captures ne sont pas ajoutées au catalogue de production.

## Validation navigateur : blocage de l’exécuteur

Vite a démarré correctement sur `http://127.0.0.1:4179/`. La tentative Playwright a d’abord constaté l’absence du binaire Chromium fourni avec Playwright. Le Chromium système `/usr/bin/chromium`, déjà installé, a ensuite quitté avant l’ouverture d’une page avec l’erreur `FATAL:chrome/browser/process_singleton_posix.cc:297 — socket() failed: Operation not permitted (1)`.

Aucune restriction n’a été contournée et aucun autre navigateur n’a été installé. **Aucune capture ni validation navigateur n’est déclarée réussie.** Le contrôle Canvas natif vérifie le rendu des assets et leurs transformations ; la mise en page React/CSS, les polices propres au navigateur, les interactions clavier/pointeur réelles et le chargement HTTP restent à vérifier dans un navigateur autorisé.
