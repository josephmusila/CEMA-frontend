
import React, { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  CssBaseline,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AddCircleOutline as CreateIcon,
  PersonAdd as RegisterIcon,
  GroupAdd as EnrollIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  ListAlt as ListIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import CreateProgram from "./CreateProgram";
import RegisterClient from "./RegisterClient";
import EnrollClient from "./EnrollClient";
import SearchClients from "./SearchClients";
import ListPrograms from './ListPrograms';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const MainContent = styled("main")(({ theme, open, drawerWidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? `${drawerWidth}px` : 0,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

const drawerWidth = 240;

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("createProgram");

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Create Program", icon: <CreateIcon />, section: "createProgram" },
    {
      text: "Register Client",
      icon: <RegisterIcon />,
      section: "registerClient",
    },
    { text: "Enroll Client", icon: <EnrollIcon />, section: "enrollClient" },
    { text: "Search Clients", icon: <SearchIcon />, section: "searchClients" },
    { text: 'List Programs', icon: <ListIcon />, section: 'listPrograms' },
   
  ];

  const renderSection = () => {
    switch (selectedSection) {
      case 'createProgram':
        return <CreateProgram />;
      case 'registerClient':
        return <RegisterClient />;
      case 'enrollClient':
        return <EnrollClient />;
      case 'searchClients':
        return <SearchClients />;
      case 'listPrograms':
        return <ListPrograms />;
      default:
        return <CreateProgram />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Doctor Dashboard
          </Typography>
          <Typography
            variant="body1"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            sx={{ cursor: "pointer", ml: 2 }}
          >
            Logout
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1, pl: 2 }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => setSelectedSection(item.section)}
              sx={{
                backgroundColor:
                  selectedSection === item.section ? "#e3f2fd" : "inherit",
                "&:hover": {
                  backgroundColor: "#bbdefb",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <MainContent open={open} drawerWidth={drawerWidth}>
        <DrawerHeader />
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            minHeight: "80vh",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {menuItems.find((item) => item.section === selectedSection)?.text}
          </Typography>
          <Box sx={{ mt: 2 }}>{renderSection()}</Box>
        </Paper>
      </MainContent>
    </Box>
  );
};

export default Dashboard;
