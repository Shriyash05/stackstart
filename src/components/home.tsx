import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProjectCreator from "./ProjectCreator";
import TemplateMarketplace from "./TemplateMarketplace";
import AuthDialog from "./AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import LanguageInstallerSection from "./LanguageInstallerSection";
import { Link } from "react-router-dom";

// Template interface
interface Template {
  id: string;
  name: string;
  description: string;
  stack: {
    frontend: string;
    backend: string;
    database: string;
  };
  author: {
    name: string;
    avatar: string;
  };
  stars: number;
  downloads: number;
}

const HomePage = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(!isAuthenticated);
  const [authMode, setAuthMode] = useState<"signup" | "signin" | "github">(
    "signup",
  );
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeTab, setActiveTab] = useState("create");
  const bmcRef = useRef<HTMLDivElement>(null);

  const handleAuthRequired = (
    mode: "signup" | "signin" | "github" = "signup",
  ) => {
    setAuthMode(mode);
    setAuthDialogOpen(true);
  };

  const handleUseTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setActiveTab("create");
  };

  useEffect(() => {
    // Inject Buy Me a Coffee script only once
    if (!document.getElementById('bmc-script')) {
      const script = document.createElement('script');
      script.id = 'bmc-script';
      script.type = 'text/javascript';
      script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
      script.setAttribute('data-name', 'bmc-button');
      script.setAttribute('data-slug', 'Shriyash05');
      script.setAttribute('data-color', '#FFDD00');
      script.setAttribute('data-emoji', '');
      script.setAttribute('data-font', 'Arial');
      script.setAttribute('data-text', 'Buy me a coffee');
      script.setAttribute('data-outline-color', '#000000');
      script.setAttribute('data-font-color', '#000000');
      script.setAttribute('data-coffee-color', '#ffffff');
      if (bmcRef.current) {
        bmcRef.current.innerHTML = '';
        bmcRef.current.appendChild(script);
      } else {
        document.body.appendChild(script);
      }
    }
  }, []);

  // Show AuthDialog if not authenticated
  if (!isAuthenticated) {
    return (
      <AuthDialog
        isOpen={true}
        onClose={() => {}}
        mode={authMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur z-10">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="StackStart Logo" className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight">StackStart</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.buymeacoffee.com/Shriyash05"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm shadow transition bg-[#FFDD00] text-black hover:bg-yellow-300 border border-black"
            style={{ fontFamily: "Arial", minWidth: 0 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 mr-2"
            >
              <circle cx="12" cy="12" r="12" fill="#FFDD00" />
              <path d="M7.5 13.5c.5 1.5 2 2.5 4.5 2.5s4-1 4.5-2.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="9" cy="10" rx="1" ry="1.5" fill="#000" />
              <ellipse cx="15" cy="10" rx="1" ry="1.5" fill="#000" />
            </svg>
            Buy Me A Coffee
          </a>
          <Link to="/settings" className="font-medium text-sm px-4 py-2 rounded-full border border-primary bg-white hover:bg-primary hover:text-white transition">Settings</Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem className="font-normal cursor-default select-none">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.email}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem style={{ pointerEvents: "auto" }} onClick={e => { e.preventDefault(); e.stopPropagation(); signOut(); }}>
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center mt-12 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          One-Click Developer Environment Setup
        </motion.h1>
        <motion.p
          className="max-w-xl text-center text-muted-foreground text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Instantly generate Dockerized project environments from GitHub repos or custom stack selections. Get your team up and running in minutes.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Button
            size="lg"
            className="gap-2 px-8 py-3 text-lg rounded-full shadow"
            onClick={() => setActiveTab("create")}
            variant={activeTab === "create" ? "default" : "outline"}
          >
            <Plus className="h-5 w-5" /> Create Project
          </Button>
          <Button
            size="lg"
            className="gap-2 px-8 py-3 text-lg rounded-full"
            onClick={() => setActiveTab("marketplace")}
            variant={activeTab === "marketplace" ? "default" : "outline"}
          >
            <Search className="h-5 w-5" /> Browse Templates
          </Button>
        </div>
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-muted rounded-full p-1">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "create" ? "bg-primary text-white" : "text-muted-foreground"}`}
                onClick={() => setActiveTab("create")}
              >
                Create
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "marketplace" ? "bg-primary text-white" : "text-muted-foreground"}`}
                onClick={() => setActiveTab("marketplace")}
              >
                Marketplace
              </button>
            </div>
          </div>
          {activeTab === "create" ? (
            <ProjectCreator selectedTemplate={selectedTemplate} />
          ) : (
            <TemplateMarketplace onUseTemplate={handleUseTemplate} />
          )}
        </div>
        <LanguageInstallerSection />
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t bg-white/80 text-center text-sm text-muted-foreground mt-auto flex flex-col items-center gap-2">
        <span>© {new Date().getFullYear()} StackStart. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default HomePage;
