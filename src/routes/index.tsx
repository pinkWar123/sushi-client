import { Spin } from "antd";
import { Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PUBLIC_ROUTES } from "./routes";

const helmetContext = {};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>React TS Boilerplate</title>
          <link
            rel="canonical"
            href="https://reactts-boilerplate.netlify.app/"
          />
        </Helmet>

        <Suspense fallback={<Spin />}>
          <Routes>
            {PUBLIC_ROUTES.map((route) => (
              <Route
                key={`route-${route.path}`}
                path={route.path}
                Component={route.component}
              />
            ))}
          </Routes>
        </Suspense>
      </HelmetProvider>
    </BrowserRouter>
  );
};
