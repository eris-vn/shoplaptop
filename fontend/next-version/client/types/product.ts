interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  discount: number;
  images: {
    image_url: string;
  }[];
  avgRating: string;
  totalReviews: string;
}
