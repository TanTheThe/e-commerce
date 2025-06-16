import React, { useContext, useState } from "react";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postDataApi } from "../../utils/api";
import { MyContext } from "../../App";
import { CircularProgress } from "@mui/material";
import { BsCheckLg } from "react-icons/bs";

const Register = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [formFields, setFormFields] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    const context = useContext(MyContext)

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const validateValue = Object.values(formFields).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formFields.first_name === "") {
            context.openAlertBox(
                "error", "Please enter first name"
            )
            return false
        }

        if (formFields.last_name === "") {
            context.openAlertBox(
                "error", "Please enter last name"
            )
            return false
        }

        if (formFields.email === "") {
            context.openAlertBox(
                "error", "Please enter email"
            )
            return false
        }

        if (formFields.password === "") {
            context.openAlertBox(
                "error", "Please enter password"
            )
            return false
        }

        const response = await postDataApi("/customer/user/signup", formFields);

        if (response?.success === true) {
            context.openAlertBox(
                "success", response?.data?.messages
            )
            setFormFields({
                first_name: "",
                last_name: "",
                email: "",
                password: ""
            })
        } else {
            context.openAlertBox("error", response?.data?.detail?.message)
        }
    }

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[450px] m-auto rounded-md bg-white p-4">
                    <h3 className="text-center text-[18px] text-black">Register with a new account</h3>

                    <form className="w-full mt-5" onSubmit={handleSubmit}>
                        <div className="form-group w-full mb-5">
                            <TextField type="text" id="first_name" name="first_name" value={formFields.first_name} label="First name" variant="outlined" className="w-full"
                                onChange={onChangeInput} />
                        </div>
                        <div className="form-group w-full mb-5">
                            <TextField type="text" id="last_name" name="last_name" value={formFields.last_name} label="Last name" variant="outlined" className="w-full"
                                onChange={onChangeInput} />
                        </div>
                        <div className="form-group w-full mb-5">
                            <TextField type="email" id="email" name="email" value={formFields.email} label="Email *" variant="outlined" className="w-full"
                                onChange={onChangeInput} />
                        </div>
                        <div className="form-group w-full mb-5 relative">
                            <TextField type={isShowPassword === false ? "password" : "text"} id="password" name="password" value={formFields.password} label="Password *" variant="outlined" className="w-full"
                                onChange={onChangeInput} />
                            <Button className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px]
                            !rounded-full !text-black" onClick={() => setIsShowPassword(!isShowPassword)}>
                                {
                                    isShowPassword === true ? <IoMdEye className="text-[20px] opacity-75" /> :
                                        <IoMdEyeOff className="text-[20px] opacity-75" />
                                }

                            </Button>
                        </div>

                        <div className="flex items-center w-full mt-3 mb-3">
                            <Button type="submit" className="btn-org btn-lg w-full flex gap-3">
                                Register
                            </Button>
                        </div>

                        <p className="text-center">Already have an account? <Link className="link text-[14px] font-[600] text-[#ff5252]"
                            to="/login"> Login</Link></p>

                        <p className="text-center font-[500]">Or continue with social account</p>

                        <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black">
                            <FcGoogle className="text-[20px]" /> Login with Google
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register