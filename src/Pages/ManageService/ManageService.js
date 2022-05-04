import React from 'react';
import useServices from '../../hooks/useServices';

const ManageService = () => {
    const [services, setServices] = useServices();
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `https://tranquil-forest-94188.herokuapp.com/service/${id}`;

            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining);
                })
        }
    }
    return (
        <div className='container'>
            <h1 className='text-center my-4'>Manage Services:</h1>
            {
                services.map(service => <div className='mb-4 p-3 border d-flex justify-content-between' key={service._id}><h5>{service.name}</h5><button onClick={() => handleDelete(service._id)} className='btn btn-info'>X</button></div>)
            }
        </div>
    );
};

export default ManageService;