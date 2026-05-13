import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { setupAxiosInterceptors } from "./lib/axios";

// Clerk publishable key
const PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const queryClient = new QueryClient();

// Setup Axios Auth Interceptor
function AxiosInterceptorSetup({ children }) {
  const { getToken } = useAuth();

  setupAxiosInterceptors(getToken);

  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AxiosInterceptorSetup>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </AxiosInterceptorSetup>
    </ClerkProvider>
  </StrictMode>
);
