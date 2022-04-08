import { showNotification } from "@mantine/notifications";

const showError = (error: unknown) => {
  showNotification({
    title: `Error`,
    message: `${error}`,
    color: "red",
  });
};

export default showError;
