import { Button } from "antd";
import React from "react";

const CustomButton = ({ backgroundColor, icon, title, onChange }) => {
  return (
    <Button
      type="primary"
      iconPosition="end"
      icon={icon}
      onClick={onChange}
      style={{
        width: "150px",
        backgroundColor: backgroundColor,
        borderRadius: "5px",
      }}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
