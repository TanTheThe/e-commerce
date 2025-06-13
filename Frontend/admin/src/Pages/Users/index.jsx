import React, { useContext, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import { MdLocalPhone, MdOutlineMarkEmailRead } from "react-icons/md";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
    { id: 'userImg', label: 'USER IMAGE', minWidth: 80 },
    { id: 'userName', label: 'USER NAME', minWidth: 100 },
    {
        id: 'userEmail',
        label: 'USER EMAIL',
        minWidth: 150
    },
    {
        id: 'userPhone',
        label: 'USER PHONE',
        minWidth: 100,
    }
];

const Users = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const context = useContext(MyContext)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center w-full px-5 justify-between">
                    <div className="col w-[20%]">
                        <h2 className="text-[18px] font-[600]">
                            Users List
                            <span className="font-[400] text-[14px]">(Table)</span>
                        </h2>
                    </div>

                    <div className="col w-[40%] ml-auto">
                        <SearchBox />
                    </div>
                </div>

                <br/>

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
                                    <div className="flex items-center gap-4 w-[70px]">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <a href="/product/45745" data-discover="true">
                                                <img className="w-full group-hover:scale-105" src="https://mui.com/static/images/avatar/1.jpg" />
                                            </a>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="font-[Montserrat] text-gray-500">Vikas Kumar</span>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="flex gap-2 font-[Montserrat] text-gray-500">
                                        <MdOutlineMarkEmailRead className="mt-1"/> the63574@gmail.com
                                    </span>
                                </TableCell>
                                
                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <span className="flex gap-2 font-[Montserrat] text-gray-500">
                                        <MdLocalPhone className="mt-1"/> +91-9876543210
                                    </span>
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

export default Users