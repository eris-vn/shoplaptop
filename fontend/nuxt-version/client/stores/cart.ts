import { defineStore } from "pinia";

interface Product {
  id: number;
  name: string;
  image: string;
  images?: {
    image_url: string;
  }[];
  price: number;
  discount?: number;
  quantity: number;
}

export const useCart = defineStore("cart", () => {
  const cart = useCookie<Product[]>("cart", {
    default: () => [],
  });

  async function add(slug: string, quantity: number = 1) {
    console.log("test");

    const data: {
      status: Number;
      data: Product;
    } = await useRequest("http://localhost:4000/api/product/info", {
      body: { slug },
    });

    if (data.status === 200) {
      const existingProductIndex = cart.value.findIndex(
        (product) => product.id === data.data.id
      );

      if (existingProductIndex !== -1) {
        cart.value[existingProductIndex].quantity += quantity;
      } else {
        cart.value = [
          ...cart.value,
          {
            name: data.data.name,
            image: data.data.images?.length
              ? data.data.images[0].image_url
              : "",
            price: data.data.price,
            discount: data.data.discount,
            quantity: quantity,
            id: data.data.id,
          },
        ];
      }
    }
  }

  function remove(id: number) {
    const index = cart.value.findIndex((product) => product.id === id);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
  }

  function clear() {
    cart.value = [];
  }

  return { cart, add, remove, clear };
});
