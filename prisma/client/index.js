
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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




  const path = require('path')

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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/martin/Code/registrations-server/prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "linux-musl"
      }
    ],
    "previewFeatures": [
      "typedSql"
    ],
    "sourceFilePath": "/Users/martin/Code/registrations-server/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "..",
  "clientVersion": "6.4.1",
  "engineVersion": "a9055b89e58b4b5bfb59600785423b1db3d0e75d",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"typedSql\"]\n  output          = \"./client\"\n  binaryTargets   = [\"native\", \"linux-musl\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n/// This model contains an expression index which requires additional setup for migrations. Visit https://pris.ly/d/expression-indexes for more info.\nmodel registrations {\n  id                                                              Int       @id @default(autoincrement())\n  datum_1_registrace                                              DateTime? @db.Date\n  datum_1_registrace_v_cr                                         DateTime? @db.Date\n  ztp                                                             String?\n  es_eu                                                           String?   @map(\"es/eu\")\n  druh_vozidla                                                    String?\n  druh_vozidla_2_radek                                            String?\n  kategorie_vozidla                                               String?\n  tovarni_znacka                                                  String?\n  typ                                                             String?\n  varianta                                                        String?\n  verze                                                           String?\n  vin                                                             String?\n  obchodni_oznaceni                                               String?\n  vyrobce_vozidla                                                 String?\n  vyrobce_motoru                                                  String?\n  typ_motoru                                                      String?\n  max_vykon                                                       Float?    @db.Real\n  max_vykon_otacky                                                Float?    @db.Real\n  palivo                                                          String?\n  zdvihovy_objem                                                  Float?    @db.Real\n  plne_elektricke_vozidlo                                         Boolean?\n  hybridni_vozidlo                                                Boolean?\n  trida_hybridniho_vozidla                                        String?\n  emisni_limit                                                    String?\n  stupe__plneni_emisni_urovne                                     String?   @map(\"stupeň_plneni_emisni_urovne\")\n  korigovany_soucinitel_absorpce                                  Float?    @db.Real\n  co2                                                             Float?    @db.Real\n  co2_mesto                                                       Float?    @db.Real\n  co2_mimo_mesto                                                  Float?    @db.Real\n  specificke_co2                                                  Float?    @db.Real\n  snizeni_emisi_nedc                                              Float?    @db.Real\n  snizeni_emisi_wltp                                              Float?    @db.Real\n  spotreba_mesto                                                  Float?    @db.Real\n  spotreba_mimo_mesto                                             Float?    @db.Real\n  spotreba_kombinovana                                            Float?    @db.Real\n  spotreba_pri_rychlosti                                          String?\n  spotreba_el_mobil                                               Int?\n  dojezd_zr                                                       Int?\n  vyrobce_karoserie                                               String?\n  druh_karoserie                                                  String?\n  vyrobni_cislo_karoserie                                         String?\n  barva                                                           String?\n  barva_doplnkova                                                 String?\n  pocet_mist_celkem                                               Int?\n  pocet_mist_k_sezeni                                             Int?\n  pocet_mist_k_stani                                              Int?\n  delka                                                           Int?\n  sirka                                                           Int?\n  vyska                                                           Int?\n  rozvor                                                          Int?\n  rozchod                                                         Int?\n  provozni_hmotnost                                               Int?\n  nejvetsi_technicky_pripustna_hmotnost                           Int?\n  nejvetsi_povolena_hmotnost                                      Int?\n  nejvetsi_technicky_pripustna_hmotnost_na_napravu                String?\n  nejvetsi_povolena_hmotnost_na_napravu                           String?\n  nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden Int?\n  nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho         Int?\n  nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz Int?\n  nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho      Int?\n  nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy           Int?\n  nejvetsi_povolena_hmotnost_jizdni_soupravy                      Int?\n  hmotnosti_vozidla_pri_testu_wltp                                String?\n  predpis_spotreba_paliva                                         String?\n  prumerna_hodnota_uzitecneho_zatizeni                            String?\n  spojovaci_zarizeni                                              String?\n  pocet_naprav                                                    Int?\n  naprav_pohanenych                                               String?\n  kola_a_pneumatiky_naprava_1                                     String?\n  kola_a_pneumatiky_naprava_2                                     String?\n  kola_a_pneumatiky_naprava_3                                     String?\n  kola_a_pneumatiky_naprava_4                                     String?\n  vnejsi_hluk_vozidla_stojici                                     Float?    @db.Real\n  vnejsi_hluk_vozidla_otacky                                      Float?    @db.Real\n  vnejsi_hluk_vozidla_jizda                                       Float?    @db.Real\n  nejvyssi_rychlost                                               Float?    @db.Real\n  pomer_vykon_hmotnost                                            Float?    @db.Real\n  inovativni_technologie                                          String?\n  stupe__dokonceni                                                String?   @map(\"stupeň_dokonceni\")\n  faktor_odchylky_de                                              Float?    @db.Real\n  faktor_verifikace_vf                                            Int?\n  ucel_vozidla                                                    String?\n  dalsi_zaznamy                                                   String?\n  alternativni_provedeni                                          String?\n  cislo_tp                                                        String?\n  cislo_orv                                                       String?\n  druh_rz                                                         String?\n  zarazeni_vozidla                                                String?\n  status                                                          String?\n  pcv                                                             Int?\n  abs                                                             Boolean?\n  airbag                                                          String?\n  asr                                                             Boolean?\n  brzdy_nouzova                                                   Boolean?\n  brzdy_odlehcovaci                                               Boolean?\n  brzdy_parkovaci                                                 Boolean?\n  brzdy_provozni                                                  Boolean?\n  dopl_kovy_text_na_tp                                            String?   @map(\"doplňkovy_text_na_tp\")\n  hmotnosti_provozni_do                                           Int?\n  hmotnosti_zatizeni_sz                                           Int?\n  hmotnosti_zatizeni_sz_typ                                       String?\n  hydropohon                                                      Boolean?\n  objem_cisterny                                                  Float?    @db.Real\n  zatizeni_strechy                                                Int?\n  cislo_motoru                                                    String?\n  nejvyssi_rychlost_omezeni                                       Int?\n  ovladani_brzd_sz                                                String?\n  ovladani_brzd_sz_druh                                           String?\n  retarder                                                        Boolean?\n  rok_vyroby                                                      Int?\n  delka_do                                                        Int?\n  lozna_delka                                                     Int?\n  lozna_sirka                                                     Int?\n  vyska_do                                                        Int?\n  typ_kod                                                         String?\n  rm_zaniku                                                       String?\n\n  @@index([datum_1_registrace], map: \"idx_registrations_year\")\n  @@index([barva])\n  @@index([id])\n  @@index([tovarni_znacka])\n}\n",
  "inlineSchemaHash": "003b5d57fb60efe905b79038b8a73960c255fabaeaa2e365efdcd76b9b47eed6",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "prisma/client",
    "client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"registrations\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"datum_1_registrace\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"datum_1_registrace_v_cr\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ztp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"es_eu\",\"dbName\":\"es/eu\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"druh_vozidla\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"druh_vozidla_2_radek\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kategorie_vozidla\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tovarni_znacka\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"typ\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"varianta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verze\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vin\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"obchodni_oznaceni\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vyrobce_vozidla\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vyrobce_motoru\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"typ_motoru\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"max_vykon\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"max_vykon_otacky\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"palivo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"zdvihovy_objem\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"plne_elektricke_vozidlo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hybridni_vozidlo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trida_hybridniho_vozidla\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emisni_limit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stupe__plneni_emisni_urovne\",\"dbName\":\"stupeň_plneni_emisni_urovne\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"korigovany_soucinitel_absorpce\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"co2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"co2_mesto\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"co2_mimo_mesto\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"specificke_co2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"snizeni_emisi_nedc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"snizeni_emisi_wltp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spotreba_mesto\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spotreba_mimo_mesto\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spotreba_kombinovana\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spotreba_pri_rychlosti\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spotreba_el_mobil\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dojezd_zr\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vyrobce_karoserie\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"druh_karoserie\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vyrobni_cislo_karoserie\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"barva\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"barva_doplnkova\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pocet_mist_celkem\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pocet_mist_k_sezeni\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pocet_mist_k_stani\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delka\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sirka\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vyska\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rozvor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rozchod\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provozni_hmotnost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvetsi_technicky_pripustna_hmotnost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvetsi_povolena_hmotnost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvetsi_technicky_pripustna_hmotnost_na_napravu\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvetsi_povolena_hmotnost_na_napravu\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvetsi_povolena_hmotnost_jizdni_soupravy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hmotnosti_vozidla_pri_testu_wltp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"predpis_spotreba_paliva\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"prumerna_hodnota_uzitecneho_zatizeni\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"spojovaci_zarizeni\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pocet_naprav\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"naprav_pohanenych\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kola_a_pneumatiky_naprava_1\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kola_a_pneumatiky_naprava_2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kola_a_pneumatiky_naprava_3\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kola_a_pneumatiky_naprava_4\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vnejsi_hluk_vozidla_stojici\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vnejsi_hluk_vozidla_otacky\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vnejsi_hluk_vozidla_jizda\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvyssi_rychlost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pomer_vykon_hmotnost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"inovativni_technologie\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stupe__dokonceni\",\"dbName\":\"stupeň_dokonceni\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"faktor_odchylky_de\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"faktor_verifikace_vf\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ucel_vozidla\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dalsi_zaznamy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"alternativni_provedeni\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cislo_tp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cislo_orv\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"druh_rz\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"zarazeni_vozidla\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pcv\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"abs\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"airbag\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asr\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brzdy_nouzova\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brzdy_odlehcovaci\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brzdy_parkovaci\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brzdy_provozni\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dopl_kovy_text_na_tp\",\"dbName\":\"doplňkovy_text_na_tp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hmotnosti_provozni_do\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hmotnosti_zatizeni_sz\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hmotnosti_zatizeni_sz_typ\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hydropohon\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"objem_cisterny\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":[\"Real\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"zatizeni_strechy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cislo_motoru\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nejvyssi_rychlost_omezeni\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ovladani_brzd_sz\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ovladani_brzd_sz_druh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"retarder\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rok_vyroby\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delka_do\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lozna_delka\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lozna_sirka\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vyska_do\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"typ_kod\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rm_zaniku\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model contains an expression index which requires additional setup for migrations. Visit https://pris.ly/d/expression-indexes for more info.\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "prisma/client/libquery_engine-darwin-arm64.dylib.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-linux-musl.so.node");
path.join(process.cwd(), "prisma/client/libquery_engine-linux-musl.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "prisma/client/schema.prisma")
