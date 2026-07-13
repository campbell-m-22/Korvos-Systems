import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";

/* Lightweight path-based routing, no dependency. Vite's SPA fallback serves
   index.html for /contact, and we pick the page from the pathname. */
export default function App() {
  const path =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/+$/, "") || "/"
      : "/";

  const page = path === "/contact" ? <Contact /> : <Home />;

  return (
    <>
      {page}
      <Analytics />
    </>
  );
}
