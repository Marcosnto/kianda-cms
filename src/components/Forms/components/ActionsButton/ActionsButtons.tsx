import { TableOptionsType } from "@/ui/Table/table.types";
import useStore from "@/store";
import { useRouter } from "@/utils/libs/routerFacade";

import { UserProps } from "@/utils/types/user";
import { IconButton, Stack, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";

type DataProps = {
  user?: UserProps;
  articleId?: number | string;
};

export type ButtonActionsProps = TableOptionsType & DataProps;

type IconButtonFunctionType = DataProps & {
  route?: ((params: string | number) => string) | string;
  from: string;
};

export default function ActionsButtons({
  articleId,
  articleStatus,
  user,
  modalsOptions,
  tableOptions,
}: {
  articleStatus?: string;
  articleId?: number | string;
  user?: UserProps;
  modalsOptions?: { [key: string]: (...arg0: any[]) => void } | undefined;
  tableOptions: TableOptionsType[];
}) {
  const { setCurrentSelectedUser } = useStore();
  const navigate = useRouter();

  const setModalFunction = useCallback(
    (key: string, user?: UserProps) => {
      const modalInfo = {
        user,
        postId: articleId,
        registerStatus: user?.registerStatus || "",
        articleStatus: articleStatus || "",
      };

      if (user) setCurrentSelectedUser(user);
      if (modalsOptions) modalsOptions[key](modalInfo);
    },
    [setCurrentSelectedUser, modalsOptions],
  );

  const setIconRedirect = useCallback((props: IconButtonFunctionType) => {
    const { user, route, from } = props;

    function getRoutePath(id: string | number) {
      return typeof route == "function" ? route(id) : route;
    }

    switch (from) {
      case "user":
        if (user) {
          setCurrentSelectedUser(user);
          const routeUserPath = getRoutePath(user.id);
          navigate(`${routeUserPath}`, { relative: "path" });
        }
        break;

      case "terapheuticContract":
        if (user) {
          const routeContractPath = getRoutePath(user.id);
          navigate(`../${routeContractPath}`, { relative: "path" });
        }
        break;

      case "blog":
        if (articleId) {
          const routeArticlePath = getRoutePath(articleId);
          navigate(`../${routeArticlePath}`, { relative: "path" });
        }
        break;

      default:
        break;
    }
  }, []);

  const getIconButton = useCallback(
    ({
      key,
      from,
      route,
      ariaLabel,
      toolTipMessage,
      icon,
      isModal,
      user,
    }: ButtonActionsProps) => {
      return (
        <Tooltip
          label={toolTipMessage}
          aria-label="A tooltip"
          placement="top"
          key={key}
        >
          <IconButton
            w="8"
            h="8"
            fontSize="18"
            variant="outline"
            aria-label={ariaLabel}
            icon={icon}
            onClick={() =>
              isModal
                ? setModalFunction(key, user)
                : setIconRedirect({ route, user, from })
            }
            border="solid 1px #35481E"
            _hover={{ bg: "green.600", rounded: "8px", color: "white" }}
          />
        </Tooltip>
      );
    },
    [setModalFunction],
  );

  return (
    <Stack spacing={2} direction="row">
      {tableOptions.map((icon) =>
        getIconButton({
          key: icon.key,
          ariaLabel: icon.ariaLabel,
          toolTipMessage: icon.toolTipMessage,
          icon: icon.icon,
          route: icon.route,
          isModal: icon.isModal,
          from: icon.from,
          user,
          articleId,
        }),
      )}
    </Stack>
  );
}
