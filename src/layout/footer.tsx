export default function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground py-6">
      <div className="container mx-auto">
        <p className="text-center text-sm md:text-base">
          @ {new Date().getFullYear()} Built with{" "}
          <span className="font-semibold">React, Tailwind, Shadcn</span> by{" "}
          <a
            href="/"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 transition-colors"
          >
            Greg.dev
          </a>
        </p>
      </div>
    </footer>
  );
}
