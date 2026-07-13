import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

/* Lightweight path-based routing, no dependency. Vite's SPA fallback serves
   index.html for every path, and we pick the page from the pathname. */
export default function App() {
  const path =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/+$/, "") || "/"
      : "/";

  let page;
  if (path === "/") page = <Home />;
  else if (path === "/contact") page = <Contact />;
  else page = <NotFound />;

  return (
    <>
      {page}
      <Analytics />
    </>
  );
}
