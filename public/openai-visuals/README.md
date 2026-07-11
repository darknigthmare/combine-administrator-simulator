# COAN OpenAI Visual Pack

Generated with the built-in OpenAI image tool for the UI/UX progression pass.

## Banners

- `banners/command-deck.png`: Citadel command room, City 17 overlook, dark left-side UI space.
- `banners/citadel-requisitions.png`: secure Combine logistics and authorization office.

## Authorization visuals

- `unlocks/ota-command.png`: Overwatch Transhuman Arm deployment bay.
- `unlocks/xen-bioscan.png`: Xen bioscan containment chamber.
- `unlocks/nova-channel.png`: Nova Prospekt external intake facility.
- `unlocks/xen-research.png`: shared Xen containment visual for the dependent research tier.
- `unlocks/advisor-link.png`: direct Advisor liaison chamber.
- `unlocks/razor-train.png`: shared Nova/Razor facility visual for the dependent logistics tier.

## Administrator portraits

- `administrators/civil-director.png`: formal Civil Authority director.
- `administrators/field-prefect.png`: experienced field administrator.
- `administrators/combine-technocrat.png`: Combine-integrated technocrat.
- `administrators/quarantine-director.png`: quarantine and biosecurity director.

## Unit dossiers

- `units/civil-protection.png`: Civil Protection checkpoint officer.
- `units/city-scanner.png`: City Scanner surveillance patrol.
- `units/overwatch-soldier.png`: Overwatch Soldier deployment corridor.
- `units/hunter.png`: Hunter synth on an exterior Razor corridor.
- `units/manhack.png`: Manhack patrol inside a residential block.
- `units/combine-elite.png`: Combine Elite in a secure Citadel passage.
- `units/strider.png`: Strider patrol on a City 17 avenue.
- `units/gunship.png`: biomechanical Gunship above an industrial canal.
- `units/bioquarantine-team.png`: Combine biosecurity team at a Xen containment barrier.
- `units/advisor.png`: Advisor inspection chamber inside the Citadel.
- `units/combine-grunt.png`: early-occupation quarantine infantry.
- `units/combine-ordinal.png`: Ordinal field commander using a tactical projection.
- `units/combine-suppressor.png`: heavy urban suppression specialist.
- `units/dropship.png`: biomechanical aerial transport carrying a deployment pod.

## Classified person dossiers

- `dossiers/lambda-courier.png`: Lambda courier inside a canal safehouse.
- `dossiers/suspected-citizen.png`: suspected anti-citizen under checkpoint surveillance.
- `dossiers/nova-detainee.png`: Nova Prospekt resistance detainee at intake.
- `dossiers/vortigaunt-biotic.png`: captive Vortigaunt Biotic assigned to containment work.

## Crisis events

- `events/civilian-riot.png`: ration riot at a Civil Protection checkpoint.
- `events/lambda-sabotage.png`: Lambda sabotage inside an industrial facility.
- `events/xen-breach.png`: hospital quarantine barrier under Xen pressure.
- `events/overwatch-pacification.png`: Overwatch escalation on a barricaded avenue.

All prompts requested realistic, oppressive Half-Life 2 Combine production art with no readable generated text, logos, watermarks, Aperture references, or generic spaceship styling. Administrator portraits use the same centered chest-up dossier composition and administrative wall. Unit dossiers use the same landscape tactical-card composition with the subject on the right and dark UI space on the left.

Files are consumed by `src/components/NewGameIntakeScreen.tsx`, `src/components/UiuxV2CommandDeck.tsx`, `src/components/DedicatedScreens.tsx`, `src/components/UiuxProgressionPanel.css`, `src/systems/uiuxProgressionSystem.ts`, and `src/App.tsx`.
