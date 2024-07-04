import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Alert } from '@mui/material';
import { addProduct } from '../../redux/ProductSlice';

function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        description: '',
        price: '',
        currentPrice: '',
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.products);

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.imageUrl) tempErrors.imageUrl = "Image URL is required";
        if (!formData.description) tempErrors.description = "Description is required";
        if (!formData.price) tempErrors.price = "Price is required";
        if (!formData.currentPrice) tempErrors.currentPrice = "Current Price is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(addProduct(formData)).unwrap()
                .then(() => {
                    alert('Product added successfully');
                    navigate('/');
                })
                .catch(err => {
                    console.error('Error adding product:', err);
                });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={2} sx={{ '& .MuiTextField-root': { m: 1 } }} style={{ width: '85%', backgroundColor: 'White', color: 'black' }}>
                <Grid item xs={12} sm={6} md={4}>
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
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Image URL"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        error={!!errors.imageUrl}
                        helperText={errors.imageUrl}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
                <Grid item xs={12} sm={6} md={4}>
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
                <Grid item xs={12} sm={6} md={4}>
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
            </Grid>
            <Button type="submit" variant="contained" style={{ margin: 20 }} disabled={loading}>
                {loading ? 'Adding...' : 'Add Product'}
            </Button>
        </Box>
    );
}

export default AddProduct;
