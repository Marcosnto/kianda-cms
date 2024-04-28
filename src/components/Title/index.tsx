import { As, Center, Divider, Heading } from "@chakra-ui/react";

type ComponentTitleProps = {
  title: string;
  type: As | undefined;
  size?: string;
};

export default function ComponentTitle({
  title,
  type,
  size = "lg",
}: ComponentTitleProps) {
  return (
    <>
      <Center mt="5" mb="10" flexDirection="column" gap="4">
        <Heading as={type} size={size}>
          {title}
        </Heading>
        <Divider mb="5" />
      </Center>
    </>
  );
}
