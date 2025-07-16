export type Article = {
  id: number | string;
  title: string;
  author: string;
  description: string;
  content: string;
  status: string;
  image: File[] | string;
  slug?: string;
  imageDescription: string;
  imageSub: string;
};
