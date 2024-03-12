import React from "react";
import { Carousel } from "antd";
import { CardMedia } from "@mui/material";

const contentStyle: React.CSSProperties = {
  width: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#3a3b3c",
  margin: 0,
  marginTop: 90,
  
};

const Carousels: React.FC = () => (
  <Carousel autoplay>
    <div>
      <CardMedia
        style={contentStyle}
        component="img"
        src={`${process.env.PUBLIC_URL}/image/sut1.png`}
        height="150"
      />
    </div>
    <div>
      <CardMedia
        style={contentStyle}
        component="img"
        src={`${process.env.PUBLIC_URL}/image/card.png`}
        height="150"
      />
    </div>
  </Carousel>
);

export default Carousels;
