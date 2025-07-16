export type Article = {
  id: number | string;
  title: string;
  author: string;
  columnType: string;
  subtitle: string;
  content: string;
  status: string;
  image?: File[] | string;
  slug?: string;
  imageDescription: string;
  imageSub: string;
};
