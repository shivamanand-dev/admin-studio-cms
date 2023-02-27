import { Typography } from "@mui/material";
import React from "react";

import Picture from "@/components/Picture";

import { StyledUserAccountInfo } from "./StyledUserAccountInfo";

function UserAccountInfo({ src, name, userName }) {
  return (
    <StyledUserAccountInfo>
      <div className="flex">
        <Picture src={src} rounded={true} />
        <div>
          <Typography variant="h4" ml={3}>
            {name}
          </Typography>
          <Typography variant="h6" ml={3}>
            @{userName}
          </Typography>
        </div>
      </div>
    </StyledUserAccountInfo>
  );
}

export default UserAccountInfo;
