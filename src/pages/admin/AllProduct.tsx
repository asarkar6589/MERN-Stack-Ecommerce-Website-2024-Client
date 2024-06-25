import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import AdminSideBar from '../../components/admin/AdminSideBar';
import Table from '../../components/admin/Table';
import { useGetAllAdminProductsQuery } from '../../redux/api/product';
import { Product } from '../../types/api-types';
import { DataType } from '../../vite-env';

const columns = [
    {
        Header: 'Photo',
        accessor: 'photo',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Price',
        accessor: 'price',
    },
    {
        Header: 'Stock',
        accessor: 'stock',
    },
    {
        Header: 'Action',
        accessor: 'action',
    },
];


const AllProduct = () => {
    const { data, isLoading, refetch } = useGetAllAdminProductsQuery('');
    const [rows, setRows] = useState<DataType[]>([]);

    useEffect(() => {
        refetch()
        if (data) {
            const products = data.products as Product[];
            const updatedRows = products.map((product) => ({
                photo: <img src={`${product.photo}`} alt={product.name} className="w-11 h-11" />,
                name: product.name,
                price: product.price,
                stock: product.stock,
                action: <Link to={`/admin/products/update/${product._id}`} className="p-2 rounded-xl bg-slate-500">Manage</Link>,
            }));
            setRows(updatedRows);
        }
    }, [data]);

    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {/* Products */}
            <section className="w-3/4 h-full mt-16 p-5 mr-9">
                <h1 className="text-4xl text-center font-extralight mt-5">Products</h1>

                <Link to="/admin/products/new" className="w-11 py-3 px-3 mb-11 flex justify-center items-center rounded-full bg-slate-500">
                    <FaPlus />
                </Link>

                {isLoading ? <Loader /> : <Table columns={columns} data={rows} />}
            </section>
        </div>
    );
};

export default AllProduct;
