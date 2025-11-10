import { Linkedin, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Team = () => {
  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      bio: "Visionary leader with 20+ years in IT industry, driving innovation and growth.",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      bio: "Technology expert specializing in cloud architecture and AI solutions.",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      name: "Amit Patel",
      role: "Head of Development",
      bio: "Full-stack developer with expertise in modern web and mobile technologies.",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      name: "Sneha Reddy",
      role: "Design Lead",
      bio: "Creative designer crafting intuitive and beautiful user experiences.",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      name: "Vikram Singh",
      role: "DevOps Manager",
      bio: "Infrastructure specialist ensuring reliable and scalable deployments.",
      color: "from-teal-500/20 to-cyan-500/20",
    },
    {
      name: "Ananya Iyer",
      role: "Project Manager",
      bio: "Experienced PM ensuring seamless project delivery and client satisfaction.",
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
              Meet Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Talented professionals dedicated to delivering exceptional results and driving your success.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all group"
              >
                <div
                  className={`h-64 bg-gradient-to-br ${member.color} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-background/20" />
                  <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                    <span className="text-5xl font-bold text-primary">{member.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <div className="text-primary font-medium mb-3">{member.role}</div>
                  <p className="text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 rounded-lg bg-secondary/50 hover:bg-primary/20 flex items-center justify-center transition-colors group">
                      <Linkedin size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                    <button className="w-10 h-10 rounded-lg bg-secondary/50 hover:bg-primary/20 flex items-center justify-center transition-colors group">
                      <Mail size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Culture</h2>
              <p className="text-xl text-muted-foreground">
                What makes Speshway a great place to work and grow
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Innovation First</h3>
                <p className="text-muted-foreground">
                  We encourage creativity and embrace new technologies
                </p>
              </Card>
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Collaboration</h3>
                <p className="text-muted-foreground">
                  Team work and knowledge sharing are at our core
                </p>
              </Card>
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Growth Mindset</h3>
                <p className="text-muted-foreground">
                  Continuous learning and development opportunities
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
