import React, { useContext, useEffect, useState } from "react";
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
import { getDataApi } from "../../utils/api";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
    { id: 'product', label: 'PRODUCT', minWidth: 200 },
    { id: 'category', label: 'CATEGORY', minWidth: 150 },
    {
        id: 'variants',
        label: 'VARIANTS',
        minWidth: 100
    },
    {
        id: 'priceRange',
        label: 'PRICE RANGE',
        minWidth: 150,
    },
    {
        id: 'actions',
        label: 'ACTIONS',
        minWidth: 150,
    },
];

const Products = () => {
    const [categoryFilterVal, setCategoryFilterVal] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // API related states
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalProducts, setTotalProducts] = useState(0);
    const [categories, setCategories] = useState([]);

    const context = useContext(MyContext);

    // Fetch products from API
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const skip = page * rowsPerPage;
            const limit = rowsPerPage;

            const response = await getDataApi(`/admin/product?skip=${skip}&limit=${limit}`);

            if (response.success) {
                setProducts(response.data || []);
                // Note: You might need to add total count to your API response
                setTotalProducts(response.data?.length || 0);

                // Extract unique categories for filter
                const allCategories = response.data?.flatMap(product =>
                    product.categories_names || []
                ) || [];
                const uniqueCategories = [...new Set(allCategories)];
                setCategories(uniqueCategories);
            } else {
                console.error('Failed to fetch products:', response.data);
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch product details for offcanvas
    const fetchProductDetail = async (productId) => {
        try {
            const response = await getDataApi(`/admin/product/${productId}`);

            if (response.success) {
                return response.data;
            } else {
                console.error('Failed to fetch product detail:', response.data);
                return null;
            }
        } catch (error) {
            console.error('Error fetching product detail:', error);
            return null;
        }
    };

    // Load products when component mounts or pagination changes
    useEffect(() => {
        fetchProducts();
    }, [page, rowsPerPage]);

    const handleChangeCateFilter = (event) => {
        setCategoryFilterVal(event.target.value);
        // You might want to implement filtering logic here
        // or add category filter to your API endpoint
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Function to get price range for a product (placeholder since variants not in list API)
    const getPriceRange = (variants) => {
        if (!variants || variants.length === 0) return { min: 0, max: 0 };

        const prices = variants.map(variant => variant.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        return { min: minPrice, max: maxPrice };
    };

    // Handle view product with API call
    const handleViewProduct = async (product) => {
        setLoading(true);
        const productDetail = await fetchProductDetail(product.id);

        if (productDetail) {
            setSelectedProduct(productDetail);
            setIsOffcanvasOpen(true);
        }
        setLoading(false);
    };

    // Handle close offcanvas
    const handleCloseOffcanvas = () => {
        setIsOffcanvasOpen(false);
        setSelectedProduct(null);
    };

    // Filter products based on category
    const filteredProducts = categoryFilterVal
        ? products.filter(product =>
            product.categories_names?.includes(categoryFilterVal)
        )
        : products;

    return (
        <>
            <div className="flex items-center justify-between px-2 py-0 mt-3">
                <h2 className="text-[18px] font-[600]">
                    Danh sách sản phẩm{" "}
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
                        <h4 className="font-[600] text-[13px] mb-3">Sắp xếp theo danh mục</h4>
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
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                    <div className="col w-[20%] ml-auto">
                        <SearchBox />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg">Đang tải...</div>
                    </div>
                ) :
                    <>
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
                                    {filteredProducts.map((product) => {
                                        return (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    <Checkbox {...label} size="small" />
                                                </TableCell>

                                                {/* Product Column */}
                                                <TableCell style={{ minWidth: 200 }}>
                                                    <div className="flex items-center gap-4 w-[350px]">
                                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                                            <a href={`/product/${product.id}`} data-discover="true">
                                                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                                    src={product.image}
                                                                    alt={product.name} />
                                                            </a>
                                                        </div>
                                                        <div className="info w-[75%]">
                                                            <h3 className="font-[700] text-[14px] leading-4 hover:text-[#3872fa] font-[Montserrat] text-gray-500">
                                                                <a href={`/product/${product.id}`} data-discover="true">
                                                                    {product.name}
                                                                </a>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* Category Column */}
                                                <TableCell style={{ minWidth: 150 }}>
                                                    <div className="flex flex-wrap gap-1">
                                                        {product.categories_names.map((category, index) => (
                                                            <span key={index}
                                                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded font-[Montserrat]">
                                                                {category}
                                                            </span>
                                                        )) || <span className="text-gray-400">No category</span>}
                                                    </div>
                                                </TableCell>

                                                {/* Variants Column */}
                                                <TableCell style={{ minWidth: 100 }}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-1 rounded-full font-[Montserrat]">
                                                            {/* Note: variants count not available in list API, showing placeholder */}
                                                            <span className="text-gray-400">-</span>
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                {/* Price Range Column */}
                                                <TableCell style={{ minWidth: 150 }}>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[14px] font-[500] font-[Montserrat] text-gray-600">
                                                            {/* Note: price not available in list API, showing placeholder */}
                                                            <span className="text-gray-400">View details</span>
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                {/* Actions Column */}
                                                <TableCell style={{ minWidth: 150 }}>
                                                    <div className="flex items-center gap-2">
                                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                                        </Button>

                                                        <Button
                                                            className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]"
                                                            onClick={() => handleViewProduct(product)}
                                                            disabled={loading}
                                                        >
                                                            <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                                        </Button>

                                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                                                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={totalProducts}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                }
            </div>

            <div className={`fixed inset-0 z-50 ${isOffcanvasOpen ? 'visible' : 'invisible'}`}>
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOffcanvasOpen ? 'opacity-50' : 'opacity-0'
                        }`}
                    onClick={handleCloseOffcanvas}
                ></div>

                <div className={`fixed right-0 top-0 h-full w-[600px] bg-white shadow-xl transform transition-transform duration-300 ${isOffcanvasOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div className="flex items-center justify-between p-4 border-b border-[rgba(0,0,0,0.2)]">
                        <h2 className="text-xl font-semibold">Product Details</h2>
                        <Button
                            className="!w-8 !h-8 !min-w-8 !p-0 hover:bg-gray-100"
                            onClick={handleCloseOffcanvas}
                        >
                            <span className="text-xl">&times;</span>
                        </Button>
                    </div>

                    <div className="p-4 h-full overflow-y-auto pb-24">
                        {selectedProduct && (
                            <>
                                <div className="mb-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={selectedProduct.images?.[0] || '/placeholder-image.jpg'}
                                            alt={selectedProduct.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">{selectedProduct.name}</h3>
                                            <div className="flex gap-2 mb-2">
                                                {selectedProduct.categories?.map((cat, index) => (
                                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                                        <p className="text-gray-700 leading-relaxed">
                                            {selectedProduct.description || 'No description available'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold mb-4">
                                        Product Variants ({selectedProduct.product_variant?.length || 0})
                                    </h4>
                                    {selectedProduct.product_variant && selectedProduct.product_variant.length > 0 ? (
                                        <div className="space-y-4">
                                            {selectedProduct.product_variant.map((variant, index) => (
                                                <div key={variant.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h5 className="font-medium text-gray-800">Variant {index + 1}</h5>
                                                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                                                            ID: {variant.id}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                                Size
                                                            </label>
                                                            <div className="p-2 bg-white border border-gray-200 rounded-md">
                                                                <span className="text-gray-800">{variant.size}</span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                                Color
                                                            </label>
                                                            <div className="p-2 bg-white border border-gray-200 rounded-md">
                                                                <span className="text-gray-800">{variant.color}</span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                                Price
                                                            </label>
                                                            <div className="p-2 bg-white border border-gray-200 rounded-md">
                                                                <span className="text-gray-800">${variant.price.toFixed(2)}</span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                                Quantity
                                                            </label>
                                                            <div className="p-2 bg-white border border-gray-200 rounded-md">
                                                                <span className="text-gray-800">{variant.quantity}</span>
                                                            </div>
                                                        </div>

                                                        <div className="col-span-2">
                                                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                                                SKU
                                                            </label>
                                                            <div className="p-2 bg-white border border-gray-200 rounded-md">
                                                                <span className="text-gray-800 font-mono text-sm">
                                                                    {variant.sku}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 text-center py-8">
                                            No variants available for this product
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[rgba(0,0,0,0.2)]">
                        <div className="flex justify-end">
                            <Button
                                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                onClick={handleCloseOffcanvas}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products