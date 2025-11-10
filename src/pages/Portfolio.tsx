import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Portfolio = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A full-featured e-commerce platform with inventory management and payment integration.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Healthcare Management System",
      category: "Web Application",
      description: "Comprehensive patient management system with appointment scheduling and records management.",
      technologies: ["Next.js", "PostgreSQL", "TypeScript", "AWS"],
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Secure mobile banking application with real-time transactions and biometric authentication.",
      technologies: ["React Native", "Firebase", "Node.js"],
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "AI Analytics Dashboard",
      category: "AI & Machine Learning",
      description: "Real-time analytics dashboard with predictive insights powered by machine learning.",
      technologies: ["Python", "TensorFlow", "React", "FastAPI"],
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      title: "Supply Chain Management",
      category: "Enterprise Solution",
      description: "End-to-end supply chain tracking and management system for manufacturing industry.",
      technologies: ["Angular", "Java Spring", "Oracle", "Docker"],
      color: "from-teal-500/20 to-cyan-500/20",
    },
    {
      title: "Social Media Platform",
      category: "Web Application",
      description: "Feature-rich social networking platform with real-time messaging and content sharing.",
      technologies: ["Vue.js", "GraphQL", "Redis", "PostgreSQL"],
      color: "from-indigo-500/20 to-purple-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Showcasing our successful projects and the innovative solutions we've delivered for clients worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all group"
              >
                <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-background/20" />
                  <div className="text-6xl font-bold text-primary/20 relative z-10">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-secondary/50 rounded-full text-xs text-muted-foreground border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-primary hover:text-primary hover:bg-primary/10 group-hover:translate-x-1 transition-transform"
                  >
                    View Details
                    <ExternalLink size={16} className="ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Project Success Metrics</h2>
              <p className="text-xl text-muted-foreground">Numbers that speak for our commitment to excellence</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">On-Time Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Industries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
