import handler from '@tanstack/react-start/server-entry'

import { paraglideMiddleware } from '#/paraglide/server'

// Détecte la langue depuis l'URL (/en/...) pour le rendu côté serveur.
export default {
  fetch(req: Request): Promise<Response> {
    return paraglideMiddleware(req, () => handler.fetch(req))
  },
}
