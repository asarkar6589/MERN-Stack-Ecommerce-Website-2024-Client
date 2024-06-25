import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/api/product";
import { addToCartFun, calculatePrice } from "../redux/reducer/cartReducer";
import { initialUserStateType } from "../types/initialState-types";
import { ProductCartType } from "../vite-env";

const ProductCard = ({ id, name, photo, price, stock }: ProductCartType) => {
    const { user } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);
    const { data, refetch } = useGetSingleProductQuery(id);
    const dispatch = useDispatch();

    const addToCart = () => {
        if (!user) {
            toast.error("Please Login First !");
            return;
        }
        if (data) {
            if (data.product.stock > 0) {
                dispatch(addToCartFun({
                    id,
                    photo,
                    price: price,
                    quantity: 1, // initially 1
                    name,
                    stock
                }));
                dispatch(calculatePrice());
                toast.success("Added To Cart");
            }
            else {
                toast.error("Out Of Stock");
            }
        }
    }

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div className="flex flex-col justify-center items-center p-3 bg-slate-200 rounded-xl w-full max-w-xs m-4">
            <Link to={`/product/${id}`} className="flex flex-col justify-center w-full items-center mt-2">
                <div>
                    <img src={`${photo}`} alt={name} className="h-32 w-full object-contain" />
                </div>

                <div>
                    <h1 className="text-xl mt-4">{name}</h1>
                </div>

                <div className="mt-5 flex gap-5 items-center">
                    <div className="font-extrabold text-lg">₹ {price}</div>
                </div>
            </Link>
            <button onClick={addToCart} className="border p-2 w-full rounded-lg flex bg-white text-black justify-center gap-2 items-center mt-2">
                <FaShoppingCart /> Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;
