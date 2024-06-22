import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useDeleteProductMutation, useGetAllAdminProductsQuery, useGetSingleProductQuery, useUpdateProductMutation } from "../../redux/api/product";
import { DeleteProductResponse, UpdateProductResponse } from "../../types/api-types";

const UpdateProduct = () => {
    const params = useParams();
    const id = params.id!;
    const { data: productData, refetch: Refetch } = useGetSingleProductQuery(id!);

    const [name, setName] = useState<string>("");
    const [stock, setStock] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [photo, setPhoto] = useState<File | null>(null);
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const navigate = useNavigate();
    const [updateProduct] = useUpdateProductMutation();
    const { refetch } = useGetAllAdminProductsQuery('');
    const [deleteProduct] = useDeleteProductMutation();
    const [disable, setDisable] = useState<boolean>(false);

    const handelPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            setPhoto(files[0]);
        }
    }

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        setDisable(true);
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        if (stock! < 0) {
            setStock(1)
        }
        formData.set("stock", String(stock));
        formData.set("price", String(price));
        formData.set("photo", photo!);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("brand", brand);

        try {
            const res1 = await updateProduct({
                id,
                formData
            });

            if ("data" in res1) {
                toast.success("Product Updated Successfully");
                navigate("/admin/products");
                refetch();
            }
            else {
                const error = res1.error as FetchBaseQueryError;
                const messageResponse = error.data as UpdateProductResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message);
            return;
        }
        setDisable(false);
    }

    const deleteProductHandeler = async () => {
        try {
            const RES = await deleteProduct(id);

            if ("data" in RES) {
                toast.success("Product Updated Successfully");
                navigate("/admin/products");
                refetch();
            }
            else {
                const error = RES.error as FetchBaseQueryError;
                const messageResponse = error.data as DeleteProductResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        Refetch();
        if (productData) {
            setName(productData.product.name);
            setStock(productData.product.stock);
            setPrice(productData.product.price);
            setDescription(productData.product.description);
            setCategory(productData.product.category);
            setBrand(productData.product.brand);
        }
    }, [productData]);

    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            <section className="w-3/4 p-5 px-10 flex gap-5 h-screen mt-16">

                <div className="rounded-lg w-full flex flex-col items-center justify-center h-auto mt-20">
                    <div>
                        <button onClick={deleteProductHandeler} className="w-auto mb-11 "><FaTrash className="h-7 w-7" /></button>
                        {
                            productData?.product.stock === 0 ? <div className="text-red-800 text-right mb-11 w-full">Not Available</div> : <div className="text-right w-full mb-11">Stock : {productData?.product.stock}</div>
                        }

                        <span className="font-semibold">ID - {productData?.product._id}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <img src={`${import.meta.env.VITE_PHOTO_URL}/${productData?.product.photo}`} alt="" className="w-52 h-52 mt-2" />

                        <h1 className="text-2xl font-bold mt-5">{productData?.product.name}</h1>

                        <h1 className="text-xl font-bold mt-5">{productData?.product.price}</h1>
                    </div>
                </div>


                {/* info */}
                <div className="w-full justify-center flex flex-col items-center rounded-lg  h-screen p-11">
                    <h1 className="mt-2 text-4xl">Manage</h1>
                    <form className="flex flex-col text-lg p-4 h-screen" onSubmit={submitHandeler}>
                        <label htmlFor="name" className="font-semibold">Name : </label>
                        <input
                            type="text"
                            name="nmae"
                            id="name"
                            placeholder="Name of the product"
                            className="w-96 rounded-md outline-none border p-3"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="stock" className="font-semibold">Stock : </label>
                        <input
                            type="number"
                            name="stock"
                            id="stock"
                            placeholder="Stock"
                            className="w-96 rounded-md outline-none border p-3"
                            value={stock}
                            onChange={e => setStock(Number(e.target.value))}
                        />
                        <label htmlFor="price" className="font-semibold">Price : </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Price of the product"
                            className="w-96 rounded-md outline-none border p-3"
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                        />
                        <label htmlFor="photo" className="font-semibold">Photo : </label>
                        <input
                            type="file"
                            name="photo"
                            id="photo"
                            placeholder="Photo of the product"
                            className="w-96 rounded-md outline-none border"
                            onChange={handelPhoto}
                        />
                        <label htmlFor="description" className="font-semibold">Description : </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Description of the product"
                            className="w-96 rounded-md outline-none border p-3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <label htmlFor="category" className="font-semibold">Category : </label>

                        <input
                            type="text"
                            name="category"
                            id="category"
                            placeholder="Category of the product"
                            className="w-96 rounded-md outline-none border p-3"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="brand" className="font-semibold">Brand : </label>

                        <input
                            type="text"
                            name="brand"
                            id="brand"
                            placeholder="Brand of the product"
                            className="w-96 rounded-md outline-none border p-3"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />

                        <button disabled={disable} type="submit" className="w-96 rounded-md outline-none border p-3 bg-green-700">Update</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default UpdateProduct;
