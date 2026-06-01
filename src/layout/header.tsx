import { ModeToggle } from "@/components/theme/toggle";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading">Starter</h1>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors">
                About
              </Link>
            </li>
          </ul>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
