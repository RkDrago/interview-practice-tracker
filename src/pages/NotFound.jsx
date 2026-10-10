
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="not-found-code">404</p>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="primary-button">
        <ArrowLeft size={17} /> Back to dashboard
      </Link>
    </section>
  );
}
