import Footer from "./footer";
import Header from "./header";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/animations/animated-grid-pattern";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container px-4 mx-auto relative">
        {children}
        <AnimatedGridPattern
          numSquares={60}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[10%] h-[70%] skew-y-12"
          )}
        />
      </main>
      <Footer />
    </div>
  );
}
