import React, { useContext, useEffect, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt, FaPlus } from "react-icons/fa";
import { postDataApi } from "../../utils/api";
import { MyContext } from "../../App";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';

const AddCategory = ({ open, onClose, onSuccess }) => {
    const [formFields, setFormFields] = useState({
        name: "",
        image: ""
    });

    const context = useContext(MyContext)

    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (file) {
            try {
                const previewUrl = URL.createObjectURL(file);

                const base64 = await convertToBase64(file);

                setImagePreview({
                    url: previewUrl,
                    file: file,
                    name: file.name
                });

                setFormFields(prev => ({
                    ...prev,
                    image: base64
                }));
            } catch (error) {
                console.error("Error uploading image:", error);
                context.openAlertBox("error", "Có lỗi xảy ra trong quá trình upload ảnh")
            }
        }
    };

    const removeImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview.url);

            setImagePreview(null);
            setFormFields(prev => ({
                ...prev,
                image: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formFields.name.trim()) {
            context.openAlertBox("error", "Vui lòng nhập tên danh mục!")
            return;
        }

        if (!formFields.image) {
            context.openAlertBox("error", "Vui lòng chọn một hình ảnh!")
            return;
        }

        setIsSubmitting(true);
        try {
            const categoryData = {
                name: formFields.name.trim(),
                image: formFields.image
            };

            const response = await postDataApi('/admin/categories', categoryData);

            if (response.success) {
                context.openAlertBox(
                    "success", response?.message
                )
                onSuccess && onSuccess();
            } else {
                context.openAlertBox("error", response?.data?.detail?.message)
            }

            setFormFields({ name: "", image: "" });
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview.url);
            }
            setImagePreview(null);

        } catch (error) {
            console.error("Error submitting form:", error);
            context.openAlertBox("error", "Có lỗi xảy ra khi tạo danh mục!")
        }
        setIsSubmitting(false);
    };

    useEffect(() => {
        return () => {
            if (imagePreview?.url) {
                URL.revokeObjectURL(imagePreview.url);
            }
        };
    }, [imagePreview]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Tạo danh mục mới
                <IconButton onClick={onClose} style={{ float: 'right' }}>
                    <IoMdClose />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Tên danh mục</label>
                        <input
                            type="text"
                            name="name"
                            value={formFields.name}
                            onChange={onChangeInput}
                            className="w-full border p-2 rounded"
                            placeholder="Nhập tên danh mục..."
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Ảnh danh mục</label>
                        {imagePreview ? (
                            <div className="relative w-full h-[150px] border rounded overflow-hidden">
                                <LazyLoadImage src={imagePreview.url} alt={imagePreview.name} className="object-cover w-full h-full" effect="blur" />
                                <span onClick={removeImage} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
                                    <IoMdClose />
                                </span>
                            </div>
                        ) : (
                            <div className="border-dashed border h-[150px] flex items-center justify-center bg-gray-100 rounded relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                                    id="imageUpload"
                                />
                                <label htmlFor="imageUpload" className="text-center text-gray-500">
                                    <FaPlus className="mx-auto mb-2 text-xl" />
                                    Thêm ảnh
                                </label>
                            </div>
                        )}
                    </div>

                    <Button type="submit" disabled={isSubmitting} variant="contained" fullWidth>
                        {isSubmitting ? "Đang đăng..." : "Tạo danh mục"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddCategory