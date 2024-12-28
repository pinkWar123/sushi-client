import React, { Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PUBLIC_ROUTES } from "./routes";
import { Loading } from "../components/Loading";

const helmetContext = {};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Paradise Sushi</title>
          <link
            rel="canonical"
            href="https://reactts-boilerplate.netlify.app/"
          />
        </Helmet>

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
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
