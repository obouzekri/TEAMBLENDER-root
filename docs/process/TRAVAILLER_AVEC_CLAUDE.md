# Travailler sur TeamBlender avec Claude Code

## 1. Ouvrir une session TeamBlender

Sur claude.ai/code (web ou application mobile/desktop) :

1. **Nouvelle session** → choisir le dépôt **`obouzekri/TEAMBLENDER-root`**.
2. Écrire la demande. Claude clone lui-même `frontend-next/` et `backend/`
   (instructions dans `CLAUDE.md`).

Un seul dépôt à sélectionner pour toute la plateforme. Une session = un sujet :
ouvrir une nouvelle session pour chaque amélioration distincte.

## 2. Formuler une demande

Modèle à copier :

```
Objectif : <ce que tu veux obtenir, du point de vue utilisateur>
Où : <page, écran, parcours — ex. Session Builder, live participant, landing>
Pourquoi : <problème constaté ou gain attendu>
Critère de réussite : <comment savoir que c'est fini>
```

Exemples :

- « Corrige le bug : sur mobile, le participant ne voit pas le timer du Quiz. »
- « Ajoute un export PDF des résultats de session dans la page résultats. »
- « Audit performance de la landing FR, propose un plan avant de coder. »
- « Implémente l'issue #12. »

Mots utiles :
- **« propose un plan d'abord »** → Claude analyse et attend ta validation.
- **« fais-le »** → Claude code, teste et pousse une branche.
- **« ouvre la PR »** → Claude crée la pull request.

## 3. Garder une liste de demandes

Les idées et bugs se notent en issues dans ce dépôt (bouton *New issue* →
modèle « Demande d'amélioration »), même depuis le téléphone. Ensuite, dans une
session : « Implémente l'issue #N ».

## 4. Livraison

Claude pousse une branche par dépôt touché. Ensuite : PR → preview Vercel →
merge sur `main` (voir `FEATURE_TO_PROD_FLOW.md`).
