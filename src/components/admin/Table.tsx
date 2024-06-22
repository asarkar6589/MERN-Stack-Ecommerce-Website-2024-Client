import { FC } from "react";
import { TableState, usePagination, useSortBy, useTable } from "react-table";

interface TableProps {
    columns: any[],
    data: any[]
}

interface CustomInitialState extends Partial<TableState<object>> {
    sortBy: { id: string; desc: boolean }[], // Define sortBy property
    pageIndex: number,
    pageSize: number
}

const Table: FC<TableProps> = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { pageIndex },
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage,
        pageCount
    } = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [
                    { id: 'defaultSortColumnId', desc: false } // Make sure to include desc property
                ],
                pageIndex: 0, // Set the initial page index
                pageSize: 5, // Set the initial page size
            } as CustomInitialState,
        },
        useSortBy,
        usePagination
    );

    return (
        <div className="overflow-x-auto">
            <table {...getTableProps()} className="w-full text-center bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())} // Add getSortByToggleProps
                                    className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                {row.cells.map(cell => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-4 py-3 whitespace-no-wrap text-sm sm:text-base text-left text-gray-900 align-top"
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className={`px-4 py-2 mt-2 sm:mt-0 rounded-md ${!canPreviousPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600 text-black'
                        }`}
                >
                    Previous
                </button>
                <span className="mt-2 sm:mt-0">
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageCount}
                    </strong>{' '}
                </span>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className={`px-4 py-2 mt-2 sm:mt-0 rounded-md ${!canNextPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600 text-black'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Table;
