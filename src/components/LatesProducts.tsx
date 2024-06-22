import ProductCard from "./ProductCard";
import { useGetLatesProductsQuery } from "../redux/api/product";
import { useEffect, useState } from "react";
import { Product } from "../types/api-types";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { addToCartFun, calculatePrice } from "../redux/reducer/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { initialUserStateType } from "../types/initialState-types";

const LatesProducts = () => {
    const dispatch = useDispatch();
    let { data, isError, refetch, isLoading } = useGetLatesProductsQuery(null);
    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);

    useEffect(() => {
        refetch();
        if (!isError && data) {
            setProducts(data.products);
        }
    }, [data]);

    return (
        <div className="h-full w-full px-4 md:px-10 lg:px-20 xl:px-40 flex flex-col mt-10 font-semibold justify-center items-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl">New Arrivals</h1>

            {/* Product Cards */}
            <div className="mt-8 md:mt-12 flex gap-4 md:gap-5 w-full flex-wrap justify-center">
                {isLoading ? (
                    <Loader />
                ) : (
                    products.length > 0 &&
                    products.map((product) => {
                        const addToCart = () => {
                            if (!user) {
                                toast.error("Please Login First!");
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
                                } else {
                                    toast.error("Out Of Stock");
                                }
                            }
                        };

                        return (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                photo={product.photo}
                                stock={product.stock}
                                addToCart={addToCart}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default LatesProducts;
