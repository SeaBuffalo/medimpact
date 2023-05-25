import { SearchResult } from "./app/types/SearchResult";

export const pageLoadData: SearchResult[] = [
  {
    sponsor_name: 'BAYER',
    brand_name: 'ALEVE-D SINUS & COLD',
    dosage_form: 'TABLET, EXTENDED RELEASE',
    route: 'ORAL',
    active_ingredients: [
      {
        name: 'NAPROXEN SODIUM',
        strength: '220MG',
      },
      {
        name: 'PSEUDOEPHEDRINE HYDROCHLORIDE',
        strength:
          '120MG **Federal Register determination that product was not discontinued or withdrawn for safety or effectiveness reasons**',
      },
    ],
    marketing_status: 'Discontinued',
    application_number: 'NDA021076',
  },
  {
    sponsor_name: 'PERRIGO',
    brand_name: 'NAPROXEN SODIUM AND PSEUDOEPHEDRINE HYDROCHLORIDE',
    dosage_form: 'TABLET, EXTENDED RELEASE',
    route: 'ORAL',
    active_ingredients: [
      {
        name: 'NAPROXEN SODIUM',
        strength: '220MG',
      },
      {
        name: 'PSEUDOEPHEDRINE HYDROCHLORIDE',
        strength: '120MG',
      },
    ],
    marketing_status: 'Over-the-counter',
    application_number: 'ANDA076518',
  },
  {
    sponsor_name: 'BIONPHARMA INC',
    brand_name: 'NAPROXEN SODIUM',
    dosage_form: 'CAPSULE',
    route: 'ORAL',
    active_ingredients: [
      {
        name: 'NAPROXEN SODIUM',
        strength: 'EQ 200MG BASE',
      },
    ],
    marketing_status: 'Over-the-counter',
    application_number: 'NDA021920',
  },
  {
    sponsor_name: 'BAYER',
    brand_name: 'ALEVE',
    dosage_form: 'TABLET',
    route: 'ORAL',
    active_ingredients: [
      {
        name: 'NAPROXEN SODIUM',
        strength: '220MG',
      },
    ],
    marketing_status: 'Over-the-counter',
    application_number: 'NDA020204',
  },
  {
    sponsor_name: 'BAYER HLTHCARE',
    brand_name: 'ALEVE PM',
    dosage_form: 'TABLET',
    route: 'ORAL',
    active_ingredients: [
      {
        name: 'DIPHENHYDRAMINE HYDROCHLORIDE',
        strength: '25MG',
      },
      {
        name: 'NAPROXEN SODIUM',
        strength: '220MG',
      },
    ],
    marketing_status: 'Over-the-counter',
    application_number: 'NDA205352',
  },
  {
    sponsor_name: 'PERRIGO PHARMA INTL',
    brand_name: 'DICLOFENAC SODIUM',
    dosage_form: 'GEL',
    route: 'TOPICAL',
    active_ingredients: [
      {
        name: 'DICLOFENAC SODIUM',
        strength: '1%',
      },
    ],
    marketing_status: 'Over-the-counter',
    application_number: 'ANDA211253',
  },
];