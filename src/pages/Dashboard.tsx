import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import Content from "../components/Content";
import DashboardHeader from "../components/DashboardHeader";
import Menu from "../components/Menu";
import useStore from "../store";
import { useRouter } from "../utils/router/routerFacade";
//import useStore from "../store";

export default function Dashboard() {
  const store = useStore();
  const navigate = useRouter();
  const [cookie, _, removeCookie] = useCookies(["token"]);

  const isAuth = "token" in cookie;
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
    // if (isAuth) {
    //   removeCookie("token");
    //   router.push("/login");
    // }
  }, [isAuth, removeCookie]);

  return (
    <>
      <Grid
        h="100vh"
        templateAreas={[
          `
        "header header"
        "content content"
        "content content"
        "footer footer"
      `,
          `
        "header header"
        "content content"
        "content content"
        "footer footer"
      `,
          `
        "header header"
        "sidenav content"
        "sidenav content"
        "footer footer"
      `,
        ]}
        gridTemplateRows={"4.3rem auto auto 2rem"}
        gridTemplateColumns={[
          "none",
          "none",
          "1.3fr 3fr",
          "1fr 3fr",
          "0.8fr 3fr",
          "0.6fr 3fr",
        ]}
      >
        <GridItem area={"header"} background={"green.900"} color="#FFF">
          <DashboardHeader />
        </GridItem>

        <GridItem
          display={["none", "none", "block"]}
          area={"sidenav"}
          boxShadow="md"
        >
          <Menu />
        </GridItem>

        <GridItem area={"content"}>
          <Content>{store.currentComponent}</Content>
        </GridItem>

        <GridItem
          area={"footer"}
          background="green.900"
          color="#FFF"
          textAlign="center"
        >
          {/* <div>Versão: {packageJson.version}</div> */}
        </GridItem>
      </Grid>
    </>
  );
}
