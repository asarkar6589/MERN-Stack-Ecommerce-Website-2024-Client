import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { User } from "../types/api-types";

const Header = ({ user }: { user: User | null }) => {
    return (
        <div>
            <section className="w-full flex bg-zinc-800 text-white justify-between items-center p-5 fixed top-0 left-0 right-0 text-lg md:text-2xl">
                <div className="ml-2">
                    <Link to="/" className="px-3 md:px-9">
                        <b>ShoppingIo</b>
                    </Link>
                </div>

                <div className="flex-1 text-gray-400 font-semibold flex justify-center items-center gap-3 md:gap-5">
                    <Link to="/">Home</Link>
                    {user?._id ? (
                        <>
                            <Link to={`/account/${user?._id}`}>Account</Link>
                            <Link to={`/cart`}>Cart</Link>
                        </>
                    ) : (
                        <Link to={`/login`}>Login</Link>
                    )}
                </div>

                <div className="flex justify-center items-center pr-3">
                    <Link to="/search">
                        <FaSearch />
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Header;
