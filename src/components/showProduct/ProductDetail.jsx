// src/components/ProductDetail.js

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import API_ENDPOINTS from '../../Service/Server';

export const ProductDetail = () => {
    const [product, setProduct] = useState(null); // Initialize with null to handle loading state
    const { id } = useParams();

    const getProduct = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.PRODUCT}/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    // Handle case when product is null
    if (!product) {
        return <p>Loading...</p>;
    }

    const discount = 100 - (product.currentPrice / product.price * 100);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Product Detail</h1>
            <Container maxWidth='md' style={{ color: 'white' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: "lightblue 0px 20px 15px 15px", borderRadius: '15px' }}>
                    <img
                        style={{ height: '450px', width: '100%', objectFit: 'cover' }}
                        src={product.image}
                        alt={product.name}
                    />
                    <div>
                        <h2 style={{ display: 'flex', justifyContent: 'center', fontSize: '45px', fontFamily: 'sans-serif', margin: '20px' }}>
                            {product.name}
                        </h2>
                        <p style={{ margin: '30px' }}> Description: {product.description}</p>
                        <h4 style={{ display: 'flex', justifyContent: 'center', fontSize: '20px', textAlign: 'center' }}>
                            Price:
                            <p style={{ margin: '0 10px' }}>
                                {product.price} đ
                            </p>
                        </h4>
                        <h4 style={{ display: 'flex', justifyContent: 'center', fontSize: '20px', fontFamily: 'sans-serif' }}>
                            Current price:
                            <p style={{ color: '', margin: '0 10px' }}>
                                {product.currentPrice} đ
                            </p>
                        </h4>
                        <h4 style={{ display: 'flex', justifyContent: 'center', fontSize: '20px', fontFamily: 'sans-serif' }}>
                            Discount:
                            <p style={{ color: 'red', margin: '0 10px' }}>
                                {discount} %
                            </p>
                        </h4>
                    </div>
                    <Box width='100%' display='flex' justifyContent='center' gap='30px' marginBottom='20px'>
                        <Button component={Link} to="/"
                            style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px', padding: '5px 5px' }}>
                            Back Home
                        </Button>
                        <Button component={Link} to={`/Product/Edit/${product.id}`}
                            style={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', padding: '5px 5px' }}>
                            Edit
                        </Button>
                    </Box>
                </div>
            </Container>
        </div>
    );
};
