import React from "react"
import { Box, CssBaseline, ListItemButton, Drawer as MuiDrawer, Divider, ListItemText, List, Container, ListItemIcon, Paper, AppBar, Toolbar, IconButton, Typography } from "@mui/material"

import { ReactComponent as Home } from "../Images/home.svg"
import { ReactComponent as Recommendation } from "../Images/recommendation.svg"
import { ReactComponent as Heart } from "../Images/heart.svg"
import { ReactComponent as Search } from "../Images/search.svg"
import { ReactComponent as User } from "../Images/user.svg"
import { ReactComponent as BookOpen } from "../Images/book-open.svg"
import { styled } from "@mui/material/styles"
import UserMenu from "../Components/UserMenu"
import { useAuthContext } from "../Hooks/Contexts/authContext"
import { Link } from "react-router-dom";
import BackArrow from "../Components/BackArrow.js"

const drawerWidth = 240;
const drawerRadius = 20;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        "&>div": {
            backgroundColor: "#1bd8d8",
            color: "rgb(252, 252, 252)",
            borderTopRightRadius: `${drawerRadius}px`,
            borderBottomRightRadius: `${drawerRadius}px`
        },
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function ({ children, title, open }) {
    const { user } = useAuthContext()

    return <Box style={{ display: "flex", backgroundColor: "#f2f5f5" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
            <List component="nav">
                <ListItemButton>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                    </Link>
                    <ListItemText primary="Home" />

                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <Search />
                    </ListItemIcon>
                    <ListItemText primary="Discover" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <Recommendation />
                    </ListItemIcon>
                    <ListItemText primary="Recommendations" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <User />
                    </ListItemIcon>
                    <ListItemText primary="Authors" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <Heart />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                </ListItemButton>
                {user?.isAdmin ? <Link to="/BookList" style={{ textDecoration: "none", color: "inherit" }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <BookOpen />
                        </ListItemIcon>
                        <ListItemText primary="Manage Books" />
                    </ListItemButton>
                </Link> : null}
            </List>
        </Drawer>

        {/* <UserMenu></UserMenu> */}
        <Box
            component="main"
            sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Box style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "baseline" }}>

                    {!open ? <BackArrow /> : null}
                    <Typography variant="h3" gutterBottom>
                        {title}
                    </Typography>
                </Box>
                <UserMenu />
            </Box>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>

    </Box>
}