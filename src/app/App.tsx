import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MenuPage } from "../pages/calendar/CalendarPage";
import { NotFoundPage } from "../pages/error/NotFoundPage";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter basename="/breakfast-calendar/">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
