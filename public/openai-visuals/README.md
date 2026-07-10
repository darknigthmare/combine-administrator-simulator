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

All prompts requested realistic, oppressive Half-Life 2 Combine production art with no readable generated text, logos, watermarks, Aperture references, or generic spaceship styling. Administrator portraits use the same centered chest-up dossier composition and administrative wall. Unit dossiers use the same landscape tactical-card composition with the subject on the right and dark UI space on the left.

Files are consumed by `src/components/NewGameIntakeScreen.tsx`, `src/components/UiuxV2CommandDeck.tsx`, `src/components/DedicatedScreens.tsx`, `src/components/UiuxProgressionPanel.css`, `src/systems/uiuxProgressionSystem.ts`, and `src/App.tsx`.
