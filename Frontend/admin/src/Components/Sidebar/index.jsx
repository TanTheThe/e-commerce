import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { FaAngleDown, FaRegImage } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbCategory } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { Collapse } from 'react-collapse';
import { MyContext } from "../../App";
import AddCategory from "../../Pages/Category/addCategory";

const Sidebar = () => {
    const [submenuIndex, setSubmenuIndex] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const isOpenSubMenu = (index) => {
        if (submenuIndex === index) {
            setSubmenuIndex(null)
        } else {
            setSubmenuIndex(index)
        }
    }

    const context = useContext(MyContext)
    const navigate = useNavigate()

    const checkLogin = () => {
        const token = localStorage.getItem("accesstoken");
        if (!token) {
            navigate("/login");
            return false;
        }
        return true;
    }

    return (
        <>
            <div className={`sidebar fixed top-0 left-0 bg-[#fff] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 w-[${context.isSidebarOpen === true ? '15%' : '0px'}]`}>
                <div className="py-2 w-full">
                    <Link to="/">
                        <img src="https://ecme-react.themenate.net/img/logo/logo-light-full.png" className="w-[120px]" />
                    </Link>
                </div>

                <ul className="mt-4">
                    <li>
                        <Link to="/">
                            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                                <RxDashboard className="text-[18px]" /> <span>Dashboard</span>
                            </Button>
                        </Link>
                    </li>

                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
                            onClick={() => isOpenSubMenu(1)}>
                            <FaRegImage className="text-[18px]" /> <span>Home Slides</span>
                            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center"><FaAngleDown
                                className={`transition-all ${submenuIndex === 1 ? 'rotate-180' : ''}`} /></span>
                        </Button>

                        <Collapse isOpened={submenuIndex === 1 ? true : false}>
                            <ul className="w-full">
                                <li className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !pl-9 flex gap-3">
                                        <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Home Banner Slides List</Button>
                                </li>
                                <li className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !pl-9 flex gap-3">
                                        <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Add Home Banner Slide</Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>

                    <li>
                        <Link to="/users">
                            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                                <FiUsers className="text-[18px]" /> <span>Users</span>
                            </Button>
                        </Link>
                    </li>

                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
                            onClick={() => isOpenSubMenu(3)}>
                            <RiProductHuntLine className="text-[18px]" /> <span>Products</span>
                            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center"><FaAngleDown
                                className={`transition-all ${submenuIndex === 3 ? 'rotate-180' : ''}`} /></span>
                        </Button>

                        <Collapse isOpened={submenuIndex === 3 ? true : false}>
                            <ul className="w-full">
                                <li className="w-full">
                                    <Link to="/products">
                                        <Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !pl-9 flex gap-3">
                                            <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                            Product List</Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !pl-9 flex gap-3"
                                        onClick={() => context.setIsOpenFullScreenPanel({
                                            open: true,
                                            model: "Add Product"
                                        })}>
                                        <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Product Upload</Button>
                                </li>
                            </ul>
                        </Collapse>
                    </li>

                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
                            onClick={() => isOpenSubMenu(4)}>
                            <TbCategory className="text-[18px]" /> <span>Category</span>
                            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center"><FaAngleDown
                                className={`transition-all ${submenuIndex === 4 ? 'rotate-180' : ''}`} /></span>
                        </Button>

                        <Collapse isOpened={submenuIndex === 4 ? true : false}>
                            <ul className="w-full">
                                <li className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !pl-9 flex gap-3"
                                        onClick={() => {
                                            if (checkLogin()) navigate("/category/list");
                                        }}>
                                        <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Danh sách danh mục</Button>
                                </li>
                                <li className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !pl-9 flex gap-3"
                                        onClick={() => {
                                            if (checkLogin()) setIsOpen(true);
                                        }}>
                                        <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Tạo danh mục</Button>
                                    <AddCategory open={isOpen} onClose={() => setIsOpen(false)} />
                                </li>
                                {/* <li className="w-full">
                                    <Link to="/subCategory/list">
                                        <Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !pl-9 flex gap-3">
                                            <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                            Sub Category List</Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full !text-[13px] !pl-9 flex gap-3"
                                        onClick={() => context.setIsOpenFullScreenPanel({
                                            open: true,
                                            model: 'Add New Sub Category'
                                        })}>
                                        <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                                        Add a Sub Category</Button>
                                </li> */}
                            </ul>
                        </Collapse>
                    </li>

                    <li>
                        <Link to="/orders">
                            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                                <IoBagCheckOutline className="text-[18px]" /> <span>Orders</span>
                            </Button>
                        </Link>
                    </li>

                    <li>
                        <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
                            <IoMdLogOut className="text-[20px]" /> <span>Logout</span>
                        </Button>
                    </li>
                </ul>
            </div >
        </>
    )
}

export default Sidebar