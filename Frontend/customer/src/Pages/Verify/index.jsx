import React, { useState } from "react";
import OtpBox from "../../components/OtpBox";
import Button from "@mui/material/Button";

const Verify = () => {
    const [otp, setOtp] = useState("")
    const handleOtpChange = (value) => {
        setOtp(value)
    }

    const verifyOTP = (e) => {
        e.preventDefault()
        alert(otp)
    }

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[450px] m-auto rounded-md bg-white p-5 px-10">
                    <div className="text-center flex items-center justify-center">
                        <img src="https://cdn-icons-png.flaticon.com/128/7182/7182972.png" width="80" />
                    </div>
                    <h3 className="text-center text-[18px] text-black mt-4">Verify OTP</h3>

                    <p className="text-center mt-0 mb-4">OTP send to <span className="text-[#ff5252] font-bold">
                        the63574@gmail.com</span></p>

                    <form onSubmit={verifyOTP}>
                        <OtpBox length={6} onChange={handleOtpChange} />

                        <div className="flex items-center justify-between mt-5 px-3">
                            <Button type="submit" className="w-full btn-org btn-lg">Verify OTP</Button>
                        </div>
                    </form>


                </div>
            </div>
        </section>
    )
}

export default Verify