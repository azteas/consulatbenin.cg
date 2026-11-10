// Coordonnées officielles du consulat (source : fournies par le consulat).
export const contact = {
  addressLines: ['73, rue Faignond (ex-rue Mbakas)', 'Poto-Poto, Brazzaville'],
  poBoxes: ['BP 852', 'BP 169'],
  phones: ['+242 05 556 78 33', '+242 06 679 13 01', '+242 066 64 21 32'],
  emails: ['consulatdubenin.bzv@gmail.com', 'cohbeymas@yahoo.fr'],
  // Position approximative : la rue Mbakas (ex-rue Faignond) dans OpenStreetMap.
  // Le numéro 73 n'est pas référencé, le repère est donc placé sur la rue.
  geo: { lat: -4.2616692, lon: 15.2858863 },
}

export const telHref = (p: string) => `tel:${p.replace(/\s+/g, '')}`

const { lat, lon } = contact.geo
const d = 0.0045
export const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d * 1.6}%2C${lat - d}%2C${lon + d * 1.6}%2C${lat + d}&layer=mapnik&marker=${lat}%2C${lon}`
export const mapOpenUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`
