type Image = {
    imageType: string;
    format: string;
    url: string;
    width: number;
}

type Renditions = {
    url: string;
    renditionType: string;
    assetFormat: {
        width: number;
    }
}

type LynxPicture = {
    renditions: Renditions[];
}

export type Product = {
    amwaySize?: string;
    code: string;
    alias?: string;
    name: string;
    price: number;
    retailPrice: number;
    images: Image[];
    lynxPicture?: LynxPicture;
    lynxColorCode?: string;
    lynxName?: string;
    variants?: Product[];
}