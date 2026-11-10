import { contact } from '#/data/contact'
import { getLocale } from '#/paraglide/runtime'

type Text = { fr: string; en: string }

// Portraits : déposer src/assets/consuls/<key>.webp (ou .jpg / .png) — détectés automatiquement.
const portraits = import.meta.glob('/src/assets/consuls/*.{webp,jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const portraitFor = (key: string): string | undefined =>
  Object.entries(portraits).find(([path]) => path.split('/').pop()?.split('.')[0] === key)?.[1]

export type Consulate = {
  /** Sert aussi au nom du portrait : public/images/consuls/<key>.webp */
  key: string
  city: string
  zone: Text
  name: Text
  /** Nom du consul, à renseigner. */
  head?: string
  role: Text
  addressLines?: string[]
  poBoxes?: string[]
  phones?: string[]
  emails?: string[]
  geo?: { lat: number; lon: number }
}

export const consulates: Consulate[] = [
  {
    key: 'brazzaville',
    city: 'Brazzaville',
    zone: { fr: 'Congo, Brazzaville', en: 'Congo, Brazzaville' },
    name: { fr: 'Consulat honoraire du Bénin à Brazzaville', en: 'Honorary Consulate of Benin in Brazzaville' },
    role: { fr: 'Chef de poste consulaire, consul honoraire', en: 'Head of consular post, honorary consul' },
    addressLines: contact.addressLines,
    poBoxes: contact.poBoxes,
    phones: contact.phones,
    emails: contact.emails,
    geo: contact.geo,
  },
  {
    key: 'pointe-noire',
    city: 'Pointe-Noire',
    zone: { fr: 'Congo, Pointe-Noire', en: 'Congo, Pointe-Noire' },
    name: { fr: 'Consulat du Bénin à Pointe-Noire', en: 'Consulate of Benin in Pointe-Noire' },
    role: { fr: 'Chef de poste consulaire', en: 'Head of consular post' },
    // Source : liste des consuls honoraires du MAEC (via recherche web, page non consultable directement)
    // recoupée sur l'avenue et le BP avec l'annuaire consulatdubenin.be. À CONFIRMER par appel avant mise en ligne.
    // À compléter : nom du consul, position GPS (bouton « itinéraire »).
    addressLines: ['Avenue Charles de Gaulle', 'Pointe-Noire'],
    poBoxes: ['BP 1216'],
    phones: ['+242 05 557 35 78', '+242 06 459 92 54'],
    emails: ['consulatgeneraldubenin.pnr@gmail.com'],
  },
]

export const txt = (t: Text) => t[getLocale() === 'en' ? 'en' : 'fr']

export const directionsFor = (g: { lat: number; lon: number }) =>
  `https://www.google.com/maps/dir/?api=1&destination=${g.lat},${g.lon}`
