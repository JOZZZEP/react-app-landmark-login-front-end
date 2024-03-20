import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";
import { Box } from "@mui/system";
export const PictureShowDialog = (props: any) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth={"xl"}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "black",

          animation: "bounce-in 500ms ease-out",
          borderRadius: 3,
          // background: `url(${props.pic ? props.pic : DefaultPic})`,
          // backgroundPosition: "center",
          // backgroundSize: "contain",
          // backgroundRepeat: "no-repeat",
        },
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            height: "100%",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          height: "100%",
          // maxHeight:"100%",
          //     maxWidth:"100%",
        }}
      >
        <IconButton
          onClick={props.onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            width: "3rem",
            height: "3rem",
            color: "white",
            backgroundColor: "white",
            zIndex: 999,
          }}
        >
          <CloseIcon
            color="info"
            sx={{
              fontSize: "2rem",
              filter: "drop-shadow(2px 2px 4px black)",
            }}
          />
        </IconButton>
        <img
          draggable={false}
          src={props.pic}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        />
      </Box>
    </Dialog>
  );
};
