import { MdError } from "react-icons/md";
const NotFound = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-5" style={{
            height: "80vh",
        }}>
            <MdError style={{ fontSize: 102 }} />
            <h1 className="text-5xl">Page Not Found</h1>
        </div>
    )
}

export default NotFound;
