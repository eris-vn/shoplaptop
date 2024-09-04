import Link from "next/link";
import BuyButton from "./buy";

export default async function Page({ params }: { params: { slug: string } }) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_API ?? "";

  const data = await fetch(`${baseURL}/api/product/info`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      slug: params.slug,
    }),
    cache: "no-store",
  });
  const { status, data: product } = await data.json();

  const requestRelatedProduct = await fetch(`${baseURL}/api/product/related`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      slug: params.slug,
    }),
  });

  const { data: relatedProduct } = await requestRelatedProduct.json();

  return (
    <div className="container mx-auto mt-5">
      <div className="bg-white rounded-md mt-4">
        <div className="grid grid-cols-12 divide-x">
          <div className="col-span-12 xl:col-span-4 lg:col-span-5 md:col-span-4 p-5">
            <img
              src={
                product.images.length
                  ? product.images[0].image_url
                  : "https://i.imgur.com/igbbIRf.png"
              }
              alt=""
              className="rounded-sm w-full aspect-[10/10] object-cover"
            />
            <div className="grid grid-cols-10 mt-4 gap-5">
              {product.images
                ? product.images.map((image: any) => {
                    return (
                      <div className="col-span-2">
                        <img
                          src={image.image_url}
                          alt=""
                          className="object-cover w-full h-full border"
                        />
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <div className="col-span-12 xl:col-span-8 lg:col-span-7 md:col-span-8 p-5">
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <div className="flex gap-3 mt-2">
              <div className="text-base text-amber-600 font-semibold">
                0.0 <i className="text-xs bi bi-star-fill"></i>
              </div>
              <div className="text-base text-gray-700">(0 đánh giá)</div>
            </div>
            <div className="flex gap-4 mt-5">
              <div className="text-3xl font-semibold text-red-600">
                {(product.price ?? 0).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <span
                className="line-through text-xl text-gray-500 me-3"
                v-if="product?.data.discount"
              >
                {(product.discount ?? 0).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <span
                className="text-red-600 text-sm px-[4px] py-[1px] bg-red-100 border border-red-500 rounded-sm h-fit"
                v-if="product?.data.discount"
              >
                -5%
              </span>
            </div>
            <BuyButton baseURL={baseURL} slug={product.slug}></BuyButton>

            {product.short_description ? (
              <div
                className="mt-4 text-lg border-t pt-4"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              ></div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 mt-4 gap-4">
        <div className="col-span-12 md:col-span-8 bg-white rounded-md p-4">
          <h2 className="text-2xl">THÔNG TIN SẢN PHẨM</h2>
          <div className="relative" id="content">
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className="overflow-hidden mt-3"
            ></div>
            {/* <div>
              <div
                className="absolute bottom-10 h-[280px] w-full"
                style={{ background: "" }}
              ></div>
              <div className="absolute w-full text-center py-2 text-blue-600 bg-white bottom-0 text-base cursor-pointer">
                XEM CHI TIẾT
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-span-12 md:col-span-4" id="content-2">
          <div className="sticky top-[95px]">
            <div className="bg-white round-md p-4 h-fit">
              <h2 className="text-2xl">CẤU HÌNH</h2>
              <table className="table w-full border border-collapse mt-3">
                <thead>
                  <tr className="bg-zinc-200">
                    <th className="py-3 px-4">Thẻ</th>
                    <th className="py-3 px-4">Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4">SDD</td>
                    <td className="py-3 px-4">512 GB</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">RAM</td>
                    <td className="py-3 px-4">16 GB</td>
                  </tr>
                  <tr className="bg-zinc-200">
                    <td className="py-3 px-4">VGA</td>
                    <td className="py-3 px-4">Onboard</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">CPU</td>
                    <td className="py-3 px-4">i5-13500H</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md mt-4  p-5">
        <h2 className="text-2xl">SẢN PHẨM LIÊN QUAN</h2>
        <div className="grid grid-cols-10 gap-4 rounded-sm mt-3">
          {relatedProduct ? (
            relatedProduct.map((product: any) => {
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
                        {(product.discount ?? 0).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
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
            <div className="col-span-12">Chưa có sản phẩm nào</div>
          )}
        </div>
      </div>
    </div>
  );
}
