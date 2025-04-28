import {
  Alert as AlertComponent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';

type Status = 'info' | 'warning' | 'success' | 'error' | 'loading';

interface AlertProps {
  status: Status;
  title: string;
  description?: string;
}

export const Alert = ({ status, title, description }: AlertProps) => (
  <AlertComponent status={status} borderRadius={6}>
    <AlertIcon />
    <Box>
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Box>
  </AlertComponent>
);