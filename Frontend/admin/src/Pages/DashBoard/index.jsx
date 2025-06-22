import React, { useState, PureComponent, useContext } from "react";
import DashBoardBoxes from "../../Components/DashBoardBoxes";
import Button from "@mui/material/Button";
import { FaAngleDown, FaAngleUp, FaPlus, FaRegEye } from "react-icons/fa";
import Badge from "../../Components/Badge"
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import ProgressBar from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import Pagination from '@mui/material/Pagination';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MenuItem, Select } from "@mui/material";
import { BiExport } from "react-icons/bi";
import { MyContext } from "../../App";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
    { id: 'product', label: 'PRODUCT', minWidth: 150 },
    { id: 'category', label: 'CATEGORY', minWidth: 100 },
    {
        id: 'subcategory',
        label: 'SUB CATEGORY',
        minWidth: 150
    },
    {
        id: 'price',
        label: 'PRICE',
        minWidth: 100,
    },
    {
        id: 'sales',
        label: 'SALES',
        minWidth: 100,
    },
    {
        id: 'action',
        label: 'ACTION',
        minWidth: 120,
    },
];

function createData(name, code, population, size,) {
    const density = population / size;
    return { name, code, population, size, density };
}

const DashBoard = () => {
    const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null)
    const isShowOrderedProduct = (index) => {
        if (isOpenOrderedProduct === index) {
            setIsOpenOrderedProduct(null)
        } else {
            setIsOpenOrderedProduct(index)
        }
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [categoryFilterVal, setCategoryFilterVal] = useState('')
    const [chart1Data, setChart1Data] = useState(
        [
            {
                name: 'JAN',
                TotalUsers: 4000,
                TotalSales: 2400,
                amt: 2400,
            },
            {
                name: 'FEB',
                TotalUsers: 3000,
                TotalSales: 1398,
                amt: 2210,
            },
            {
                name: 'MARCH',
                TotalUsers: 2000,
                TotalSales: 9800,
                amt: 2290,
            },
            {
                name: 'APRIL',
                TotalUsers: 2780,
                TotalSales: 3908,
                amt: 2000,
            },
            {
                name: 'MAY',
                TotalUsers: 1890,
                TotalSales: 4800,
                amt: 2181,
            },
            {
                name: 'JUNE',
                TotalUsers: 2390,
                TotalSales: 3800,
                amt: 2500,
            },
            {
                name: 'JULY',
                TotalUsers: 3490,
                TotalSales: 4300,
                amt: 2100,
            },
            {
                name: 'AUG',
                TotalUsers: 4000,
                TotalSales: 2400,
                amt: 2400,
            },
            {
                name: 'SEP',
                TotalUsers: 2000,
                TotalSales: 9800,
                amt: 2290,
            },
            {
                name: 'OCT',
                TotalUsers: 3490,
                TotalSales: 4300,
                amt: 2100,
            },
            {
                name: 'NOV',
                TotalUsers: 2000,
                TotalSales: 9800,
                amt: 2290,
            },
            {
                name: 'DEC',
                TotalUsers: 3490,
                TotalSales: 4300,
                amt: 2100,
            },
        ]
    )

    const context = useContext(MyContext)

    const handleChangeCateFilter = (event) => {
        setCategoryFilterVal(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    

    return (
        <>
            <div className="w-full py-2 p-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
                <div className="info">
                    <h1 className="text-[35px] font-[700] leading-10 mb-3">Good Morning,<br />
                        Cameron
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="inline-flex h-8 w-8 ml-2"><path fill="#fac036" d="M39.11 79.56c-1.1 1.03-2.21-.2-2.21-.2S18.42 59.78 17.22 58.9c-1.69-1.23-5.31-3.16-8.93.57-1.51 1.55-3.97 5 .6 10.56.99 1.2 29.78 31.54 31.46 33.18 0 0 13.3 12.94 21.35 17.81 2.23 1.35 4.74 2.78 7.67 3.78 2.92 1 6.22 1.69 9.7 1.69 3.48.04 7.09-.63 10.5-1.88 3.41-1.26 6.59-3.09 9.48-5.2.71-.54 1.43-1.08 2.1-1.66l1.94-1.6a58.67 58.67 0 0 0 3.82-3.53c2.43-2.42 4.62-5.01 6.55-7.66 1.92-2.66 3.55-5.41 4.85-8.15 1.3-2.74 2.21-5.49 2.76-8.09.58-2.59.74-5.04.65-7.18-.02-2.14-.45-3.97-.8-5.43-.4-1.46-.83-2.55-1.17-3.27-.33-.72-.51-1.1-.51-1.1-.46-1.29-.9-2.52-1.29-3.63a889.622 889.622 0 0 0-4.51-12.47l.01.03c-4.85-13.17-10.06-26.74-10.06-26.74-.79-2.39-3.7-3.22-5.84-1.68-6.18 4.44-8.07 10.92-5.89 17.83l5.59 15.32c.79 1.71-1.39 3.69-2.85 2.5-4.59-3.74-14.3-14.05-14.3-14.05-4.34-4.16-28.83-29.27-30.47-30.8-3.3-3.07-7.46-4.65-10.63-2.32-3.24 2.38-4.14 6.06-1.01 10.08.85 1.09 25.6 27.24 25.6 27.24 1.44 1.51-.26 3.65-1.85 2.18 0 0-30.79-32.12-32.18-33.62-3.15-3.42-8.21-4.17-11.21-1.35-2.93 2.75-2.86 7.26.34 10.8 1.02 1.12 22.71 24.02 31.39 33.4.58.63 1.03 1.47.17 2.26-.01.01-.88.95-2-.25-2.36-2.52-25.93-27.08-27.24-28.41-3.01-3.06-7.05-4.51-10.3-1.53-2.96 2.71-3.44 7.44-.04 10.78l28.55 30.18s.93 1.1-.11 2.07z"></path><path fill="#e48c15" d="m85.46 54.4 2.41 2.58s-13.79 13.31-4.39 33.75c0 0 1.22 2.59-.38 3.02 0 0-1.4.78-3-3.2 0-.01-9.49-19.42 5.36-36.15z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" opacity="0.5" d="M63.28 10.2s5.81.88 11.19 6.64c5.38 5.77 7.87 13.18 7.87 13.18M77.44 3.5s4.87 2.45 8.63 8.5c3.76 6.05 4.67 13.05 4.67 13.05m-55.03 85.68s-5.86.39-12.35-4.09-10.52-11.18-10.52-11.18m18.69 25.1s-5.44.23-11.68-3.22-10.44-9.12-10.44-9.12"></path></svg>
                    </h1>
                    <p>Here’s What happening on your store today. See the statistics at once.</p>

                    <br />

                    <Button className="btn-blue !capitalize" onClick={() => context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product"
                    })}>
                        <FaPlus /> Add Product
                    </Button>
                </div>

                <img src="shop-illustration.webp" className="w-[250px]" />
            </div>
            <DashBoardBoxes />

            <div className="card my-4 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between px-5 py-5">
                    <h2 className="text-[18px] font-[600]">Products</h2>
                </div>

                <div className="flex items-center w-full pl-5 justify-between pr-5">
                    <div className="col w-[20%]">
                        <h4 className="font-[600] text-[13px] mb-3">Category by</h4>
                        <Select
                            className="w-full"
                            size="small"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={categoryFilterVal}
                            onChange={handleChangeCateFilter}
                            label="Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Men</MenuItem>
                            <MenuItem value={20}>Women</MenuItem>
                            <MenuItem value={30}>Kid</MenuItem>
                        </Select>
                    </div>

                    <div className="col w-[18%] ml-auto flex items-center gap-3">
                        <Button className="btn !bg-green-600 !text-white btn-sm flex items-center">Export</Button>
                        <Button className="btn-blue !text-white btn-sm" onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: "Add Product"
                        })}>
                            Add Product
                        </Button>
                    </div>
                </div>

                <div className="relative overflow-x-auto mt-5 pb-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3" width="10%">
                                    <div className="w-[60px]"></div>
                                    <Checkbox {...label} size="small" />
                                </th>
                                <th scope="col" className="px-2 py-3 whitespace-nowrap">
                                    PRODUCT
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    CATEGORY
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    SUB CATEGORY
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    PRICE
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    SALES
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-[rgba(0,0,0,0.1)]">
                                <td className="px-6 py-3">
                                    <div className="w-[60px]">
                                        <Checkbox {...label} size="small" />
                                    </div>
                                </td>

                                <td className="px-2 py-2">
                                    <div className="flex items-center gap-4 w-[350px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <Link to="/product/45745">
                                                <img src="product-1.jpg" className="w-full group-hover:scale-105" />
                                            </Link>
                                        </div>

                                        <div className="info w-[75%]">
                                            <h3 className="font-[700] text-[14px] leading-4 hover:text-[#3872fa]">
                                                <Link to="/product/45745">We'll guide you through the process of creating a fully responsive admin</Link>
                                            </h3>


                                            <span className="text-[12px]">Books</span>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-2">Electronics</td>

                                <td className="px-6 py-2">Women</td>

                                <td className="px-6 py-2">
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">$58.00</span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600]">$58.00</span>
                                    </div>
                                </td>

                                <td className="px-6 py-2">
                                    <p className="text-[14px] w-[150px]">
                                        <span className="font-[600]">234 </span>
                                        sales
                                        <ProgressBar value={40} type='success' />
                                    </p>
                                </td>

                                <td className="px-6 py-2">
                                    <div className="flex items-center gap-4">
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>

                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>

                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-end pt-5 pb-5 px-4">
                    <Pagination count={10} color="primary" />
                </div>

            </div>

            <div className="card my-4 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between px-5 py-5">
                    <h2 className="text-[18px] font-[600]">Products (Table)</h2>
                </div>

                <div className="flex items-center w-full pl-5 justify-between pr-5">
                    <div className="col w-[20%]">
                        <h4 className="font-[600] text-[13px] mb-3">Category by</h4>
                        <Select
                            className="w-full mb-5"
                            size="small"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={categoryFilterVal}
                            onChange={handleChangeCateFilter}
                            label="Category"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Men</MenuItem>
                            <MenuItem value={20}>Women</MenuItem>
                            <MenuItem value={30}>Kid</MenuItem>
                        </Select>
                    </div>

                    <div className="col w-[18%] ml-auto flex items-center gap-3">
                        <Button className="btn !bg-green-600 !text-white btn-sm flex items-center">Export</Button>
                        <Button className="btn-blue !text-white btn-sm" onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: "Add Product"
                        })}>Add Product</Button>
                    </div>
                </div>

                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className="bg-[#f1f1f1]">
                            <TableRow>
                                <TableCell>
                                    <Checkbox {...label} size="small" />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size="small" />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[350px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <a href="/product/45745" data-discover="true">
                                                <img className="w-full group-hover:scale-105" src="product-1.jpg" />
                                            </a>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[700] text-[14px] leading-4 hover:text-[#3872fa] font-[Montserrat] text-gray-500">
                                                <a href="/product/45745" data-discover="true">We'll guide you through the process of creating a fully responsive admin
                                                </a>
                                            </h3>
                                            <span className="text-[12px] font-[Montserrat] text-gray-500">Books
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="font-[Montserrat] text-gray-500">Electronics</span>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="font-[Montserrat] text-gray-500">Women</span>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500] font-[Montserrat]">$58.00</span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600] font-[Montserrat]">$58.00</span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[150px] font-[Montserrat] text-gray-500">
                                        <span className="font-[600] font-[Montserrat] text-gray-500">234 </span>
                                        sales
                                        <ProgressBar value={40} type='success' />
                                    </p>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4">
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>

                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>

                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size="small" />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[350px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <a href="/product/45745" data-discover="true">
                                                <img className="w-full group-hover:scale-105" src="product-1.jpg" />
                                            </a>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[700] text-[14px] leading-4 hover:text-[#3872fa] font-[Montserrat] text-gray-500">
                                                <a href="/product/45745" data-discover="true">We'll guide you through the process of creating a fully responsive admin
                                                </a>
                                            </h3>
                                            <span className="text-[12px] font-[Montserrat] text-gray-500">Books
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="font-[Montserrat] text-gray-500">Electronics</span>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="font-[Montserrat] text-gray-500">Women</span>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500] font-[Montserrat]">$58.00</span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600] font-[Montserrat]">$58.00</span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[150px] font-[Montserrat] text-gray-500">
                                        <span className="font-[600] font-[Montserrat] text-gray-500">234 </span>
                                        sales
                                        <ProgressBar value={40} type='success' />
                                    </p>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4">
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>

                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>

                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size="small" />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[350px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <a href="/product/45745" data-discover="true">
                                                <img className="w-full group-hover:scale-105" src="product-1.jpg" />
                                            </a>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[700] text-[14px] leading-4 hover:text-[#3872fa] font-[Montserrat] text-gray-500">
                                                <a href="/product/45745" data-discover="true">We'll guide you through the process of creating a fully responsive admin
                                                </a>
                                            </h3>
                                            <span className="text-[12px] font-[Montserrat] text-gray-500">Books
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="font-[Montserrat] text-gray-500">Electronics</span>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="font-[Montserrat] text-gray-500">Women</span>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500] font-[Montserrat]">$58.00</span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600] font-[Montserrat]">$58.00</span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[150px] font-[Montserrat] text-gray-500">
                                        <span className="font-[600] font-[Montserrat] text-gray-500">234 </span>
                                        sales
                                        <ProgressBar value={40} type='success' />
                                    </p>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4">
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>

                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>

                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Checkbox {...label} size="small" />
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[350px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <a href="/product/45745" data-discover="true">
                                                <img className="w-full group-hover:scale-105" src="product-1.jpg" />
                                            </a>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[700] text-[14px] leading-4 hover:text-[#3872fa] font-[Montserrat] text-gray-500">
                                                <a href="/product/45745" data-discover="true">We'll guide you through the process of creating a fully responsive admin
                                                </a>
                                            </h3>
                                            <span className="text-[12px] font-[Montserrat] text-gray-500">Books
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="font-[Montserrat] text-gray-500">Electronics</span>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="font-[Montserrat] text-gray-500">Women</span>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500] font-[Montserrat]">$58.00</span>
                                        <span className="price text-[#3872fa] text-[14px] font-[600] font-[Montserrat]">$58.00</span>
                                    </div>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[150px] font-[Montserrat] text-gray-500">
                                        <span className="font-[600] font-[Montserrat] text-gray-500">234 </span>
                                        sales
                                        <ProgressBar value={40} type='success' />
                                    </p>
                                </TableCell>
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4">
                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>

                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>

                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={10}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>

            <div className="card my-4 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between px-5 py-5">
                    <h2 className="text-[18px] font-[600]">Recent Orders</h2>
                </div>
                <div className="relative overflow-x-auto mt-5 pb-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    &nbsp;
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Order Id
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Payment Id
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Pincode
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Total Amount
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    User Id
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Order Status
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <td className="px-6 py-4 font-[500]">
                                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]" onClick={() => isShowOrderedProduct(0)}>
                                        {
                                            isOpenOrderedProduct === 0 ?
                                                <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                                                :
                                                <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                                        }

                                    </Button>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="text-[#3872fa] font-[600]">57398d4573463712da87849</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="text-[#3872fa] font-[600]">pay_PDH474jdDJIa</span>
                                </td>
                                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                    RINKU VERMA
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    09643990046
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="block w-[300px]">H No 222 Street No 6 Adarsh MohallaMaujpur Delhi near shivam medical ph. +91-9643990046</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    110035
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    3800
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    the63574@gmail.com
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="text-[#3872fa] font-[600]">g6fd78g678df6g786df7g6</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <Badge status="pending" />
                                </td>
                                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                    2025-09-06
                                </td>
                            </tr>

                            {
                                isOpenOrderedProduct === 0 && <tr>
                                    <td className="pl-20" colSpan="6">
                                        <div className="relative overflow-x-auto">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Product Id
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Product Title
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Image
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Quantity
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Price
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            SubTotal
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>57398d4573463712da87849</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>A-Line Kurti With Sharara & Du...</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                            <img className="w-[40px] h-[40px] object-cover rounded-md" src="https://api.spicezgold.com/download/file_1734690981297_011618e4-4682-4123-be80-1fb7737d34ad1714702040213RARERABBITMenComfortOpaqueCasualShirt1.jpg" />
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            2
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>57398d4573463712da87849</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>A-Line Kurti With Sharara & Du...</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                            <img className="w-[40px] h-[40px] object-cover rounded-md" src="https://api.spicezgold.com/download/file_1734690981297_011618e4-4682-4123-be80-1fb7737d34ad1714702040213RARERABBITMenComfortOpaqueCasualShirt1.jpg" />
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            2
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            }

                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <td className="px-6 py-4 font-[500]">
                                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]" onClick={() => isShowOrderedProduct(1)}>
                                        {
                                            isOpenOrderedProduct === 1 ?
                                                <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                                                :
                                                <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                                        }

                                    </Button>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="text-[#3872fa] font-[600]">57398d4573463712da87849</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="text-[#3872fa] font-[600]">pay_PDH474jdDJIa</span>
                                </td>
                                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                    RINKU VERMA
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    09643990046
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="block w-[300px]">H No 222 Street No 6 Adarsh MohallaMaujpur Delhi near shivam medical ph. +91-9643990046</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    110035
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    3800
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    the63574@gmail.com
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="text-[#3872fa] font-[600]">g6fd78g678df6g786df7g6</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <Badge status="pending" />
                                </td>
                                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                    2025-09-06
                                </td>
                            </tr>

                            {
                                isOpenOrderedProduct === 1 && <tr>
                                    <td className="pl-20" colSpan="6">
                                        <div className="relative overflow-x-auto">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Product Id
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Product Title
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Image
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Quantity
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Price
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            SubTotal
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>57398d4573463712da87849</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>A-Line Kurti With Sharara & Du...</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                            <img className="w-[40px] h-[40px] object-cover rounded-md" src="https://api.spicezgold.com/download/file_1734690981297_011618e4-4682-4123-be80-1fb7737d34ad1714702040213RARERABBITMenComfortOpaqueCasualShirt1.jpg" />
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            2
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>57398d4573463712da87849</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>A-Line Kurti With Sharara & Du...</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                            <img className="w-[40px] h-[40px] object-cover rounded-md" src="https://api.spicezgold.com/download/file_1734690981297_011618e4-4682-4123-be80-1fb7737d34ad1714702040213RARERABBITMenComfortOpaqueCasualShirt1.jpg" />
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            2
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            }

                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <td className="px-6 py-4 font-[500]">
                                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]" onClick={() => isShowOrderedProduct(2)}>
                                        {
                                            isOpenOrderedProduct === 2 ?
                                                <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                                                :
                                                <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                                        }

                                    </Button>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="text-[#3872fa] font-[600]">57398d4573463712da87849</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="text-[#3872fa] font-[600]">pay_PDH474jdDJIa</span>
                                </td>
                                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                    RINKU VERMA
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    09643990046
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="block w-[300px]">H No 222 Street No 6 Adarsh MohallaMaujpur Delhi near shivam medical ph. +91-9643990046</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    110035
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    3800
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    the63574@gmail.com
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <span className="text-[#3872fa] font-[600]">g6fd78g678df6g786df7g6</span>
                                </td>
                                <td className="px-6 py-4 font-[500]">
                                    <Badge status="pending" />
                                </td>
                                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                    2025-09-06
                                </td>
                            </tr>

                            {
                                isOpenOrderedProduct === 2 && <tr>
                                    <td className="pl-20" colSpan="6">
                                        <div className="relative overflow-x-auto">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Product Id
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Product Title
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Image
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Quantity
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            Price
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                            SubTotal
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>57398d4573463712da87849</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>A-Line Kurti With Sharara & Du...</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                            <img className="w-[40px] h-[40px] object-cover rounded-md" src="https://api.spicezgold.com/download/file_1734690981297_011618e4-4682-4123-be80-1fb7737d34ad1714702040213RARERABBITMenComfortOpaqueCasualShirt1.jpg" />
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            2
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                    </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>57398d4573463712da87849</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            <span>A-Line Kurti With Sharara & Du...</span>
                                                        </td>
                                                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                            <img className="w-[40px] h-[40px] object-cover rounded-md" src="https://api.spicezgold.com/download/file_1734690981297_011618e4-4682-4123-be80-1fb7737d34ad1714702040213RARERABBITMenComfortOpaqueCasualShirt1.jpg" />
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            2
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                        <td className="px-6 py-4 font-[500]">
                                                            1300
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card my-4 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between px-5 py-5">
                    <h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
                </div>

                <div className="flex items-center gap-5 px-5 py-5 pt-1">
                    <span className="flex items-center gap-1 text-[15px]">
                        <span className="block w-[8px] h-[8px] rounded-full bg-green-600">
                        </span>
                        Total Users
                    </span>

                    <span className="flex items-center gap-1 text-[15px]">
                        <span className="block w-[8px] h-[8px] rounded-full bg-[#3872fa]">
                        </span>
                        Total Users
                    </span>
                </div>

                <LineChart
                    width={1000}
                    height={500}
                    data={chart1Data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="none" />
                    <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                    <YAxis tick={{ fontSize: 14 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="TotalUsers" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={3} />
                    <Line type="monotone" dataKey="TotalSales" stroke="#82ca9d" strokeWidth={3} />
                </LineChart>
            </div>
        </>
    )
}

export default DashBoard