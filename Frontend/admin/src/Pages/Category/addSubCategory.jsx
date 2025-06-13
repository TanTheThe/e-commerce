import React from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MenuItem, Select } from "@mui/material";

const AddSubCategory = () => {
    const [productCat, setProductCat] = React.useState('');
    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
    };
    return (
        <section className="p-5 bg-gray-50">
            <form className="form py-3 p-8 ">
                <div className="scroll max-h-[70vh] pr-4 overflow-y-scroll pt-4">
                    <div className="grid grid-cols-4 gap-5 mb-3">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Product Category</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                className="w-full"
                                size="small"
                                value={productCat}
                                label="Category"
                                onChange={handleChangeProductCat}
                            >
                                <MenuItem value={''}>None</MenuItem>
                                <MenuItem value={10}>Fashion</MenuItem>
                                <MenuItem value={20}>Beauty</MenuItem>
                                <MenuItem value={30}>Wellness</MenuItem>
                            </Select>
                        </div>
                        
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1 ">Sub Category Name</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm
                        p-3 text-sm bg-white"/>
                        </div>
                    </div>
                    <br />
                </div>

                <div className="w-[250px]">
                    <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
                        <FaCloudUploadAlt className="text-[25px] text-white" />
                        Publish and View
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default AddSubCategory