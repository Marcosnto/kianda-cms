import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

type AlertStatusProps = {
  type: "info" | "warning" | "success" | "error" | "loading";
  title?: string;
  description: string;
};

function AlertStatus({ type, title, description }: AlertStatusProps) {
  return (
    <Alert status={type} display="flex" flexDir="column">
      {title && (
        <Flex>
          {" "}
          <AlertIcon />
          <AlertTitle>{title}</AlertTitle>
        </Flex>
      )}
      <AlertDescription>
        <Flex>
          {!title && <AlertIcon />}
          {description}
        </Flex>
      </AlertDescription>
    </Alert>
  );
}

export default AlertStatus;
