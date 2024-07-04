import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import API_ENDPOINTS from '../../Service/Server';
import axios from 'axios';

function EditProduct() {
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        description: '',
        price: '',
        currentPrice: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Use to get product ID from URL

    useEffect(() => {
        // Fetch product data when component mounts
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINTS.PRODUCT}/${id}`);
                setFormData({
                    name: response.data.name,
                    imageUrl: response.data.imageUrl, // Keep this as is, no editing
                    description: response.data.description,
                    price: response.data.price,
                    currentPrice: response.data.currentPrice,
                });
            } catch (error) {
                setErrorMessage('Error fetching product data');
                console.error('Error fetching product data:', error);
            }
        };
        fetchProductData();
    }, [id]);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.description) tempErrors.description = "Description is required";
        if (!formData.price) tempErrors.price = "Price is required";
        if (!formData.currentPrice) tempErrors.currentPrice = "Current Price is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.put(`${API_ENDPOINTS.PRODUCT}/${id}`, formData);
                alert('Product updated successfully');
                const response = await axios.get(`${API_ENDPOINTS.PRODUCT}/${id}`);
                navigate(`/Product/${response.data.id}`);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setErrorMessage('Product already exists');
                } else {
                    console.error('Error updating product:', error);
                }
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Grid container spacing={2} sx={{ '& .MuiTextField-root': { m: 1 } }} style={{ width: '85%', backgroundColor: 'White', color: 'black' }}>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Price"
                        name="price"
                        type='number'
                        value={formData.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Current Price"
                        name="currentPrice"
                        type='number'
                        value={formData.currentPrice}
                        onChange={handleChange}
                        error={!!errors.currentPrice}
                        helperText={errors.currentPrice}
                        fullWidth
                    />
                </Grid>

                {/* <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Image URL"
                        name="imageUrl"
                        value={formData.imageUrl}
                        disabled
                        fullWidth
                    />
                </Grid> */}
            </Grid>
            <Button type="submit" variant="contained" style={{ margin: 20 }}>Update Product</Button>
        </Box>
    );
}

export default EditProduct;
