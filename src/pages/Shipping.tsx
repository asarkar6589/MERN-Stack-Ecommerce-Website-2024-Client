import { FormEvent, useEffect, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useNewPayementQuery } from "../redux/api/payement";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import { initialCartStateType } from "../types/initialState-types";

const Shipping = () => {
    const { cartItems, total } = useSelector((state: { cartReducer: initialCartStateType }) => state.cartReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [pinCode, setPinCode] = useState<number>();
    const { data } = useNewPayementQuery({
        amount: total
    });

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(saveShippingInfo({
            address,
            city,
            country,
            pinCode,
        }));

        console.log(data?.clinet_secret);

        navigate("/pay", {
            state: data?.clinet_secret
        })
    }

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/cart");
        }
    }, [cartItems.length])

    return (
        <div className="h-auto">
            <div className="bg-zinc-800 w-9 text-white rounded-full h-9 flex justify-center items-center mt-5 mx-11 hover:shadow-2xl">
                <Link to="/cart" className="p-5">
                    <RiArrowLeftLine />
                </Link>
            </div>

            <div className="flex flex-col justify-center items-center w-full mt-10 md:mt-20">
                <h1 className="mb-7 text-4xl">Shipping Address</h1>

                <form className="flex flex-col gap-5 text-lg" onSubmit={submitHandeler}>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter Your Address"
                        required
                        className="w-full md:w-96 rounded-md outline-none border p-3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Enter Your City"
                        required
                        className="w-full md:w-96 rounded-md outline-none border p-3"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <select
                        name="country"
                        id="country"
                        required
                        className="w-full md:w-96 rounded-md outline-none border p-3"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="choose">Choose Country</option>
                        <option value="IND">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Findland">Findland</option>
                        <option value="Russia">Russia</option>
                    </select>

                    <input
                        type="number"
                        name="pinCode"
                        id="pinCode"
                        placeholder="Enter Your Pin code"
                        required
                        className="w-full md:w-96 rounded-md outline-none border p-3"
                        value={pinCode}
                        onChange={(e) => setPinCode(Number(e.target.value))}
                    />

                    <button type="submit" className="w-full md:w-96 rounded-md outline-none border p-3 bg-green-700">
                        Pay Now
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Shipping;
