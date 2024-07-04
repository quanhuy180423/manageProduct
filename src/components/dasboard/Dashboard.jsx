import axios from "axios"
import API_ENDPOINTS from "../../Service/Server"
import { useEffect, useState } from "react"
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.PRODUCT);
            const productsWithIndex = response.data.map((product, index) => ({
                ...product,
                index: index + 1
            }));
            setProducts(productsWithIndex);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProducts();

    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_ENDPOINTS.PRODUCT}/${id}`);
            getProducts();
            alert("Delete successfully")
        } catch (error) {
            console.error(error)
        }
    }
    const colums = [
        { field: 'index', headerName: '#', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 500 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'currentPrice', headerName: 'Current price', width: 150 },
        {
            field: 'actions', headerName: 'Actions', width: 250,
            renderCell: (params) => {
                return (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button component={Link} to={`/Product/${params.row.id}`}
                                style={{ background: 'lightgreen', color: 'black' }}
                            >
                                View
                            </Button>
                            <Button component={Link} to={`/Product/Edit/${params.row.id}`}
                                style={{ background: 'lightblue', color: 'black' }}
                            >
                                Edit
                            </Button>
                            <Button onClick={() => handleDelete(params.row.id)}
                                style={{ background: 'yellow', color: 'black' }}
                            >
                                Delete
                            </Button>
                        </div>

                    </>
                )
            }
        }
    ]

    const rows = products;
    return (
        <div>
            <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>Dashboard</h1>
            <Box width='100%' display='flex' justifyContent='end'>
                <Button
                    style={{ fontFamily: 'sans-serif', fontSize: '25px', fontWeight: 'bolder', backgroundColor: 'lightblue', marginRight: '50px' }}
                    component={Link} to={'/addProduct'}
                >
                    Add product
                </Button>
            </Box>

            <DataGrid rows={rows} columns={colums}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 5 } },
                }}
                autoHeight
                pageSizeOptions={[5, 10]}
                checkboxSelection
                style={{ backgroundColor: 'white', margin: '5px 10px' }}
            />



        </div>
    )
}

export default Dashboard