import Link from "next/link";

export default async function Product() {
  const data = await fetch(`${process.env.BASE_API}/api/home/productList`, {
    method: "POST",
  });
  const { data: productCategoryGroup } = await data.json();

  return (
    <div>
      {productCategoryGroup
        ? productCategoryGroup.map((productCategory: any) => {
            return (
              <div className="container mx-auto mt-5">
                <div className="bg-white rounded-md py-4 shadow-sm">
                  <div className="flex justify-between px-4 mb-4">
                    <div className="flex gap-5">
                      <h3 className="text-2xl">{productCategory.title}</h3>
                      {productCategory.freeship ? (
                        <div className="flex gap-5">
                          <div className="text-2xl">|</div>
                          <div className="flex gap-3 items-center">
                            <svg
                              className="h-[16px] w-[24px]"
                              viewBox="0 0 22 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.5 4H16V2C16 0.9 15.1 0 14 0H2C0.9 0 0 0.9 0 2V11C0 12.1 0.9 13 2 13C2 14.66 3.34 16 5 16C6.66 16 8 14.66 8 13H14C14 14.66 15.34 16 17 16C18.66 16 20 14.66 20 13H21C21.55 13 22 12.55 22 12V8.67C22 8.24 21.86 7.82 21.6 7.47L19.3 4.4C19.11 4.15 18.81 4 18.5 4ZM5 14C4.45 14 4 13.55 4 13C4 12.45 4.45 12 5 12C5.55 12 6 12.45 6 13C6 13.55 5.55 14 5 14ZM18.5 5.5L20.46 8H16V5.5H18.5ZM17 14C16.45 14 16 13.55 16 13C16 12.45 16.45 12 17 12C17.55 12 18 12.45 18 13C18 13.55 17.55 14 17 14Z"
                                fill="#FF3C53"
                              ></path>
                            </svg>
                            <span className="text-xl">Miễn phí giao hàng</span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="text-blue-600 text-lg hover:text-red-600 ease-in duration-100 cursor-pointer">
                      XEM TẤT CẢ
                    </div>
                  </div>

                  <div className="grid grid-cols-10 gap-4 px-4 rounded-sm">
                    {productCategory.products ? (
                      productCategory.products.map((product: any) => {
                        return (
                          <Link
                            href={`/san-pham/${product.slug}`}
                            className="col-span-2 flex items-center flex-col border cursor-pointer"
                          >
                            <img
                              src={
                                product.images && product.images[0]
                                  ? product.images[0]["image_url"]
                                  : "https://i.imgur.com/igbbIRf.png"
                              }
                              alt=""
                              className="w-full aspect-[10/10] object-contain"
                            />
                            <div className="p-2">
                              <div className="text-start text-md font-semibold line-clamp-2 mb-2">
                                {product.name}
                              </div>
                              <div
                                v-if="product.discount"
                                className="text-sm text-gray-600"
                              >
                                <span className="line-through me-3">
                                  {(product.discount ?? 0).toLocaleString(
                                    "it-IT",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                </span>
                                <span
                                  v-if="product.discount"
                                  className="text-red-600 text-sm px-[4px] py-[1px] bg-red-100 border border-red-500 rounded-sm"
                                >
                                  -5%
                                </span>
                              </div>
                              <div className="text-lg font-semibold text-red-600">
                                {(product.price ?? 0).toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </div>
                              <div className="flex gap-3 mt-2">
                                <div className="text-sm text-amber-600 font-semibold">
                                  {product.avgRating}
                                  <i className="text-xs bi bi-star-fill"></i>
                                </div>
                                <div className="text-sm text-gray-700">
                                  ({product.totalReviews} đánh giá)
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <div className="col-span-12">
                        Chưa có sản phẩm nào {JSON.stringify(productCategory)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
}
