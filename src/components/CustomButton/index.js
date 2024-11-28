import { Button, Tooltip } from "antd";
import React, { useState } from "react";

const CustomButton = ({ icon, title, onChange, customStyle, message }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Tooltip title={message}>
      <Button
        type="primary"
        iconPosition="end"
        icon={icon}
        onClick={onChange}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          opacity: isHovered ? 0.8 : 1,
          borderRadius: "5px",
          ...customStyle,
        }}
      >
        {title}
      </Button>
    </Tooltip>
  );
};

export default CustomButton;
