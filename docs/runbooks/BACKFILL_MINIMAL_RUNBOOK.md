# TeamBlender - Runbook Backfill Minimal Challenges (sans implementation)

Date: 2026-05-10  
Scope: environnement production Railway  
Objectif: repeupler le catalogue Challenges a partir des engines deja presents cote code, sans changer le runtime.

## 1) Decision d'architecture (verrou)
- Catalogue officiel: table Challenges en base de donnees.
- Registre fichier: source d'execution uniquement.
- Aucune logique hybride implicite: si un engine existe en code mais pas en DB, il n'apparait pas au catalogue.

## 2) Pre-checks obligatoires (avant action)
- Auth admin API OK.
- Endpoint API challenges accessible.
- Table Challenges existante et schema conforme au modele applicatif.
- Liste des engine_key cibles validee a 6 entrees:
  - icebreaker_v1
  - copuzzle_live_v1
  - phrase_collaborative_v1
  - escape_room_v1
  - local_page_v1
  - labyrinthe_live_v1
- Fenetre d'intervention definie (operation courte, faible risque).
- Backup logique disponible (export table Challenges avant ecriture).

## 3) Jeu de donnees minimal a injecter
Pour chaque engine_key, preparer une fiche challenge minimale conforme au modele:
- engine_key
- name (libelle catalogue)
- status (publie ou equivalent selon schema)
- source (valeur normalisee, ex: file_registry)
- engine_config minimal si requis par schema (sinon vide)

Important:
- Regle idempotente: ne pas creer de doublon sur engine_key.
- Si la ligne existe deja, ne pas recreer; optionnellement corriger uniquement les champs non critiques.

## 4) Strategie d'execution
- Mode recommande: upsert par engine_key (ou insert conditionnel si absent).
- Ordre: 6 engines standards, puis verification immediate.
- Duree cible: < 15 min (hors validations manuelles).

## 5) Verifications post-backfill (bloquantes)
- Verification DB:
  - Nombre de challenges >= 6.
  - 1 ligne par engine_key attendu.
  - Pas de doublon engine_key.
- Verification API:
  - GET /api/challenges retourne le catalogue (non vide).
- Verification produit:
  - Session Builder affiche les challenges du catalogue.
- Verification runtime:
  - Chaque engine_key catalogue est chargeable par le loader.

## 6) Critere de succes
L'operation est consideree reussie si:
- Le catalogue API est non vide et coherent.
- Les 6 engines cibles sont visibles dans le builder.
- Aucun incident auth/API/runtime n'est introduit.

## 7) Rollback (si anomalie)
- Restaurer la table Challenges depuis le backup pre-backfill.
- Revalider auth, endpoint challenges et affichage builder.
- Ouvrir un incident avec cause racine + plan correctif avant nouvelle tentative.

## 8) Gouvernance apres operation
- Toute creation/edition de challenge catalogue se fait via DB (workflow officiel).
- Le registre fichier reste strictement technique (execution moteur).
- Ajouter un gate de release: catalogue non vide avant go-live.
- Ajouter un smoke test: login admin + GET challenges non vide + affichage builder.

## 9) Checklist courte execution (copiable)
- [ ] Backup table Challenges
- [ ] Valider les 6 engine_key cibles
- [ ] Executer insertion/upsert idempotent
- [ ] Verifier DB (count + unicite engine_key)
- [ ] Verifier API challenges
- [ ] Verifier Session Builder
- [ ] Archiver resultat d'operation (date, operateur, preuves)
