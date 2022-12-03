import { Link, useNavigate } from "react-router-dom";
import { Box, Drawer, Toolbar, List, ListItemButton, ListItemText, Typography, TextField } from "@mui/material"
import { useAuthContext } from "../Hooks/Contexts/authContext";
const NavBar = () => {
    const { user } = useAuthContext()
    return (
        <Box>
            <Drawer variant="permanent" open={true} >
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: [1],
                    }}
                >
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <Typography>Book Store</Typography>
                    </Link>

                </Toolbar>

                <List component="nav">
                    <ListItemButton>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Discover" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Recommendations" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Authors" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Favorites" />
                    </ListItemButton>
                    {!!user ? <Link to="/Form" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemButton>
                            <ListItemText primary="Manage Books" />
                        </ListItemButton>
                    </Link> : null}

                </List>
            </Drawer>
        </Box>
    )
}
export default NavBar();