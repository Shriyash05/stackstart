import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Github,
  ExternalLink,
  Check,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import AuthDialog from "./AuthDialog";
import JSZip from "jszip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import AfterDownloadSteps from "./AfterDownloadSteps";

interface OutputOptionsProps {
  isGenerating?: boolean;
  generationProgress?: number;
  generationSuccess?: boolean;
  generationError?: string;
  projectName?: string;
  repoUrl?: string;
  onDownloadZip?: () => void;
}

const OutputOptions: React.FC<OutputOptionsProps> = ({
  isGenerating: externalIsGenerating = false,
  generationProgress = 100,
  generationSuccess = true,
  generationError = "",
  projectName,
  repoUrl,
  onDownloadZip = () => {},
}: OutputOptionsProps) => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "signin" | "google">("signup");
  const [authTitle, setAuthTitle] = useState("");
  const [authDescription, setAuthDescription] = useState("");
  const { isAuthenticated, user } = useAuth();
  const [showAfterDownloadModal, setShowAfterDownloadModal] = useState(false);

  const handleDownloadZip = () => {
    onDownloadZip();
  };

  return (
    <Card className="w-full bg-white border-gray-200 shadow-xl rounded-2xl">
      <CardContent className="p-8">
        {externalIsGenerating ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <h3 className="text-lg font-medium">
                Generating your environment...
              </h3>
            </div>
            <Progress value={generationProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              This may take a moment. We're setting up your development
              environment with all the selected technologies.
            </p>
          </div>
        ) : generationSuccess ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-medium">
                Environment Generated Successfully!
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Download your environment as an archive file to use locally.
                Contains all necessary Docker configurations, setup scripts,
                and documentation.
              </p>
              <Button
                onClick={handleDownloadZip}
                className="w-full sm:w-auto text-lg py-3 px-6 rounded-xl"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Archive
              </Button>
            </div>
          </div>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>
              {generationError ||
                "There was an error generating your environment. Please try again."}
            </AlertDescription>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </Alert>
        )}
      </CardContent>

      <Dialog open={showAfterDownloadModal} onOpenChange={setShowAfterDownloadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Next Steps</DialogTitle>
          </DialogHeader>
          <AfterDownloadSteps />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default OutputOptions;
