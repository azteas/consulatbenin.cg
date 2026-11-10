# Consulat du Bénin au Congo — site officiel
## consulatbenin.cg
TanStack Start (React) · Paraglide (FR/EN) · Tailwind v4 · shadcn/ui · Motion. Aucune base de données : le site s'appuie sur des API tierces.
Planning détaillé : [PLANNING.md](PLANNING.md).

## Démarrage

```bash
pnpm install
npx vite dev --port 3000    # http://localhost:3000  (EN : /en/)
```

Variables d'environnement dans `.env.local` (modèle : `.env.example`) :
- `CONTACT_API_URL` / `CONTACT_API_KEY` : API qui reçoit les messages du formulaire de contact. Sans `CONTACT_API_URL`, le message est seulement tracé en console en développement, et refusé en production.

## Structure
- `src/routes/` — pages (accueil + pages provisoires : consulat, services, rendez-vous, suivi, actualités, aller-au-benin, contact)
- `src/components/layout/` — en-tête, pied de page
- `src/server/` — fonctions serveur qui appellent les API tierces (contact)
- `src/data/` — contenus structurés (sites touristiques, coordonnées, réseau consulaire)
- `messages/fr.json`, `messages/en.json` — textes traduits (français = langue de base)
