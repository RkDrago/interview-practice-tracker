import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { primaryButton } from "../ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[65vh] flex-col items-center justify-center text-center">
      <p className="text-[72px] font-[850] tracking-[-4px] text-[#19a15d]">404</p>
      <h1 className="mt-[7px] text-2xl">Page not found</h1>
      <p className="mt-2.5 mb-[23px] text-[13px] text-[#8490a0]">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className={primaryButton}>
        <ArrowLeft size={17} /> Back to dashboard
      </Link>
    </section>
  );
}
