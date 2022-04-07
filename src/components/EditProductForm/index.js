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
    const { register, handleSubmit, watch, setValue, getValues, setError, formState: { errors } } = useForm();

    //State
    const [categoryArray, setCategoryArray] = useState([]);
    const [colorArray, setColorArray] = useState([]);
    const [categoryValue, setCategoryValue] = useState(0);
    const [colorValue, setColorValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const setItems = () => {
        const newProductItems = editData.items.map(item => ({ ...item, amount: Number(getValues("size" + item.size)) }))
        return newProductItems;
    }

    const onSubmit = async (data) => {
        console.log(data)
        dispatch(showLoader());
        const newItems = setItems()
        console.log(newItems)
        const payload = {
            name: data.name,
            description: data.description,
            price: data.price,
            color: Number(data.color),
            category: Number(data.category),
            items: setItems()
        }

        updateProduct(editData.id, payload)
            // .then(data => data.status == 201 && showAlert(true, "success", "Create product successfully!", "z-10 top-5 right-2"))
            .then(data => {
                dispatch(hideLoader());
                dispatch(showAlert({ type: "success", message: "Update product successfully!" }))
            })
            .catch(error => console.log(error))
    }

    //useEffect
    useEffect(() => {
        dispatch(showLoader())
        getAllCategory().then(data => { setCategoryArray(data); dispatch(hideLoader()) }).catch(error => console.log(error));
        getAllColor().then(data => { setColorArray(data); dispatch(hideLoader()) }).catch(error => console.log(error));
    }, [])

    useEffect(() => {
        if (editData) {
            console.log(editData)
            setValue("name", editData.name);
            setValue("description", editData.description);
            setValue("price", editData.price)
            setValue("color", (editData.color.id))
            setValue("category", (editData.category.id))
            setColorValue(editData.color.id)
            setCategoryValue(editData.category.id)
            editData.items.map(item => {
                setValue("size" + item.size, item.amount);
            })
        }
    }, [editData])

    return (
        <>
            {alert.show && <Alert {...alert} position />}
            {loading && <LoadingScreen />}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full px-16 py-2">
                <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                        <Label htmlFor="product-name">
                            Product Name
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
                            Price
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
                            Category
                        </Label>
                        {/* <Button
                            onBlur={() => setShowCategoryDropdown(false)}
                            onClick={() => setShowCategoryDropdown(!showCategoryDropDown)}
                            type='button'
                            className='relative' id="product-category"
                        >
                            {categoryValue?.name}
                            {
                                showCategoryDropDown &&
                                <div id="dropdown-category" className="border border-gray-500 absolute left-0 right-0 top-[calc(100%+2px)] w-full z-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                    <ul className="text-sm text-gray-700">
                                        <>
                                            <li onClick={() => { setCategoryValue({ id: 0, name: "-- Choose category --" }) }}>
                                                <div className="block py-3 px-4 hover:bg-gray-100">-- Choose category --</div>
                                            </li>
                                            {
                                                categoryArray && categoryArray.map(item =>
                                                    <li onClick={() => { setCategoryValue(item) }} key={item.id}>
                                                        <div className="block py-3 px-4 hover:bg-gray-100">{item.name}</div>
                                                    </li>
                                                )
                                            }
                                        </>
                                    </ul>
                                </div>
                            }
                        </Button> */}
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
                            Color
                        </Label>
                        {/* <Button
                        onBlur={() => setShowColorDropdown(false)}
                        onClick={() => setShowColorDropdown(!showColorDropdown)}
                        type='button'
                        className='relative' id="product-color"
                    >
                        {colorValue?.name}
                        {
                            showColorDropdown &&
                            <div id="dropdown-color" className="border border-gray-500 absolute left-0 right-0 top-[calc(100%+2px)] w-full z-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                <ul className="text-sm text-gray-700">
                                    <>
                                        <li onClick={() => { setColorValue({ id: 0, name: "-- Choose color --" }) }}>
                                            <div className="block py-3 px-4 hover:bg-gray-100">-- Choose color --</div>
                                        </li>
                                        {
                                            colorArray.map(item =>
                                                <li onClick={() => { setColorValue(item) }} key={item.id}>
                                                    <div className="block py-3 px-4 hover:bg-gray-100">{item.name}</div>
                                                </li>
                                            )
                                        }
                                    </>
                                </ul>
                            </div>
                        }
                    </Button> */}
                        {/* <div class="flex justify-center"> */}
                        {/* <div class="mb-3 xl:w-96"> */}
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
                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Amount</p>
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
                {
                    !editData &&
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                            <Label htmlFor="product-gallery">
                                Gallery
                            </Label>
                            <Input id="product-gallery" type="file" multiple
                                {...register("gallery", { required: "This field is required!" })}
                            />
                            <div className={"text-red-500 text-sm"}>
                                {errors.gallery && errors?.gallery.message}
                            </div>
                        </div>
                    </div>
                }
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <Label htmlFor="product-description">
                            Description
                        </Label>
                        <textarea
                            className="resize-y appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="product-description"
                            type="text"
                            placeholder="Description"
                            {...register("description", { required: "This field is required!" })}
                        />
                        <div className={"text-red-500 text-sm"}>
                            {errors.name && errors?.name.message}
                        </div>
                    </div>
                </div>
                <div>
                    <button type='submit' className='text-sm font-semibold leading-none text-white focus:outline-none bg-pink-400 border rounded hover:bg-pink-600 py-2.5 px-6'>Update</button>
                </div>
            </form>
        </>
    );
};

export default EditProductForm;