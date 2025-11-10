import { MapPin, Clock, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Career = () => {
  const openings = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Looking for experienced developer with expertise in React, Node.js, and cloud technologies.",
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Creative designer to craft beautiful and intuitive user experiences for web and mobile apps.",
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Hyderabad, India",
      type: "Full-time",
      description: "Expert in CI/CD, Docker, Kubernetes, and cloud infrastructure management.",
    },
    {
      title: "Data Scientist",
      department: "AI & Analytics",
      location: "Pune, India",
      type: "Full-time",
      description: "Skilled in machine learning, Python, and statistical analysis to drive data-driven insights.",
    },
    {
      title: "Project Manager",
      department: "Management",
      location: "Mumbai, India",
      type: "Full-time",
      description: "Experienced PM to lead cross-functional teams and ensure successful project delivery.",
    },
    {
      title: "Mobile App Developer",
      department: "Engineering",
      location: "Delhi, India",
      type: "Full-time",
      description: "React Native or Flutter developer to build high-quality mobile applications.",
    },
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Salary",
      description: "Industry-leading compensation packages",
    },
    {
      icon: "🏥",
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and family",
    },
    {
      icon: "🏖️",
      title: "Flexible PTO",
      description: "Generous paid time off and holidays",
    },
    {
      icon: "📚",
      title: "Learning Budget",
      description: "Annual budget for courses and conferences",
    },
    {
      icon: "🏠",
      title: "Remote Work",
      description: "Flexible work-from-home options",
    },
    {
      icon: "🎯",
      title: "Career Growth",
      description: "Clear paths for advancement and development",
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
              Join Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Build your career with us and work on exciting projects that make a real impact. We're always looking for
              talented individuals to join our growing team.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Join Speshway?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer more than just a job – we provide an environment where you can thrive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all text-center group"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Open Positions</h2>
            <p className="text-xl text-muted-foreground">Find your perfect role and start your journey with us</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {openings.map((job, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-primary" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-primary" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold whitespace-nowrap">
                    Apply Now
                  </Button>
                </div>
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
            <h2 className="text-4xl font-bold text-foreground mb-4">Don't See Your Role?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're always on the lookout for exceptional talent. Send us your resume and let's talk about how you can
              contribute to our team.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Send Your Resume
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Career;
