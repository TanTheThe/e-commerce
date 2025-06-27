import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { putDataApi } from "../../utils/api"; 
import { MyContext } from "../../App";

const EditCategory = ({ open, onClose, category, onSuccess }) => {
    const [formFields, setFormFields] = useState({ name: "", image: "" });
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const context = useContext(MyContext)

    useEffect(() => {
        if (category) {
            setFormFields({ name: category.name, image: category.image });
            setImagePreview(category.image ? { url: category.image, name: category.name } : null);
        }
    }, [category]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormFields((prev) => ({ ...prev, image: reader.result }));
                setImagePreview({ url: reader.result, name: file.name });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormFields((prev) => ({ ...prev, image: "" }));
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const response = await putDataApi(`/admin/categories/${category.id}`, formFields);
            if (response.success) {
                context.openAlertBox("success", response.message);
                onSuccess?.();
                onClose();
            } else {
                context.openAlertBox("success", "Có lỗi xảy ra khi cập nhật danh mục");
            }
        } catch (err) {
            console.error(err);
            context.openAlertBox("success", "Có lỗi xảy ra khi cập nhật danh mục");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Cập nhật danh mục
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
                        {isSubmitting ? "Đang cập nhật..." : "Cập nhật danh mục"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditCategory;
