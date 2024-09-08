export type Article = {
  id: number | string;
  title: string;
  author: string;
  description: string;
  content: string;
  status: string;
  image?: {
    id: string | number;
    url: string;
    file_name: string;
    type: string;
  };
  slug?: string;
  imageDescription: string;
  imageSub: string;
};
