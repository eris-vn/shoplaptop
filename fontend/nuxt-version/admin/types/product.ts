interface Product {
  id: number;
  slug: string;
  name: string;
  thumbnail: string;
  short_description: Text;
  description: Text;
  price: number;
  discount: number;
  images: {
    image_url: string;
  }[];
}

export type { Product };
