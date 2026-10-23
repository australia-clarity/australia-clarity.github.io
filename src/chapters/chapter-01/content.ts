import type { ChapterModule } from "@/lib/research/types";

/**
 * Chapter 01 — Population & Family content.
 *
 * Every figure cited in this file was verified against the cited ABS or
 * World Bank publication on the access date recorded in the chapter's
 * provenance records. Interpretive statements are marked as such and kept
 * distinct from observations.
 */
export const chapter01Content: Omit<
  ChapterModule,
  "id" | "number" | "slug" | "provenance" | "charts"
> = {
  title: "Population & Family",
  shortTitle: "Population",
  summary:
    "Fertility, mortality, ageing, migration, household change, regional growth and projections — how Australia's population is changing, what the evidence shows, and where uncertainty remains.",
  status: "initial-release",
  lastReviewed: "2026-10-23",
  version: "0.1.0",
  scope: [
    "Population size, growth and the balance between natural increase and net overseas migration",
    "Fertility and its long-run trend",
    "Mortality and life expectancy",
    "Population ageing and age structure",
    "Household and family change",
    "State and territory differences, and capital cities versus the rest",
    "Aboriginal and Torres Strait Islander population statistics, read carefully and respectfully",
    "Carefully matched international comparison",
  ],
  keyQuestions: [
    "How many people live in Australia, and how fast is the population changing?",
    "Where does population change come from — natural increase or migration?",
    "How is the population structured by age, and how is ageing unfolding?",
    "How do populations differ across states and territories, and between capital cities and the rest of Australia?",
    "How are families and households changing?",
    "How does Australia compare with similar countries, and where do comparisons mislead?",
  ],
  overview: [
    "Australia's population reached 27,921,150 people at 31 March 2026, according to the Australian Bureau of Statistics (ABS) Estimated Resident Population (ERP) — the official measure of how many people usually live in Australia. Over the preceding year the population grew by 392,700 people (1.4%). Growth of that kind is neither automatically good nor automatically bad; what matters is what it consists of, where it occurs, and what it means for services, housing, the labour market and the environment — questions taken up across later chapters.",
    "This chapter observes first: how many we are, where change comes from, how we are ageing, how families are forming, and where we live. It then compares Australia with a set of similar countries on fertility, always with the definitions, reference periods and limitations of the underlying data made explicit. Like a physician's examination, the purpose is to understand condition before discussing treatment — and a country and its people are never 'unhealthy' as a whole.",
  ],
  observations: [
    {
      label: "Population",
      value: "27,921,150 people",
      context:
        "Estimated Resident Population at 31 March 2026; quarterly growth 130,887 (0.5%), annual growth 392,700 (1.4%).",
      sourceId: "abs-nstp-2026-03",
    },
    {
      label: "Natural increase (year to March 2026)",
      value: "100,600 people",
      context:
        "Births 292,500 minus deaths 191,900 for the year ending 31 March 2026.",
      sourceId: "abs-nstp-2026-03",
    },
    {
      label: "Net overseas migration (year to March 2026)",
      value: "292,100 people",
      context:
        "Arrivals 557,500, departures 265,400 for the year ending 31 March 2026, measured under the 12/16-month rule.",
      sourceId: "abs-nstp-2026-03",
    },
    {
      label: "Total fertility rate (2024)",
      value: "1.481 babies per woman",
      context:
        "Below the replacement level of about 2.1 every year since 1976; median age of mothers 32.1 years.",
      sourceId: "abs-births-2024",
    },
    {
      label: "Life expectancy at birth (2022–2024)",
      value: "81.1 years (males), 85.1 years (females)",
      context:
        "Unchanged from 2021–2023, which followed the first decreases in decades (2020–2022 and 2021–2023 periods).",
      sourceId: "abs-lifeexpectancy-2022-24",
    },
    {
      label: "Population ageing",
      value: "17% aged 65+ (2022), projected 25%–27% by 2071",
      context:
        "Median age 38.5 years in 2022, projected to 43.8–47.6 by 2071; the 85-and-over share is projected to grow from 2.1% to 5.2%–6.4%.",
      sourceId: "abs-pop-projections-2022-71",
    },
    {
      label: "Aboriginal and Torres Strait Islander Australians",
      value: "983,700 people (3.8% of the population) at 30 June 2021",
      context:
        "ABS post-Censual estimate; the 2021 Census counted 812,728 people (3.2%) identifying as Aboriginal and/or Torres Strait Islander, up 25.2% from 649,171 in 2016. The ABS notes the increase is not wholly explained by demographic factors. Median age 24.0 years; 33.1% were under 15.",
      sourceId: "abs-indigenous-2021",
    },
  ],
  sections: [
    {
      id: "how-many",
      heading: "How many of us are there?",
      paragraphs: [
        "Australia's Estimated Resident Population rose from about 14.9 million at 30 June 1981 to about 27.6 million at 30 June 2025, and the headline estimate published a quarter later stands at 27.9 million at 31 March 2026. Over more than four decades the population has very nearly doubled — a period that spans several booms, recessions, a pandemic and large shifts in migration settings.",
        "ERP is not simply 'the Census count'. It is built from the Census, adjusted for people missed by it, includes residents temporarily overseas, and is updated each quarter with births, deaths and migration. That is why ERP for a given date can be revised — the ABS notes that all data after 30 June 2021 remain subject to revision as the series is re-based and refined.",
      ],
      chartId: "population-growth",
    },
    {
      id: "where-growth-comes-from",
      heading: "Where does population change come from?",
      paragraphs: [
        "Population change has two components: natural increase (births minus deaths) and net overseas migration (NOM). In the year ending 31 March 2026, natural increase contributed 100,600 people (292,500 births and 191,900 deaths) while NOM contributed 292,100 — migration contributed roughly three-quarters of the year's growth.",
        "NOM is a volatile series. It was unusually high in the years following the re-opening of international movement: the ABS's current release shows NOM of 538,341 for the year ending 30 June 2023 (first published as 518,100 in an earlier release — an example of why revisions matter) and 429,162 for the year ending 30 June 2024, before easing to 292,100 for the year ending 31 March 2026. Arrivals fell 4.0% and departures fell 2.2% over the latest year.",
        "It is worth being precise about what NOM is not. It is not a count of permanent visa grants, it is not arrivals at airports, and it does not distinguish visa classes in its headline form. Under the 12/16-month rule, a traveller's duration of stay — 12 of the last 16 months in or out of Australia — determines whether they enter or leave the resident population. These are different questions with different answers, and conflating them is one of the most common ways population debates go wrong.",
      ],
      chartId: "components-of-change",
    },
    {
      id: "age-structure",
      heading: "How is the population structured by age?",
      paragraphs: [
        "Australia's age structure still bulges in the working ages, but the population is ageing steadily. The median age was 38.5 years in 2022 and is projected to reach 43.8 to 47.6 years by 2071. People aged 65 and over made up 17% of the population in 2022, a share projected to reach 25% to 27% by 2071, while the 85-and-over group is projected to grow from 2.1% to between 5.2% and 6.4%.",
        "Ageing is not distributed evenly across the country. At 30 June 2025 the median age of capital cities was 37.0 years, compared with 42.1 years in the rest of Australia. Population projections are illustrations of what would happen under stated assumptions — the ABS is explicit that they are not predictions or forecasts.",
      ],
      chartId: "age-structure-pyramid",
    },
    {
      id: "fertility",
      heading: "How has fertility changed?",
      paragraphs: [
        "Australia's total fertility rate was 1.481 babies per woman in 2024 — the latest year of registered births data — down from 1.499 in 2023 and 1.795 in 2014. Australia has been below the widely used replacement benchmark of about 2.1 babies per woman every year since 1976. There were 292,318 registered births in 2024, an increase of 1.9% on 2023, and parents are older: the median age was 32.1 years for mothers and 33.9 for fathers.",
        "Two cautions apply. First, births are counted by year of registration, and the ABS notes that changes in registry processing times affect yearly movements — in 2024, New South Wales recorded 3.4% fewer registered births while Victoria recorded 12.9% more, partly reflecting processing effects rather than behaviour alone. Second, fertility is an average across the whole population: it does not describe any individual family's choices, and it should never be used to make judgements about people's lives. Why fertility has fallen — economics, housing, partnering, opportunity costs, preferences, uncertainty — involves competing explanations that the evidence does not yet settle.",
      ],
      chartId: "fertility-trend",
    },
    {
      id: "families-households",
      heading: "Families and households",
      paragraphs: [
        "Households, not just headcounts, shape how a population lives. In 2021 Australia had about 10.0 million households: 6,950,700 family households, 2,637,500 lone-person households and 405,700 group households. Average household size was 2.6 people, projected to remain between 2.4 and 2.6 by 2046. Lone-person households are projected to make up 26% to 28% of all households by 2046, up from 10% of people living alone in 2021 (from 9% in 2001).",
        "Among the 7.2 million families in 2021, couples with children made up 44% (3,117,600), couples without children 39% (2,763,700), and one-parent families about one in six (1,150,100, of which about one in five lone parents were male). The ABS projects couples with children to ease to 42%–43% of families by 2046 and couples without children to rise slightly to 38%–40%. Living arrangements evolve slowly: the share of people in one-parent families was steady at around 12% across the two decades to 2021.",
        "These are projections, not predictions: as the ABS states, they illustrate what would happen if assumptions about living arrangements persisted. This chapter's household analysis is at its early stage — deeper work on family wellbeing, child outcomes and support needs is planned in later research, alongside the chapter on social protection.",
      ],
    },
    {
      id: "where-we-live",
      heading: "Where Australians live, and how states differ",
      paragraphs: [
        "Australia's population is geographically concentrated. At 31 March 2026, New South Wales had about 8.67 million residents, Victoria 7.15 million and Queensland 5.74 million — together home to over three-quarters of the national population. Western Australia had about 3.10 million, South Australia 1.92 million, Tasmania 581 thousand, the ACT 490 thousand and the Northern Territory 269 thousand.",
        "All states and territories grew over the year to March 2026. Western Australia grew fastest (2.1%) and Tasmania slowest (0.6%). State-level growth reflects different economies, housing markets and migration patterns, and the experiences of individual regions within states differ even more — a theme examined further in the housing and transport chapters. Australia is a federation: schools, hospitals, policing and transport are largely state and territory responsibilities, so identical national numbers can mean very different services in different places.",
      ],
      chartId: "states-population",
    },
    {
      id: "indigenous-population",
      heading: "Aboriginal and Torres Strait Islander population statistics",
      paragraphs: [
        "At 30 June 2021, the ABS estimated there were 983,700 Aboriginal and Torres Strait Islander people — 3.8% of the Australian population. The 2021 Census counted 812,728 people who identified as Aboriginal and/or Torres Strait Islander (3.2% of the Census count), up 25.2% from 649,171 in 2016. The ABS is explicit that this increase 'is not wholly explained by demographic factors': changes in willingness and ability to identify between Censuses contribute, so the change over time should not be read as a simple birth-and-migration story.",
        "The Aboriginal and Torres Strait Islander population is much younger than the non-Indigenous population — median age 24.0 years, with 33.1% aged under 15 — reflecting different demographic histories, including the lasting effects of colonisation and higher mortality at older ages. Of the 983,700 people in the 2021 estimate, 91.7% identified as Aboriginal, 4.0% as Torres Strait Islander, and the remainder both.",
        "These figures are presented with care and respect. Aboriginal and Torres Strait Islander peoples are distinct peoples, not a single group; statistics about them are governed by community expectations around data sovereignty (including frameworks such as those maintained by AIATSIS) and official disclosure-control practices that protect small communities. This chapter reports national-level figures only and does not attempt disaggregated analysis of outcomes, which requires appropriate community-governed protocols. Three-quarters (74.5%) of Aboriginal and Torres Strait Islander people lived in New South Wales, Queensland and Western Australia combined; the Northern Territory had the highest proportion of Aboriginal and Torres Strait Islander residents in its population.",
      ],
    },
    {
      id: "international-comparison",
      heading: "Australia in international context",
      paragraphs: [
        "For fertility, this chapter compares Australia with a fixed set of similar high-income countries across several regions: New Zealand, Canada, the United Kingdom, Germany, the Netherlands, Sweden, France, the United States, Japan, South Korea and Singapore — the countries for which a single consistent 2024 series was available through the World Bank API (which republishes United Nations World Population Prospects estimates; Taiwan's statistical agency publishes separately and is not part of this comparison). Australia, at 1.481 babies per woman in 2024, sits in the middle of this set — below France (1.61), the United States (1.63), New Zealand (1.57) and the United Kingdom (1.55), and above Sweden and the Netherlands (1.43), Germany (1.36), Canada (1.25), Japan (1.15), Singapore (0.97) and South Korea (0.75).",
        "Comparisons like this need care. The international series is compiled from UN estimates and can differ slightly from national statistical office figures — for Australia in 2024 the two agree at 1.481, but in 2019 the UN series showed 1.657 against the ABS 1.666. Differences of a few hundredths of a child are not meaningful; differences of half a child or more, such as between Australia and South Korea (0.748), are. Every country in this set is below the replacement level of about 2.1. The OECD's own SDMX data service retired its former national fertility dataflow during 2026, so a direct OECD-sourced comparison could not be completed in this research pass; it is recorded as not yet verified rather than approximated.",
        "Life expectancy tells a companion story. ABS period life tables for 2022–2024 put Australian life expectancy at birth at 81.1 years for males and 85.1 for females — the first period of no change after the decreases of 2020–2022 and 2021–2023, which were themselves the first decreases in decades. Within Australia the range is wide: the ACT was highest (82.0 males, 85.8 females) and the Northern Territory lowest (77.0, 80.7). On the internationally comparable both-sexes basis, Sweden (84.06) and Japan, Korea and Singapore (all above 83) were highest among the comparator set in 2024, with the United States lowest (78.89); Australia was 83.05.",
      ],
      chartId: "fertility-comparison",
    },
  ],
  methodNotes: [
    "Estimated Resident Population (ERP) is not a Census count: it is the Census adjusted for net undercount and residents temporarily overseas, then updated quarterly. The ABS states that all data after 30 June 2021 are subject to revision.",
    "Net overseas migration (NOM) is measured with the 12/16-month rule: a traveller is added to or removed from the resident population based on spending 12 of the previous 16 months in or out of Australia. NOM is not a visa count and not an arrivals count.",
    "Births and deaths are counted by year of registration, not occurrence. Registry processing changes (as in 2024) can move yearly figures; the ABS notes registration data are final and not revised.",
    "The chapter's national median age (38.5 years, 2022) and ageing projections come from the ABS Population Projections release, not the quarterly population release, which does not publish a current national median age on its summary page.",
    "Age and sex structure data lag the headline ERP by three quarters (30 June 2025 age data against 31 March 2026 headline).",
    "Fertility comparisons use the World Bank's SP.DYN.TFRT.IN series (UN World Population Prospects basis, 2024 values), cross-checked against ABS where possible; life-expectancy comparisons use SP.DYN.LE00.IN. Small differences between sources and between countries are within methodological noise.",
    "Aboriginal and Torres Strait Islander statistics are reported at national level only, with ABS context on identification and non-demographic contributions to change. Disaggregated analysis requires community-governed data protocols and is beyond this chapter's current scope.",
    "The OECD's former national fertility dataflow is no longer available through its SDMX API; the OECD-sourced comparison is marked not verified rather than substituted.",
  ],
  comparisons: [
    {
      heading: "Life expectancy at birth, comparator countries, 2024",
      paragraphs: [
        "Both-sexes life expectancy at birth in 2024, from the World Bank API (UN World Population Prospects basis). Australia's ABS male/female split for 2022–2024 is 81.1/85.1 years. Values are for comparison of broad levels; year-to-year movements of 0.1–0.2 years are within estimation noise, and the Australian 2023 and 2024 values are identical in this source.",
      ],
      table: [
        { label: "Sweden", columns: ["84.1"] },
        { label: "Japan", columns: ["84.0"] },
        { label: "South Korea", columns: ["83.6"] },
        { label: "Singapore", columns: ["83.3"] },
        { label: "Australia", columns: ["83.1"] },
        { label: "France", columns: ["83.0"] },
        { label: "Canada", columns: ["82.1"] },
        { label: "New Zealand", columns: ["82.0"] },
        { label: "Netherlands", columns: ["82.0"] },
        { label: "United Kingdom", columns: ["81.4"] },
        { label: "Germany", columns: ["80.8"] },
        { label: "United States", columns: ["78.9"] },
      ],
      tableColumns: ["Life expectancy at birth, years (2024)"],
      tableCaption:
        "Life expectancy at birth, both sexes combined, 2024, comparator countries (World Bank / UN WPP).",
    },
  ],
  actions: [
    {
      scope: "individual",
      title: "Check the definition before repeating a population statistic",
      what: "Before citing a population or migration figure, open the ABS release and check what is being counted — ERP, Census, arrivals, or net overseas migration — and the reference date.",
      why: "Headlines routinely blur these definitions, and the resulting number can differ by hundreds of thousands of people in the same period.",
      evidence:
        "The ABS publishes the definition of each measure alongside the data; this chapter's provenance records link directly to the releases used.",
      effort: "Minutes per claim.",
      limitations: "Source-checking prevents error, not disagreement — people can still interpret correct numbers differently.",
      startWhere:
        "ABS 'National, state and territory population' release pages, which define ERP and NOM in plain language.",
    },
    {
      scope: "community",
      title: "Use official projections in local planning discussions",
      what: "When discussing local services, schools, housing or community facilities, base the conversation on ABS regional population and household projections rather than extrapolated headlines.",
      why: "Local age structures and household types drive service needs in ways national totals do not capture, and official projections make their assumptions explicit.",
      evidence:
        "ABS Household and Family Projections and Regional population by age and sex releases are free and public; the ABS states projections illustrate assumptions, which supports honest community debate.",
      effort: "Low — reading the regional summary for your area takes under an hour.",
      limitations: "Projections are not predictions; community knowledge still matters for what statistics miss.",
      startWhere:
        "The ABS regional population pages for your state or territory, and your local government's population forecast publications.",
    },
    {
      scope: "professional",
      title: "Match the demographic measure to the decision",
      what: "In planning, analysis or reporting, deliberately choose the population measure that matches the decision at hand — ERP for service catchments, registrations for service demand, projections for long-lived investments — and state the choice.",
      why: "Using the wrong measure embeds systematic error: demand based on ERP while capacity was planned on Census counts is a common, avoidable mismatch.",
      evidence:
        "ABS methodology pages document the construction and revision behaviour of each series, including the 12/16-month NOM rule and post-2021 revision policy.",
      effort: "A small ongoing discipline rather than a one-off task.",
      limitations: "Even well-chosen measures carry revision and definitional limits that should be disclosed in professional work.",
      startWhere:
        "The 'Methodology' section of any ABS release you use, and the ABS 'Measuring net overseas migration' article.",
    },
    {
      scope: "institutional",
      title: "Participate in nonpartisan evidence processes",
      what: "Individuals and organisations can contribute to public statistical capacity in nonpartisan ways: responding to ABS consultations on Census topics and standards, or contributing evidence-based submissions to Productivity Commission and parliamentary inquiries that use demographic data.",
      why: "Official statistics improve with public engagement; consultation processes are the formal channel through which evidence users shape what is measured.",
      evidence:
        "The ABS runs a public consultation hub, and the Productivity Commission routinely invites public submissions on population-relevant inquiries.",
      effort: "Hours for a submission; minutes to register a view in a consultation.",
      limitations:
        "Participation is voluntary and nonpartisan; this project does not endorse any position, party or campaign, and individual participation is a personal choice.",
      startWhere:
        "The ABS consultation hub and the Productivity Commission's current inquiries page.",
    },
  ],
  corrections: [
    {
      date: "2026-10-23",
      summary: "First publication of Chapter 01 (initial release).",
      detail:
        "Initial release with verified ABS and World Bank data as described in the provenance records. No corrections recorded yet. Corrections and changes to published figures will be logged here with dates and reasons.",
    },
  ],
};
