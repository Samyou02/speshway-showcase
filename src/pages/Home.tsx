import { Link } from "react-router-dom";
import { ArrowRight, Code, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-bg.png";

const Home = () => {
  const features = [
    {
      icon: Code,
      title: "Custom Development",
      description: "Tailored software solutions built to match your unique business needs.",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Agile methodology ensuring rapid deployment without compromising quality.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime guarantee for peace of mind.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description: "Architecture designed to grow with your business, from startup to enterprise.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-glow">
                Welcome to the Future of IT
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Transform Your Business with{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cutting-Edge
              </span>{" "}
              Technology
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Speshway Solutions delivers innovative IT solutions that drive digital transformation and accelerate
              business growth in the modern era.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group">
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 text-foreground hover:bg-primary/10 font-semibold"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Speshway?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine innovation, expertise, and dedication to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow transition-all">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="p-12 bg-card/80 backdrop-blur-sm border-border text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with our innovative solutions.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Contact Us Today
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
