import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center glass rounded-2xl p-8">
        <h1 className="mb-4 text-4xl font-bold text-foreground-dark">404</h1>
        <p className="mb-4 text-xl text-slate-300">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-accent transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
