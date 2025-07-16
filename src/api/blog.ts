import { BASE_API_URL } from "@/helpers/envs";
import setNumberOfPages from "@/utils/setNumberOfPages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "./axiosInstance";
import { useToast } from "@chakra-ui/react";

export function getAllArticles(currentPage: number) {
  const [totalPages, setTotalPages] = useState<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogList", currentPage],
    queryFn: () =>
      axiosInstance.get(`/articles?_page=${currentPage}`).then((res) => {
        const { data, headers } = res;
        const totalItens =
          typeof headers.get === "function" && headers.get("X-Total-Count");
        setTotalPages(setNumberOfPages(totalItens) || 0);
        return data;
      }),
  });

  return { blogPosts: data, isLoading, error, totalPages };
}

export function getArticlesById(currentPage: number, userId: string) {
  const [totalPages, setTotalPages] = useState<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogList", currentPage],
    queryFn: () =>
      axiosInstance
        .get(`/articles-by-id?_page=${currentPage}&user_id=${userId}`)
        .then((res) => {
          const { data, headers } = res;
          const totalItens =
            typeof headers.get === "function" && headers.get("X-Total-Count");
          setTotalPages(setNumberOfPages(totalItens) || 0);
          return data;
        }),
  });

  return { blogPosts: data, isLoading, error, totalPages };
}

export function handlePostArticle(articleID: string | undefined) {
  const {
    mutate: postArticleFn,
    isError: isPostArticleError,
    isSuccess: isPostArticleSuccess,
    isPending: isPostArticlePending,
  } = useMutation({
    mutationFn: (formData: FormData) =>
      axiosInstance.post(`${BASE_API_URL}/article/${articleID}`, formData),
  });

  return {
    postArticleFn,
    isPostArticleError,
    isPostArticlePending,
    isPostArticleSuccess,
  };
}

export function handlePutArticle(articleID: string | undefined) {
  const toast = useToast();

  const {
    mutate: putArticleFn,
    isError: isPutArticleError,
    isSuccess: isPutArticleSuccess,
    isPending: isPutArticlePending,
  } = useMutation({
    mutationFn: (formData: FormData) =>
      axiosInstance.post(`${BASE_API_URL}/article/${articleID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast({
          title: `Artigo atualizado com sucesso`,
          position: "top",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: `Ocorreu um erro ao atualizar o artigo`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    },
  });

  return {
    putArticleFn,
    isPutArticleError,
    isPutArticlePending,
    isPutArticleSuccess,
  };
}

export function handleUpdateArticleStatus() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    mutate: updateArticleStatusFn,
    isError: isUpArticleStatusError,
    isSuccess: isUpArticleStatusSuccess,
    isPending: isUpArticleStatusPending,
  } = useMutation({
    mutationFn: (formData: any) =>
      axiosInstance.put(`${BASE_API_URL}/update-article-status`, formData),
    onSuccess: (response) => {
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["blogList"] });
        toast({
          title: `Status do Artigo atualizado com sucesso`,
          position: "top",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: `Ocorreu um erro ao atualizar o artigo`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    },
  });

  return {
    updateArticleStatusFn,
    isUpArticleStatusError,
    isUpArticleStatusSuccess,
    isUpArticleStatusPending,
  };
}

export function getArticle(articleID: string | undefined) {
  const {
    data: articleData,
    isLoading: isGetArticleLoading,
    error: isGetArticleError,
  } = useQuery({
    queryKey: ["editPost"],
    queryFn: () =>
      fetch(BASE_API_URL + `/article/${articleID}` || "", {
        method: "GET",
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Ocorreu um erro ao obter os dados");
        }
      }),
  });

  return { articleData, isGetArticleLoading, isGetArticleError };
}
