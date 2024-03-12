import * as React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginUser from "./Components/LoginUser/LoginUser";
import LoginAdmin from "./Components/LoginAdmin/LoginAdmin";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Stack, ThemeProvider, createTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";
import HomeAdmin from "./page/Admin/Home/index";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import Member from "./page/User/Member/index";
import Imfomation from "./page/User/infomation/index";
import Homeuser from "./page/User/Home/index";
import AddRomm from "./page/Admin/AddRoom/AddRoom";
import Roomadmin from "./page/Admin/Room/index";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import EditRoom from "./page/Admin/EditRoom";
import Booking from "./Components/Booking";
import Bookings from "./page/User/Booking";
import Contact from "./page/Admin/Contact";
import AddUser from "./page/Admin/AddUser";
import UserAll from "./page/Admin/UserAll";
// import Textss from "./Components/Typewriter/Typewriter";
import Payment from "./page/Admin/Payment/indext";
import CreatePayment from "./page/Admin/CreateCost/index";
import EditPayment from "./page/Admin/EditCost";
import Cost from "./page/Admin/Cost/index";
import ResignForm from "./page/User/document/resignform";
import PayForm from "./page/User/document/payform";
import DepositForm from "./page/User/document/depositform";
import InOutForm from "./page/User/document/inoutform";

import UserContact from "./page/User/Usercontact";
import MaintainForm from "./page/User/Maintain/maintain";
import MaintainStatus from "./page/User/Maintain/maintainStatus";
import EditMaintain from "./page/Admin/Maintain/editMaintain";
import ShowDepositForm from "./page/User/document/showdepositform";
import ShowResignForm from "./page/User/document/showresignform";
import ShowPayForm from "./page/User/document/showpayform";
import ShowInOutForm from "./page/User/document/showinoutform";
import EditPayForm from "./page/User/document/editpayform";
import PaymentUser from "./page/User/Payment";


import CreatePay from './page/Admin/CreatePayment/index'
import EditPay from './page/Admin/EditPayment'
import NewsForm from "./page/Admin/News/news";
import MaintainAdmin from "./page/Admin/Maintain/maintainAdmin";
import EditResignForm from "./page/User/document/editresignform";
import EditDepositForm from "./page/User/document/editdepositform";
import EditInOutForm from "./page/User/document/editinoutform";
import Headers from "./Components/Header/Header"
import Menu_Admin from "./Components/Menu/Menu_Admin"
import Menu_User from "./Components/Menu/Menu_User"
import { Header } from "antd/es/layout/layout";
import ShowAllFormForAdmin from "./page/Admin/Document/resignform";
import EdiMaintain from "./page/User/Maintain/editMaintain";
import Profile from "./page/User/Profile";
import Form from "./page/Admin/Form/forms";


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "url(" + `${process.env.PUBLIC_URL}/images/menu.png` + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: drawerWidth,
        },
      },
    },
  },
  typography: {
    fontFamily: "Mohave,Noto Sans Thai",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  spacing: 8,
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#FFFF",
    },
    background: {
      default: "#fff",
      // default: "#e5e7e9",
    },
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState<String>("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/admin" element={<LoginAdmin />} />
      </Routes>
    );
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function routers() {
    if (localStorage.getItem("position") === "Admin") {
      return (
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {true && <Headers open={open} onDrawerOpen={handleDrawerOpen} />}
            {true && <Menu_Admin open={open} onDrawerClose={handleDrawerClose} />}
            <Main open={open}>
              <DrawerHeader />
              <Routes>
              <Route path="/" element={<HomeAdmin />} />
                <Route path="/Homeadmin" element={<HomeAdmin />} />
                <Route path="/UserAll" element={<UserAll />} />
                <Route path="/AddUser" element={<AddUser />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Addroom" element={<AddRomm />} />
                <Route path="/Room" element={<Roomadmin />} />
                <Route path="/Room/edit/:id" element={<EditRoom />} />
                <Route path="/showallform" element={<ShowAllFormForAdmin />} />
                <Route path="/Cost" element={<Cost />} />
                <Route path="/Cost/add" element={<CreatePayment />} />
                <Route path="/Cost/edit/:id" element={<EditPayment />} />
                <Route path="/Payment" element={<Payment />} />
                <Route path="/payment/add" element={<CreatePay />} />
                <Route path="/payment/edit/:id" element={<EditPay />} />
                <Route path="/news" element={<NewsForm />} />
                <Route path="/maintainAdmin" element={<MaintainAdmin />} />
                <Route path="/editMaintain/:id" element={<EditMaintain />} />
                <Route path="/forms" element={<Form />} />
              </Routes>
            </Main>
          </Box>
        </ThemeProvider>
      );
    } else if (localStorage.getItem("position") === "User") {
      return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {true && <Headers open={open} onDrawerOpen={handleDrawerOpen} />}
          {true && <Menu_User open={open} onDrawerClose={handleDrawerClose} />}
          <Main open={open}>
            <DrawerHeader />
            <Routes>
            <Route path="/" element={<Homeuser />} />
            <Route path="/usercontact" element={<UserContact />} />
            <Route path="/Homeuser" element={<Homeuser />} />
            <Route path="/infomation" element={<Imfomation />} />
            <Route path="/Member" element={<Member />} />
            <Route path="/RoomBooking" element={<Booking />} />
            <Route path="/Dromroom" element={<Bookings />} />
            <Route path="/PaymentUser" element={<PaymentUser />} />
            <Route path="/resignform" element={<ResignForm />} />
            <Route path="/depositform" element={<DepositForm />} />
            <Route path="/inoutform" element={<InOutForm />} />
            <Route path="/payform" element={<PayForm />} />
            <Route path="/showresignform" element={<ShowResignForm />} />
            <Route path="/showdepositform" element={<ShowDepositForm />} />
            <Route path="/showinoutform" element={<ShowInOutForm />} />
            <Route path="/showpayform" element={<ShowPayForm />} />
            <Route path="/editpayform" element={<EditPayForm />} />
            <Route path="/editresignform" element={<EditResignForm />} />
            <Route path="/editdepositform" element={<EditDepositForm />} />
            <Route path="/editinoutform" element={<EditInOutForm />} />
            <Route path="/maintain" element={<MaintainForm />} />
            <Route path="/maintainStatus" element={<MaintainStatus />} />
            <Route path="/editmaintain" element={<EdiMaintain />} />
            <Route path="/profile" element={<Profile />} />
            </Routes>
          </Main>
        </Box>
      </ThemeProvider>
      );
    }
  }
  return <>{routers()}</>;
}

