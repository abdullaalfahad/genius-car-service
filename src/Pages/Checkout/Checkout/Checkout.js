import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    /* const [user, setUser] = useState({
        name: 'Ali Hossen',
        email: 'alihossen@gamil.com',
        address: 'Tajmohol Road',
        phone: '0171111111'
    });

    const handleAddressChange = event => {
        const { address, ...other } = user;
        // console.log(address, other);
        const newAddress = event.target.value;
        const newUser = { newAddress, ...other };
        setUser(newUser);
    } */

    const handlePlaceOrder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            serviceId: serviceId,
            serviceName: service.name,
            address: event.target.address.value,
            phone: event.target.phone.value,
        }
        axios.post('http://localhost:5000/order', order)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    toast('Your order is booked');
                    event.target.reset();
                }
            })
    }

    return (
        <div style={{ height: '70vh' }} className='w-50 mx-auto my-5'>
            <h2 className='mb-3'>Order: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2 form-control' value={user.displayName} type="text" name="name" id="name" placeholder='Name' readOnly required />
                <input className='w-100 mb-2 form-control' value={user.email} type="email" name="email" id="email" placeholder='Email' readOnly required />
                <input className='w-100 mb-2 form-control' value={service.name} type="text" name="service" id="service" placeholder='Service' required />
                <input className='w-100 mb-2 form-control' type="text" name="address" id="address" placeholder='Address' required />
                <input className='w-100 mb-2 form-control' type="text" name="phone" id="phone" placeholder='Phone' required />
                <input type="submit" value="Place Order" className='btn btn-primary' />
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Checkout;