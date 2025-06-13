import Button from "@mui/material/Button";
import React from "react";
import { FaCloudUploadAlt, FaRegUser } from "react-icons/fa";
import { IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { NavLink } from "react-router";

const AccountSideBar = () => {
    return (
        <div className="card bg-white shadow-md rounded-md sticky top-[10px]">
            <div className="w-full p-5 flex items-center justify-center flex-col">
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group">
                    <img className="w-full h-full object-cover" src='https://thethaovanhoa.mediacdn.vn/372676912336973824/2022/12/16/avatar3-1671164179193908857633.jpg' />

                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all
                                group-hover:opacity-100">
                        <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
                        <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0" />
                    </div>
                </div>

                <h3>Rajesh Sharma</h3>
                <h6 className="text-[13px] font-[500]">the63574@gmail.com</h6>
            </div>

            <ul className="list-none pb-5 bg-[#faf9f9] myAccountTabs">
                <li className="w-full">
                    <NavLink to="/my-account" exact={true} activeClassName="isActive">
                        <Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <FaRegUser className="text-[17px]" /> My Profile
                        </Button>
                    </NavLink>
                </li>

                <li className="w-full">
                    <NavLink to="/my-list" exact={true} activeClassName="isActive">
                        <Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoMdHeartEmpty className="text-[17px]" /> My List
                        </Button>
                    </NavLink>
                </li>

                <li className="w-full">
                    <NavLink to="/my-orders" exact={true} activeClassName="isActive">
                        <Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoBagCheckOutline className="text-[17px]" /> My Orders
                        </Button>
                    </NavLink>
                </li>

                <li className="w-full">
                    <Button className="w-full !text-left !px-5 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                        <IoIosLogOut className="text-[17px]" /> Logout
                    </Button>
                </li>

            </ul>
        </div>
    )
}

export default AccountSideBar