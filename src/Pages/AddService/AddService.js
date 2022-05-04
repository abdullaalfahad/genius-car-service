import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        fetch('https://tranquil-forest-94188.herokuapp.com/service', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    };
    return (
        <div style={{ height: '70vh' }} className='w-50 mx-auto my-5'>
            <h1 className='text-center mb-3'>Please Add Service</h1>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='Name' className='mb-2 form-control' {...register("name", { required: true, maxLength: 20 })} />
                <textarea placeholder='Description' className='mb-2 form-control' {...register("description")} />
                <input placeholder='Price' className='mb-2 form-control' type="number" {...register("price")} />
                <input placeholder='Photo URL' className='mb-2 form-control' type="text" {...register("img")} />
                <input className='mb-2 btn btn-info' type="submit" value="Add User" />
            </form>
        </div>
    );
};

export default AddService;  