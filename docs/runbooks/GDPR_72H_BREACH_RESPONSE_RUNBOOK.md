# TeamBlender - GDPR 72h Breach Response Runbook

Date: 2026-07-20
Scope: Procedure de notification de violation RGPD (UE 2016/679) en 72h

## 1) Objectif
- Detecter, qualifier, contenir et notifier une violation de donnees personnelles dans les delais legaux.
- Standardiser la coordination entre produit, technique, legal et support.

## 2) Declencheurs
- Acces non autorise a des donnees personnelles.
- Exfiltration, perte, alteration ou indisponibilite de donnees personnelles.
- Incident securite avec impact potentiel sur les droits et libertes des personnes.

## 3) Delai reglementaire
- Horloge de 72h demarre a partir du moment ou TeamBlender a connaissance de la violation.
- Si notification hors delai, justification documentee obligatoire.

## 4) RACI
- DPO/Legal: Responsable qualification RGPD et notification autorite.
- Tech Lead: Responsable containment technique, investigation, journalisation.
- Product Lead: Responsable impact produit, priorisation actions correctives.
- Support/CS: Responsable communication clients et suivi demandes.
- Incident Commander: Coordonne execution, cadence, decisions Go/No-Go.

## 5) Procedure operationnelle

### Phase A - Detection et qualification (T0 a T0+4h)
1. Ouvrir un incident de securite avec timestamp T0.
2. Identifier systemes, donnees et population impactee.
3. Evaluer severite (confidentialite, integrite, disponibilite).
4. Classer risque pour personnes concernees: faible / moyen / eleve.

### Phase B - Containment et eradication (T0+4h a T0+24h)
1. Isoler composants compromis (rotation secrets, blocage acces, revoke tokens).
2. Preserver preuves (logs, events, snapshots) pour forensics.
3. Appliquer correctifs urgents (patch, reconfiguration, hardening).
4. Verifier stabilite des services critiques.

### Phase C - Notification et communication (T0+24h a T0+72h)
1. Preparer dossier notification autorite (faits, impact, mesures).
2. Notifier autorite competente si risque pour personnes.
3. Informer personnes concernees si risque eleve.
4. Publier communication client factuelle (sans speculation).

### Phase D - Cloture et prevention (post 72h)
1. Documenter cause racine et timeline complete.
2. Definir actions correctives/preventives avec owner + ETA.
3. Valider execution des actions en revue fiabilite hebdo.

## 6) Artifacts obligatoires
- Timeline complete T0 -> cloture.
- Systeme(s) impacte(s), categories de donnees, nombre de personnes.
- Decision log (notification oui/non, rationale).
- Captures de preuves techniques et checks post-remediation.
- Plan d action correctif avec responsables.

## 7) Exercice table-top (60 min)
- Frequence cible: trimestrielle.
- Scenario: fuite de donnees utilisateur via integration tierce.
- Participants minimum: DPO/Legal, Tech Lead, Product Lead, Support.
- Sorties attendues:
  - ecarts identifies,
  - actions correctives priorisees,
  - date de re-test.
