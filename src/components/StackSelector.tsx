import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Info } from "lucide-react";

interface Technology {
  id: string;
  name: string;
  description: string;
  icon: string;
  popular?: boolean;
}

interface StackSelectorProps {
  onStackSelected?: (stack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  }) => void;
  preselectedStack?: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  isEditing?: boolean;
}

const frontendTechnologies: Technology[] = [
  {
    id: "react",
    name: "React",
    description: "A JavaScript library for building user interfaces",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    popular: true,
  },
  {
    id: "vue",
    name: "Vue.js",
    description: "Progressive JavaScript framework for building UIs",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    popular: true,
  },
  {
    id: "angular",
    name: "Angular",
    description: "Platform for building mobile and desktop web applications",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    id: "nextjs",
    name: "Next.js",
    description: "React framework with hybrid static & server rendering",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    popular: true,
  },
  {
    id: "svelte",
    name: "Svelte",
    description: "Compiler that converts your components into JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  },
];

const backendTechnologies: Technology[] = [
  {
    id: "nodejs",
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 engine",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    popular: true,
  },
  {
    id: "express",
    name: "Express",
    description: "Fast, unopinionated, minimalist web framework for Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    popular: true,
  },
  {
    id: "django",
    name: "Django",
    description:
      "High-level Python web framework that encourages rapid development",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  },
  {
    id: "flask",
    name: "Flask",
    description: "Lightweight WSGI web application framework in Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },
  {
    id: "rails",
    name: "Ruby on Rails",
    description: "Server-side web application framework written in Ruby",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg",
  },
];

const databaseTechnologies: Technology[] = [
  {
    id: "mongodb",
    name: "MongoDB",
    description: "NoSQL database program that uses JSON-like documents",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    popular: true,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "Powerful, open source object-relational database system",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    popular: true,
  },
  {
    id: "mysql",
    name: "MySQL",
    description: "Open-source relational database management system",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    id: "redis",
    name: "Redis",
    description:
      "In-memory data structure store used as database, cache, and message broker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Open source Firebase alternative with PostgreSQL",
    icon: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png",
  },
];

const additionalTools: Technology[] = [
  {
    id: "docker",
    name: "Docker",
    description:
      "Platform for developing, shipping, and running applications in containers",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    popular: true,
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    description:
      "Open-source system for automating deployment, scaling, and management of containerized applications",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    id: "jest",
    name: "Jest",
    description: "JavaScript testing framework with a focus on simplicity",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    description:
      "CI/CD platform that allows you to automate your build, test, and deployment pipeline",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    id: "eslint",
    name: "ESLint",
    description:
      "Static code analysis tool for identifying problematic patterns in JavaScript code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
  },
];

const StackSelector: React.FC<StackSelectorProps> = ({
  onStackSelected = () => {},
  preselectedStack = { frontend: [], backend: [], database: [], tools: [] },
  isEditing = false,
}) => {
  const [selectedFrontend, setSelectedFrontend] = useState<string[]>(
    preselectedStack.frontend,
  );
  const [selectedBackend, setSelectedBackend] = useState<string[]>(
    preselectedStack.backend,
  );
  const [selectedDatabase, setSelectedDatabase] = useState<string[]>(
    preselectedStack.database,
  );
  const [selectedTools, setSelectedTools] = useState<string[]>(
    preselectedStack.tools,
  );
  const [activeTab, setActiveTab] = useState<string>("frontend");

  const handleTechnologyToggle = (
    id: string,
    category: "frontend" | "backend" | "database" | "tools",
  ) => {
    let updatedSelection: string[] = [];

    switch (category) {
      case "frontend":
        updatedSelection = selectedFrontend.includes(id)
          ? selectedFrontend.filter((item) => item !== id)
          : [...selectedFrontend, id];
        setSelectedFrontend(updatedSelection);
        break;
      case "backend":
        updatedSelection = selectedBackend.includes(id)
          ? selectedBackend.filter((item) => item !== id)
          : [...selectedBackend, id];
        setSelectedBackend(updatedSelection);
        break;
      case "database":
        updatedSelection = selectedDatabase.includes(id)
          ? selectedDatabase.filter((item) => item !== id)
          : [...selectedDatabase, id];
        setSelectedDatabase(updatedSelection);
        break;
      case "tools":
        updatedSelection = selectedTools.includes(id)
          ? selectedTools.filter((item) => item !== id)
          : [...selectedTools, id];
        setSelectedTools(updatedSelection);
        break;
    }
  };

  const handleContinue = () => {
    onStackSelected({
      frontend: selectedFrontend,
      backend: selectedBackend,
      database: selectedDatabase,
      tools: selectedTools,
    });
  };

  const renderTechnologyCards = (
    technologies: Technology[],
    category: "frontend" | "backend" | "database" | "tools",
  ) => {
    const selectedItems = {
      frontend: selectedFrontend,
      backend: selectedBackend,
      database: selectedDatabase,
      tools: selectedTools,
    }[category];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {technologies.map((tech) => {
          const isSelected = selectedItems.includes(tech.id);
          return (
            <div
              key={tech.id}
              className={`relative group cursor-pointer transition-all duration-200 rounded-2xl border bg-white shadow-sm p-6 flex flex-col items-center gap-3 hover:shadow-lg hover:border-primary/40 ${isSelected ? "border-primary bg-primary/5 scale-105" : ""}`}
              style={{ minHeight: 180 }}
              onClick={() => handleTechnologyToggle(tech.id, category)}
            >
              {/* Checkmark overlay */}
              {isSelected && (
                <span className="absolute top-3 right-3 bg-primary text-white rounded-full p-1 shadow-lg z-10">
                  <Check className="h-4 w-4" />
                </span>
              )}
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-12 h-12 rounded-full border border-muted shadow-sm mb-2"
              />
              <div className="flex flex-col items-center w-full">
                <span className="font-bold text-lg text-center leading-tight mb-1">{tech.name}</span>
                <span className="text-sm text-muted-foreground text-center mb-2">{tech.description}</span>
                {tech.popular && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5 rounded-full">Popular</Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full bg-background p-4 rounded-2xl border shadow-md">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Tech Stack" : "Select Your Tech Stack"}
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Select the technologies you want to include in your
                  development environment.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="frontend">
              Frontend
              {selectedFrontend.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedFrontend.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="backend">
              Backend
              {selectedBackend.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedBackend.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="database">
              Database
              {selectedDatabase.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedDatabase.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="tools">
              Tools
              {selectedTools.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedTools.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] pr-4">
            <TabsContent value="frontend" className="mt-0">
              {renderTechnologyCards(frontendTechnologies, "frontend")}
            </TabsContent>
            <TabsContent value="backend" className="mt-0">
              {renderTechnologyCards(backendTechnologies, "backend")}
            </TabsContent>
            <TabsContent value="database" className="mt-0">
              {renderTechnologyCards(databaseTechnologies, "database")}
            </TabsContent>
            <TabsContent value="tools" className="mt-0">
              {renderTechnologyCards(additionalTools, "tools")}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <Separator className="my-4" />

        <div className="flex justify-between items-center sticky bottom-0 bg-background py-4 z-10 border-t mt-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Selected: {selectedFrontend.length + selectedBackend.length + selectedDatabase.length + selectedTools.length} technologies
            </p>
          </div>
          <Button
            onClick={handleContinue}
            disabled={
              selectedFrontend.length === 0 &&
              selectedBackend.length === 0 &&
              selectedDatabase.length === 0
            }
            className="flex items-center gap-2 text-base px-8 py-3 rounded-full shadow-lg"
          >
            <Check className="h-5 w-5" />
            {isEditing ? "Save Changes" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StackSelector;
