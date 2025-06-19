import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GitHubLogoIcon,
  CodeIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import StackSelector from "./StackSelector";
import OutputOptions from "./OutputOptions";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Step = "input" | "stack" | "config" | "output";

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

interface ProjectCreatorProps {
  onComplete?: (projectData: any) => void;
  selectedTemplate?: Template | null;
}

const ProjectCreator = ({ onComplete = () => {}, selectedTemplate }: ProjectCreatorProps) => {
  const [activeTab, setActiveTab] = useState<string>("github");
  const [currentStep, setCurrentStep] = useState<Step>("input");
  const [progress, setProgress] = useState<number>(25);
  const [projectName, setProjectName] = useState<string>("");
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [detectedStack, setDetectedStack] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const { toast } = useToast();

  // Initialize with template data if provided
  React.useEffect(() => {
    if (selectedTemplate) {
      setProjectName(selectedTemplate.name);
      setDetectedStack({
        frontend: [selectedTemplate.stack.frontend.toLowerCase()],
        backend: [selectedTemplate.stack.backend.toLowerCase()],
        database: [selectedTemplate.stack.database.toLowerCase()],
        tools: ["docker", "eslint"],
      });
      setCurrentStep("stack");
      setProgress(50);
    }
  }, [selectedTemplate]);

  // Mock detected technologies for demo purposes
  const mockDetectedTechnologies = {
    frontend: ["react"],
    backend: ["nodejs", "express"],
    database: ["mongodb"],
    tools: ["docker", "eslint", "jest"],
  };

  const handleNextStep = () => {
    let nextStep: Step = "input";
    let nextProgress = 25;

    switch (currentStep) {
      case "input":
        nextStep = "stack";
        nextProgress = 50;
        break;
      case "stack":
        nextStep = "config";
        nextProgress = 75;
        break;
      case "config":
        nextStep = "output";
        nextProgress = 100;
        break;
      default:
        break;
    }

    setCurrentStep(nextStep);
    setProgress(nextProgress);
  };

  const handlePrevStep = () => {
    let prevStep: Step = "input";
    let prevProgress = 25;

    switch (currentStep) {
      case "stack":
        prevStep = "input";
        prevProgress = 25;
        break;
      case "config":
        prevStep = "stack";
        prevProgress = 50;
        break;
      case "output":
        prevStep = "config";
        prevProgress = 75;
        break;
      default:
        break;
    }

    setCurrentStep(prevStep);
    setProgress(prevProgress);
  };

  const handleAnalyzeRepo = () => {
    if (!repoUrl) return;

    setIsAnalyzing(true);

    // Simulate API call to analyze repository
    setTimeout(() => {
      setDetectedStack(mockDetectedTechnologies);
      setIsAnalyzing(false);
      handleNextStep();
    }, 2000);
  };

  const handleGenerateEnvironment = async () => {
    setIsGenerating(true);
    try {
      // Simulate async environment generation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsGenerating(false);
      setCurrentStep("output");
      setProgress(100);
      toast({
        title: "Environment Generated!",
        description: "Your development environment is ready.",
      });
    } catch (err) {
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Failed to generate environment.",
        variant: "destructive",
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "input":
        return activeTab === "github" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url">GitHub Repository URL</Label>
              <Input
                id="repo-url"
                placeholder="https://github.com/username/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>
            <Button
              onClick={handleAnalyzeRepo}
              disabled={!repoUrl || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? "Analyzing Repository..." : "Analyze Repository"}
            </Button>
            {isAnalyzing && <Progress value={50} className="h-2" />}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="My Awesome Project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                handleNextStep();
              }}
              disabled={!projectName}
              className="w-full"
            >
              Continue to Stack Selection
            </Button>
          </div>
        );

      case "stack":
        return (
          <div className="space-y-4">
            <StackSelector 
              preselectedStack={detectedStack || { frontend: [], backend: [], database: [], tools: [] }} 
              isEditing={true} 
              onStackSelected={(selectedStack) => {
                setDetectedStack(selectedStack);
              }}
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button onClick={handleNextStep}>
                Continue to Configuration
              </Button>
            </div>
          </div>
        );

      case "config":
        return (
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <h3 className="text-lg font-medium mb-2">
                Configuration Preview
              </h3>
              <pre className="p-4 bg-background rounded-md overflow-auto text-sm">
                {JSON.stringify(
                  {
                    projectName: projectName || "Project from " + repoUrl,
                    stack: detectedStack || {
                      frontend: ["react"],
                      backend: ["nodejs", "express"],
                      database: ["mongodb"],
                      tools: ["docker", "eslint"],
                    },
                    dockerConfig: {
                      services: ["app", "database"],
                      volumes: ["data"],
                      networks: ["app-network"],
                    },
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep} disabled={isGenerating}>
                Back
              </Button>
              <Button onClick={handleGenerateEnvironment} disabled={isGenerating}>
                {isGenerating ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> Generating...</>
                ) : (
                  "Generate Environment"
                )}
              </Button>
            </div>
          </div>
        );

      case "output":
        return (
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-50">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Environment Generated Successfully
              </h3>
              <p className="text-sm mt-2">
                Your development environment has been created and is ready to
                use.
              </p>
            </div>

            <OutputOptions
              isGenerating={false}
              generationProgress={100}
              generationSuccess={true}
              generationError=""
              projectName={projectName}
              repoUrl={repoUrl}
              onDownloadZip={() => {
                // Create a mock ZIP file download
                const element = document.createElement("a");
                const file = new Blob(
                  [
                    "# Development Environment\n\nProject: " +
                      (projectName || "Project from " + repoUrl) +
                      '\n\nThis is your generated development environment.\n\n## Docker Setup\n\n```yaml\nversion: "3.8"\nservices:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    volumes:\n      - .:/app\n```\n\n## Getting Started\n\n1. Extract this ZIP file\n2. Run `docker-compose up`\n3. Open http://localhost:3000\n',
                  ],
                  { type: "text/plain" },
                );
                element.href = URL.createObjectURL(file);
                element.download = (projectName || "dev-environment") + ".zip";
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
            />

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                Back to Configuration
              </Button>
              <Button variant="default" onClick={() => setCurrentStep("input")}>
                Create Another Project
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-background">
      <Card>
        <CardHeader>
          <CardTitle>Create New Development Environment</CardTitle>
          <CardDescription>
            Generate a complete development environment from a GitHub repository
            or by selecting your tech stack.
          </CardDescription>
          {selectedTemplate && (
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="text-sm font-medium">Using Template: {selectedTemplate.name}</span>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                {selectedTemplate.description}
              </p>
            </div>
          )}
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>Input</span>
              <span>Stack Selection</span>
              <span>Configuration</span>
              <span>Output</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {currentStep === "input" && (
            <Tabs
              defaultValue={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="github" className="flex items-center gap-2">
                  <GitHubLogoIcon className="h-4 w-4" />
                  GitHub Import
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex items-center gap-2">
                  <CodeIcon className="h-4 w-4" />
                  Manual Selection
                </TabsTrigger>
              </TabsList>
              <div className="mt-6">{renderStepContent()}</div>
            </Tabs>
          )}

          {currentStep !== "input" && renderStepContent()}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Separator />
          <div className="text-xs text-muted-foreground">
            <p>
              Need help? Check out our{" "}
              <a href="#" className="text-primary hover:underline">
                documentation
              </a>{" "}
              or{" "}
              <a href="#" className="text-primary hover:underline">
                contact support
              </a>
              .
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCreator;
