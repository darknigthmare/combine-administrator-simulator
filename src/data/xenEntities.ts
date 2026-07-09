/** Xen ecological codex. Add flora/fauna/parasite entities here without touching UI code. */
import type { XenEntity } from '../types/game';

export const xenCodex: XenEntity[] = [
  { name: 'Headcrab', danger: 46, ecology: 'Parasite opportuniste transformant les humains en zombies.', preferred: 'Logements, égouts, caves, ruines.', containment: 'Scellement rapide, nettoyage CP, quarantaine biologique.' },
  { name: 'Fast Headcrab', danger: 66, ecology: 'Variante rapide, propagation brutale en secteur dense.', preferred: 'Blocs résidentiels et hôpitaux abandonnés.', containment: 'Manhacks, suppressors, évacuation contrôlée.' },
  { name: 'Poison Headcrab', danger: 82, ecology: 'Vecteur hautement paniquant, associé aux poison zombies.', preferred: 'Zones sombres, entrepôts, égouts.', containment: 'Équipe de quarantaine, interdiction d’accès, incinération.' },
  { name: 'Barnacle', danger: 51, ecology: 'Prédateur fixe au plafond, contrôle les passages.', preferred: 'Canaux, tunnels, bâtiments humides.', containment: 'Scanners biologiques et nettoyage de conduites.' },
  { name: 'Antlion', danger: 73, ecology: 'Faune coloniale liée aux vibrations et sols meubles.', preferred: 'Périphérie, sous-sols, zones industrielles.', containment: 'Réduction vibrations, hunters, exclusion de secteur.' },
  { name: 'Antlion Guard', danger: 94, ecology: 'Organisme lourd de colonie, catastrophe locale.', preferred: 'Périphérie contaminée, tunnels effondrés.', containment: 'Strider, gunship ou abandon administratif.' },
  { name: 'Ichthyosaur', danger: 70, ecology: 'Prédateur aquatique rare mais fatal.', preferred: 'Canaux profonds et bassins inondés.', containment: 'Interdiction aquatique, sonar, purge du bassin.' },
  { name: 'Xen Fungus / Wall Growth', danger: 58, ecology: 'Croissance organique qui transforme le bâti en niche Xen.', preferred: 'Quarantine Zone, hôpital, égouts.', containment: 'Brûlage, cloisonnement, arrêt de ventilation.' },
  { name: 'Tentacle', danger: 98, ecology: 'Organisme stationnaire massif réagissant au son.', preferred: 'Silos, infrastructures profondes.', containment: 'Évacuation sonore, piège industriel, bombardement ciblé.' },
];
