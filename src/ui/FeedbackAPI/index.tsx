import { Center } from "@chakra-ui/react";

export default function FeedbackAPI({
  message,
}: {
  message: string;
}): JSX.Element {
  return <Center h="80vh">{message}</Center>;
}
