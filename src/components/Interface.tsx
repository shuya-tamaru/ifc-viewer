import { Box } from "@chakra-ui/react";

import useFocusId from "../stores/useFocusId";

const Interface = () => {
  const { focusId } = useFocusId((state) => state);

  return (
    <>
      {focusId !== "" && <Box sx={idDisplayStyle}>{`ID : ${focusId}`}</Box>}
      <Box id="barContainer" sx={barContainerStyle}>
        <Box id="loadingBar" sx={loadingBarStyle} />
        <Box id="loadingText" sx={loadingTextStyle}>
          Loading...
        </Box>
      </Box>
    </>
  );
};

export default Interface;

const idDisplayStyle = {
  width: "90px",
  height: "40px",
  display: "flex",
  top: "0",
  left: "0",
  marginLeft: "5px",
  lineHeight: "40px",
  padding: "0 5px 0 5px",
  background: "rgba(255, 255, 255, 0.8)",
  textAlign: "center",
  position: "absolute",
};

const barContainerStyle = {
  height: "100vh",
  width: "100vw",
  top: "0",
  alignItems: "center",
  position: "absolute",
};

const loadingBarStyle = {
  top: "50%",
  width: "100vw",
  height: "2px",
  position: "absolute",
  background: "black",
  transform: "scaleX(0)",
  transformOrigin: "top center",
  transition: "transform 1.0s",
};

const loadingTextStyle = {
  width: "100%",
  fontSize: "20px",
  textAlign: "center",
  position: "absolute",
  top: "45%",
};
