import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import Content from "../components/Content";
import DashboardHeader from "../components/DashboardHeader";
import Menu from "../components/Menu";

import { useRouter } from "../utils/libs/routerFacade";
import { Outlet } from "react-router-dom";
import { REACT_APP_VERSION } from "@/utils/helpers/envs";

export default function Dashboard() {
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
        "header header header"
        "content content content"
        "content content content"
        "footer footer footer"
      `,
          `
        "header header header"
        "content content content"
        "content content content"
        "footer footer footer"
      `,
          `
        "header header header"
        "sidenav content content"
        "sidenav content content"
        "footer footer footer"
      `,
        ]}
        gridTemplateRows={"4rem auto auto 2rem"}
        gridTemplateColumns={[
          "none",
          "none",
          "1fr 2fr",
          "0.7fr 2fr",
          "0.5fr 2fr",
          "0.5fr 2fr",
        ]}
      >
        <GridItem area={"header"} background={"green.900"} color="#FFF">
          <DashboardHeader />
        </GridItem>

        <GridItem
          display={["none", "none", "flex"]}
          area={"sidenav"}
          boxShadow="md"
        >
          <Menu />
        </GridItem>

        <GridItem area={"content"}>
          <Content>
            <Outlet />
          </Content>
        </GridItem>

        <GridItem
          area={"footer"}
          background="green.900"
          color="#FFF"
          textAlign="center"
        >
          <div>Versão: {REACT_APP_VERSION}</div>
        </GridItem>
      </Grid>
    </>
  );
}
