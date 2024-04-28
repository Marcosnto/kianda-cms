export default function setNumberOfPages(totalPageFromResponse: string | null) {
  if (totalPageFromResponse) {
    const totalPages = Math.ceil(+totalPageFromResponse / 10);
    return totalPages;
  }
}
