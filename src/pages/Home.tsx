import { FaShoppingCart } from "react-icons/fa";
import image from "../assets/mac.png";
import LatesProducts from "../components/LatesProducts";

const Home = () => {
    return (
        <div className="mt-16">
            {/* Cover Photo and description section */}
            <section className="bg-zinc-800 flex flex-col md:flex-row justify-between p-6 md:p-14 items-center w-full overflow-hidden">
                {/* Content */}
                <div className="text-center md:text-left w-full md:w-1/2 px-4 md:px-0">
                    <div>
                        <h1 className="text-white font-semibold text-3xl md:text-5xl lg:text-7xl">Macbook 14 Pro</h1>
                    </div>
                    <p className="mt-4 text-gray-400 font-medium text-sm md:text-base lg:text-lg">
                        Supercharged by M2 Pro or M2 Max, MacBook Pro takes its power and efficiency further than ever. It delivers exceptional performance whether it's plugged in or not, and now has even longer battery life.
                    </p>

                    <div className="flex flex-col md:flex-row items-center mt-4 gap-2 text-white font-semibold w-full md:w-auto">
                        <button className="border p-2 w-full md:w-36 rounded-lg">Read More</button>
                        <button className="border p-2 w-full md:w-36 rounded-lg flex bg-white text-black justify-center gap-2 items-center">
                            <FaShoppingCart /> Add to Cart
                        </button>
                    </div>
                </div>

                {/* Photo */}
                <div className="mt-6 md:mt-0 w-full md:w-1/2 flex justify-center">
                    <img
                        src={image} alt="Macbook 14 Pro"
                        className="w-60 h-auto md:w-96 md:h-auto max-w-full"
                    />
                </div>
            </section>

            {/* Latest Products */}
            <section className="w-full px-4 md:px-10 lg:px-20 xl:px-40">
                <LatesProducts />
            </section>
        </div>
    );
}

export default Home;
