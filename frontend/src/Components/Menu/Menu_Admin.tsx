import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import BuildIcon from '@mui/icons-material/Build';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddHomeIcon from '@mui/icons-material/AddHome';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BusinessIcon from '@mui/icons-material/Business';
import TaskIcon from '@mui/icons-material/Task';
import AddchartIcon from '@mui/icons-material/Addchart';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PortraitIcon from '@mui/icons-material/Portrait';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from "@mui/icons-material/Mail";
import LayersIcon from "@mui/icons-material/Layers";
import Person from "@mui/icons-material/Person";
import StorageIcon from "@mui/icons-material/Storage";
import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Collapse, Typography } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import AddCardIcon from '@mui/icons-material/AddCard';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import HomeIcon from "@mui/icons-material/Home";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

type MenuProp = {
    open: boolean;
    onDrawerClose: () => void;
};
export default function Menu({ open, onDrawerClose }: MenuProp) {
    const theme = useTheme();
    const [openNestedList, setOpenNestedList] = React.useState(true);

    const handleDrawerClose = () => {
        onDrawerClose();
    };

    const handleClick = () => {
        setOpenNestedList(!openNestedList);
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    boxShadow: "0 0 9px rgba(228, 230, 235,.9),inset 0 0 9px rgba(228, 230, 235,.4)",
                    backgroundColor: "#FF884C",
                    borderRadius: '0% 20px 20px 0%',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <Stack direction="row" alignItems="center">
                    <img src={`${process.env.PUBLIC_URL}/image/logo4.png`} height={64} style={{ marginRight: 40 }} />
                    <IconButton onClick={handleDrawerClose} sx={{ color: "#eeeee4" }}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Stack>
            </DrawerHeader>
            <Typography variant="h6" textAlign="center" sx={{ color: "#eeeee4" }}>
               ระบบจัดการผู้ดูเเลหอ
            </Typography>
            <Divider />
            <ListItem
                disablePadding
                component={NavLink}
                to="/Homeadmin"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="จัดการข่าวสาร" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/UserAll"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <PortraitIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="ข้อมูลผู้เข้าพัก" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/Contact"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <PermContactCalendarIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="ติดต่อผู้ดูแล" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/Addroom"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <AddHomeIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="สร้างห้องพัก" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/Room"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <BusinessIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="ห้องพัก" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/AddUser"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <GroupAddIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="เพิ่มผู้เข้าพัก" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/showallform"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <TaskIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="ตรวจสอบแบบฟอร์มเอกสาร" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/maintainAdmin"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <BuildIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="จัดการแจ้งซ่อมบำรุง" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/news"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <AddchartIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="เพิ่มข้อมูลข่าวสาร" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/forms"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <AppRegistrationIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="จัดการแบบฟอร์มประเมินหอพัก" />
                </ListItemButton>
            </ListItem>
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "#FF884C",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton onClick={handleClick} sx={{ color: "#eeeee4" }}>
                    <ListItemIcon>
                        <ReceiptIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="ภาระค่าใช้จ่าย" sx={{ color: "#eeeee4" }}/>
                    {openNestedList ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openNestedList} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem
                            disablePadding
                            component={NavLink}
                            to="/Cost"
                            sx={{ color: "#eeeee4" }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <MenuIcon sx={{ color: "#eeeee4" }}/>
                                </ListItemIcon>
                                <ListItemText primary="Cost" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            disablePadding
                            component={NavLink}
                            to="/Payment"
                            sx={{ color: "#eeeee4" }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <MenuIcon sx={{ color: "#eeeee4" }}/>
                                </ListItemIcon>
                                <ListItemText primary="Payment" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <Divider />
        </Drawer>
    );
}