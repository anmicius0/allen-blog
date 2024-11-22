import React, { useEffect, useState } from "react";
// @ts-ignore
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { useTheme } from "next-themes";

const Cursor: React.FC = () => {
  const theme = useTheme();
  const [mount, setMount] = useState<boolean>(false);

  const getCustomColor = (): string => {
    if (theme.theme === "dark") {
      return "#fff";
    } else if (theme.theme === "light") {
      return "#000";
    }
    return "#000"; // Default color in case theme is undefined or another value
  };

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      {mount && (
        <CustomCursor
          targets={[".link"]}
          customClass="custom-cursor"
          dimensions={30}
          fill={getCustomColor()}
          smoothness={{
            movement: 0.2,
            scale: 0.1,
            opacity: 0.2,
          }}
          targetOpacity={0.5}
          targetScale={2}
        />
      )}
    </>
  );
};

export default Cursor;
