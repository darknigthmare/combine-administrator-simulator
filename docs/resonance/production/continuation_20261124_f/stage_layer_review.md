# QA du lot F — cinq couches et deux maîtres

## Résultat

Les **7 PNG vérifiés sont intègres et mesurent 2172 × 724**, comme les couches D/E. Les cinq plans ont un alpha réel ; les deux maîtres sont RGB. Aucune image finale ni métadonnée du dépôt n’a été modifiée.

Les piles Canaux et Ravenholm ont maintenant **six fichiers candidats cohérents en superposition statique**. Ce contrôle ne termine ni la validation 1:1, ni l’intégration moteur, ni la parallaxe.

## Canaux

La nouvelle couche L05 place le tuyau et les herbes aux coins inférieurs. Elle ne couvre aucun pixel avec alpha > 64 dans la région centrale x=325–1846, y=144–589. Le plan central sélectionné reste L02 v2 du lot E. Les six plans s’alignent sur le même canevas et ne créent pas de fond opaque parasite.

Le haut visible du sol D est à y = 577 sur les 80 % centraux. La zone de marche doit recevoir un ancrage explicite : le bord supérieur du sol et la ligne des pieds ne sont pas nécessairement identiques.

## Ravenholm : ancrage du sol à résoudre

Les nouvelles couches L01/L02/L03/L05 s’assemblent avec le ciel et le sol E. Le premier plan conserve le centre dégagé. Le plan L03 doit rester derrière les combattants : le réservoir gauche occupe une petite partie du champ latéral.

**Le contrat situe le sol à y = 880 dans 1080 px.** Une mise à l’échelle verticale uniforme placerait cette ligne vers y = 590 dans le PNG de 724 px, alors que le sol visible commence vers **y = 622–624**. Cela ferait flotter les pieds d’environ32 px source, soit48 px logiques. Le transform de ces images n’étant pas défini, il s’agit d’un point à résoudre avant de déclarer le sol aligné. Définir un ancrage propre au stage, puis tester le rendu ; ne pas décaler automatiquement les PNG.

## Alpha et bords

Les faibles pixels d’alpha hors des silhouettes expliquent certaines grandes bornes. Le très faible nombre de pixels exactement opaques ne signifie pas que les bâtiments sont transparents : leurs pixels intérieurs sont principalement entre 241 et 254. La composition réelle ne montre pas de damier ni de fond coloré brûlé.

Les façades proches touchent les bords, ce qui convient au cadre statique mais ne fournit pas une marge de défilement. Le raccord et les zones découvertes pendant la parallaxe restent à tester.

## Deux maîtres HLDM

**Pool Party :** les matériaux jaunes, le ciel violet, les roches organiques, les bassins cyan et les portes sont bien reconnaissables d’après la capture officielle. La plateforme de combat et l’agencement frontal sont une adaptation. Le nombre de bassins visible n’est pas reproduit intégralement.

**Rocket Frenzy :** fusée rouge/blanche, piliers rouillés, rayures jaunes/noires et lumières cyan sont conservés. Les petits marquages de la fusée sont déformés et demandent une vérification sur texture source. Le sol circulaire de la capture devient une piste plane.

Les deux maîtres restent des compositions candidates ; aucune de leurs couches n’est fournie dans ces sept fichiers.

## Fichiers de QA

- `qa_layers_f.html` : page de superposition interactive avec les vrais PNG.
- `qa_canals_six_layers_f.png` : composition alpha diagnostique au cadre initial.
- `qa_ravenholm_six_layers_f.png` : composition alpha diagnostique au cadre initial.
- `qa_layers_f.json` : mesures, SHA256, détails et recommandations.

Chromium local n’a pas pu démarrer : erreur `socket() Operation not permitted`. Les deux vues diagnostiques ont donc été rendues par composition alpha exacte, sans rééchantillonnage ni modification des assets. La parallaxe dynamique n’est pas déclarée testée.
