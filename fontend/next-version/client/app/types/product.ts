interface Product {
  id: Number;
  slug: String;
  name: String;
  price: Number;
  discount: Number;
  images: {
    image_url: string;
  }[];
  avgRating: String;
  totalReviews: String;
}
