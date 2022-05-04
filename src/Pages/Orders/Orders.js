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
        <div className='container my-5'>
            <h1 className='text-center'>Your Orders {orders.length}</h1>
        </div>
    );
};

export default Orders;