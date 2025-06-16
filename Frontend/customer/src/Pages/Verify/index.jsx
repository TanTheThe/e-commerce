import React, { useState } from "react";
import OtpBox from "../../components/OtpBox";
import Button from "@mui/material/Button";
import { MdEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { CardContent, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Verify = () => {
    const [otp, setOtp] = useState("")
    const handleOtpChange = (value) => {
        setOtp(value)
    }

    const verifyOTP = (e) => {
        e.preventDefault()
        alert(otp)
    }

    const navigate = useNavigate();

    return (
        // <section className="section py-10">
        //     <div className="container">
        //         <div className="card shadow-md w-[450px] m-auto rounded-md bg-white p-5 px-10">
        //             <div className="text-center flex items-center justify-center">
        //                 <img src="https://cdn-icons-png.flaticon.com/128/7182/7182972.png" width="80" />
        //             </div>
        //             <h3 className="text-center text-[18px] text-black mt-4">Verify OTP</h3>

        //             <p className="text-center mt-0 mb-4">OTP send to <span className="text-[#ff5252] font-bold">
        //                 the63574@gmail.com</span></p>

        //             <form onSubmit={verifyOTP}>
        //                 <OtpBox length={6} onChange={handleOtpChange} />

        //                 <div className="flex items-center justify-between mt-5 px-3">
        //                     <Button type="submit" className="w-full btn-org btn-lg">Verify OTP</Button>
        //                 </div>
        //             </form>


        //         </div>
        //     </div>
        // </section>
        

        <div className="min-h-120 bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">QUÊN MẬT KHẨU?</h1>
            <p className="text-center text-gray-600 max-w-xl mb-8">
                Vui lòng chọn một trong các cách sau để khôi phục lại mật khẩu của bạn.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mt-5">
                <Card onClick={() => navigate("/forgot-password-email")} className="rounded-2xl shadow-md transform transition-all duration-500 ease-in-out hover:-translate-y-3 hover:shadow-xl cursor-pointer">
                    <CardContent className="flex flex-col items-center text-center p-6">
                        <div className="text-5xl text-indigo-600 mb-4">
                            <MdEmail />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Email</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Chúng tôi sẽ gửi đường dẫn đặt lại mật khẩu đến email của bạn.
                        </p>
                        
                        <p className="text-indigo-600 font-medium text-sm">Khôi phục qua Email</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-md transform transition-all duration-500 ease-in-out hover:-translate-y-3 hover:shadow-xl cursor-pointer">
                    <CardContent className="flex flex-col items-center text-center p-6">
                        <div className="text-5xl text-red-500 mb-4">
                            <BiSolidLockAlt />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">OTP</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Nhập mã OTP được gửi qua SMS để đặt lại mật khẩu nhanh chóng.
                        </p>
                        
                        <p className="text-red-500 font-medium text-sm">Khôi phục bằng OTP</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Verify