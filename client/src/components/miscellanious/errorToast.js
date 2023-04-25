import { AxiosError } from "axios";

const getErrorTitle = (error) => {
  const { status } = error.response;

  if (status === 400) {
    return "Bad Request!";
  }

  if (status === 401) {
    return "Authentication Invalid!";
  }

  if (status === 404) {
    return "Not Found!";
  }

  return (
    error.response.statusText +
    (error.response.statusText.endsWith("!") ? "" : "!")
  );
};

export const showErrorToast = (toast, error) => {
  toast({
    title:
      error instanceof AxiosError && error.code === "ERR_BAD_REQUEST"
        ? getErrorTitle(error)
        : "Error!",
    description:
      error instanceof AxiosError && error.code === "ERR_BAD_REQUEST"
        ? error.response.data.error
        : error.message,
    duration: 3000,
    status:
      error instanceof AxiosError && error.code === "ERR_BAD_REQUEST"
        ? "warning"
        : "error",
    isClosable: true,
  });
};
