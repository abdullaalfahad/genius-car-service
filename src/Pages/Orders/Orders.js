import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Orders = () => {
    const [user] = useAuthState(auth);
    const email = user.email;
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getOrders = async () => {
            const url = `http://localhost:5000/order?email=${email}`;
            const { data } = await axios.get(url);
            setOrders(data);
        }
        getOrders();
    }, [user])
    return (
        <div className='container my-5'>
            <h1 className='text-center'>Your Orders {orders.length}</h1>
        </div>
    );
};

export default Orders;