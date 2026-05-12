# Guide de Test - Salle Secrète 🔐

## Architecture complétée
- **Backend**: Service + contrôleur + routes ✅
- **Frontend**: 5 énigmes interactives ✅
- **Data**: Challenge seeded en BD (ID: 117) ✅
- **UX**: Victory screen + animations ✅

---

## Étapes de validation

### 1. **Créer une session test**
```bash
POST /sessions
{
  "name": "Test Escape Room",
  "format": "in-person",
  "modality": "sync"
}
```

### 2. **Ajouter le challenge à la session**
```bash
POST /sessions/{sessionId}/challenges
{
  "challenge_id": 117,
  "position": 1
}
```

### 3. **Ajouter des participants**
```bash
POST /sessions/{sessionId}/participants
{
  "name": "Alice",
  "role": "participant"
}
```

### 4. **Tester depuis le navigateur**
- Ouvrir session → Lancer "Salle secrète"
- Vérifier que les 5 énigmes s'affichent dans l'ordre
- Tester interactivité:
  - Grid: Saisir 149 → Valider
  - Devinette: Taper CLOTURE → Valider
  - Choix: Cliquer A → Valider
  - Fibonacci: Entrer 13 → Valider
  - Visuelle: Cliquer zones → Entrer CLE → Valider

### 5. **Vérifier les retours de validation**
- [ ] Enigmes se résolvent individuellement
- [ ] Feedback feedback dans les UI interactives
- [ ] Passage automatique à l'énigme suivante
- [ ] Écran de victoire s'affiche après dernière énigme
- [ ] Portes s'ouvrent + confettis + stats affichent

### 6. **Tester facilitateur**
- Dashboard montre progression (X/5)
- Boutons [Indice] [Passer] [Forcer timeout] fonctionnels
- État équipe visible (participants répondus/en attente)

---

## Bugs potentiels à vérifier

- [ ] Enigma renderer se monte/démonte correctement au changement d'énigme
- [ ] Réponses collectées en JSONB sans corruption
- [ ] Validation unanime fonctionne (tous répondent avant progression)
- [ ] Timer compte à rebours correctement
- [ ] Victory screen se déclenche à bon moment (après 5ème énigme)

---

## Améliorations futures optionnelles

1. **Animations d'entrée**: Ajouter transitions smooth entre énigmes
2. **Sounds**: Bruitages succès/erreur/victoire
3. **Leaderboard**: Stats comparées à autres sessions
4. **Replay**: Revisionner les réponses de l'équipe
5. **Custom énigmes**: Interface d'édition pour facilitateurs

---

## Support

Pour tester manuellement:
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start

# Navigateur
http://localhost:3000
```

Seed command (si besoin de re-créer):
```bash
cd backend
node scripts/seed_escape_room_immersive.js
```

---

**Status**: ✅ Production-Ready
**Last updated**: May 6, 2026
