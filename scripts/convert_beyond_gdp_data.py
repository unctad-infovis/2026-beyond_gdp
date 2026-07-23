#!/usr/bin/env python3
"""One-off conversion of tmp/BeyondGDP data.xlsx sheets to public/assets/data/*.json.

Run manually whenever the source spreadsheet changes:
    python3 scripts/convert_beyond_gdp_data.py

Requires openpyxl (pip install openpyxl). Not part of the npm build.
"""
import glob
import json
import os

import openpyxl

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = glob.glob(os.path.join(ROOT, 'tmp', '*.xlsx'))[0]  # filename has a literal NBSP, glob sidesteps it
OUT_DIR = os.path.join(ROOT, 'public', 'assets', 'data')

# The source sheet has a typo in this region label ("American" instead of "America").
# Normalized here rather than reproduced on the live page.
REGION_FIXES = {
    'Latin American and the Caribbean': 'Latin America and the Caribbean'
}


def serialize(value):
    if hasattr(value, 'year') and hasattr(value, 'month'):
        return value.year
    if isinstance(value, str):
        return REGION_FIXES.get(value, value)
    return value


def dump_rows(ws):
    rows = list(ws.iter_rows(values_only=True))
    header = rows[0]
    return [{header[i]: serialize(v) for i, v in enumerate(row)} for row in rows[1:]]


def write_json(name, data):
    path = os.path.join(OUT_DIR, f'2026-beyond_gdp_{name}.json')
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
    print(f'wrote {path}')


def convert_simple(wb, sheet_name, out_name):
    write_json(out_name, dump_rows(wb[sheet_name]))


def convert_emissions(wb):
    # Source values are raw tonnes; the chart's y-axis/label claims "billions of tonnes CO2e",
    # so scale down here to match rather than plotting 10-digit raw counts.
    rows = dump_rows(wb['emissions'])
    for r in rows:
        r['total_ghg_emissions'] = r['total_ghg_emissions'] / 1e9
    write_json('emissions', rows)


def convert_wage_gap(wb):
    rows = dump_rows(wb['wage gap'])
    periods = sorted({r['group'] for r in rows})
    series = {}
    label_to_key = {'GDP per Capita': 'gdp_per_capita', 'Wage Gap': 'wage_gap_pct'}
    for label, key in label_to_key.items():
        series[key] = [next(r['value'] for r in rows if r['group'] == p and r['label'] == label) for p in periods]
    write_json('wage_gap', {'periods': periods, 'series': series})


def convert_trust(wb):
    rows = dump_rows(wb['trust'])
    years = sorted({r['group'] for r in rows})
    region_names = sorted({r['UNCTAD_region'] for r in rows})
    label_to_key = {'GDP per Capita': 'gdp_index', 'Share of people who say most people can be trusted': 'trust_pct'}
    regions = {}
    for region in region_names:
        regions[region] = {}
        for label, key in label_to_key.items():
            regions[region][key] = [next(r['value'] for r in rows if r['group'] == y and r['UNCTAD_region'] == region and r['label'] == label) for y in years]
    write_json('trust', {'years': years, 'regions': regions})


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    wb = openpyxl.load_workbook(SRC, data_only=True)

    convert_simple(wb, 'healthy life expectancy', 'healthy_life_expectancy')
    convert_simple(wb, 'wealth inequality', 'wealth_inequality')
    convert_emissions(wb)
    convert_simple(wb, 'homicides', 'homicides')
    convert_simple(wb, 'satisfaction', 'satisfaction')
    convert_simple(wb, 'prejudice', 'prejudice')
    convert_simple(wb, 'gap1', 'gap1')
    convert_simple(wb, 'gap2', 'gap2')
    convert_wage_gap(wb)
    convert_trust(wb)


if __name__ == '__main__':
    main()
