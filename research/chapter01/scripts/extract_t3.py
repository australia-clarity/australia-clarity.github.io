#!/usr/bin/env python3
"""T3: World Bank API extraction (fertility SP.DYN.TFRT.IN, life expectancy SP.DYN.LE00.IN).
Sources: raw/wb-fertility.json, raw/wb-lifeexpectancy.json (fetched 2026-10-22;
API 'lastupdated' field: 2026-10-08). OECD SDMX was tried first - see notes.
Outputs: series/wb-fertility-comparison.csv, series/wb-fertility-australia.csv,
         series/wb-lifeexpectancy-comparison.csv, series/wb-lifeexpectancy-australia.csv
"""
import csv, json, os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW, SER = os.path.join(BASE, 'raw'), os.path.join(BASE, 'series')

def load(fn):
    meta, recs = json.load(open(os.path.join(RAW, fn)))
    return meta, recs

for fn, comp_out, aus_out in [
        ('wb-fertility.json', 'wb-fertility-comparison.csv', 'wb-fertility-australia.csv'),
        ('wb-lifeexpectancy.json', 'wb-lifeexpectancy-comparison.csv', 'wb-lifeexpectancy-australia.csv')]:
    meta, recs = load(fn)
    print(f"{fn}: lastupdated={meta.get('lastupdated')}, records={len(recs)}")
    by_country = {}
    for r in recs:
        code = r['countryiso3code'] or r['country']['id']
        name = r['country']['value']
        year = int(r['date'])
        by_country.setdefault((code, name), {})[year] = r['value']
    # comparison file: latest year with a value per country
    with open(os.path.join(SER, comp_out), 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['country_name', 'country_code', 'latest_year_with_value', 'latest_value'])
        for (code, name), series in sorted(by_country.items(), key=lambda kv: kv[0][1]):
            ys = [y for y, v in series.items() if v is not None]
            if ys:
                ly = max(ys)
                w.writerow([name, code, ly, series[ly]])
            else:
                w.writerow([name, code, '', ''])
    # Australia full series
    aus = None
    for (code, name), series in by_country.items():
        if code == 'AUS':
            aus = series
    with open(os.path.join(SER, aus_out), 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['year', 'value'])
        for y in sorted(aus):
            w.writerow([y, aus[y] if aus[y] is not None else ''])
    n_vals = sum(1 for v in aus.values() if v is not None)
    print(f"  -> {comp_out} ({len(by_country)} countries), {aus_out} ({len(aus)} years, {n_vals} with values)")
    print(f"     AUS range {min(y for y in aus)}-{max(y for y in aus)}; latest value: "
          f"{aus.get(max(y for y in aus if aus[y] is not None))} in {max(y for y in aus if aus[y] is not None)}")
