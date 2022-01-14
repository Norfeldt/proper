interface Property {
  id: string
  kvhx: string
  status: number
  darstatus: number
  href: string
  historik: Historik
  etage?: any
  dør?: any
  adressebetegnelse: string
  adgangsadresse: Adgangsadresse
}

interface Adgangsadresse {
  href: string
  id: string
  adressebetegnelse: string
  kvh: string
  status: number
  darstatus: number
  vejstykke: Vejstykke
  husnr: string
  navngivenvej: Navngivenvej
  supplerendebynavn?: any
  supplerendebynavn2?: any
  postnummer: Postnummer
  stormodtagerpostnummer?: any
  kommune: Kommune
  ejerlav: Ejerlav
  esrejendomsnr: string
  matrikelnr: string
  historik: Historik
  adgangspunkt: Adgangspunkt
  vejpunkt: Vejpunkt
  DDKN: DDKN
  sogn: Kommune
  region: Kommune
  landsdel: Landsdel
  retskreds: Kommune
  politikreds: Kommune
  opstillingskreds: Kommune
  afstemningsområde: Afstemningsomrde
  storkreds: Afstemningsomrde
  valglandsdel: Valglandsdel
  zone: string
  jordstykke: Jordstykke
  bebyggelser: Bebyggelser[]
  brofast: boolean
}

interface Bebyggelser {
  id: string
  kode?: number
  type: string
  navn: string
  href: string
}

interface Jordstykke {
  href: string
  ejerlav: Ejerlav2
  matrikelnr: string
  esrejendomsnr: string
}

interface Ejerlav2 {
  kode: number
  navn: string
  href: string
}

interface Valglandsdel {
  href: string
  bogstav: string
  navn: string
}

interface Afstemningsomrde {
  href: string
  nummer: string
  navn: string
}

interface Landsdel {
  href: string
  nuts3: string
  navn: string
}

interface DDKN {
  m100: string
  km1: string
  km10: string
}

interface Vejpunkt {
  id: string
  kilde: string
  nøjagtighed: string
  tekniskstandard: string
  koordinater: number[]
  ændret: string
}

interface Adgangspunkt {
  id: string
  koordinater: number[]
  højde: number
  nøjagtighed: string
  kilde: number
  tekniskstandard: string
  tekstretning: number
  ændret: string
}

interface Ejerlav {
  kode: number
  navn: string
}

interface Kommune {
  href: string
  kode: string
  navn: string
}

interface Postnummer {
  href: string
  nr: string
  navn: string
}

interface Navngivenvej {
  href: string
  id: string
}

interface Vejstykke {
  href: string
  navn: string
  adresseringsnavn: string
  kode: string
}

interface Historik {
  oprettet: string
  ændret: string
  ikrafttrædelse: string
  nedlagt?: any
}
