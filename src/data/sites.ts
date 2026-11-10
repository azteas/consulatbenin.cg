import { getLocale } from '#/paraglide/runtime'

type Text = { fr: string; en: string }

export type Site = {
  key: string
  image: string
  name: Text
  place: Text
  blurb: Text
  /** Position du point focal pour le recadrage (object-position). */
  focus?: string
}

export const sites: Site[] = [
  {
    key: 'cite',
    image: '/images/benin/citeministerielcotonou.webp',
    focus: 'center 40%',
    name: { fr: 'Cité ministérielle', en: 'Ministerial City' },
    place: { fr: 'Cotonou', en: 'Cotonou' },
    blurb: {
      fr: "Le nouveau quartier des ministères de Cotonou : un grand ensemble de bureaux, de jardins et de bassins qui réunit l'administration béninoise.",
      en: "Cotonou's new ministerial district: a large complex of offices, gardens and pools that brings the Beninese administration together.",
    },
  },
  {
    key: 'ouidah',
    image: '/images/benin/ouidah.webp',
    name: { fr: 'Porte du Non-Retour', en: 'Gate of No Return' },
    place: { fr: 'Ouidah', en: 'Ouidah' },
    blurb: {
      fr: "Face à l'océan, un monument à la mémoire des hommes et des femmes embarqués de force pendant la traite. Le point d'arrivée de la Route des Esclaves.",
      en: 'Facing the ocean, a monument to the men and women forced onto ships during the slave trade. The end of the Slave Route.',
    },
  },
  {
    key: 'amazones',
    image: '/images/benin/amazones.webp',
    name: { fr: 'Place des Amazones', en: 'Amazons Square' },
    place: { fr: 'Cotonou', en: 'Cotonou' },
    blurb: {
      fr: "La statue monumentale de l'Amazone, hommage aux guerrières du royaume du Dahomey, face au port de la capitale économique.",
      en: 'The monumental statue of the Amazon, a tribute to the warriors of the Kingdom of Dahomey, facing the port of the economic capital.',
    },
  },
  {
    key: 'ganvie',
    image: '/images/benin/ganvie.webp',
    name: { fr: 'Ganvié', en: 'Ganvié' },
    place: { fr: 'Lac Nokoué', en: 'Lake Nokoué' },
    blurb: {
      fr: "Un village entier bâti sur pilotis au milieu du lac, où l'on circule en pirogue. Souvent surnommé la « Venise de l'Afrique ».",
      en: 'An entire village built on stilts in the middle of the lake, where people travel by pirogue. Often called the "Venice of Africa".',
    },
  },
  {
    key: 'kota',
    image: '/images/benin/kota.webp',
    name: { fr: 'Chutes de Kota', en: 'Kota Falls' },
    place: { fr: 'Natitingou', en: 'Natitingou' },
    blurb: {
      fr: "Des cascades en pleine végétation, près de Natitingou. Une baignade rafraîchissante après la route du nord.",
      en: 'Waterfalls in lush vegetation near Natitingou. A refreshing swim after the road north.',
    },
  },
  {
    key: 'abomey',
    image: '/images/benin/abomey.webp',
    name: { fr: "Palais royaux d'Abomey", en: 'Royal Palaces of Abomey' },
    place: { fr: 'Abomey', en: 'Abomey' },
    blurb: {
      fr: "Les palais des rois du Dahomey, inscrits au patrimoine mondial de l'UNESCO en 1985. Bas-reliefs, trônes et récits d'un royaume puissant.",
      en: 'The palaces of the kings of Dahomey, a UNESCO World Heritage Site since 1985. Bas-reliefs, thrones and the story of a powerful kingdom.',
    },
  },
  {
    key: 'pendjari',
    image: '/images/benin/pendjari.webp',
    name: { fr: 'Parc de la Pendjari', en: 'Pendjari National Park' },
    place: { fr: 'Atacora', en: 'Atacora' },
    blurb: {
      fr: "L'un des derniers grands refuges de la faune d'Afrique de l'Ouest : éléphants, hippopotames, lions et plus de 300 espèces d'oiseaux.",
      en: "One of West Africa's last great wildlife refuges: elephants, hippos, lions and over 300 bird species.",
    },
  },
  {
    key: 'tata',
    image: '/images/benin/tata.webp',
    name: { fr: 'Tata Somba', en: 'Tata Somba' },
    place: { fr: 'Atacora', en: 'Atacora' },
    blurb: {
      fr: "Les maisons-forteresses à étages du peuple Otammari : greniers, chambres et bétail réunis sous un même toit d'argile.",
      en: 'The fortified, multi-storey homes of the Otammari people: granaries, bedrooms and livestock under one clay roof.',
    },
  },
  {
    key: 'route-peches',
    focus: 'center 60%',
    image: '/images/benin/littoral.webp',
    name: { fr: 'Route des Pêches', en: "Fishermen's Road" },
    place: { fr: 'Cotonou – Ouidah', en: 'Cotonou – Ouidah' },
    blurb: {
      fr: "Une longue route côtière entre océan et lagune, bordée de cocotiers, de plages et de villages de pêcheurs.",
      en: 'A long coastal road between ocean and lagoon, lined with coconut palms, beaches and fishing villages.',
    },
  },
  {
    key: 'pythons',
    focus: '4% 40%',
    image: '/images/benin/pythons.webp',
    name: { fr: 'Temple des Pythons', en: 'Python Temple' },
    place: { fr: 'Ouidah', en: 'Ouidah' },
    blurb: {
      fr: "Un lieu du culte vodoun où les pythons sont vénérés. Le vodoun, né sur cette terre, reste vivant dans le Bénin d'aujourd'hui.",
      en: 'A site of vodun worship where pythons are revered. Vodun, born on this land, is still alive in Benin today.',
    },
  },
  {
    key: 'dantokpa',
    image: '/images/benin/dantokpa.webp',
    name: { fr: 'Marché Dantokpa', en: 'Dantokpa Market' },
    place: { fr: 'Cotonou', en: 'Cotonou' },
    blurb: {
      fr: "L'un des plus grands marchés d'Afrique de l'Ouest. Épices, tissus, poissons et mille voix à la fois.",
      en: "One of West Africa's largest markets. Spices, fabrics, fish and a thousand voices at once.",
    },
  },
]

// Photos utilisées ailleurs que dans la galerie (bannière d'accueil).
export const extraPhotos: Site[] = [
  {
    key: 'littoral',
    image: '/images/benin/littoral.webp',
    focus: 'center 68%',
    name: { fr: 'Le littoral aménagé', en: 'The developed coastline' },
    place: { fr: 'Route des Pêches', en: "Fishermen's Road" },
    blurb: { fr: '', en: '' },
  },
  {
    key: 'marina',
    image: '/images/benin/boulevardmarina.webp',
    focus: 'center 55%',
    name: { fr: 'Boulevard de la Marina', en: 'Boulevard de la Marina' },
    place: { fr: 'Cotonou', en: 'Cotonou' },
    blurb: { fr: '', en: '' },
  },
]

export const text = (t: Text) => t[getLocale() === 'en' ? 'en' : 'fr']
