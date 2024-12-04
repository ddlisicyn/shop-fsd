type Image = {
  imageType: string;
  format: string;
  url: string;
  width: number;
};

export type Product = {
  amwaySize?: string;
  code: string;
  alias?: string;
  name: string;
  price: number;
  retailPrice: number;
  category: string;
  images: Image[];
  lynxColorCode?: string;
  lynxName?: string;
  variants?: Product[];
  visible: boolean;
};
