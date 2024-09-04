"use client";
// react
import Link from "next/link";

// nextjs
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// primereact
import { BreadCrumb } from "primereact/breadcrumb";
import { Paginator } from "primereact/paginator";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";

// typescript
interface Option {
  name: string;
  value: string;
}

interface FilterRequest extends Option {
  values: Option[];
}

type FilterType = {
  [key: string]: string[];
};

export default function Page() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_API ?? "";
  const params = useParams();

  const [category, setCategory] = useState({
    name: "Loading",
  });
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Product
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProduct = async (page = 1) => {
    const req = await fetch(
      `${baseURL}/api/category/${params.slug}?` +
        new URLSearchParams({
          price: query.price.toString(),
          per_page: query.per_page.toString(),
          page: query.page.toString(),
          filters: convertFiltersToQueryString(selectedFilter),
        }).toString(),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const res = await req.json();

    if (res.status == 200) {
      setCategory(res.data.category);
      setProductList(res.data.products.list);
      setTotalProducts(res.data.products.paginate.totalCount);
      // setPageSize(res.pagination.pageSize);
    }
  };

  // Filter Product
  const convertFiltersToQueryString = (filters: any) => {
    const queryParts = [];
    for (const key in filters) {
      if (filters[key] && filters[key].length > 0) {
        queryParts.push(`${key}=${filters[key].join(",")}`);
      }
    }
    return queryParts.join("&");
  };

  const [priceFilterOptions] = useState<Option[]>([
    {
      name: "Giá: thấp đén cao",
      value: "asc",
    },
    {
      name: "Giá: cao đén thấp",
      value: "desc",
    },
  ]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>({});
  const [filterList, setFilterList] = useState<FilterRequest[]>([]);

  const [query, setQuery] = useState({
    price: "",
    per_page: 20,
    page: 1,
    filters: "",
  });

  const fetchFilterProduct = async (page = 1) => {
    const req = await fetch(`${baseURL}/api/category/${params.slug}/filter`, {
      method: "GET",
    });

    const res = await req.json();

    if (res.status == 200) {
      setFilterList(res.data);
    }
  };

  useEffect(() => {
    fetchProduct(page);
    fetchFilterProduct();
  }, [params.slug, page, query]);

  const handlePageChange = (event: any) => {
    setPage(event.page + 1);
  };

  const onFilter = () => {
    fetchProduct();
  };

  const onClearFilter = async () => {
    setQuery({
      price: "",
      per_page: 20,
      page: 1,
      filters: "",
    });
    setSelectedFilter({});
  };

  return (
    <div>
      <div className="container mx-auto mt-5">
        <BreadCrumb
          model={[{ label: category.name }]}
          home={{ icon: "bi bi-house-door", url: "/" }}
        />
      </div>
      <div className="container mx-auto mt-5">
        <div className="bg-white rounded-md p-4 grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 sticky top-[80px] border mb-4">
          <Dropdown
            value={query.price}
            onChange={(e) =>
              setQuery({
                ...query,
                price: e.value,
              })
            }
            options={priceFilterOptions}
            optionLabel="name"
            optionValue="value"
            placeholder="Sắp xếp theo giá"
            className="w-full border"
          />
          {filterList.length
            ? filterList.map((filter, index) => (
                <MultiSelect
                  key={index}
                  value={selectedFilter[filter.value] || []}
                  onChange={(e) =>
                    setSelectedFilter({
                      ...selectedFilter,
                      [filter.value]: e.value,
                    })
                  }
                  options={filter.values}
                  optionLabel="name"
                  optionValue="value"
                  placeholder={filter.name}
                  className="w-full border"
                />
              ))
            : ""}
          <div className="flex gap-4">
            <div
              className="w-full bg-red-500 text-center leading-[48px] text-white rounded-md cursor-pointer"
              onClick={(e) => onFilter()}
            >
              LỌC
            </div>
            <div
              className="w-full bg-gray-500 text-center leading-[48px] text-gray-100 rounded-md cursor-pointer"
              onClick={(e) => onClearFilter()}
            >
              XOÁ LỌC
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md py-4 shadow-sm">
          <div className="grid grid-cols-10 gap-4 px-4 rounded-sm">
            {productList.length ? (
              productList.map((product) => (
                <Link
                  key={product.id}
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
              <div className="col-span-12">Chưa có sản phẩm nào</div>
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
