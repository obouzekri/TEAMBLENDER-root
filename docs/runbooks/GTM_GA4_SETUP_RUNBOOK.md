# GTM + GA4 Setup Runbook (MVP)

Objectif:
Configurer Google Tag Manager pour router les evenements frontend vers GA4 avec les noms deja emis par l application.

Perimetre:
- Frontend injecte GTM si NEXT_PUBLIC_GTM_ID est renseigne.
- Les evenements sont pousses dans dataLayer par le frontend.
- La configuration GA4 se fait dans l interface GTM.

## 1) Prerequis

1. Avoir un conteneur GTM publie (ID du type GTM-XXXXXXX).
2. Avoir un flux Web GA4 actif (Measurement ID du type G-XXXXXXXXXX).
3. Renseigner NEXT_PUBLIC_GTM_ID dans l environnement frontend de la plateforme de deploiement.

## 2) Configuration GTM a creer

### A. Variable constante

1. Aller dans Variables > Variables definies par l utilisateur > Nouvelle.
2. Type: Constante.
3. Nom: GA4 Measurement ID.
4. Valeur: G-XXXXXXXXXX (votre vrai ID).

### B. Tag GA4 Configuration

1. Aller dans Tags > Nouveau.
2. Type: Google Analytics: Configuration GA4.
3. Measurement ID: variable GA4 Measurement ID.
4. Trigger: All Pages.
5. Sauvegarder.

### C. Trigger Custom Event cta_click

1. Aller dans Declencheurs > Nouveau.
2. Type: Evenement personnalise.
3. Nom de l evenement: cta_click.
4. Declenchement: Tous les evenements personnalises.
5. Sauvegarder.

### D. Tag GA4 Event cta_click

1. Aller dans Tags > Nouveau.
2. Type: Google Analytics: Evenement GA4.
3. Tag de configuration: tag GA4 Configuration.
4. Nom de l evenement: cta_click.
5. Parametres d evenement:
   - cta_name -> {{DLV - cta_name}}
   - cta_label -> {{DLV - cta_label}}
   - cta_destination -> {{DLV - cta_destination}}
6. Trigger: Custom Event cta_click.
7. Sauvegarder.

### E. Variables dataLayer pour cta

Creer 3 variables Data Layer Variable:
- DLV - cta_name (Data Layer Variable Name: cta_name)
- DLV - cta_label (Data Layer Variable Name: cta_label)
- DLV - cta_destination (Data Layer Variable Name: cta_destination)

### F. Tags GA4 Event additionnels

Creer des tags GA4 Event pour:
- page_view
- web_performance
- frontend_error

Trigger recommande:
- Type: Evenement personnalise
- Nom evenement exactement egal a chacun des noms ci-dessus

### G. Publication

1. Cliquer sur Submit.
2. Nom de version: MVP GA4 baseline.
3. Description: GA4 config + events cta_click/page_view/web_performance/frontend_error.
4. Publier.

## 3) Verification

### GTM Preview

1. Activer Preview dans GTM.
2. Ouvrir le site.
3. Verifier:
   - gtm.js se charge.
   - le tag GA4 Configuration se declenche sur All Pages.
   - les events cta_click, page_view, web_performance, frontend_error apparaissent.

### GA4 DebugView

1. Ouvrir Admin > DebugView dans GA4.
2. Verifier la reception de:
   - page_view
   - cta_click (avec cta_name, cta_label, cta_destination)
   - web_performance
   - frontend_error

## 4) Mapping code source

- Injection GTM: frontend-next/app/layout.js
- Helpers analytics (dataLayer): frontend-next/lib/analytics.js
- cta_click: frontend-next/app/page.js
- web_performance + frontend_error: frontend-next/components/PostHogProvider.js

## 5) Notes

- L application n utilise pas de tag GA4 direct cote code; GTM est la source unique.
- Sans NEXT_PUBLIC_GTM_ID, aucun event dataLayer n est pousse.
