import { Box } from "@chakra-ui/react";

export default function Content({ children }: React.PropsWithChildren) {
  return <Box p="5">{children}</Box>;
}
