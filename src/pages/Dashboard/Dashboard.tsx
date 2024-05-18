import { Grid, GridItem } from "@chakra-ui/react";

import Content from "../../components/Content";
import DashboardHeader from "../../components/DashboardHeader";
import Menu from "../../components/Menu";

import { Outlet } from "react-router-dom";
import { REACT_APP_VERSION } from "@/helpers/envs";

export default function Dashboard() {
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
          "27ch 2fr",
          "27ch 2fr",
          "27ch 2fr",
          "27ch 2fr",
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
