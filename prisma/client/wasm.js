
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "a9055b89e58b4b5bfb59600785423b1db3d0e75d"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.RegistrationsScalarFieldEnum = {
  id: 'id',
  datum_1_registrace: 'datum_1_registrace',
  datum_1_registrace_v_cr: 'datum_1_registrace_v_cr',
  ztp: 'ztp',
  es_eu: 'es_eu',
  druh_vozidla: 'druh_vozidla',
  druh_vozidla_2_radek: 'druh_vozidla_2_radek',
  kategorie_vozidla: 'kategorie_vozidla',
  tovarni_znacka: 'tovarni_znacka',
  typ: 'typ',
  varianta: 'varianta',
  verze: 'verze',
  vin: 'vin',
  obchodni_oznaceni: 'obchodni_oznaceni',
  vyrobce_vozidla: 'vyrobce_vozidla',
  vyrobce_motoru: 'vyrobce_motoru',
  typ_motoru: 'typ_motoru',
  max_vykon: 'max_vykon',
  max_vykon_otacky: 'max_vykon_otacky',
  palivo: 'palivo',
  zdvihovy_objem: 'zdvihovy_objem',
  plne_elektricke_vozidlo: 'plne_elektricke_vozidlo',
  hybridni_vozidlo: 'hybridni_vozidlo',
  trida_hybridniho_vozidla: 'trida_hybridniho_vozidla',
  emisni_limit: 'emisni_limit',
  stupe__plneni_emisni_urovne: 'stupe__plneni_emisni_urovne',
  korigovany_soucinitel_absorpce: 'korigovany_soucinitel_absorpce',
  co2: 'co2',
  co2_mesto: 'co2_mesto',
  co2_mimo_mesto: 'co2_mimo_mesto',
  specificke_co2: 'specificke_co2',
  snizeni_emisi_nedc: 'snizeni_emisi_nedc',
  snizeni_emisi_wltp: 'snizeni_emisi_wltp',
  spotreba_mesto: 'spotreba_mesto',
  spotreba_mimo_mesto: 'spotreba_mimo_mesto',
  spotreba_kombinovana: 'spotreba_kombinovana',
  spotreba_pri_rychlosti: 'spotreba_pri_rychlosti',
  spotreba_el_mobil: 'spotreba_el_mobil',
  dojezd_zr: 'dojezd_zr',
  vyrobce_karoserie: 'vyrobce_karoserie',
  druh_karoserie: 'druh_karoserie',
  vyrobni_cislo_karoserie: 'vyrobni_cislo_karoserie',
  barva: 'barva',
  barva_doplnkova: 'barva_doplnkova',
  pocet_mist_celkem: 'pocet_mist_celkem',
  pocet_mist_k_sezeni: 'pocet_mist_k_sezeni',
  pocet_mist_k_stani: 'pocet_mist_k_stani',
  delka: 'delka',
  sirka: 'sirka',
  vyska: 'vyska',
  rozvor: 'rozvor',
  rozchod: 'rozchod',
  provozni_hmotnost: 'provozni_hmotnost',
  nejvetsi_technicky_pripustna_hmotnost: 'nejvetsi_technicky_pripustna_hmotnost',
  nejvetsi_povolena_hmotnost: 'nejvetsi_povolena_hmotnost',
  nejvetsi_technicky_pripustna_hmotnost_na_napravu: 'nejvetsi_technicky_pripustna_hmotnost_na_napravu',
  nejvetsi_povolena_hmotnost_na_napravu: 'nejvetsi_povolena_hmotnost_na_napravu',
  nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: 'nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden',
  nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: 'nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho',
  nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: 'nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz',
  nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: 'nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho',
  nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: 'nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy',
  nejvetsi_povolena_hmotnost_jizdni_soupravy: 'nejvetsi_povolena_hmotnost_jizdni_soupravy',
  hmotnosti_vozidla_pri_testu_wltp: 'hmotnosti_vozidla_pri_testu_wltp',
  predpis_spotreba_paliva: 'predpis_spotreba_paliva',
  prumerna_hodnota_uzitecneho_zatizeni: 'prumerna_hodnota_uzitecneho_zatizeni',
  spojovaci_zarizeni: 'spojovaci_zarizeni',
  pocet_naprav: 'pocet_naprav',
  naprav_pohanenych: 'naprav_pohanenych',
  kola_a_pneumatiky_naprava_1: 'kola_a_pneumatiky_naprava_1',
  kola_a_pneumatiky_naprava_2: 'kola_a_pneumatiky_naprava_2',
  kola_a_pneumatiky_naprava_3: 'kola_a_pneumatiky_naprava_3',
  kola_a_pneumatiky_naprava_4: 'kola_a_pneumatiky_naprava_4',
  vnejsi_hluk_vozidla_stojici: 'vnejsi_hluk_vozidla_stojici',
  vnejsi_hluk_vozidla_otacky: 'vnejsi_hluk_vozidla_otacky',
  vnejsi_hluk_vozidla_jizda: 'vnejsi_hluk_vozidla_jizda',
  nejvyssi_rychlost: 'nejvyssi_rychlost',
  pomer_vykon_hmotnost: 'pomer_vykon_hmotnost',
  inovativni_technologie: 'inovativni_technologie',
  stupe__dokonceni: 'stupe__dokonceni',
  faktor_odchylky_de: 'faktor_odchylky_de',
  faktor_verifikace_vf: 'faktor_verifikace_vf',
  ucel_vozidla: 'ucel_vozidla',
  dalsi_zaznamy: 'dalsi_zaznamy',
  alternativni_provedeni: 'alternativni_provedeni',
  cislo_tp: 'cislo_tp',
  cislo_orv: 'cislo_orv',
  druh_rz: 'druh_rz',
  zarazeni_vozidla: 'zarazeni_vozidla',
  status: 'status',
  pcv: 'pcv',
  abs: 'abs',
  airbag: 'airbag',
  asr: 'asr',
  brzdy_nouzova: 'brzdy_nouzova',
  brzdy_odlehcovaci: 'brzdy_odlehcovaci',
  brzdy_parkovaci: 'brzdy_parkovaci',
  brzdy_provozni: 'brzdy_provozni',
  dopl_kovy_text_na_tp: 'dopl_kovy_text_na_tp',
  hmotnosti_provozni_do: 'hmotnosti_provozni_do',
  hmotnosti_zatizeni_sz: 'hmotnosti_zatizeni_sz',
  hmotnosti_zatizeni_sz_typ: 'hmotnosti_zatizeni_sz_typ',
  hydropohon: 'hydropohon',
  objem_cisterny: 'objem_cisterny',
  zatizeni_strechy: 'zatizeni_strechy',
  cislo_motoru: 'cislo_motoru',
  nejvyssi_rychlost_omezeni: 'nejvyssi_rychlost_omezeni',
  ovladani_brzd_sz: 'ovladani_brzd_sz',
  ovladani_brzd_sz_druh: 'ovladani_brzd_sz_druh',
  retarder: 'retarder',
  rok_vyroby: 'rok_vyroby',
  delka_do: 'delka_do',
  lozna_delka: 'lozna_delka',
  lozna_sirka: 'lozna_sirka',
  vyska_do: 'vyska_do',
  typ_kod: 'typ_kod',
  rm_zaniku: 'rm_zaniku'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  registrations: 'registrations'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
