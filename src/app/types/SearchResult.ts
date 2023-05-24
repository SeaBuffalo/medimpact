import { Ingredient } from './Ingredient';

export type SearchResult = {
  sponsor_name: string;
  brand_name: string;
  dosage_form: string;
  route: string;
  active_ingredients: Ingredient[];
  marketing_status: string;
};
