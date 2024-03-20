import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { AdminService } from "../service/AdminService";
import { LoadingScreen } from "../util/LoadingScreen";

function AllUserPage() {
  const [allUser, setAllUser] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const adminService = new AdminService();
  useEffect(() => {
    adminService
      .getAllUser()
      .then((res: any) => {
        if (res.response) setAllUser(res.allUser);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  return (
    <>
      <Container maxWidth={"md"} sx={{ pt: 2, pb: 2 }}>
        {allUser.map((user: any, index: any) => (
          <Card key={index} sx={{ mt: 1, borderRadius: 3 }}>
            <CardActionArea>
              <Box sx={{ display: "flex", p: 2 }}>
                <Box sx={{ flex: "1 0 100px" }}>
                  <CardMedia
                    draggable={false}
                    component="img"
                    sx={{ borderRadius: "50%", aspectRatio: "1/1" }}
                    image={user?.avatar}
                  />
                </Box>
                <Box
                  sx={{
                    flex: "10 0 200px",
                    display: "flex",
                    flexDirection: "column",
                    pl: 2,
                  }}
                >
                  <CardContent sx={{ position: "relative" }}>
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
                  </CardContent>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default AllUserPage;
