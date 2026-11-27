# Guide commun de combat — sources intégrées

Le 27 novembre 2026, les trois documents originaux ont été retrouvés sur le Drive de l’utilisateur puis copiés **sans modification de leurs octets** dans ce dossier. Leurs noms, versions, liens d’origine, tailles et SHA-256 sont conservés dans [SOURCE_MANIFEST.json](SOURCE_MANIFEST.json).

L’import des fichiers ne transforme pas leurs fonctions en systèmes jouables. La [matrice des 68 sections](COVERAGE_68.md) précise les décisions, leur application Half-Life/Portal et les limites réelles. L’application au projet est développée dans le [chapitre d’intégration](../chapters/guide_integration_20261127.md), l’[extension 01](../chapters/guide_extension_01_20261127.md) et l’[extension 02](../chapters/guide_extension_02_20261127.md).

| Document | Date du document | Sections | Octets | SHA-256 |
| --- | --- | --- | --- | --- |
| [Combat_Games_Guide_General_v1.0.txt](Combat_Games_Guide_General_v1.0.txt) | 2026-11-25 | 00–29 | 55172 | 4844584616072ac0d52d37c2fab4365e1ec489240f17a721ee216e223b0355b7 |
| [Combat_Games_Extension_01_Tag_Taunts_Bonus_v1.0.txt](Combat_Games_Extension_01_Tag_Taunts_Bonus_v1.0.txt) | 2026-11-26 | 30–49 | 60589 | 330fb7485a7a52b2a20f855646c940aaac0fcd9510032bc84b2e17c518edd25f |
| [Combat_Games_Extension_02_Slots_Verrouilles_Deblocages_Abonnes_v1.0.txt](Combat_Games_Extension_02_Slots_Verrouilles_Deblocages_Abonnes_v1.0.txt) | 2026-11-27 | 50–67 | 47334 | 08b57ea542e83c487fef3276997a612d4657f2ee9ed4f8e46b0bf65a2778038b |

Le guide général date du 25 novembre, l’extension 01 du 26 novembre et l’extension 02 du 27 novembre 2026. Les dates Drive sont conservées en UTC dans le manifeste, sans les confondre avec la date imprimée ou l’heure de Paris.

## Vérification

Depuis la racine du dépôt :

```bash
node scripts/validate-resonance-guides.mjs
```

Cette commande contrôle les trois SHA, la couverture 00–67, les chemins d’application, les identifiants de catalogues et les statuts. Elle n’exécute ni animation, ni combat, ni vérification de fidélité visuelle.
