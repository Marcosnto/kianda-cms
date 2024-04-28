import { Dispatch, SetStateAction } from "react";

export type TableOptionsType = {
  key: string;
  ariaLabel: string;
  toolTipMessage: string;
  icon: React.ReactElement;
  component: JSX.Element;
  isModal: boolean;
};

export type TableHeadersProps = {
  name: string;
  key: string;
};

export type TableListProps = {
  headers: Array<TableHeadersProps>;
  totalPages: number | undefined;
  currentPage: number;
  tableBody: JSX.Element[] | undefined;
  tableOptions: TableOptionsType[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
