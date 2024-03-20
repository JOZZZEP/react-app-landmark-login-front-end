import GroupsIcon from "@mui/icons-material/Groups";
import LandscapeIcon from "@mui/icons-material/Landscape";
import {
    AppBar,
    Avatar,
    CardMedia,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileDefault from "../assets/profileDefault.png";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";

function Header() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { setAuth } = useAuthContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="sticky" color="info">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4">LANDMARK</Typography>
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", gap: 2 }}>
            {user?.role === "admin" && (
              <Tooltip title="All User">
                <IconButton
                  onClick={() => {
                    if (location.pathname !== "/alluser") {
                      navigate("/alluser");
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  sx={{ p: 0 }}
                >
                  <GroupsIcon sx={{ color: "white" }} fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Landmark">
              <IconButton
                onClick={() => {
                  if (location.pathname !== "/") {
                    navigate("/");
                  }
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                sx={{ p: 0 }}
              >
                <LandscapeIcon sx={{ color: "white" }} fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgb(250, 177, 117)",
                    filter: "drop-shadow(0 0 2px white)",
                  }}
                  src={user?.avatar ? user?.avatar : profileDefault}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ display: "flex", p: 2 }}>
                <Box width={100}>
                  <CardMedia
                    draggable={false}
                    component="img"
                    sx={{ borderRadius: "50%", aspectRatio: "1/1" }}
                    image={user?.avatar}
                  />
                </Box>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"center",
                    pl: 3,
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <Typography component="div" variant="h6">
                      {user?.username}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      component="div"
                    >
                      {user?.country}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      component="div"
                    >
                      {user?.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider/>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu;
                  setAuth(false);
                }}
              >
                <Typography variant="h6" textAlign="center">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
