import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const LANGUAGES = [
  { key: "python", label: "Python" },
  { key: "c", label: "C" },
  { key: "cpp", label: "C++" },
];

const OSES = [
  { key: "windows", label: "Windows", ext: ".exe" },
  { key: "macos", label: "macOS", ext: ".dmg" },
  { key: "linux", label: "Linux", ext: ".AppImage" },
];

const DOWNLOAD_LINKS: Record<string, string> = {
  windows: "/downloads/language-installer-app-setup.exe",
  macos: "/downloads/language-installer-app-setup.dmg",
  linux: "/downloads/language-installer-app-setup.AppImage",
};

function generateScript(language: string, os: string): { filename: string; content: string } {
  if (os === "windows") {
    // PowerShell script
    let content = "";
    if (language === "python") {
      content = `
# PowerShell script to install Python, set env, and test
winget install -e --id Python.Python.3 -h
$env:Path += ";$($env:LOCALAPPDATA)\\Programs\\Python\\Python3*"
python --version
`;
    } else if (language === "c" || language === "cpp") {
      content = `
# PowerShell script to install MinGW (C/C++), set env, and test
inget install -e --id MSYS2.MSYS2 -h
# Add MSYS2 to PATH (user scope)
$msysPath = "$env:ProgramFiles\\MSYS2\\usr\\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + $msysPath, "User")
gcc --version
`;
    }
    return { filename: `${language}-setup.ps1`, content };
  } else if (os === "macos") {
    // Bash script for macOS
    let content = "";
    if (language === "python") {
      content = `#!/bin/bash\n# Install Python, set env, and test\nbrew install python\necho 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc\nsource ~/.zshrc\npython3 --version\n`;
    } else if (language === "c" || language === "cpp") {
      content = `#!/bin/bash\n# Install Xcode Command Line Tools and test\nxcode-select --install\ngcc --version\n`;
    }
    return { filename: `${language}-setup-macos.sh`, content };
  } else {
    // Linux bash script
    let content = "";
    if (language === "python") {
      content = `#!/bin/bash\n# Install Python, set env, and test\nsudo apt-get update\nsudo apt-get install -y python3 python3-pip\necho 'export PATH="/usr/bin:$PATH"' >> ~/.bashrc\nsource ~/.bashrc\npython3 --version\n`;
    } else if (language === "c" || language === "cpp") {
      content = `#!/bin/bash\n# Install build-essential and test\nsudo apt-get update\nsudo apt-get install -y build-essential\ngcc --version\n`;
    }
    return { filename: `${language}-setup-linux.sh`, content };
  }
}

const LanguageInstallerSection: React.FC = () => {
  const [selectedOS, setSelectedOS] = useState<string | null>(null);

  const handleDownload = (language: string) => {
    const { filename, content } = generateScript(language, selectedOS || "");
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Install Programming Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <span className="font-medium mr-2">Select your OS to download the installer:</span>
          {OSES.map((os) => (
            <Button
              key={os.key}
              variant={selectedOS === os.key ? "default" : "outline"}
              className="mr-2 mb-2"
              onClick={() => setSelectedOS(os.key)}
            >
              {os.label}
            </Button>
          ))}
        </div>
        {selectedOS && (
          <div className="mb-6">
            <a
              href={DOWNLOAD_LINKS[selectedOS]}
              download
              className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
            >
              Download Language Installer App for {OSES.find((os) => os.key === selectedOS)?.label}
            </a>
            <span className="block text-xs text-muted-foreground mb-4">
              (Recommended: Automates installation and setup for all available languages on your system)
            </span>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-4">
          The desktop app will let you install and set up any available programming language automatically.
        </p>
      </CardContent>
    </Card>
  );
};

export default LanguageInstallerSection; 