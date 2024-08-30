"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";
import { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";

export default function Search() {
  const searchParams = useSearchParams();

  const [productList, setProductList] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchProduct = async (page = 1) => {
    const req = await fetch(`http://localhost:4000/api/product/list`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        search: searchParams.get("query"),
        page,
        pageSize,
      }),
    });

    const res = await req.json();

    if (res.status == 200) {
      setProductList(res.data);
      setTotalProducts(res.pagination.total);
      setPageSize(res.pagination.pageSize);
    }
  };

  useEffect(() => {
    fetchProduct(page);
  }, [page, searchParams]);

  const handlePageChange = (event: any) => {
    setPage(event.page + 1);
  };

  return (
    <div>
      <div className="container mx-auto mt-5">
        <BreadCrumb
          model={[{ label: "Tìm kiếm" }]}
          home={{ icon: "bi bi-house-door", url: "/" }}
        />
      </div>
      <div className="container mx-auto mt-5">
        <div className="bg-white rounded-md py-4 shadow-sm">
          <div className="grid grid-cols-10 gap-4 px-4 rounded-sm">
            {productList.length ? (
              productList.map((product: any) => (
                <Link
                  key={product.id} // Added key for list items
                  href={`/san-pham/${product.slug}`}
                  className="col-span-2 flex items-center flex-col border cursor-pointer"
                >
                  <img
                    src={product.images[0].image_url}
                    alt=""
                    className="w-full aspect-[10/10] object-contain"
                  />
                  <div className="p-2">
                    <div className="text-start text-md font-semibold line-clamp-2 mb-2">
                      {product.name}
                    </div>
                    {product.discount && (
                      <div className="text-sm text-gray-600">
                        <span className="line-through me-3">
                          {(product.discount ?? 0).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        <span className="text-red-600 text-sm px-[4px] py-[1px] bg-red-100 border border-red-500 rounded-sm">
                          -5%
                        </span>
                      </div>
                    )}
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
              ))
            ) : (
              <div className="col-span-12">Không tìm thấy sản phẩm</div>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-5">
        <Paginator
          first={(page - 1) * pageSize}
          rows={pageSize}
          totalRecords={totalProducts}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
