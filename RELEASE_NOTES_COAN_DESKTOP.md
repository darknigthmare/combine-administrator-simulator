# Combine Administrator Simulator — Desktop Release 0.47.0

## Résumé
Build desktop Tauri du jeu de gestion Combine Administrator Simulator.

## Contenu majeur
- Terminaux spécialisés City / Nova / Citadel / Quarantine.
- Simulation complète : rations, population, CP, informateurs, Lambda, Xen, Nova Prospekt, Vortigaunts, directives, technologies.
- Campagnes, objectifs, événements majeurs, verdict enrichi et chronique finale.
- Audio synthétique, archives vidéo, fenêtres flottantes COAN OS.
- Sauvegardes multi-slots, import/export JSON, historique décisions, codex lore.
- Packaging Windows Tauri NSIS/MSI avec audit COAN.

## Améliorations de cette version
- Menu hors-session avec réglages audio, accessibilité, crédits et mentions.
- Musique originale adaptative avec mix séparé pour musique et effets.
- Création mobile compacte, prologue borné et tutoriel relié à la première journée.
- Sauvegardes et Codex reformulés en interfaces joueur, sans jargon de développement.
- Réquisitions filtrables, vues compacte/détaillée et densité d’information progressive.
- Matrice pré-release : 252 configurations, 12 verdicts et simulation longue.
- Équilibrage du premier mandat et des secteurs Lambda recalibré.
- Versions frontend, Tauri et Cargo synchronisées.

## Artefacts attendus
- `src-tauri/target/release/combine-administrator-simulator.exe`
- `src-tauri/target/release/bundle/nsis/*-setup.exe`
- `src-tauri/target/release/bundle/msi/*.msi`

## Commandes QA recommandées
```bash
npm ci
npm run quality
npm run audit:all
npm run tauri:build
```

## Readmes inclus dans le pack
- README_STEP1_DATA_REFACTOR.md
- README_STEP2_CONNECTED_MAP.md
- README_STEP3_CONNECTED_PROPAGATION.md
- README_STEP4_100_LORE_EVENTS.md
- README_STEP5_FALSIFIABLE_REPORTS.md
- README_STEP6_NOVA_PROSPEKT.md
- README_STEP7_DYNAMIC_BREENCAST.md
- README_STEP8_HALF_LIFE_TIMELINE.md
- README_STEP9_DEDICATED_SCREENS.md
- README_STEP10_AUDIO_VISUAL_LAYER.md
- README_STEP11_ADVANCED_RATION_ECONOMY.md
- README_STEP12_DETAILED_POPULATION.md
- README_STEP13_CITIZEN_REGISTRY.md
- README_STEP14_INFORMANT_NETWORK.md
- README_STEP15_CIVIL_PROTECTION_CORRUPTION.md
- README_STEP16_CITADEL_DIRECTIVE_TREE.md
- README_STEP17_COMBINE_TECHNOLOGIES.md
- README_STEP18_ADVANCED_RESISTANCE.md
- README_STEP19_RESISTANCE_FACTIONS.md
- README_STEP20_VORTIGAUNTS_BIOTICS.md
- README_STEP21_DYNAMIC_XEN_ECOSYSTEM.md
- README_STEP22_XEN_MUTATION_CHAINS.md
- README_STEP23_EVOLVING_QUARANTINE_ZONES.md
- README_STEP24_XEN_RESEARCH_EXPLOITATION.md
- README_STEP25_XEN_CATASTROPHES.md
- README_STEP26_LONG_CAMPAIGNS.md
- README_STEP27_CAMPAIGN_OBJECTIVES.md
- README_STEP28_MAJOR_STORY_EVENTS.md
- README_STEP29_ENRICHED_FINAL_ENDINGS.md
- README_STEP30_FINAL_CHRONICLE.md
- README_STEP31_COAN_DASHBOARD_TERMINAL.md
- README_STEP32_FLOATING_WINDOWS_OS.md
- README_STEP33_SPECIALIZED_TERMINALS_TAURI.md
- README_STEP34_ADVANCED_SYNTH_AUDIO.md
- README_STEP35_VIDEO_ARCHIVES.md
- README_STEP36_MULTI_SAVE_SYSTEM.md
- README_STEP37_DECISION_HISTORY.md
- README_STEP38_LORE_CODEX.md
- README_STEP39_ADVANCED_DIFFICULTY_SETTINGS.md
- README_STEP40_FINAL_AUDIT_CLEANUP.md
- README_STEP41_GAMEPLAY_BALANCE_QA.md
- README_STEP42_PREMIUM_ONBOARDING.md
- README_STEP43_PREMIUM_NEW_GAME_INTAKE.md
- README_STEP44_UX_POLISH_TAURI.md
- README_STEP45_TAURI_BUILD_PACKAGING_QA.md

## Statut
Fangame non commercial et non officiel. Aucun asset audio propriétaire de Half-Life n’est inclus.
