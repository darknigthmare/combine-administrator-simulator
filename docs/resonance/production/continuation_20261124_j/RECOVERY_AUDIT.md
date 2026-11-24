# Audit de récupération des anciens lots

Audit du 24 novembre 2026, comparé à la PR #7 au commit `8891c3cd2e9fa3c11b45e28de1ebfac83d978296`, arbre `2f749aefc04a4cf4ed81086ba6651e1b8ff505aa`.

## Résultat

**Un seul PNG historique valide non enregistré a été retrouvé.** Les 612 occurrences locales de fichiers de production examinées dans trois copies ont toutes un chemin correspondant dans l’arbre distant. La copie la plus récente comporte 261 fichiers comparés identiques octet pour octet. Les différences des copies plus anciennes portent sur 15 fichiers du lot H et 12 du lot F déjà remplacés par des versions plus récentes.

| Copie | Fichiers examinés | Identiques au distant | Différents | Chemins absents |
|---|---:|---:|---:|---:|
| `/workspace/scratch/684967c2474e/resonance` | 196 | 181 | 15 | 0 |
| `/workspace/scratch/9e9f7b53022e/combine-administrator-simulator` | 155 | 143 | 12 | 0 |
| `/tmp/resonance-edbb` | 261 | 261 | 0 | 0 |

La copie `/tmp/resonance-edbb` portait 156 chemins indexés au-dessus d’un ancien commit, mais les fichiers comparés étaient déjà publiés dans la PR. L’index local ne signalait donc pas à lui seul du contenu encore inédit.

## Sorties brutes

108 fichiers bruts ont été inventoriés. Parmi les 17 sorties dont le blob était absent de l’arbre distant: 4 fichiers sont vides, 12 sont des itérations historiques non retenues (9 F, 3 H) et 1 est le candidat à récupérer. Les itérations écartées conservent leur exclusion documentée; elles ne sont pas réintroduites comme livrables sélectionnés.

## Candidat récupéré

- Source: `/workspace/scratch/684967c2474e/generated_images/exec-86f841e8-9abb-47ed-84f9-ccbffd7f38e2.png`.
- Destination: `assets/resonance/candidates/continuation_20261124_j/recovered/stage_questionable_ethics_hl1_master_h_recovered.png`.
- SHA-256: `737e8141218ae7b20c171b1f0f03b475232f1192d4ae229f78cfce413af3302e`.
- Git blob: `6d40eb6a4b174dcfd7b84cdc21713cc90a68e2c0`.
- Format: RGB, 2172 × 724, 2 306 767 octets.
- Identité inférée par comparaison visuelle avec la [salle laser c2a4f de Questionable Ethics](https://combineoverwiki.net/wiki/File:C2a4f_laser.jpg), cible `STG_EXT_HL1_QUESTIONABLE_ETHICS`.

Le prompt original reste inconnu et est enregistré comme `null`. Aucun nouvel appel n’a produit cette récupération. Les octets correspondent exactement à la source historique, vérifiés de nouveau après restauration de l’environnement.

Ce décor demeure un master opaque à revoir: adaptation latérale de la salle, faisceaux laser absents, voie avant étroite et sol vers 88,7 % de la hauteur plutôt que 84 %. Aucune séparation en six couches ni intégration moteur n’est déclarée.

`recovery_audit.json` conserve les empreintes et chemins du snapshot inspecté, les comparaisons par copie, et la classification de chacune des 17 sorties absentes. `recovery_generation.json` conserve la provenance et les réserves du candidat récupéré.
