// src/components/ProductList.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/ProductSlice';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div style={{ color: 'white', margin: '0' }}>
            <h1 style={{ textAlign: 'center', fontSize: '45px' }}>Product List</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <Grid container spacing={2}>
                {Array.isArray(products) && products.length > 0 ? products.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Card className="shadow-lg h-full" style={{ height: '100%', margin: '20px' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.name}
                                className="object-cover"
                            />
                            <CardContent className="cardContent p-4" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '350px',
                            }}>
                                <Typography gutterBottom variant="h5" component="div" style={{ color: 'red' }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className="description">
                                    {product.description}
                                </Typography>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" style={{ textDecoration: 'line-through', fontSize: '20px', textAlign: 'center' }}>
                                        {product.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" style={{ color: 'red', fontSize: '20px', textAlign: 'center' }}>
                                        {product.currentPrice}
                                    </Typography>
                                </Box>
                                <Button
                                    component={Link}
                                    to={`/Product/${product.id}`}
                                    variant="contained"
                                    style={{ backgroundColor: 'red', color: 'white' }}
                                >
                                    Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                )) : (
                    <Box display='flex' justifyContent='center' width='100%'>
                        <Typography variant="h2" color='white'>
                            No product found.
                        </Typography>
                    </Box>
                )}
            </Grid>
        </div>
    );
};

export default ProductList;
