import { Center, Spinner } from "@chakra-ui/react";

export default function SpinnerLoad({
  height = "80vh",
  width,
  size = "lg",
}: {
  height?: string;
  width?: string;
  size?: string;
}) {
  return (
    <Center h={height} w={width}>
      <Spinner
        emptyColor="gray.200"
        color="green"
        thickness="3px"
        speed="0.65s"
        size={size}
      />
    </Center>
  );
}
