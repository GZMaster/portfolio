import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PortfolioPage from "@/pages/portfolio";
import GlobalLayout from "./layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PortfolioPage />,
  },
]);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalLayout>
      <RouterProvider router={router} />
    </GlobalLayout>
  </StrictMode>,
);
