import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Github, Gitlab, GitBranch, ArrowLeft, Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const { user, connectGitHub, connectGitLab, connectBitbucket, isLoading } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1000); // Mock save
  };

  const handleConnect = async (provider: "github" | "gitlab" | "bitbucket") => {
    setConnecting(provider);
    try {
      if (provider === "github") {
        await connectGitHub();
      } else if (provider === "gitlab") {
        await connectGitLab();
      } else if (provider === "bitbucket") {
        await connectBitbucket();
      }
    } catch (e) {
      // Optionally show error
    } finally {
      setConnecting(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 flex flex-col gap-8">
      <Button variant="ghost" className="w-fit mb-2 flex items-center gap-2" onClick={() => navigate("/")}> <ArrowLeft className="h-4 w-4" /> Back </Button>
      {/* Profile Card */}
      <Card className="shadow-lg border-0">
        <CardContent className="flex flex-col items-center gap-4 py-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">{user?.name || "User"}</div>
            <div className="text-muted-foreground text-sm">{user?.email}</div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Name */}
      <Card className="shadow border-0">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your display name.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSave}>
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <Button type="submit" disabled={saving} className="self-end min-w-[120px]">{saving ? "Saving..." : "Save Changes"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings; 