import { useRouteError } from "@/utils/libs/routerFacade";

export default function PageError404() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      style={{ textAlign: "center", height: "100dvh", alignContent: "center" }}
    >
      <h1>Oops!</h1>
      <p>Desculpe, um erro inesperado aconteceu.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
