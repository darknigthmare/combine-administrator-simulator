# COAN OpenAI Visual Pack

Generated with the built-in OpenAI image tool for the UI/UX progression pass.

## Banners

- `banners/command-deck.webp`: Citadel command room, City 17 overlook, dark left-side UI space.
- `banners/citadel-requisitions.webp`: secure Combine logistics and authorization office.

## Command modules

- `modules/city17-surveillance.webp`: Civil Authority sector surveillance table overlooking occupied City 17.
- `modules/breencast-archive.webp`: layered BreenCast archive terminal inside a retrofitted civic control room.

## Authorization visuals

- `unlocks/ota-command.webp`: Overwatch Transhuman Arm deployment bay.
- `unlocks/xen-bioscan-lore.webp`: Xen bioscan containment chamber with a recognizable Antlion specimen.
- `unlocks/nova-channel.webp`: Nova Prospekt external intake facility.
- `unlocks/xen-research-lore.webp`: Combine blacksite containing canonical Antlion, Antlion grub, and Headcrab specimens.
- `unlocks/advisor-link-lore.webp`: direct Advisor liaison chamber with a non-humanoid Advisor presence.
- `unlocks/razor-train.webp`: black wedge-nosed Combine freight train on the human rail network.

## Administrator portraits

- `administrators/civil-director.webp`: formal Civil Authority director.
- `administrators/field-prefect.webp`: experienced field administrator.
- `administrators/combine-technocrat.webp`: Combine-integrated technocrat.
- `administrators/quarantine-director.webp`: quarantine and biosecurity director.

## Unit dossiers

- `units/civil-protection.webp`: Civil Protection checkpoint officer.
- `units/city-scanner.webp`: City Scanner surveillance patrol.
- `units/overwatch-soldier.webp`: Overwatch Soldier deployment corridor.
- `units/hunter-lore.webp`: three-legged Hunter synth with its paired cyan sensory plates on an exterior Razor corridor.
- `units/manhack-lore.webp`: Manhack patrol with the correct cutting-blade chassis inside a residential block.
- `units/combine-elite.webp`: Combine Elite in a secure Citadel passage.
- `units/strider.webp`: Strider patrol on a City 17 avenue.
- `units/gunship-lore.webp`: biomechanical Gunship with the canonical annular rear rotor above an industrial canal.
- `units/bioquarantine-team-lore.webp`: HLA-style yellow Combine hazmat workers at a Xen containment barrier.
- `units/advisor-lore.webp`: Advisor inspection chamber inside the Citadel with horizontal grub-like morphology.
- `units/combine-grunt-lore.webp`: early-occupation quarantine infantry with HLA Grunt silhouette and equipment.
- `units/combine-ordinal-lore.webp`: Ordinal field commander with radio pack, dark armor, and command markings.
- `units/combine-suppressor-lore.webp`: heavy urban suppression specialist with HLA Suppressor armor and weapon profile.
- `units/dropship-lore.webp`: twin-lobed biomechanical Dropship gripping a troop deployment pod.

## Classified person dossiers

- `dossiers/lambda-courier.webp`: Lambda courier inside a canal safehouse.
- `dossiers/suspected-citizen.webp`: suspected anti-citizen under checkpoint surveillance.
- `dossiers/nova-detainee.webp`: Nova Prospekt resistance detainee at intake.
- `dossiers/vortigaunt-biotic-lore.webp`: captive three-armed Vortigaunt Biotic assigned to containment work.

## Crisis events

- `events/civilian-riot.webp`: ration riot at a Civil Protection checkpoint.
- `events/lambda-sabotage.webp`: Lambda sabotage inside an industrial facility.
- `events/xen-breach.webp`: hospital quarantine barrier under Xen pressure.
- `events/overwatch-pacification.webp`: Overwatch escalation on a barricaded avenue.
- `events/citadel-audit.webp`: Advisor audit of a human administrator inside the Citadel.
- `events/moral-quarantine.webp`: civilian quarantine-door dilemma under Xen pressure.
- `events/breencast-propaganda.webp`: coerced public BreenCast viewing in City 17.
- `events/infrastructure-failure.webp`: failed Combine relay at a City 17 rail and power interchange.

All prompts requested realistic, oppressive Half-Life 2 Combine production art with no readable generated text, logos, watermarks, Aperture references, or generic spaceship styling. Administrator portraits use the same centered chest-up dossier composition and administrative wall. Unit dossiers use the same landscape tactical-card composition with the subject on the right and dark UI space on the left.

Files are consumed by `src/components/NewGameIntakeScreen.tsx`, `src/components/UiuxV2CommandDeck.tsx`, `src/components/DedicatedScreens.tsx`, `src/components/UiuxProgressionPanel.css`, `src/systems/uiuxProgressionSystem.ts`, and `src/App.tsx`.
