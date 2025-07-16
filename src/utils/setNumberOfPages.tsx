import { AxiosHeaderValue } from "axios";

export default function setNumberOfPages(
  totalPageFromResponse: AxiosHeaderValue | null,
) {
  if (totalPageFromResponse) {
    const totalPages = Math.ceil(+totalPageFromResponse / 5);
    return totalPages;
  }
}
