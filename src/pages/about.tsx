import GradualSpacing from "@/components/animations/gradual-spacing";
import Layout from "@/layout/layout";

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <GradualSpacing
          className="font-display text-center font-heading text-4xl font-bold tracking-[-0.1em] mb-4 text-black dark:text-white md:text-7xl md:leading-[5rem]"
          text="Our Cutting-Edge Tech Stack"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TechItem
            name="Biome"
            description="A next-generation toolchain for web development that combines linting, formatting, and more into a single, blazing-fast tool. It enhances code quality and maintains consistency across your project."
          />
          <TechItem
            name="React Router DOM"
            description="The de facto standard for declarative routing in React applications. It enables dynamic, client-side routing with nested routes, lazy loading, and programmatic navigation, creating seamless user experiences."
          />
          <TechItem
            name="Tailwind CSS"
            description="A highly customizable, low-level CSS framework that gives you all the building blocks you need to create bespoke designs. It promotes rapid UI development with its utility-first approach and extensive preset styles."
          />
          <TechItem
            name="shadcn/ui"
            description="A collection of beautifully designed, accessible, and customizable React components. Built on top of Radix UI primitives and styled with Tailwind CSS, it offers a perfect blend of functionality and aesthetics."
          />
          <TechItem
            name="Magic UI"
            description="A powerful library for creating captivating animations and smooth transitions in React applications. It enables developers to add life to their interfaces with minimal effort, enhancing user engagement and interaction."
          />
        </div>
      </div>
    </Layout>
  );
}

function TechItem({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-3 font-heading">{name}</h2>
      <p className="text-secondary-foreground">{description}</p>
    </div>
  );
}
