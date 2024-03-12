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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FeedIcon from '@mui/icons-material/Feed';
import DehazeIcon from '@mui/icons-material/Dehaze';
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
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";

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
                ห้องพักนักศึกษา
            </Typography>
            <Divider />
            <ListItem
                disablePadding
                component={NavLink}
                to="/Homeuser"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <HomeIcon  sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/infomation"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ContactEmergencyIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="ข้อมูลส่วนตัว" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/Member"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <AddCircleIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="รายชื่อผู้พัก" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/Dromroom"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <RememberMeIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="จองห้องพัก" />
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
                        <BorderColorIcon  sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="ฟอร์มเอกสาร" sx={{ color: "#eeeee4" }}/>
                    {openNestedList ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openNestedList} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem
                            disablePadding
                            component={NavLink}
                            to="/resignform"
                            sx={{ color: "#eeeee4" }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <DehazeIcon sx={{ color: "#eeeee4" }}/>
                                </ListItemIcon>
                                <ListItemText primary="ฟอร์มลาออกหอพัก" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            disablePadding
                            component={NavLink}
                            to="/inoutform"
                            sx={{ color: "#eeeee4" }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <DehazeIcon sx={{ color: "#eeeee4" }}/>
                                </ListItemIcon>
                                <ListItemText primary="ฟอร์มเข้า-ออกหอพักหลังเวลาปิดหอพัก" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            disablePadding
                            component={NavLink}
                            to="/depositform"
                            sx={{ color: "#eeeee4" }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <DehazeIcon sx={{ color: "#eeeee4" }}/>
                                </ListItemIcon>
                                <ListItemText primary="ฟอร์มขอคืนเงินประกันหอพัก" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem
                            disablePadding
                            component={NavLink}
                            to="/payform"
                            sx={{ color: "#eeeee4" }}
                        >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <DehazeIcon sx={{ color: "#eeeee4" }}/>
                                </ListItemIcon>
                                <ListItemText primary="ฟอร์มผ่อนผัน" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <ListItem
                disablePadding
                component={NavLink}
                to="/maintain"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ContactEmergencyIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="เเจ้งซ่อม/ทำความสะอาด" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/infomation"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <FeedIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="ประเมินความพึงพอใจ" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/PaymentUser"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <PaidOutlinedIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="ภาระค่าใช่จ่าย" />
                </ListItemButton>
            </ListItem>
            <ListItem
                disablePadding
                component={NavLink}
                to="/usercontact"
                sx={{ color: "#eeeee4" }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ReportOutlinedIcon sx={{ color: "#eeeee4" }}/>
                    </ListItemIcon>
                    <ListItemText primary="ติดต่อผู้ดูแล" />
                </ListItemButton>
            </ListItem>

            <ListItem
                disablePadding
                component={NavLink}
                to="/maintainStatus"
                sx={{ color: "#eeeee4" }}
            ></ListItem>

            <Divider />
        </Drawer>
    );
}