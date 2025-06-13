import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { IoMdAdd } from "react-icons/io";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MenuItem, Select } from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import ProgressBar from "../../Components/ProgressBar";
import Checkbox from '@mui/material/Checkbox';
import SearchBox from "../../Components/SearchBox";

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
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

const Products = () => {
    const [categoryFilterVal, setCategoryFilterVal] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

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
            <div className="flex items-center justify-between px-2 py-0 mt-3">
                <h2 className="text-[18px] font-[600]">
                    Products{" "}
                    <span className="font-[400] text-[14px]">(Table)</span>
                </h2>

                <div className="col w-[18%] ml-auto flex items-center justify-end gap-3">
                    <Button className="btn !bg-green-600 !text-white btn-sm flex items-center">Export</Button>
                    <Button className="btn-blue !text-white btn-sm" onClick={() => context.setIsOpenFullScreenPanel({
                        open: true,
                        model: 'Add Product'
                    })}>Add Product</Button>
                </div>
            </div>

            <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center w-full px-5 justify-between">
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

                    <div className="col w-[20%] ml-auto">
                        <SearchBox/>
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
        </>
    )
}

export default Products