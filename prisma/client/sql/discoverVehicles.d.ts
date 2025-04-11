import * as $runtime from "../runtime/library"

/**
 * @param brand
 * @param model
 * @param datum_od
 * @param datum_do
 * @param electric
 * @param hybrid
 * @param require_imports
 * @param require_owners
 * @param require_removed
 * @param require_inspections
 * @param require_equipment
 * @param limit
 * @param offset
 */
export const discoverVehicles: (brand: string | null, model: string | null, datum_od: Date | null, datum_do: Date | null, electric: boolean | null, hybrid: boolean | null, require_imports: boolean | null, require_owners: boolean | null, require_removed: boolean | null, require_inspections: boolean | null, require_equipment: boolean | null, limit: number, offset: number) => $runtime.TypedSql<discoverVehicles.Parameters, discoverVehicles.Result>

export namespace discoverVehicles {
  export type Parameters = [brand: string | null, model: string | null, datum_od: Date | null, datum_do: Date | null, electric: boolean | null, hybrid: boolean | null, require_imports: boolean | null, require_owners: boolean | null, require_removed: boolean | null, require_inspections: boolean | null, require_equipment: boolean | null, limit: number, offset: number]
  export type Result = {
    id: number | null
    datum_1_registrace: Date | null
    datum_1_registrace_v_cr: Date | null
    ztp: string | null
    es_eu: string | null
    druh_vozidla: string | null
    druh_vozidla_2_radek: string | null
    kategorie_vozidla: string | null
    tovarni_znacka: string | null
    typ: string | null
    varianta: string | null
    verze: string | null
    vin: string | null
    obchodni_oznaceni: string | null
    vyrobce_vozidla: string | null
    vyrobce_motoru: string | null
    typ_motoru: string | null
    max_vykon: number | null
    max_vykon_otacky: number | null
    palivo: string | null
    zdvihovy_objem: number | null
    plne_elektricke_vozidlo: boolean | null
    hybridni_vozidlo: boolean | null
    trida_hybridniho_vozidla: string | null
    emisni_limit: string | null
    stupen_plneni_emisni_urovne: string | null
    korigovany_soucinitel_absorpce: number | null
    co2: number | null
    co2_mesto: number | null
    co2_mimo_mesto: number | null
    specificke_co2: number | null
    snizeni_emisi_nedc: number | null
    snizeni_emisi_wltp: number | null
    spotreba_mesto: number | null
    spotreba_mimo_mesto: number | null
    spotreba_kombinovana: number | null
    spotreba_pri_rychlosti: string | null
    spotreba_el_mobil: bigint | null
    dojezd_zr: bigint | null
    vyrobce_karoserie: string | null
    druh_karoserie: string | null
    vyrobni_cislo_karoserie: string | null
    barva: string | null
    barva_doplnkova: string | null
    pocet_mist_celkem: bigint | null
    pocet_mist_k_sezeni: bigint | null
    pocet_mist_k_stani: bigint | null
    delka: bigint | null
    sirka: bigint | null
    vyska: bigint | null
    rozvor: bigint | null
    rozchod: bigint | null
    provozni_hmotnost: bigint | null
    nejvetsi_technicky_pripustna_hmotnost: bigint | null
    nejvetsi_povolena_hmotnost: bigint | null
    nejvetsi_technicky_pripustna_hmotnost_na_napravu: string | null
    nejvetsi_povolena_hmotnost_na_napravu: string | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_brzden: bigint | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_brzdeneho: bigint | null
    nejvetsi_technicky_pripustna_hmotnost_pripojneho_vozidla_ne_brz: bigint | null
    nejvetsi_povolena_hmotnost_pripojneho_vozidla_ne_brzdeneho: bigint | null
    nejvetsi_technicky_pripustna_hmotnost_jizdni_soupravy: bigint | null
    nejvetsi_povolena_hmotnost_jizdni_soupravy: bigint | null
    hmotnosti_vozidla_pri_testu_wltp: string | null
    predpis_spotreba_paliva: string | null
    prumerna_hodnota_uzitecneho_zatizeni: string | null
    spojovaci_zarizeni: string | null
    pocet_naprav: bigint | null
    naprav_pohanenych: string | null
    kola_a_pneumatiky_naprava_1: string | null
    kola_a_pneumatiky_naprava_2: string | null
    kola_a_pneumatiky_naprava_3: string | null
    kola_a_pneumatiky_naprava_4: string | null
    vnejsi_hluk_vozidla_stojici: number | null
    vnejsi_hluk_vozidla_otacky: number | null
    vnejsi_hluk_vozidla_jizda: number | null
    nejvyssi_rychlost: number | null
    pomer_vykon_hmotnost: number | null
    inovativni_technologie: string | null
    stupen_dokonceni: string | null
    faktor_odchylky_de: number | null
    faktor_verifikace_vf: bigint | null
    ucel_vozidla: string | null
    dalsi_zaznamy: string | null
    alternativni_provedeni: string | null
    cislo_tp: string | null
    cislo_orv: string | null
    druh_rz: string | null
    zarazeni_vozidla: string | null
    status: string | null
    pcv: bigint | null
    abs: boolean | null
    airbag: string | null
    asr: boolean | null
    brzdy_nouzova: boolean | null
    brzdy_odlehcovaci: boolean | null
    brzdy_parkovaci: boolean | null
    brzdy_provozni: boolean | null
    doplnkovy_text_na_tp: string | null
    hmotnosti_provozni_do: bigint | null
    hmotnosti_zatizeni_sz: bigint | null
    hmotnosti_zatizeni_sz_typ: string | null
    hydropohon: boolean | null
    objem_cisterny: number | null
    zatizeni_strechy: bigint | null
    cislo_motoru: string | null
    nejvyssi_rychlost_omezeni: bigint | null
    ovladani_brzd_sz: string | null
    ovladani_brzd_sz_druh: string | null
    retarder: boolean | null
    rok_vyroby: bigint | null
    delka_do: bigint | null
    lozna_delka: bigint | null
    lozna_sirka: bigint | null
    vyska_do: bigint | null
    typ_kod: string | null
    rm_zaniku: string | null
  }
}
