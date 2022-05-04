import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Orders = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const email = user?.email;
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getOrders = async () => {
            const url = `https://tranquil-forest-94188.herokuapp.com/order?email=${email}`;
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setOrders(data);
            }
            catch (error) {
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getOrders();
    }, [user])
    return (
        <div style={{ height: '70vh' }} className='container my-5'>
            <h1 className='text-center mb-4'>Your Order Items: {orders.length}</h1>
            {
                orders.map(order => <div className='border border-warning p-2 w-50 mx-auto mb-2 bg-primary text-white' key={order._id}>
                    <h4 className='text-center'>{order.serviceName}</h4>
                </div>)
            }
        </div>
    );
};

export default Orders;