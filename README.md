# TeamBlender

Bienvenue dans TeamBlender, la plateforme professionnelle de team-building conçue pour les managers, RH et facilitateurs.

Cette documentation reflète l’état actuel du monorepo en mode documentation sûre : aucun changement fonctionnel n’a été appliqué, uniquement une clarification du produit, de l’architecture et de la gouvernance documentaire.

## Documentation principale

- Documentation fonctionnelle : [README-fonctionnel.md](README-fonctionnel.md)
- Documentation technique : [README-technique.md](README-technique.md)
- Documentation de référence projet : [docs/README.md](docs/README.md)
- Roadmap active : [todo.md](todo.md)
- Charte graphique actuelle : [docs/product/CHARTE_GRAPHIQUE_ACTUELLE.md](docs/product/CHARTE_GRAPHIQUE_ACTUELLE.md)

## État actuel du produit

TeamBlender permet aujourd’hui à un facilitateur de :
- créer une session ;
- assigner des participants ;
- sélectionner des challenges ;
- lancer la session en live ;
- piloter le déroulé ;
- consulter les résultats.

Les participants rejoignent la session et interagissent avec le challenge actif en temps réel.

## Positionnement visuel actuel

Le produit est aujourd’hui orienté vers :
- une expérience professionnelle et crédible ;
- un style sobre, moderne et lisible ;
- une logique claire pour la gestion de session et la participation ;
- une identité plus “workspace d’entreprise” que “jeu”.

## Démarrage rapide

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend-next
npm install
npm run dev
```

### URLs locales
- Frontend : http://localhost:3100
- Backend API : http://localhost:3000/api
- Health : http://localhost:3000/health
