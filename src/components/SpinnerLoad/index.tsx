import { Center, Spinner } from "@chakra-ui/react";

export default function SpinnerLoad({
  height = "80vh",
  width,
}: {
  height?: string;
  width?: string;
}) {
  return (
    <Center h={height} w={width}>
      <Spinner />
    </Center>
  );
}
