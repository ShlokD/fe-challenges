export type Size = {
  available: boolean;
  size: string;
  sku: string;
};
export type Product = {
  name?: string;
  image?: string;
  style?: string;
  code_color?: string;
  color_slug?: string;
  color?: string;
  on_sale?: boolean;
  regular_price?: string;
  actual_price?: string;
  discount_percentage?: string;
  installments?: string;
  sizes?: Size[];
};
