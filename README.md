# Consulat du Bénin au Congo — site officiel
## consulatbenin.cg
TanStack Start (React) · PostgreSQL + Drizzle · Better Auth · Paraglide (FR/EN) · Tailwind v4 · shadcn/ui.
Planning détaillé : [PLANNING.md](PLANNING.md).

## Démarrage

```bash
pnpm install
docker compose up -d        # PostgreSQL sur le port 5433
pnpm db:push                # applique le schéma (src/db/schema.ts)
npx vite dev --port 3000    # http://localhost:3000  (EN : /en/)
```

Variables d'environnement dans `.env.local` : `DATABASE_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`.

## Structure
- `src/routes/` — pages (accueil + pages provisoires : consulat, services, rendez-vous, suivi, actualités, aller-au-benin, contact)
- `src/components/layout/` — en-tête, pied de page
- `src/db/schema.ts` — services, pièces requises, demandes, paiements, rendez-vous, actualités, utilisateurs
- `messages/fr.json`, `messages/en.json` — textes traduits (français = langue de base)
