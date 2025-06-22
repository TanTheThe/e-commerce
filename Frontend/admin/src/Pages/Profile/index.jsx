import React, { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const context = useContext(MyContext)
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false)
    const [isShowPasswordOld, setIsShowPasswordOld] = useState(false);
    const [isShowPasswordNew, setIsShowPasswordNew] = useState(false);
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const confirmPasswordRef = useRef(null);

    const [formFields, setFormFields] = useState({
        first_name: '',
        last_name: '',
        phone: ''
    })

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const isValidVietnamesePhone = (phone) => {
        const regex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
        return regex.test(phone);
    };

    const validateValue =
        Object.values(formFields).some(el => el.trim() !== "") &&
        (formFields.phone === "" || isValidVietnamesePhone(formFields.phone));

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        const response = await putDataApi("/customer/user", formFields);
        console.log(response)

        if (response?.success === true) {

            localStorage.setItem("userEmail", formFields.email)
            localStorage.setItem("userFirstName", formFields.first_name)
            localStorage.setItem("userLastName", formFields.last_name)

            context.setUserData(prev => ({
                ...prev,
                content: {
                    ...prev.content,
                    first_name: formFields.first_name,
                    last_name: formFields.last_name,
                    phone: formFields.phone
                }
            }));

            setIsLoading(false)
            context.openAlertBox(
                "success", response?.message
            )

            setFormFields({
                first_name: "",
                last_name: "",
                phone: ""
            })
        } else {
            setIsLoading(false)
            context.openAlertBox("error", response?.data?.detail?.message)
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        if (isSubmitDisabled) return;

        setIsLoadingChangePassword(true)

        const response = await putDataApi("/customer/user/change-password", {
            old_password: oldPassword,
            new_password: newPassword,
            confirm_new_password: confirmPassword
        });
        console.log(response)

        if (response?.success === true) {
            context.openAlertBox(
                "success", response?.message
            )

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } else {
            setIsLoadingChangePassword(false)
            context.openAlertBox("error", response?.data?.detail?.message)
        }
        setIsLoadingChangePassword(false)
    }

    useEffect(() => {
        const token = localStorage.getItem("accesstoken")

        if (token === null) {
            navigate('/login')
        }
    }, [context?.isLogin])

    useEffect(() => {
        const isValid =
            oldPassword.trim() !== "" &&
            newPassword.trim() !== "" &&
            confirmPassword.trim() !== "" &&
            confirmPassword === newPassword;

        setIsSubmitDisabled(!isValid);

        if (confirmPassword && confirmPassword !== newPassword) {
            setError("Mật khẩu xác nhận không khớp");
        } else {
            setError("");
        }
    }, [oldPassword, newPassword, confirmPassword]);

    return (
        <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white px-5 pb-5">
            <h2 className="text-[18px] font-[600]">
                User Profile
            </h2>

            <br />

            <div className="w-[110px] h-[110px] rounded-full overflow-hidden relative group">
                <img className="w-full h-full object-cover" src='avatar.png' />
            </div>

            <br />
        </div>
    )
}

export default Profile