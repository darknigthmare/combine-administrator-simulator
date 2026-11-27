# Extension 02 — Accès, progression et collections

Application Half-Life / Portal du guide 50–67, bible 1.11, 27 novembre 2026. [Original complet](../guides/Combat_Games_Extension_02_Slots_Verrouilles_Deblocages_Abonnes_v1.0.txt) · [Données structurées](../data/combat_extensions_20261127.json) · [Périmètre et sources](guide_integration_20261127.md).

## Frontière de réalisation

La conception ci-dessous concerne personnages, partenaires, costumes, stages et modes. **Le sous-ensemble réalisé par le lot runtime adjacent porte uniquement sur quatre dossiers de terrain du Boss Battle.** Les six profils pilotes, quatre boss et trois modes restent disponibles. Le modèle d’accès ne devient pas un verrou visuel de roster ou une offre d’abonnement par la présence de types génériques.

Les sources autoritatives de la réalisation sont `src/features/resonance/progression/access.ts`, `conditions.ts`, `fieldDossiers.ts` et `FieldDossiers.tsx`. Le contrat documentaire conserve le statut de vérification du lot dans `runtime_crosswalk.validation_status`; le modèle a passé 19 scénarios smoke Node et les tests d’exécution sont séparés du validateur des guides. Les cas reproductibles se trouvent dans [access.test.ts](../../../src/features/resonance/progression/access.test.ts) et [fieldDossiers.test.ts](../../../src/features/resonance/progression/fieldDossiers.test.ts). Leur exécution Vitest/build et l’observation navigateur restent à vérifier dans le rapport du lot runtime.

## Quatre dimensions indépendantes

| Dimension | États de conception | Interprétation |
| --- | --- | --- |
| Découverte | secret / indice / identifié | Un secret vrai utilise un emblème neutre ; une silhouette reconnaissable n’est qu’un indice. |
| Droit | aucun / à réclamer / permanent / temporaire / en attente / expiré | Conserver chaque source d’accès ; plusieurs sources peuvent autoriser un même contenu. |
| Technique | prêt / installation nécessaire / indisponible | Une image manquante ou non validée n’est pas une épreuve de progression ni un paiement requis. |
| Partie | compatible / incompatible | Mode, version, équipe et contexte narratif peuvent empêcher une sélection sans effacer l’acquisition. |

Le calcul de sélection combine droit valide, dépendances, disponibilité technique et compatibilité. La découverte contrôle les informations montrées ; elle ne modifie pas l’état technique. L’interface affiche la prochaine action utile et laisse les autres raisons consultables. L’aléatoire choisit uniquement les contenus utilisables dans le contexte.

Un costume acquis avant son personnage reste acquis. Une panne du service externe reste un état inconnu, pas une expiration. Un contenu qui n’a qu’un PNG candidat reste non prêt pour un duel complet. Ces trois situations ne peuvent pas être représentées par un cadenas identique.

## Charte visuelle Half-Life / Aperture

La métaphore retenue est un dossier partiellement masqué avec lignes de scan et statut d’autorisation. Pour Black Mesa : support administratif sobre, repères lisibles et couleurs inspirées du dossier source choisi. Pour Aperture : fiche de test propre et pictogrammes clairs, sans faire d’un privilège du compte une loi réelle de GLaDOS. Ces présentations sont des **créations UI compatibles**, pas des objets ou scènes officiels ajoutés au récit.

Le niveau secret masque nom, silhouette, voix et descriptions accessibles. Au niveau indice, une silhouette noire contrastée peut apparaître avec un motif de verrou discret. Le focus reste visible au clavier et à la manette. La tentative de sélection ouvre une fiche informative ; elle ne déclenche pas une boucle d’erreurs ni l’ajout d’un contenu interdit.

La révélation proposée dure 24 ticks, abrégeable ; version à mouvements réduits immédiate. L’attribution est enregistrée avant la présentation. Fermer l’écran pendant cette dernière ne perd pas l’objet. Les textes possibles sont « Non révélé », « À débloquer », « Acquis — personnage requis », « Acquis — installation nécessaire », « Vérification indisponible » et « Indisponible dans ce mode » selon le résultat exact.

## Treize fiches de slots et de modes

| Contenu existant | Type | Règle / dépendances | État exact de ce lot |
| --- | --- | --- | --- |
| gordon_hl2 | fighter | libre | Base du prototype libre; aucune condition nouvelle. Contrat documentaire; ces slots ne sont pas ajoutés à la sélection runtime par ce JSON. |
| alyx_hl2 | fighter | libre | Base du prototype libre; aucune condition nouvelle. Contrat documentaire; ces slots ne sont pas ajoutés à la sélection runtime par ce JSON. |
| gina_decay | fighter | GUIDE_UNLOCK_DECAY_PAIR | Portrait et condition consultables; profil de duel encore non implémenté. Contrat documentaire; ces slots ne sont pas ajoutés à la sélection runtime par ce JSON. |
| colette_decay | fighter | GUIDE_UNLOCK_DECAY_PAIR | Même règle que Gina, états et acquisition enregistrés séparément. Contrat documentaire; ces slots ne sont pas ajoutés à la sélection runtime par ce JSON. |
| atlas_portal2 | fighter | GUIDE_UNLOCK_APERTURE_PAIR | Silhouette seulement après indice; absence d’asset indiquée comme technique. Contrat documentaire; ces slots ne sont pas ajoutés à la sélection runtime par ce JSON. |
| pbody_portal2 | fighter | GUIDE_UNLOCK_APERTURE_PAIR | Ne pas remplacer l’absence de sprite par un faux verrou de progression. Contrat documentaire; ces slots ne sont pas ajoutés à la sélection runtime par ce JSON. |
| costume_chell_portal2 | costume | GUIDE_UNLOCK_CHELL_COSTUME / chell_portal1 | Acquisition possible avant le personnage; conservation des collisions prévues. Contrat documentaire; ces slots ne sont pas ajoutés à la sélection runtime par ce JSON. |
| costume_colette_headtohead_ps2 | costume | GUIDE_UNLOCK_COLETTE_COSTUME / colette_decay | Version Head-to-Head identifiée; ne pas la présenter comme tenue campagne. Contrat documentaire; ces slots ne sont pas ajoutés à la sélection runtime par ce JSON. |
| STG_10_DECAY_GAMMA | stage | GUIDE_UNLOCK_DECAY_PAIR | Débloquer une destination ne valide pas ses couches et collisions. Contrat documentaire; ces slots ne sont pas ajoutés à la sélection runtime par ce JSON. |
| STG_EXT_PORTAL2_COOP_HUB | stage | GUIDE_UNLOCK_APERTURE_PAIR | Variante statique de confort comprise lorsque le stage est livré. Contrat documentaire; ces slots ne sont pas ajoutés à la sélection runtime par ce JSON. |
| single | existing_runtime_mode | libre | Aucune nouvelle barrière; entraînement et options restent accessibles. Le mode fonctionne déjà; son éventuel verrou avancé est non retenu pour ce lot. |
| rush | existing_runtime_mode | libre | Aucune nouvelle barrière; entraînement et options restent accessibles. Le mode fonctionne déjà; son éventuel verrou avancé est non retenu pour ce lot. |
| training | existing_runtime_mode | libre | Aucune nouvelle barrière; entraînement et options restent accessibles. Le mode fonctionne déjà; son éventuel verrou avancé est non retenu pour ce lot. |

Les personnages de ces fiches ne sont pas tous jouables : les entrées du catalogue sont des références de production. ATLAS et P-body conservent leurs refus historiques et leur statut de conception. Les compagnons indispensables au moveset font partie du kit ; aucune taxe ou condition supplémentaire ne les retire. Un partenaire de roster et une scène exclusive d’équipe gardent, en revanche, des conditions distinctes.

## Six règles futures de progression

Les règles sont des expressions machine `all`, `any` et `event` dans le JSON documentaire. Elles ne sont pas branchées sur le runtime (`runtime_event_wired: false`). Les événements de chapitres et bonus sont des points d’intégration futurs, pas des événements actuellement émis.

| Règle | Contenu / portée | Condition et sécurité de progression |
| --- | --- | --- |
| GUIDE_UNLOCK_DECAY_PAIR | gina_decay, colette_decay, STG_10_DECAY_GAMMA | 1 route ou 1 bonus; voie de prêt scénarisé disponible avant l’acquisition. Ne jamais exiger les personnages acquis pour lancer leur unique épreuve de déblocage. |
| GUIDE_UNLOCK_APERTURE_PAIR | atlas_portal2, pbody_portal2, STG_EXT_PORTAL2_COOP_HUB | 1 bonus coop terminé; aucune route effective tant que profils et portails ne sont pas livrés. Prêt de simulation des deux robots, sans exiger leur déblocage préalable; disponibilité technique reste distincte. |
| GUIDE_UNLOCK_CHELL_COSTUME | costume_chell_portal2 | Une voie au choix; événement d’archive seulement après fonctionnalité livrée. Conserver le costume acquis même si chell_portal1 reste inaccessible; restriction de période en récit. |
| GUIDE_UNLOCK_COLETTE_COSTUME | costume_colette_headtohead_ps2 | Deux conditions distinctes visibles; aucune identification de version implicite. Acquisition conservée avant celle du personnage; n’altère pas le kit. |
| GUIDE_UNLOCK_BME_REPORT | accomplissement du bonus, sans nouvelle cible | Une réussite; journal de bonus seulement, sans nouveau personnage ni bonus de dégâts. Aucun objet nouveau de catalogue revendiqué. |
| GUIDE_UNLOCK_RAVENHOLM_REPORT | accomplissement du bonus, sans nouvelle cible | Trois vagues dans la même épreuve; sauvegarder accomplissement au résultat. Rejouer ne duplique ni coût ni rapport. |

La route Decay prête les deux profils pour la séquence de déblocage, puis la récompense les accorde ensemble. La voie alternative de bonus fournit le même résultat et ne facture rien deux fois. La règle Colette Head-to-Head utilise deux conditions ET afin de vérifier la version ; la règle Chell Portal 2 offre des alternatives OU. La possession d’un costume ne change pas sa compatibilité avec le récit.

Toutes les attributions sont permanentes dans ces six règles de jeu. L’identifiant de récompense demeure stable même si le libellé ou la traduction change. Une migration ne peut reconnaître rétroactivement qu’un événement conservé dans une sauvegarde réelle ; elle n’invente pas l’accomplissement d’un ancien joueur.

## Quatre dossiers de terrain : périmètre effectif du lot adjacent

| Dossier | Boss existant | Condition prévue par le module autoritatif |
| --- | --- | --- |
| dossier_strider_hl2 | strider_hl2 | Victoire single éligible aux records sur ce boss OU parcours rush complet éligible; jamais training, défaite ou rush incomplet. |
| dossier_dropship_hl2 | dropship_hl2 | Victoire single éligible aux records sur ce boss OU parcours rush complet éligible; jamais training, défaite ou rush incomplet. |
| dossier_gunship_hl2 | gunship_hl2 | Victoire single éligible aux records sur ce boss OU parcours rush complet éligible; jamais training, défaite ou rush incomplet. |
| dossier_gargantua_hl1 | gargantua_hl1 | Victoire single éligible aux records sur ce boss OU parcours rush complet éligible; jamais training, défaite ou rush incomplet. |

L’acquisition automatique est permanente et idempotente. La progression possède sa clé `resonance.progression.dossiers.v1`, séparée de la gestion. Les records historiques sont relus selon leur schéma réel, sans leur attribuer un succès d’entraînement. Un Boss Rush incomplet ne livre pas les quatre dossiers ; une défaite non plus. Le comportement quand le stockage est bloqué ou corrompu doit conserver la possibilité de jouer et afficher la limite de persistance.

Les dossiers sont des fiches consultables. Ils n’accordent pas des dégâts, armes, nouveaux boss, silhouettes certifiées ni capacités supplémentaires. Le résultat Dropship reste une interception de nacelle/renforts suivie du retrait du transport, jamais une destruction fictive du corps.

## Stages, variantes et compatibilité de match

L’acquisition d’une arène reste distincte de l’état de ses images et collisions. Les variantes de période, météo ou destruction ont leur propre politique anti-spoiler. Les modes vivant/statique servant au confort ne changent pas la géométrie et ne sont pas réservés aux abonnés.

Pour une future scène avec transition, l’ensemble des destinations et assets doit être disponible avant le départ. Si une destination n’est pas accessible à tous les participants selon les règles retenues, choisir une configuration sans transition ou un stage commun. Aucun déplacement en cours de combat ne doit ouvrir une page d’achat ni provoquer une erreur de chargement.

Un éventuel stage de soutien distingue droit de le sélectionner et droit d’y participer quand l’adversaire le choisit. Sa géométrie et sa lisibilité ne doivent pas donner d’avantage caché. La comparaison technique, les règles d’entraînement et les replays sont des gates avant toute activation en réseau ; le multijoueur en ligne n’est pas livré par cette documentation.

## Soutien et abonnements : conception différée

Aucun fournisseur, campagne, niveau, tarif, lot d’avantages ou compte lié n’est configuré. Le champ `active_benefits` reste vide. Le modèle peut prévoir récompense permanente, catalogue temporaire ou livraison par période, chacun avec règles annoncées. Une offre réelle devra préciser droits d’usage des assets, dépendances, plateformes, permanence, alternatives gratuites et traitement des acquisitions existantes.

Une intégration future devra valider les droits dans un service de confiance et utiliser le parcours d’autorisation du fournisseur. Le jeu ne demande pas son mot de passe et ne s’accorde pas un avantage externe en changeant un booléen local. Liaison, admissibilité confirmée, renouvellement, déliaison et suppression de compte sont des événements distincts. Les documents sources conservent leurs références de service ; leurs détails devront être revérifiés lors de l’implémentation.

Une acquisition permanente issue d’un défi survit à l’expiration d’une autre source temporaire. Une annulation n’implique pas une fin d’accès immédiate universelle : il faut une échéance vérifiée pour l’avantage concerné. En panne, l’état reste inconnu selon la politique hors ligne à publier. Les préférences et la progression sont conservées, même si un costume temporaire est remplacé par un choix accessible au match suivant.

Une partie valablement autorisée garde sa configuration jusqu’au résultat. La prochaine sélection applique le nouvel état. Les événements doublés ou désordonnés doivent être idempotents et réconciliés. Aucun de ces contrats ne vaut intégration Patreon opérationnelle.

## Validation et limites

Les six familles de fiches de l’extension sont couvertes par les slots, règles, politique de soutien, charte UI, contrats de stages et scénarios de droits. Les 22 cas du guide original restent consultables. Le contrat du projet définit 26 scénarios communs aux deux extensions, dont droits multiples, ET/OU, dépendances, anti-spoiler, reprise, expiration et idempotence.

Le validateur `node scripts/validate-resonance-guides.mjs` vérifie les identifiants et statuts, pas les comptes abonnés ni les animations. Les tests du module adjacent couvrent son modèle et ses quatre dossiers seulement. Les futurs verrous de roster, costumes, stages, modes et scènes de révélation restent à implémenter puis à observer en jeu.
