import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useNewProductMutation } from "../../redux/api/product";
import { newProductResponse } from "../../types/api-types";
import AdminSideBar from "./AdminSideBar";

const NewProduct = () => {
    const [name, setName] = useState<string>("");
    const [stock, setStock] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [photo, setPhoto] = useState<File | null>(null);
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [newProduct] = useNewProductMutation();
    const [disable, setDisabled] = useState<boolean>(false);
    const navigate = useNavigate();

    const handelPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            setPhoto(files[0]);
        }
    }

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        setDisabled(true);
        e.preventDefault();

        try {
            if (!name || !stock || !price || !photo || !description || !category || !brand) {
                toast.error("Please fill in the required fields");
                return;
            }

            const formData = new FormData();
            formData.set("name", name);
            formData.set("stock", String(stock));
            formData.set("price", String(price));
            formData.set("photo", photo);
            formData.set("description", description);
            formData.set("category", category);
            formData.set("brand", brand);

            const res = await newProduct({
                formData
            });

            if ("data" in res) {
                toast.success(res.data.message);
                navigate("/admin/products");
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as newProductResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message);
            return;
        }

        setDisabled(true);
    }

    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {/* Products */}
            <section className="w-3/4 p-5 px-10 flex flex-col items-center mt-16 mr-20">
                <h1 className="mb-7 text-4xl">New Product</h1>

                <form className="flex flex-col gap-4 text-lg" onSubmit={submitHandeler}>
                    <input
                        type="text"
                        name="nmae"
                        id="name"
                        placeholder="Name of the product"
                        required
                        className="w-96 rounded-md outline-none border p-3"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        type="number"
                        name="stock"
                        id="stock"
                        placeholder="Stock"
                        required
                        className="w-96 rounded-md outline-none border p-3"
                        value={stock}
                        onChange={e => setStock(Number(e.target.value))}
                    />

                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Price of the product"
                        required
                        className="w-96 rounded-md outline-none border p-3"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />

                    <input
                        type="file"
                        name="photo"
                        id="photo"
                        placeholder="Photo of the product"
                        required
                        className="w-96 rounded-md outline-none border p-3"
                        onChange={handelPhoto}
                    />

                    <textarea
                        name="description"
                        id="desc"
                        placeholder="Description"
                        required
                        className="w-96 rounded-md outline-none border p-3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Category of the product"
                        required
                        className="w-96 rounded-md outline-none border p-3"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        placeholder="Brand of the product"
                        required
                        className="w-96 rounded-md outline-none border p-3"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />

                    <button disabled={disable} type="submit" className="w-96 rounded-md outline-none border p-3 bg-green-700">
                        {
                            disable ? <span>Please Wait...</span> : <span>Add</span>
                        }
                    </button>
                </form>
            </section>
        </div>
    )
}

export default NewProduct;
