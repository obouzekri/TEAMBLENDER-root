# TEAMSPARK - Standard message de commit (deploiement / environnement)

Derniere mise a jour: 2026-05-10

Objectif: imposer un message de commit structure pour toute modification liee au deploiement, a l'infrastructure, aux workflows CI/CD, ou aux variables d'environnement.

## 1) Regle obligatoire

Tout commit touchant ces zones doit contenir:

- `scope`
- `impact`
- `rollback`

Sans ces 3 blocs, le commit est considere non conforme.

## 2) Format obligatoire

```text
<type>(<scope>): <resume court>

impact:
- <impact utilisateur/systeme>
- <risque principal>

rollback:
- <commande ou action de retour>
- <verification post-rollback>
```

## 3) Types et scope recommandes

Types autorises:

- `deploy`
- `infra`
- `ci`
- `config`
- `fix`

Scope recommandes:

- `backend`
- `frontend-next`
- `railway`
- `vercel`
- `github-actions`
- `env`
- `release`

## 4) Exemples conformes

```text
deploy(backend): add weekly reliability workflow for production checks

impact:
- ajoute un controle hebdomadaire smoke/catalog/5xx
- risque faible: faux positif possible si variable GitHub absente

rollback:
- revert du commit workflow
- verifier que les runs planifies sont arretes
```

```text
config(env): update NEXT_PUBLIC_API_BASE for production vercel project

impact:
- redirige frontend-next vers API Railway de production
- risque moyen: URL invalide peut casser login/session builder

rollback:
- restaurer la valeur precedente dans Vercel
- verifier login manager puis /home
```

## 5) Mode d'emploi rapide

Avant `git commit`, verifier:

- changement de deploiement/env detecte
- message avec `scope`, `impact`, `rollback`
- coherence avec [RELEASE_CHECKLIST_PRE_MAIN.md](RELEASE_CHECKLIST_PRE_MAIN.md)

## 6) Commande utile (template local)

Option locale recommandee:

```powershell
git config commit.template .gitmessage-deploy-env.txt
```

Note: cette commande configure un template localement sur la machine du contributeur.
