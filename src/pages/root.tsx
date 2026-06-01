import Layout from "@/layout/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import GradualSpacing from "@/components/animations/gradual-spacing";

const techStack = [
  { name: "Biome", url: "https://biomejs.dev/" },
  { name: "React Router", url: "https://reactrouter.com/" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
  { name: "shadcn/ui", url: "https://ui.shadcn.com/" },
  { name: "Magic UI", url: "https://magicui.design/" },
];

export default function Root() {
  return (
    <Layout>
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <GradualSpacing
            className="font-display text-center font-heading text-4xl font-bold tracking-[-0.1em] mb-4 text-black dark:text-white md:text-7xl md:leading-[5rem]"
            text="Welcome to React Tailwind Starter"
          />

          <p className="text-xl mb-8 max-w-2xl text-muted-foreground">
            A modern, lightweight starter kit for building awesome React apps
            with Tailwind CSS and more!
          </p>
          <div className="space-y-4">
            <p className="font-semibold">Built with:</p>
            <ul className="flex flex-wrap justify-center gap-4 mb-8">
              {techStack.map(({ name, url }) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center bg-primary/10 text-primary rounded-full px-4 py-2 hover:bg-primary/20 transition-colors"
                  >
                    {name}
                    <ExternalLink className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/about" className="mt-8">
            <Button className="group">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
