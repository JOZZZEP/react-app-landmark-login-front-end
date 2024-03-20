import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const CssTextField = styled(TextField)({
  "& label": {
    color: "rgb(200, 120, 20)",
  },
  "& label.Mui-focused": {
    color: "rgb(200, 120, 20)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgb(200, 120, 20)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgb(200, 120, 20)",
      borderRadius: "10rem",
    },
    "&:hover fieldset": {
      borderColor: "rgb(200, 120, 20)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(200, 120, 20)",
    },
  },
});

const CustomTextField = (props: any) => {
  return <CssTextField {...props} />;
};

export default CustomTextField;
