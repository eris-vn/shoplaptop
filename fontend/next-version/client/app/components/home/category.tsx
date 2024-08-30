import Link from "next/link";

export default async function Category() {
  const data = await fetch(`${process.env.BASE_API}/api/home/categoryList`, {
    method: "POST",
  });
  const categoryList = await data.json();

  return (
    <div className="container mx-auto mt-2">
      <div className="bg-white rounded-md py-4 shadow-sm">
        <h3 className="text-2xl px-4 mb-3">Danh mục sản phẩm</h3>

        <div className="border-t px-4 pt-3">
          <div className="grid grid-cols-3 2xl:grid-cols-10 xl:grid-cols-10 md:grid-cols-8 gap-4">
            {categoryList.data
              ? categoryList.data?.map((category: any) => {
                  return (
                    <Link
                      href={`/danh-muc/${category.slug}`}
                      className="flex items-center flex-col"
                    >
                      <img
                        src={category.image_url}
                        alt=""
                        className="w-[84px] h-[84px] object-contain"
                      />
                      <div className="text-center">{category.name}</div>
                    </Link>
                  );
                })
              : "Không có dữ liệu"}
          </div>
        </div>
      </div>
    </div>
  );
}
