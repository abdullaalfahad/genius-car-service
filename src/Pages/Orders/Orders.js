import React, { useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([])
    return (
        <div className='container my-5'>
            <h1 className='text-center'>Your Orders</h1>
        </div>
    );
};

export default Orders;