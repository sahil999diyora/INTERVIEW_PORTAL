import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import AssignmentReturnedRoundedIcon from '@mui/icons-material/AssignmentReturnedRounded';
import { useHistory } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
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

let tostify = (Msg, Type) => {
    const Options = {
        position: "top-right",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    };

    toast[Type](Msg, Options);

}

export default function AdminPanelMain() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    let history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let LOGOUT = () => {

        localStorage.removeItem("ADMIN_TOKEN");

        tostify("LOGGING OUT !", "success")

        setTimeout(() => {
            history.push("/admin/login");
        }, 1100);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: "flex" }}>
                        <Box>
                            <ManageAccountsIcon sx={{ mr: 2, fontSize: "32px" }} />
                        </Box>
                        <Typography variant="h6" noWrap component="p" sx={{ pt: 0.4, m: 0 }}>
                            INTERVIEW PORTAL
                        </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto', display: "flex" }}>
                        <Button onClick={() => LOGOUT()} sx={{ color: "white", fontSize: "16px" }} endIcon={<LogoutIcon />}>
                            LOG OUT
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton onClick={() => { history.push("/admin/dashboard") }} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 3 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                <DashboardRoundedIcon sx={{ color: "#0000009e" }} />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }}> DASH BOARD </ListItemText>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton onClick={() => { history.push("/admin/course") }} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 3 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                <StyleRoundedIcon sx={{ color: "#0000009e" }} />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }}> COURSES  </ListItemText>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton onClick={() => { history.push("/admin/student") }} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 3 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                <SchoolRoundedIcon sx={{ color: "#0000009e" }} />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }}>  STUDENTS  </ListItemText>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton onClick={() => { history.push("/admin/company") }} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 3 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                <ApartmentRoundedIcon sx={{ color: "#0000009e" }} />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }}> COMPANIES </ListItemText>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton onClick={() => { history.push("/admin/interview") }} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 3 }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                <AssignmentReturnedRoundedIcon sx={{ color: "#0000009e" }} />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }}> INTERVIEWS </ListItemText>
                        </ListItemButton>
                        <Divider />
                    </ListItem>
                </List>
            </Drawer>
            <ToastContainer
                position="top-right"
                autoClose={1300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </Box>
    );
}