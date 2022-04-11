import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { getAllCategory } from 'utils/callAPIs';
import { addProduct, getAllColor } from 'utils/callAdminAPIs';
import Alert from 'components/Alert'
import { color } from '@mui/system';
import LoadingScreen from './../LoadingScreen/index';
import { updateProduct } from 'utils/callAdminAPIs';
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from 'actions/loading';
import { hideAlert, showAlert } from 'actions/alert';

const Input = styled.input.attrs({
    className: "appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
})``;

const Label = styled.label.attrs({
    className: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
})``;

// const colorArray = [
//     { id: 1, name: "Black" },
//     { id: 2, name: "White" },
//     { id: 3, name: "Red" },
//     { id: 4, name: "Pink" },
//     { id: 5, name: "Yellow" },
//     { id: 6, name: "Green" }
// ]

const EditProductForm = ({ editData }) => {
    //Import
    const { register, handleSubmit, watch, setValue, getValues, clearErrors, setError, formState: { errors } } = useForm();

    //State
    const [categoryArray, setCategoryArray] = useState([]);
    const [colorArray, setColorArray] = useState([]);
    const [categoryValue, setCategoryValue] = useState(0);
    const [colorValue, setColorValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [galleryArray, setGalleryArray] = useState([]);
    const [isUpdateGallery, setIsUpdateGallery] = useState(false)
    const dispatch = useDispatch();

    const findId = (num) => {
        return editData.items.filter(item => item.size == num)[0].id
    }

    const handleChangeGallery = (e) => {
        const files = [...e.target.files];
        files.map(file => file.preview = URL.createObjectURL(file));
        console.log(files);
        setGalleryArray(files.map(file => file.preview))
        setError("gallery", {
            type: "custom",
            message: (files.length < 5 && files.length > 0) ? "Must upload 5 images!" : ""
        })
    }

    const handleCanCelUpdateImage = () => {
        setIsUpdateGallery(false);
        setGalleryArray(editData.gallery);
        clearErrors('gallery');
    }

    const onSubmit = async (data) => {
        dispatch(showLoader());
        console.log(data);
        let formData = new FormData();
        data.gallery && [...data.gallery].map(f => {
            delete f.preview;
            formData.append("gallery[]", f);
        })
        formData.append("name", (data.name));
        formData.append("description", (data.description));
        formData.append("price", (data.price));
        formData.append("color", (data.color));
        formData.append("category", (data.category));
        formData.append("items[]", JSON.stringify([
            { size: 1, amount: data.size35, id: findId(35) },
            { size: 2, amount: data.size36, id: findId(36) },
            { size: 3, amount: data.size37, id: findId(37) },
            { size: 4, amount: data.size38, id: findId(38) },
            { size: 5, amount: data.size39, id: findId(39) }
        ]));

        updateProduct(editData.id, formData)
            .then(data => {
                if (data.status == 204) {
                    dispatch(hideLoader());
                    dispatch(showAlert({ type: "success", message: "Update product successfully!" }))
                    reset()
                }
                else {
                    console.log(data.data)
                    dispatch(hideLoader());
                    dispatch(showAlert({ type: "error", message: data.data.error }))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    //useEffect
    useEffect(() => {
        dispatch(showLoader())
        getAllCategory().then(data => { setCategoryArray(data); dispatch(hideLoader()) }).catch(error => console.log(error));
        getAllColor().then(data => { setColorArray(data); dispatch(hideLoader()) }).catch(error => console.log(error));
        () => {
            galleryArray.length > 0 && galleryArray.map(item => URL.revokeObjectURL(item.preview))
        }
    }, [])

    useEffect(() => {
        if (editData) {
            console.log(editData)
            setValue("name", editData.name);
            setValue("description", editData.description);
            setValue("price", editData.price)
            setValue("color", (editData.color.id))
            setValue("category", (editData.category.id))
            // setValue("gellery", []);
            setColorValue(editData.color.id)
            setCategoryValue(editData.category.id)
            editData.items.map(item => {
                setValue("size" + item.size, item.amount);
            })
            setGalleryArray(editData.gallery)
        }
    }, [editData])

    return (
        <>
            {alert.show && <Alert {...alert} position />}
            {loading && <LoadingScreen />}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full px-0 sm:px-16 py-2">
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                        <Label htmlFor="product-name">
                            Product Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="product-name"
                            type="text"
                            placeholder="Product Name"
                            {...register("name", { required: "This field is required!" })}
                        />
                        <div className={"text-red-500 text-sm"}>
                            {errors.name && errors?.name.message}
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full md:w-1/3 px-3">
                        <Label htmlFor="product-price">
                            Price <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="product-price"
                            type="number"
                            placeholder="30"
                            {...register("price", { required: "This field is required!" })}
                        />
                        <div className={"text-red-500 text-sm"}>
                            {errors.price && errors?.price.message}
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 relative">
                        <Label htmlFor="product-category">
                            Category <span className="text-red-500">*</span>
                        </Label>
                        <select class="form-select appearance-none block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
                                rounded transition  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none " aria-label="Default select example"
                            {...register("category", { required: "Select one option!" })}
                            value={categoryValue}
                            onChange={(e) => setCategoryValue(e.target.value)}
                        >

                            <>
                                <option value="">-- Choose category --</option>
                                {
                                    categoryArray.length && categoryArray.map(category =>
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )
                                }
                            </>
                        </select>
                        <div className={"text-red-500 text-sm"}>
                            {errors.category && errors?.category.message}
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                        <Label htmlFor="product-color">
                            Color <span className="text-red-500">*</span>
                        </Label>
                        <select class="form-select appearance-none block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
                                rounded transition  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none " aria-label="Default select example"
                            {...register("color", { required: "Select one option!" })}
                            value={colorValue}
                            onChange={(e) => setColorValue(e.target.value)}
                        >
                            <>
                                <option value="">-- Choose color --</option>
                                {
                                    colorArray.length && colorArray.map(color =>
                                        <option key={color.id} value={color.id}>{color.name}</option>
                                    )
                                }
                            </>
                        </select>
                        <div className={"text-red-500 text-sm"}>
                            {errors.color && errors?.color.message}
                        </div>
                    </div>
                </div>
                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Amount <span className="text-red-500">*</span></p>
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full md:w-1/6 px-3">
                        <Label htmlFor="product-size35">
                            Size 35
                        </Label>
                        <Input id="product-size35" defaultValue={0} type="number" min={0}
                            {...register("size35")}
                        />
                    </div>
                    <div className="w-full md:w-1/6 px-3">
                        <Label htmlFor="product-size36">
                            Size 36
                        </Label>
                        <Input id="product-size6" defaultValue={0} type="number" min={0}
                            {...register("size6")}
                        />
                    </div>
                    <div className="w-full md:w-1/6 px-3">
                        <Label htmlFor="product-size37">
                            Size 37
                        </Label>
                        <Input id="product-size37" defaultValue={0} type="number" min={0}
                            {...register("size37")}
                        />
                    </div>
                    <div className="w-full md:w-1/6 px-3">
                        <Label htmlFor="product-size38">
                            Size 38
                        </Label>
                        <Input id="product-size38" defaultValue={0} type="number" min={0}
                            {...register("size38")}
                        />
                    </div>
                    <div className="w-full md:w-1/6 px-3">
                        <Label htmlFor="product-size39">
                            Size 39
                        </Label>
                        <Input id="product-size39" defaultValue={0} type="number" min={0}
                            {...register("size39")}
                        />
                    </div>
                </div>
                {/* <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <Label htmlFor="product-gallery">
                            Gallery <span className="text-red-500">*</span>
                        </Label>
                        <Input id="product-gallery" type="file" multiple
                            {...register("gallery", { required: "This field is required!" })}
                        />
                        <div className={"text-red-500 text-sm"}>
                            {errors.gallery && errors?.gallery.message}
                        </div>
                    </div>
                </div> */}
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className={`${isUpdateGallery ? " w-full md:w-1/2 " : " "} px-3 mb-6 md:mb-0`}>
                        <Label htmlFor="product-gallery">
                            Gallery <span className="text-red-500">*</span>
                        </Label>
                        {
                            isUpdateGallery ?
                                <>
                                    <Input id="product-gallery" type="file" multiple
                                        {...register("gallery", {
                                            required: "This field is required!",
                                            // validate: {
                                            //     isFiveFile: files => [...files].length < 5 ? "Must upload 5 images!" : ""
                                            // }

                                        })}
                                        onChange={handleChangeGallery}
                                    />
                                    <button onClick={handleCanCelUpdateImage} className='px-4 h-[40px] border border-gray-200 rounded'>Cancel</button>
                                </>
                                :
                                <>
                                    <button type='button' onClick={() => { setIsUpdateGallery(true); setGalleryArray([]) }} className='px-4 py-3 border border-gray-200 rounded'>Update Gallery</button>
                                </>
                        }
                        <div className={"text-red-500 text-sm"}>
                            {errors.gallery && errors?.gallery.message}
                        </div>
                    </div>
                    <div className="hidden sm:flex w-full flex-1 items-center gap-3 md:w-1/2 px-3 mb-6 md:mb-0 mt-6">
                        {
                            galleryArray.length > 0 && galleryArray.map((item, index) =>
                                <img key={index} className='h-28' src={item} />
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <Label htmlFor="product-description">
                            Description <span className="text-red-500">*</span>
                        </Label>
                        <textarea
                            className="resize-y appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="product-description"
                            type="text"
                            rows="4"
                            placeholder="Description"
                            {...register("description", { required: "This field is required!" })}
                        />
                        <div className={"text-red-500 text-sm"}>
                            {errors.name && errors?.name.message}
                        </div>
                    </div>
                </div>
                <div>
                    <button type='submit' className='text-sm font-semibold leading-none text-white focus:outline-none bg-pink-400 border rounded hover:bg-pink-600 py-2.5 px-6 mt-3 mb-6'>Update</button>
                </div>
            </form>
        </>
    );
};

export default EditProductForm;