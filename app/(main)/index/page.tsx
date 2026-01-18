"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  MessageSquare,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Handle smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Optional: Update URL without jumping
        window.history.pushState({}, "", href);
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-border md:px-12 sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className=" max-w-7xl mx-auto flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center animate-fade-in">
              <img src="/logo-2.png" alt="" />
            </div>
            <span className="font-semibold text-foreground animate-fade-in">
              TechAdvantage
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Home
            </a>
            <a
              href="#tools"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Features
            </a>
            <a
              href="#community"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Community
            </a>
            <a
              href="#download"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Download
            </a>
          </div>
          <Button className="bg-transparent text-black border border-gray-600 rounded-full  shadow-none hover:bg-gray-600/5">
            Download App
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="px-6 md:px-12 py-6 md:py-14 bg-gradient-to-br from-background via-background to-secondary"
        id="home"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center animate-slide-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight italic">
                Build Your Tech-Driven Business,{" "}
                <span className="font-light">Your Way</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed animate-slide-up [animation-delay:100ms]">
                Get personalized guidance, custom solutions, and expert coaching
                designed specifically for your entrepreneurial journey. No
                generic tools. Just what works for you.
              </p>

              <div className="flex flex-col gap-6 animate-slide-up [animation-delay:200ms]">
                {/* App Store Badges */}
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold text-muted-foreground">
                    The mobile app is available now
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.apple.com/app-store/"
                      target="_blank"
                      className="group transform hover:scale-105 transition-transform duration-300"
                    >
                      <div className="flex items-center gap-3 p-5 w-20 h-20  border border-gray-500 rounded-full ">
                        <div className="  rounded-full">
                          <img src="/apple.png" alt="" />
                        </div>
                      </div>
                    </a>
                    <a
                      href="https://play.google.com/store/games?hl=en"
                      target="_blank"
                      className="group transform hover:scale-105 transition-transform duration-300"
                    >
                      <div className="flex items-center gap-3 p-5 w-20 h-20  border border-gray-500 rounded-full">
                        <div className="  rounded-full">
                          <img src="/play.png" alt="" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Mobile Mockup */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-[530px] animate-float">
                {/* Phone Frame */}
                <div className="relative rounded-3xl p-3 ">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7  rounded-b-3xl z-10"></div>

                  {/* Screen */}
                  <img
                    src="/techadvantage-app-screenshot.png"
                    alt="TechAdvantage App"
                    className="w-full h-auto rounded-2xl object-cover "
                  />
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-3xl -z-10 rounded-3xl animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Stats */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 pt-12 border-t border-border">
        <div className="text-center animate-slide-up [animation-delay:300ms]">
          <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            5000+
          </div>
          <div className="text-sm md:text-base text-muted-foreground">
            Entrepreneurs Guided
          </div>
        </div>
        <div className="text-center animate-slide-up [animation-delay:400ms]">
          <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            250+
          </div>
          <div className="text-sm md:text-base text-muted-foreground">
            Businesses Launched
          </div>
        </div>
        <div className="text-center animate-slide-up [animation-delay:500ms]">
          <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            98%
          </div>
          <div className="text-sm md:text-base text-muted-foreground">
            Success Rate
          </div>
        </div>
      </div>

      {/* Download Section */}
      <section id="download" className="px-6 md:px-16 py-20 bg-secondary mt-10">
        <div className="max-w-none mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground animate-slide-up">
            See TechAdvantage in Action
          </h2>

          <p className="text-center text-muted-foreground mb-10 max-w-3xl mx-auto animate-slide-up [animation-delay:100ms]">
            Explore the key features that make TechAdvantage your ideal business
            companion
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 ">
            {[
              { img: "/2.png", title: "Home Overview Page" },
              { img: "/1.png", title: "Personalized Assessment" },
              { img: "/3.png", title: "Community Space" },
            ].map((screenshot, i) => (
              <div
                key={i}
                className="flex flex-col items-center animate-slide-up"
                style={{ animationDelay: `${(i + 2) * 100}ms` }}
              >
                <div className="rounded-3xl p-3 hover:scale-105 transition-all duration-300 animate-float w-full">
                  <img
                    src={screenshot.img}
                    alt={screenshot.title}
                    className="w-full max-w-[900px] rounded-2xl object-cover mx-auto"
                  />
                </div>

                <p className="mt-2 text-center font-semibold text-foreground">
                  {screenshot.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 md:px-12 py-20 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground animate-slide-up">
            Your Path to Success in 4 Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Assessment",
                description:
                  "Take our guided assessment to uncover your strengths and business potential",
              },
              {
                step: "02",
                title: "Personalize",
                description:
                  "Receive custom recommendations tailored to your unique business needs",
              },
              {
                step: "03",
                title: "Build",
                description:
                  "Access tools, templates, and resources to build your tech-driven solution",
              },
              {
                step: "04",
                title: "Launch",
                description:
                  "Get expert coaching and community support to bring your idea to life",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl font-bold text-muted-foreground mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Tools */}
      <section id="tools" className="px-6 md:px-12 py-20 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground animate-slide-up">
            Your Business Toolkit
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto animate-slide-up [animation-delay:100ms]">
            Everything you need to transform your business idea into a scalable,
            tech-driven solution
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                title: "Skills Assessment",
                description:
                  "Discover your entrepreneurial strengths and align with business ideas that fit you perfectly.",
              },
              {
                icon: Zap,
                title: "CRM Solution Intake",
                description:
                  "Get a custom CRM solution that manages your client relationships and business operations.",
              },
              {
                icon: BookOpen,
                title: "Business Planning",
                description:
                  "Create comprehensive business plans with guided templates and expert insights.",
              },
              {
                icon: Users,
                title: "Expert Coaching",
                description:
                  "Work with coaches to refine strategies, conduct mock interviews, and gain confidence.",
              },
              {
                icon: MessageSquare,
                title: "Community Space",
                description:
                  "Connect with other entrepreneurs, share ideas, and get peer feedback on your journey.",
              },
              {
                icon: BookOpen,
                title: "Bootcamp Modules",
                description:
                  "Self-paced learning resources to master tech skills and business fundamentals.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-6 border-border hover:border-muted-foreground transition-all duration-300 hover:shadow-lg animate-slide-up hover:scale-105"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="px-6 md:px-12 py-20 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground animate-slide-up">
            Join a Thriving Community
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div className="animate-slide-up">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Learn Together, Grow Together
              </h3>
              <p className="text-muted-foreground mb-6">
                Connect with fellow entrepreneurs at every stage of their
                journey. Share ideas, ask questions, get feedback, and celebrate
                wins together in our supportive community space.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 animate-slide-up [animation-delay:100ms]">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-foreground">
                    Participate in discussions on business strategies
                  </span>
                </div>
                <div className="flex items-start gap-3 animate-slide-up [animation-delay:200ms]">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-foreground">
                    Practice in mock interview sessions
                  </span>
                </div>
                <div className="flex items-start gap-3 animate-slide-up [animation-delay:300ms]">
                  <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-foreground">
                    Share your journey and learn from others
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-primary rounded-lg h-80 flex items-center justify-center text-primary-foreground animate-float">
              <div className="text-center">
                <Users className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">Community Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-20 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground animate-slide-up">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up [animation-delay:100ms]">
            Start with our Success Path Assessment and discover personalized
            recommendations for your entrepreneurial journey.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 animate-slide-up [animation-delay:200ms]"
          >
            Begin Your Assessment <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-12 py-12 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded flex items-center justify-center">
                  <img src="/logo-2.png" alt="" />
                </div>
                <span className="font-semibold text-foreground">
                  TechAdvantage
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering entrepreneurs with personalized solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-foreground transition"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="hover:text-foreground transition"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Socail </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className="hover:text-foreground transition"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    className="hover:text-foreground transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    className="hover:text-foreground transition"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2025 TechAdvantage. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 sr-only">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
