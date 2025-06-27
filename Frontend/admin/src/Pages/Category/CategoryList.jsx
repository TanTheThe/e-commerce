import React, { useContext, useEffect, useState } from "react";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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
import { deleteDataApi, getDataApi } from "../../utils/api";
import AddCategory from "./addCategory";
import EditCategory from "./editCategory";

const columns = [
    { id: 'image', label: 'IMAGE', minWidth: 150, align: 'center' },
    { id: 'cateName', label: 'CATEGORY NAME', minWidth: 200, align: 'center' },
    { id: 'action', label: 'ACTION', minWidth: 150, align: 'center' }
];

const CategoryList = () => {
    const [categoryFilterVal, setCategoryFilterVal] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    const context = useContext(MyContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await getDataApi('/admin/categories');

            if (response.success) {
                setCategories(response.data || []);
            } else {
                context.openAlertBox("error", "Có lỗi trong quá trình hiển thị danh mục");
                setCategories([]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            context.openAlertBox("error", "Có lỗi trong quá trình hiển thị danh mục");
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

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

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(categoryFilterVal.toLowerCase())
    );

    const paginatedCategories = filteredCategories.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const openDeleteDialog = (category) => {
        setCategoryToDelete(category);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setCategoryToDelete(null);
    };

    const handleDeleteCategory = async () => {
        if (!categoryToDelete) return;

        try {
            setDeleting(true);

            const response = await deleteDataApi(`/admin/categories/${categoryToDelete.id}`);

            if (response.success) {
                context.openAlertBox("success", response.message || "Xóa danh mục thành công");

                setCategories(prev => prev.filter(cat => cat.id !== categoryToDelete.id));

                closeDeleteDialog();
            } else {
                context.openAlertBox("error", response.message || "Có lỗi trong quá trình xóa danh mục");
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            context.openAlertBox("error", "Có lỗi xảy ra khi xóa danh mục!");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between px-2 py-0 mt-3">
                <h2 className="text-[18px] font-[600]">
                    Danh sách các danh mục
                </h2>

                <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
                    {/* <Button className="btn !bg-green-600 !text-white btn-sm flex items-center">
                        Export
                    </Button> */}
                    <Button
                        className="btn-blue !text-white btn-sm"
                        onClick={() => setIsOpen(true)}
                    >
                        Tạo danh mục
                    </Button>
                    <AddCategory
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        onSuccess={() => {
                            fetchCategories();
                        }}
                    />
                </div>
            </div>

            <div className="my-3">
                <input
                    type="text"
                    placeholder="Tìm kiếm danh mục..."
                    value={categoryFilterVal}
                    onChange={handleChangeCateFilter}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-gray-500">Đang tải dữ liệu...</div>
                    </div>
                ) : (
                    <>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead className="bg-[#f1f1f1]">
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                width={column.minWidth}
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedCategories.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                <div className="py-8 text-gray-500">
                                                    {categories.length === 0 ? 'Chưa có danh mục nào' : 'Không tìm thấy danh mục phù hợp'}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedCategories.map((category) => {
                                            return (
                                                <TableRow key={category.id} hover>
                                                    <TableCell align="center">
                                                        <div className="flex items-center justify-center w-[80px] mx-auto">
                                                            <div className="img w-full rounded-md overflow-hidden group">
                                                                {category.image ? (
                                                                    <img
                                                                        className="w-full h-[60px] object-cover group-hover:scale-105 transition-transform"
                                                                        src={category.image.startsWith('data:') ? category.image : category.image}
                                                                        alt={category.name}
                                                                        onError={(e) => {
                                                                            e.target.src = 'https://via.placeholder.com/80x60?text=No+Image';
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-[60px] bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                                                        No Image
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <span className="font-medium">{category.name}</span>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <div className="flex items-center justify-center gap-4">
                                                            <Button
                                                                className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#e1e1e1] !min-w-[35px]"
                                                                onClick={() => {
                                                                    setCategoryToEdit(category);
                                                                    setEditDialogOpen(true);
                                                                }}
                                                                title="Chỉnh sửa"
                                                            >
                                                                <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                                            </Button>

                                                            <Button
                                                                className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-red-100 !min-w-[35px]"
                                                                onClick={() => openDeleteDialog(category)}
                                                                title="Xóa"
                                                                disabled={deleting}
                                                            >
                                                                <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px] hover:text-red-600" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={filteredCategories.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Số hàng mỗi trang:"
                            labelDisplayedRows={({ from, to, count }) =>
                                `${from}-${to} trong tổng số ${count !== -1 ? count : `hơn ${to}`}`
                            }
                        />
                    </>
                )}
            </div>

            <Dialog
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Xác nhận xóa danh mục
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa danh mục "{categoryToDelete?.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} disabled={deleting}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleDeleteCategory}
                        autoFocus
                        color="error"
                        disabled={deleting}
                    >
                        {deleting ? 'Đang xóa...' : 'Xóa'}
                    </Button>
                </DialogActions>
            </Dialog>

            <EditCategory
                open={editDialogOpen}
                onClose={() => {
                    setEditDialogOpen(false);
                    setCategoryToEdit(null);
                }}
                category={categoryToEdit}
                onSuccess={() => {
                    fetchCategories();
                }}
            />
        </>
    )
}

export default CategoryList