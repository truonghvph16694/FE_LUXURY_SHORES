import { Outlet } from "react-router-dom";
// import "./../App.css";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom"
import HeaderAdmin from "../components/AdminComponents/HeaderAdmin/HeaderAdmin";
import SidebarAdmin from "../components/AdminComponents/SidebarAdmin/SidebarAdmin";


const myTheme = createTheme({
    palette: {
        primary: {
            main: "#8baf67",
            light: "#3c44b126",
        },
        secondary: {
            main: "#fff",
            light: "#f8324526",
        },
        background: {
            default: "#f4f5fd",
        },
    },
});
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));
// const MyHeader = styled("div")({
//     width: 100 % "",
// });
function AdminLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <ThemeProvider theme={myTheme}>
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <AppBar position="fixed" open={open}>
                        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                            <IconButton
                                color="secondary"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: "none" }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <div></div>
                            <HeaderAdmin />
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <DrawerHeader sx={{ background: "#8baf67", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Link to="/admin" >
                                <img
                                    src="https://logos.textgiraffe.com/logos/logo-name/Niki-designstyle-smoothie-m.png"
                                    className="w-full max-w-[60px]"
                                />
                            </Link>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === "rtl" ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <ChevronLeftIcon sx={{ color: "#fff", fontSize: "40px" }} />
                                )}
                            </IconButton>
                        </DrawerHeader>
                        <SidebarAdmin />
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <Outlet />
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}

export default AdminLayout;
