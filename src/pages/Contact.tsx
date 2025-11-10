import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "info@speshway.com",
      link: "mailto:info@speshway.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 1234567890",
      link: "tel:+911234567890",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Tech Street, Innovation City, IN 500001",
      link: "#",
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
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a question or want to discuss a project? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all text-center group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <info.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                <a
                  href={info.link}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {info.content}
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-border">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground">Fill out the form below and we'll respond within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 1234567890"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your project..."
                    rows={6}
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  Send Message
                  <Send size={18} className="ml-2" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
