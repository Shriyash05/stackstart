import React, { useState } from "react";
import { Search, Filter, Star, Download, Plus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface TemplateMarketplaceProps {
  onUseTemplate?: (template: Template) => void;
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Full-Stack React + Node.js",
    description: "A complete full-stack template with React frontend and Node.js backend",
    stack: {
      frontend: "React",
      backend: "Node.js",
      database: "MongoDB",
    },
    author: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    stars: 1234,
    downloads: 5678,
  },
  {
    id: "2",
    name: "Vue.js + Python FastAPI",
    description: "Modern Vue.js frontend with Python FastAPI backend",
    stack: {
      frontend: "Vue.js",
      backend: "Python",
      database: "PostgreSQL",
    },
    author: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    stars: 890,
    downloads: 3456,
  },
  {
    id: "3",
    name: "Angular + Java Spring",
    description: "Enterprise-grade Angular frontend with Java Spring backend",
    stack: {
      frontend: "Angular",
      backend: "Java",
      database: "MySQL",
    },
    author: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
    stars: 567,
    downloads: 2345,
  },
];

const TemplateMarketplace: React.FC<TemplateMarketplaceProps> = ({ 
  onUseTemplate = () => {} 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const filteredTemplates = mockTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUseTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setShowTemplateDialog(true);
  };

  const handleConfirmUseTemplate = () => {
    if (selectedTemplate) {
      onUseTemplate(selectedTemplate);
      setShowTemplateDialog(false);
      setSelectedTemplate(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button>Create Template</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <img
                    src={template.author.avatar}
                    alt={template.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {template.author.name}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div>⭐ {template.stars}</div>
                  <div>⬇️ {template.downloads}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(template.stack).map(([key, value]) => (
                    <span
                      key={key}
                      className="px-2 py-1 text-xs bg-muted rounded-full"
                    >
                      {value}
                    </span>
                  ))}
                </div>
                <Button 
                  className="w-full"
                  onClick={() => handleUseTemplate(template)}
                >
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Confirmation Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Use Template: {selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              This will create a new project using the "{selectedTemplate?.name}" template.
              The template includes:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-medium">Frontend</div>
                <div className="text-sm text-muted-foreground">{selectedTemplate?.stack.frontend}</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-medium">Backend</div>
                <div className="text-sm text-muted-foreground">{selectedTemplate?.stack.backend}</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="font-medium">Database</div>
                <div className="text-sm text-muted-foreground">{selectedTemplate?.stack.database}</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>This template has been used {selectedTemplate?.downloads} times and has {selectedTemplate?.stars} stars.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmUseTemplate}>
              Use Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateMarketplace;
