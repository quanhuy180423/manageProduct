import { AppBar, BottomNavigation, BottomNavigationAction, Box, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import { Link } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";


const Header = () => {
    const [value, setValue] = useState(0);
    return (

        <AppBar position="sticky" style={{ marginBottom: '20px' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Staff Management
                </Typography>

                <Box sx={{ width: 500 }} >
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        className='bg-blue-700'
                    >

                        <BottomNavigationAction
                            label="Home"
                            icon={<HomeIcon />}
                            component={Link}
                            to="/"
                        />
                        <BottomNavigationAction
                            label="Dashboard"
                            icon={<DashboardIcon />}
                            component={Link}
                            to="/Dashboard"
                        />
                    </BottomNavigation>
                </Box>
            </Toolbar>
        </AppBar>


    )
}

export default Header