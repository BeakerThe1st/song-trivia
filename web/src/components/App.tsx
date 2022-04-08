import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <NotificationsProvider position="top-center">
        <Outlet />
      </NotificationsProvider>
    </MantineProvider>
  </QueryClientProvider>
);

export default App;
