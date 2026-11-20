# Boss Battle — validation du lot

État vérifié le 19 novembre 2026, package `0.47.0`.

## Périmètre livré

Le module `src/features/resonance/bossBattle` contient une simulation déterministe à 60 Hz, six profils pilotes et quatre rencontres : Strider HL2, Dropship et nacelle, Gunship HL2 et Gargantua HL1. Opération libre, Boss Rush et Entraînement sont implémentés. Le menu principal et le paramètre `?module=resonance-boss-battle` ouvrent le module.

Le catalogue documentaire contient 24 rencontres principales et une archive Hydra désactivée. Vingt rencontres principales supplémentaires, les chroniques, le relais et la coopération restent spécifiés sans être jouables. Les profils de cette simulation ne constituent pas les movesets complets du duel.

## Contrôles exécutés

| Commande | Résultat observé | Portée |
| --- | --- | --- |
| `npm run quality` | Réussite, code de sortie 0 | Lint, tests unitaires, matrice existante et compilation |
| `npm run lint` | Réussite | Aucun diagnostic du linter |
| `npm run test:unit` | 28 tests réussis, deux fichiers | 13 tests Boss Battle et 15 tests existants de la gestion |
| `npm run test:matrix` | 252 configurations, 12 verdicts | Matrice de la gestion ; ce chiffre ne désigne pas des combats |
| `npm run build` | Réussite | TypeScript et bundle Vite ; module Boss Battle chargé séparément |
| `node scripts/validate-resonance-design.mjs` | Réussite | Données historiques, provenance des six images et utilisation de deux panoramas dans le prototype |
| `node scripts/validate-resonance-boss-design.mjs` | Réussite | 24 rencontres, une archive, quatre boss jouables, six pilotes, 29 sources et 72 groupes visuels planifiés |
| `git diff --check` | Réussite | Absence d’erreurs d’espacement dans le diff |

L’environnement npm affiche un avertissement sur sa configuration `http-proxy`. Il ne provient pas du code du module et n’a pas empêché les commandes de réussir.

## Ce que les tests du moteur vérifient

- Un même état, une même graine et les mêmes entrées produisent le même résultat, sans mutation de l’état reçu.
- Introduction et pause arrêtent le temps actif et les dégâts.
- Les tirs ordinaires ne neutralisent pas le Strider ou le Gunship ; les orbes AR2 restent distinctes. Le corps du Dropship est invulnérable, y compris aux orbes.
- Une rafale de Gunship peut intercepter une roquette. Sa passe d’assaut reste une rafale blocable, sans canon à distorsion de Strider.
- Le circuit de Gargantua exige les deux générateurs et consomme leurs charges après la décharge.
- Un adversaire encore vivant ne produit pas une victoire par simple durée de survie. La nacelle, les renforts et le retrait conditionnent ensemble la résolution du Dropship.
- Les 24 associations des six pilotes et des quatre boss sont terminées par des séquences d’entrées en difficulté **Découverte** (`story`). Ce contrôle ne valide pas l’équilibrage des difficultés Normal et Vétéran.
- Un résultat terminal reste stable. Le Rush parcourt les quatre opérations, conserve leurs résultats et réapprovisionne les ressources prévues entre les étapes.
- L’entraînement est exclu des records. Une partie normale peut se terminer en défaite. Une continuation du moteur après échec rend le parcours concerné inéligible aux records.

L’interface relance le Rush depuis la première opération. Le score et le temps du parcours additionnent les quatre résultats ; son rang reprend le plus bas rang des quatre opérations. Ces agrégations et la persistance locale ont fait l’objet d’une revue du code, sans test de navigateur achevé.

## Validation visuelle et interactive non achevée

Le serveur de développement a démarré sur l’interface locale. Le navigateur distant n’a pas pu accéder à cet aperçu ; le lancement du navigateur automatisé local a également été bloqué par l’environnement. Aucune capture d’écran ni exécution de bout en bout dans le navigateur n’est présentée comme réussie.

Le parcours manuel depuis le menu, le retour à la gestion, la lisibilité mobile, les commandes tactiles, le focus clavier et les performances d’affichage restent donc à vérifier dans un navigateur qui peut ouvrir l’application. Les contrôles unitaires et la compilation ne remplacent pas cette vérification.

## Fidélité et limites de production

Le prototype utilise des silhouettes schématiques et deux panoramas candidats déjà présents dans le projet. Le registre Boss Battle contient **72 groupes visuels planifiés, zéro groupe terminé et zéro certification 1:1**. Aucun sprite animé final de boss n’est livré. La fidélité des proportions, matériaux, sons et animations exige encore la production des assets et une comparaison avec des captures de la version de référence.

Les immunités et les objectifs s’appuient sur les références citées dans le [chapitre Boss Battle](../BOSS_BATTLE.md). Les valeurs de dégâts, les fenêtres d’attaque, les trois phases, le placement des équipements partagés et les parcours croisés sont des adaptations originales pour Resonance. Leur présence ne constitue pas une reproduction 1:1 du gameplay source.

Les anciens exports Word et Excel restent des instantanés du lot v1 et ne contiennent pas cette extension. Les sources Markdown et JSON actuelles documentent Boss Battle. Aucun multijoueur, moteur de duel complet ou déploiement en production n’est validé par ce lot.
