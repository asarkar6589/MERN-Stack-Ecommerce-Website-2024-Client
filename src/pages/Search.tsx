import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useGetBrandsQuery, useGetCategoriesQuery, useSearchProductsQuery } from "../redux/api/product";
import { addToCartFun, calculatePrice } from "../redux/reducer/cartReducer";
import { Product } from "../types/api-types";
import { initialUserStateType } from "../types/initialState-types";

const Search = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [allBrand, setAllBrand] = useState<string[]>([]);
    const [allCategory, setAllCategory] = useState<string[]>([]);
    const [sort, setSort] = useState<string>("");
    const [price, setPrice] = useState<number>(100000);
    const [category, setCategory] = useState<string>("");
    const [searchItem, setSearchItem] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const { user } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);
    const dispatch = useDispatch();

    const { data } = useSearchProductsQuery({
        name: searchItem,
        sort,
        price,
        category,
        brand,
        page
    });

    const { data: res } = useGetBrandsQuery("");
    const { data: res2 } = useGetCategoriesQuery("");

    useEffect(() => {
        if (data) {
            let a = data?.products as Product[];
            setProducts(a);
        }

        if (res) {
            let x = res.brands as string[];
            setAllBrand(x);
        }

        if (res2) {
            let y = res2.category as string[];
            setAllCategory(y);
        }
    }, [data]);

    return (
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between mt-20 lg:mt-32 gap-6 px-4 lg:px-9">
            {/* aside */}
            <aside className="shadow-lg p-6 flex flex-col w-full lg:w-80">
                <h1 className="text-xl lg:text-2xl font-semibold">FILTERS</h1>

                <div className="mt-4 lg:mt-7">
                    <label htmlFor="sort" className="text-lg"><b>Sort</b></label>
                    <br />

                    <select
                        name="sort"
                        id="sort"
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value)
                        }}
                        className="border rounded-lg p-2 w-full"
                    >
                        <option value="none">None</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="dsc">Price (High to Low)</option>
                    </select>
                </div>

                <div className="mt-4 lg:mt-7">
                    <label htmlFor="max" className="text-lg"><b>Max Price : </b>{price}</label>
                    <br />

                    <input type="range"
                        min={0}
                        max={100000}
                        value={price}
                        onChange={(e) => {
                            setPrice(Number(e.target.value));
                        }}
                        className="w-full"
                    />
                </div>

                <div className="mt-4 lg:mt-7">
                    <label htmlFor="category"><b>Category</b></label>
                    <br />

                    <select name="category" id="category" value={category} onChange={(e) => {
                        setCategory(e.target.value)
                    }} className="border rounded-lg p-2 w-full">
                        <option value="">All</option>
                        {
                            allCategory && (
                                allCategory.map((i) => (
                                    <option key={i} value={i}>{i}</option>
                                ))
                            )
                        }
                    </select>
                </div>

                <div className="mt-4 lg:mt-7">
                    <label htmlFor="brand"><b>Brand</b></label>
                    <br />

                    <select name="brand" id="brand" value={brand} onChange={(e) => {
                        setBrand(e.target.value)
                    }} className="border rounded-lg p-2 w-full">
                        <option value="">All</option>
                        {
                            allBrand && (
                                allBrand.map((i) => (
                                    <option key={i} value={i}>{i}</option>
                                ))
                            )
                        }
                    </select>
                </div>
            </aside>

            {/* search */}
            <section className="w-full p-4 px-7">
                <h1 className="text-xl lg:text-2xl font-semibold">PRODUCTS</h1>

                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search by Name"
                    value={searchItem}
                    onChange={(e) => {
                        setSearchItem(e.target.value)
                    }}
                    className="mt-4 lg:mt-7 outline-none text-lg lg:text-xl w-full"
                />

                <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {
                        products && (
                            products.map((product) => {

                                const addToCart = () => {
                                    if (!user) {
                                        toast.error("Please Login First !");
                                        return;
                                    }
                                    if (data) {
                                        if (product.stock > 0) {
                                            dispatch(addToCartFun({
                                                id: product._id,
                                                photo: product.photo,
                                                price: product.price,
                                                quantity: 1, // initially 1
                                                name: product.name,
                                                stock: product.stock
                                            }));
                                            dispatch(calculatePrice());
                                            toast.success("Added To Cart");
                                        }
                                        else {
                                            toast.error("Out Of Stock");
                                        }
                                    }
                                }

                                return (
                                    <ProductCard
                                        key={product._id}
                                        id={product._id}
                                        name={product.name}
                                        price={product.price}
                                        photo={`${product.photo}`}
                                        stock={product.stock}
                                        addToCart={addToCart}
                                    />
                                )
                            })
                        )
                    }
                </div>

                <div className="mt-10 flex justify-center gap-3">
                    <button onClick={() => {
                        if (page <= 1) {
                            return;
                        }
                        setPage(page - 1);
                    }} className="border w-16 h-7 rounded-md font-semibold">
                        Prev
                    </button>

                    <span>{page} of {data?.total_pages}</span>

                    <button onClick={() => {
                        if (page >= data?.total_pages!) {
                            return;
                        }
                        setPage(page + 1);
                    }} className="border w-16 h-7 rounded-md font-semibold">
                        Next
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Search;
