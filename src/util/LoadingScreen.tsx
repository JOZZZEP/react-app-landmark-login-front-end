import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor: "transparent",
        height: "100%",
        width: "100%",
        zIndex: -1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{color:"white"}} size={80} />
    </Box>
  );
};
