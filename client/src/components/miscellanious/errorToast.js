import { AxiosError } from "axios";

export const showErrorToast = (toast, error) => {
  toast({
    title:
      error instanceof AxiosError && error.code === "ERR_BAD_REQUEST"
        ? error.response.statusText +
          (error.response.statusText.endsWith("!") ? "" : "!")
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
