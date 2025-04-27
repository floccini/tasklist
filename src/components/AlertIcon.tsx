import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import React from "react";

interface AlertIcon {
  title?: string;
  description?: string;
  status?: string
}

export const AlertIconComponent = ({ title, description }: AlertIcon) => {
  return (
    <Alert borderRadius={6}>
      <AlertIcon/>
      <Box>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Box>
    </Alert>
  );
};
export { AlertIcon };

