import React, { useState } from "react";
import Button from "@mui/material/Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Badge from "../../Components/Badge"
import SearchBox from "../../Components/SearchBox";

const Orders = () => {
    const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null)
    const isShowOrderedProduct = (index) => {
        if (isOpenOrderedProduct === index) {
            setIsOpenOrderedProduct(null)
        } else {
            setIsOpenOrderedProduct(index)
        }
    }

    return (
        <div className="card my-4 shadow-md sm:rounded-lg bg-white">
            <div className="flex items-center justify-between px-5 py-5">
                <h2 className="text-[18px] font-[600]">Recent Orders</h2>
                <div className="w-[40%]"><SearchBox/></div>
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
    )
}

export default Orders