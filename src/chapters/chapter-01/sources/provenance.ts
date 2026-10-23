import type { ProvenanceRecord } from "@/lib/research/types";

/**
 * Chapter 01 — Population & Family: typed provenance records.
 *
 * Every record reflects a source actually accessed and checked on the
 * accessDate shown. Evidence quotes are stored in the project research
 * archive (research/chapter01/findings.md) rather than the public site.
 */
export const chapter01Provenance: ProvenanceRecord[] = [
  {
    id: "abs-nstp-2026-03",
    issuingInstitution: "Australian Bureau of Statistics (ABS)",
    originalTitle: "National, state and territory population, March 2026",
    url: "https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/latest-release",
    sourceLanguage: "en-AU",
    publicationDate: "2026-09-17",
    accessDate: "2026-10-22",
    referencePeriod: "June 1981 to March 2026 (quarterly; annual series at 30 June 1981 to 30 June 2025)",
    dataVersion: "March 2026 quarterly release and its time-series spreadsheets",
    coverage: "Australia and each state and territory (Estimated Resident Population)",
    unitDefinition:
      "Estimated Resident Population (ERP): all residents of Australia regardless of nationality or visa, based on the Census, adjusted for net Census undercount and residents temporarily overseas, plus births, deaths and migration.",
    extractionMethod:
      "Release page fetched and headline figures quoted; time-series spreadsheets downloaded from the release page and parsed with openpyxl (scripts archived in research/chapter01/scripts/).",
    transformations:
      "ERP quarterly series and annual at-30-June series extracted as published ('000); components of change extracted as published ('000 per quarter); no aggregation, estimation or imputation applied.",
    licence:
      "ABS website materials are offered under a Creative Commons Attribution 4.0 International licence per the ABS Creative Commons website policy (linked from the ABS footer); the policy page is script-rendered and was not machine-extractable on the access date — confirm current terms at abs.gov.au before redistributing source materials.",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "ERP is not the same as a Census count (Census counts people present on Census night; ERP adjusts for undercount and residents temporarily overseas). The ABS states that all data after 30 June 2021 are subject to revision.",
    knownGaps:
      "Age and sex detail lags the headline ERP by three quarters (age structure available at 30 June 2025 while headline ERP is at 31 March 2026).",
  },
  {
    id: "abs-births-2024",
    issuingInstitution: "Australian Bureau of Statistics (ABS)",
    originalTitle: "Births, Australia, 2024",
    url: "https://www.abs.gov.au/statistics/people/population/births-australia/latest-release",
    sourceLanguage: "en-AU",
    publicationDate: "2025-10-15",
    accessDate: "2026-10-22",
    referencePeriod: "Calendar years of registration, 1924 to 2024 (TFR long-run series)",
    dataVersion: "Births, Australia, 2024 release",
    coverage: "Australia",
    unitDefinition:
      "Births registered during the calendar year; total fertility rate (TFR) is births per woman summed across age-specific fertility rates.",
    extractionMethod:
      "Release page fetched and figures quoted; time-series spreadsheet parsed with openpyxl.",
    transformations:
      "TFR annual series extracted as published (babies per woman); no smoothing or estimation.",
    licence:
      "As per ABS Creative Commons policy (see abs-nstp-2026-03 note).",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "Births data are registered by year of registration, not year of occurrence; registration processing times differ by state and year (the ABS notes 2024 changes in registry processing affected movements such as New South Wales −3.4% and Victoria +12.9%).",
    knownGaps:
      "The release's datacube contains an approximate TFR column (about 1.54 for 2024) calculated from five-year age-group rates; the official published TFR of 1.481 is used throughout this chapter.",
  },
  {
    id: "abs-deaths-2025",
    issuingInstitution: "Australian Bureau of Statistics (ABS)",
    originalTitle: "Deaths, Australia, 2025",
    url: "https://www.abs.gov.au/statistics/people/population/deaths-australia/latest-release",
    sourceLanguage: "en-AU",
    publicationDate: "2026-10-02",
    accessDate: "2026-10-22",
    referencePeriod: "Calendar year of registration, 2025",
    dataVersion: "Deaths, Australia, 2025 release",
    coverage: "Australia",
    unitDefinition: "Deaths registered during the calendar year.",
    extractionMethod: "Release page fetched and figures quoted.",
    transformations: "None (headline figures as published).",
    licence:
      "As per ABS Creative Commons policy (see abs-nstp-2026-03 note).",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "Deaths are attributed by year of registration. Standardised death rates adjust for age structure and are not directly comparable with crude rates.",
    knownGaps: "State-level detail not extracted in this research pass.",
  },
  {
    id: "abs-lifeexpectancy-2022-24",
    issuingInstitution: "Australian Bureau of Statistics (ABS)",
    originalTitle: "Life expectancy, 2022 - 2024",
    url: "https://www.abs.gov.au/statistics/people/population/life-expectancy/latest-release",
    sourceLanguage: "en-AU",
    accessDate: "2026-10-22",
    referencePeriod: "2022-2024 (three-year period life tables)",
    dataVersion: "Life expectancy, 2022-2024 release",
    coverage: "Australia and states/territories",
    unitDefinition:
      "Life expectancy at birth: the average number of years a newborn could expect to live if current age-specific death rates persisted.",
    extractionMethod: "Release page fetched and figures quoted.",
    transformations: "None.",
    licence:
      "As per ABS Creative Commons policy (see abs-nstp-2026-03 note).",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "Period life expectancy is not a forecast of individual lifespans; it summarises current mortality. Three-year period smoothing differs from single-year estimates.",
    knownGaps: "International life-expectancy comparisons in this chapter use the World Bank/UN series (see wb-lifeexpectancy-2024), which is compiled on a slightly different basis.",
  },
  {
    id: "abs-indigenous-2021",
    issuingInstitution: "Australian Bureau of Statistics (ABS)",
    originalTitle:
      "Estimates of Aboriginal and Torres Strait Islander Australians, 30 June 2021; and Census of Population and Housing — Counts of Aboriginal and Torres Strait Islander Australians, 2021",
    url: "https://www.abs.gov.au/statistics/people/aboriginal-and-torres-strait-islander-peoples/estimates-aboriginal-and-torres-strait-islander-australians/30-june-2021",
    sourceLanguage: "en-AU",
    accessDate: "2026-10-22",
    referencePeriod: "30 June 2021 (ERP of Aboriginal and Torres Strait Islander Australians); Census 2021 counts (with 2016 comparison)",
    dataVersion: "30 June 2021 release and 2021 Census counts release",
    coverage: "Australia",
    unitDefinition:
      "ERP of Aboriginal and Torres Strait Islander Australians (post-censual estimates) and Census counts of people who identified as Aboriginal and/or Torres Strait Islander.",
    extractionMethod: "Release pages fetched and figures quoted.",
    transformations: "None.",
    licence:
      "As per ABS Creative Commons policy (see abs-nstp-2026-03 note).",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "The ABS explicitly notes the increase in counts between Censuses 'is not wholly explained by demographic factors'; changes in willingness and ability to identify contribute. These statistics are presented with respect for Indigenous data governance and must not be read as statements about communities themselves.",
    knownGaps:
      "More recent post-censual Indigenous population estimates were not located in this research pass; the chapter does not attempt disaggregated analysis of outcomes, which requires community-governed protocols beyond this chapter's scope.",
  },
  {
    id: "abs-household-projections-2021-46",
    issuingInstitution: "Australian Bureau of Statistics (ABS)",
    originalTitle: "Household and Family Projections, Australia, 2021 - 2046",
    url: "https://www.abs.gov.au/statistics/people/population/household-and-family-projections-australia/2021-2046",
    sourceLanguage: "en-AU",
    accessDate: "2026-10-22",
    referencePeriod: "Base 2021; projections to 2046",
    dataVersion: "2021-2046 release",
    coverage: "Australia",
    unitDefinition:
      "Households and families as classified in the Census; average household size is residents per household.",
    extractionMethod: "Release page fetched and figures quoted.",
    transformations: "None.",
    licence:
      "As per ABS Creative Commons policy (see abs-nstp-2026-03 note).",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "The ABS states 'projections are not predictions or forecasts' — they illustrate what would happen if stated assumptions persisted.",
    knownGaps:
      "Current-point household estimates (beyond the 2021 base and projections) not yet incorporated; family-composition trend analysis is planned for a later revision of this chapter.",
  },
  {
    id: "abs-pop-projections-2022-71",
    issuingInstitution: "Australian Bureau of Statistics (ABS)",
    originalTitle: "Population Projections, Australia, 2022 (base) - 2071",
    url: "https://www.abs.gov.au/statistics/people/population/population-projections-australia/2022-base-2071",
    sourceLanguage: "en-AU",
    publicationDate: "2023-11-23",
    accessDate: "2026-10-22",
    referencePeriod: "Base 2022; projections to 2071",
    dataVersion: "2022 (base) - 2071 release",
    coverage: "Australia",
    unitDefinition:
      "Projected population, median age and age shares under stated assumption scenarios.",
    extractionMethod: "Release page fetched and figures quoted.",
    transformations: "None.",
    licence:
      "As per ABS Creative Commons policy (see abs-nstp-2026-03 note).",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "Projections illustrate scenarios, not forecasts; ranges shown reflect assumptions, not statistical confidence intervals. The national median age cited in this chapter (38.5 years in 2022) comes from this release, not the quarterly population release.",
    knownGaps: "Scenario detail beyond headline ranges not extracted.",
  },
  {
    id: "abs-regional-age-2025",
    issuingInstitution: "Australian Bureau of Statistics (ABS)",
    originalTitle: "Regional population by age and sex, 2025",
    url: "https://www.abs.gov.au/statistics/people/population/regional-population-age-and-sex/2025",
    sourceLanguage: "en-AU",
    publicationDate: "2026-08-27",
    accessDate: "2026-10-22",
    referencePeriod: "30 June 2025",
    dataVersion: "2025 release",
    coverage: "Capital cities and rest of state, Australia",
    unitDefinition: "Median age of residents in capital cities versus the rest of Australia.",
    extractionMethod: "Release page fetched and figures quoted.",
    transformations: "None.",
    licence:
      "As per ABS Creative Commons policy (see abs-nstp-2026-03 note).",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "Capital city boundaries follow Australian Statistical Geography Standard greater capital city definitions.",
    knownGaps: "Full regional age/sex datasets not yet analysed.",
  },
  {
    id: "abs-nom-methodology",
    issuingInstitution: "Australian Bureau of Statistics (ABS)",
    originalTitle:
      "Measuring net overseas migration, Australia (article); and National, state and territory population methodology, March 2026",
    url: "https://www.abs.gov.au/articles/measuring-net-overseas-migration-australia",
    sourceLanguage: "en-AU",
    accessDate: "2026-10-22",
    referencePeriod: "Methodology applicable to the March 2026 release",
    dataVersion: "Current at access date",
    coverage: "Australia (methodological definitions)",
    unitDefinition:
      "Net overseas migration (NOM): net change in the resident population from overseas migration under the 12/16-month rule — travellers are added to or removed from the population based on whether they have spent 12 of the last 16 months in or out of Australia.",
    extractionMethod: "Article and methodology pages fetched and definitions quoted.",
    transformations: "None.",
    licence:
      "As per ABS Creative Commons policy (see abs-nstp-2026-03 note).",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "NOM under the 12/16-month rule is not comparable with visa-based migration counts, permanent visa grants, or arrivals data; it measures duration of stay, not visa category.",
    knownGaps: "Historical series break details around methodology transitions not fully extracted in this pass.",
  },
  {
    id: "wb-fertility-2024",
    issuingInstitution: "World Bank (World Development Indicators), republishing United Nations World Population Prospects estimates",
    originalTitle: "Fertility rate, total (births per woman) — indicator SP.DYN.TFRT.IN",
    url: "https://api.worldbank.org/v2/country/AUS;NZL;CAN;GBR;DEU;NLD;SWE;FRA;USA;JPN;KOR;SGP/indicator/SP.DYN.TFRT.IN?format=json&date=1990:2025&per_page=500",
    sourceLanguage: "en",
    accessDate: "2026-10-22",
    referencePeriod: "Latest year with values: 2024 (2025 values not yet published at access date)",
    dataVersion: "API lastupdated 2026-10-08",
    coverage: "Australia plus New Zealand, Canada, United Kingdom, Germany, Netherlands, Sweden, France, United States, Japan, South Korea, Singapore",
    unitDefinition: "Total fertility rate, births per woman (period rate).",
    extractionMethod: "World Bank API JSON fetched and parsed (query archived in research/chapter01/raw/).",
    transformations: "Latest non-null value per country extracted; no other changes.",
    licence:
      "World Bank datasets are generally offered under an open licence; terms of use at worldbank.org were not machine-extractable on the access date — verify before redistributing.",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "Compiled from United Nations World Population Prospects and can differ slightly from national statistical office series (for example, 2019: 1.657 versus ABS 1.666). For 2024 the World Bank figure for Australia (1.481) matches the ABS published rate. The OECD SDMX API retirement prevented direct OECD verification in this pass (marked NOT VERIFIED rather than approximated).",
    knownGaps:
      "Comparators are a fixed candidate set selected for this chapter's questions; they are not a ranking of countries and Singapore lacks OECD coverage in the retained OECD extract.",
  },
  {
    id: "wb-lifeexpectancy-2024",
    issuingInstitution: "World Bank (World Development Indicators), republishing United Nations World Population Prospects estimates",
    originalTitle: "Life expectancy at birth, total (years) — indicator SP.DYN.LE00.IN",
    url: "https://api.worldbank.org/v2/country/AUS;NZL;CAN;GBR;DEU;NLD;SWE;FRA;USA;JPN;KOR;SGP/indicator/SP.DYN.LE00.IN?format=json&date=1990:2025&per_page=500",
    sourceLanguage: "en",
    accessDate: "2026-10-22",
    referencePeriod: "Latest year with values: 2024 (2025 values not yet published at access date)",
    dataVersion: "API lastupdated 2026-10-08",
    coverage: "Same twelve countries as wb-fertility-2024",
    unitDefinition: "Life expectancy at birth, both sexes combined, years.",
    extractionMethod: "World Bank API JSON fetched and parsed (query archived in research/chapter01/raw/).",
    transformations: "Latest non-null value per country extracted; no other changes.",
    licence:
      "As per World Bank terms (see wb-fertility-2024 note).",
    verificationStatus: "verified-against-source",
    comparabilityNotes:
      "UN WPP basis; both-sexes combined figure differs from the ABS male/female split (81.1/85.1 for 2022-2024). The Australian 2023 and 2024 values are identical in this source (a carry-forward artefact to note when reading small movements).",
    knownGaps: "Sex-specific international splits not extracted.",
  },
];
