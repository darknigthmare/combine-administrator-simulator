# Step 3 — Propagation réelle Rebelle / Xen par réseau connecté

Cette passe transforme la simulation journalière : les secteurs ne dérivent plus seulement avec des valeurs locales. Les pressions rebelles et Xen se propagent maintenant par les connexions de la carte stratégique ajoutées à l'étape 2.

## Fichiers ajoutés

```txt
src/systems/propagationSimulation.ts
```

## Fichiers modifiés

```txt
src/App.tsx
```

## Ce que fait le nouveau moteur

### Résistance / réseau Lambda

La Résistance se propage plus facilement par :

- canaux ;
- égouts ;
- routes de service ;
- connexions contestées ;
- routes déjà contrôlées par la Résistance ;
- secteurs à faible loyauté ;
- secteurs affamés ou fatigués ;
- secteurs très réprimés avec peur élevée.

Elle est mieux contenue par :

- surveillance élevée ;
- routes contrôlées par Combine ;
- Airwatch ;
- Overwatch ;
- Synths lourds ;
- couvre-feu.

### Xen / biosphère parasite

Xen se propage plus facilement par :

- égouts ;
- sas de quarantaine ;
- périphérie contaminée ;
- ancien hôpital ;
- infrastructures basses ;
- secteurs déjà fragilisés par l'insurrection.

Xen est mieux contenu par :

- équipes de quarantaine biologique ;
- secteurs en quarantaine ;
- forte surveillance ;
- synths / suppressors / Overwatch ;
- routes contrôlées par Combine.

## Rapports enrichis

Les rapports de fin de journée ajoutent maintenant :

- nombre de secteurs touchés par pression Lambda voisine ;
- nombre de secteurs touchés par vecteur Xen ;
- noms des routes Lambda les plus dangereuses ;
- noms des vecteurs Xen les plus dangereux ;
- flashpoints critiques.

Exemple :

```txt
Propagation Lambda : 3 secteurs ont reçu une pression voisine significative.
Bloc résidentiel B contaminé par réseau Lambda depuis Canaux via accès maintenance non déclaré.
Propagation Xen : 2 secteurs ont reçu un vecteur biologique notable.
Ancien hôpital exposé à un vecteur Xen depuis Zone de quarantaine via brèche sanitaire.
```

## Effet gameplay

La prochaine étape peut maintenant s'appuyer sur un vrai moteur :

- les rebelles ne surgissent plus au hasard ;
- Xen suit des routes biologiquement crédibles ;
- sceller les égouts ou renforcer les canaux devient stratégique ;
- une quarantaine trop tardive transforme les secteurs voisins ;
- les routes contrôlées par Combine ralentissent la propagation.

## Application

Depuis la racine du dépôt :

```bash
cp -r combine-lore-upgrade/src/* ./src/
cp combine-lore-upgrade/README_STEP3_CONNECTED_PROPAGATION.md ./
npm run dev
```

Puis :

```bash
git add src README_STEP3_CONNECTED_PROPAGATION.md
git commit -m "Add connected rebel and Xen propagation simulation"
git push
```
