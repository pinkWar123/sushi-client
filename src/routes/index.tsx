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
            {PUBLIC_ROUTES.map((group) => (
              <Route
                key={`route-${group.path}`}
                path={group.path}
                element={group.layout}
              >
                {group.components.map((component) => (
                  <Route
                    path={component.path}
                    Component={component.component}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </Suspense>
      </HelmetProvider>
    </BrowserRouter>
  );
};
