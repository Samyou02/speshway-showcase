import { Code, Smartphone, Cloud, Brain, Database, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Custom web applications built with modern frameworks and technologies. From responsive websites to complex web platforms.",
      features: ["React & Next.js", "Full-Stack Development", "E-commerce Solutions", "Progressive Web Apps"],
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
      features: ["iOS Development", "Android Development", "React Native", "Flutter Apps"],
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and migration services to optimize your operations and reduce costs.",
      features: ["AWS & Azure", "Cloud Migration", "DevOps & CI/CD", "Serverless Architecture"],
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description:
        "Intelligent solutions powered by artificial intelligence and machine learning to automate and optimize processes.",
      features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "AI Chatbots"],
    },
    {
      icon: Database,
      title: "Database Management",
      description:
        "Robust database design, optimization, and management for efficient data storage and retrieval.",
      features: ["SQL & NoSQL", "Database Design", "Performance Tuning", "Data Migration"],
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.",
      features: ["Security Audits", "Penetration Testing", "Compliance Management", "Security Training"],
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
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive IT solutions tailored to your business needs. From development to deployment, we've got you
              covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all group hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:animate-glow">
                  <service.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="p-12 bg-card/80 backdrop-blur-sm border-border text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-4">Need a Custom Solution?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Don't see exactly what you're looking for? We specialize in creating custom solutions tailored to your
              unique requirements.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Discuss Your Project
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
