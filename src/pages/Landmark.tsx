import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { PictureShowDialog } from "../components/PictureShowDialog";
import { useUserContext } from "../context/UserContext";
import { AdminService } from "../service/AdminService";
import { LandmarkService } from "../service/LandmarkService";
import "../util/Animate.css";
import { LoadingScreen } from "../util/LoadingScreen";

function LandmarkPage() {
  const [open, setOpen] = useState(false);
  const [landmarks, setLanmark] = useState<any>([]);
  const [pic, setPic] = useState(null);
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);

  const landmarkService = new LandmarkService();
  const adminService = new AdminService();

  useEffect(() => {
    if (user?.role === "user") {
      landmarkService
        .getLandmarkByCountry(user?.country!)
        .then((res) => {
          if (res.response) {
            setLanmark(res.landmark);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      adminService
        .getAllLandmark()
        .then((res) => {
          if (res.response) {
            setLanmark(res.allLandmark);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  const handleClickOpen = (pic: any) => {
    setPic(pic);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container maxWidth={"sm"}>
        <Box pt={3} pb={3}>
          {landmarks.map((land: any, index: any) => (
            <Card key={index} sx={{ mb: 2, borderRadius: 5 }}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: "pink",
                    }}
                  >
                    <Typography color={"black"} variant="h4">
                      {index + 1}
                    </Typography>
                  </Avatar>
                }
                title={
                  <Typography
                    variant="h6"
                    sx={{
                      display: "inline-block",
                    }}
                  >
                    {land.name}
                  </Typography>
                }
                subheader={land.country}
              />

              <CardActionArea>
                <CardMedia
                  draggable={false}
                  component="img"
                  height="100%"
                  image={land.coverimage}
                  onClick={() => handleClickOpen(land.coverimage)}
                />
              </CardActionArea>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1">Price: {land.price}</Typography>
                  <Typography variant="body1">
                    Destinationid: {land.destinationid}
                  </Typography>
                  <Typography variant="body1">
                    Duration: {land.duration}
                  </Typography>
                </Box>
                <Typography variant="h6">{land.detail}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
      <PictureShowDialog open={open} onClose={handleClose} pic={pic} />
    </>
  );
}

export default LandmarkPage;
