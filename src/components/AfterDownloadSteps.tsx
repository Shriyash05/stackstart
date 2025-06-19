import React from "react";

const AfterDownloadSteps: React.FC = () => (
  <div>
    <h2 className="text-lg font-bold mb-2">Next Steps After Downloading ZIP</h2>
    <ol className="list-decimal pl-5 space-y-2">
      <li>
        <b>Extract the ZIP file</b><br />
        Locate the downloaded ZIP file, right-click, and select <i>Extract All...</i>
      </li>
      <li>
        <b>Open the folder in your code editor</b><br />
        Use VS Code or your favorite editor.
      </li>
      <li>
        <b>Install dependencies</b><br />
        <code>npm install</code> or <code>yarn install</code> in the project folder.
      </li>
      <li>
        <b>Set up environment variables</b> (if needed)<br />
        Copy <code>.env.example</code> to <code>.env</code> and fill in required values.
      </li>
      <li>
        <b>Start the development server</b><br />
        <code>npm run dev</code> or <code>yarn dev</code>
      </li>
      <li>
        <b>Open your browser</b><br />
        Go to <code>http://localhost:3000</code> (or the URL shown in your terminal).
      </li>
    </ol>
    <p className="mt-4">
      <b>Optional:</b> Initialize a git repository and push to GitHub.
    </p>
    <div className="mt-8">
      <h3 className="text-md font-semibold mb-2">Install Required Languages (Optional)</h3>
      <p className="mb-2 text-sm text-muted-foreground">If you don't have Python, C, or C++ installed, run the following commands in your terminal. These commands are non-interactive and will install the languages without further prompts.</p>
      <div className="mb-4">
        <b>Python</b>
        <ul className="list-disc pl-5 text-sm">
          <li>Windows (using winget):<br />
            <code className="block bg-gray-100 p-1 rounded">winget install -e --id Python.Python.3</code>
          </li>
          <li>Windows (using Chocolatey):<br />
            <code className="block bg-gray-100 p-1 rounded">choco install python -y</code>
          </li>
          <li>macOS (using Homebrew):<br />
            <code className="block bg-gray-100 p-1 rounded">brew install python</code>
          </li>
          <li>Linux (Debian/Ubuntu):<br />
            <code className="block bg-gray-100 p-1 rounded">sudo apt-get update && sudo apt-get install -y python3 python3-pip</code>
          </li>
          <li>Linux (Fedora/CentOS):<br />
            <code className="block bg-gray-100 p-1 rounded">sudo dnf install -y python3 python3-pip</code>
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <b>C/C++</b>
        <ul className="list-disc pl-5 text-sm">
          <li>Windows (using winget for MinGW):<br />
            <code className="block bg-gray-100 p-1 rounded">winget install -e --id MSYS2.MSYS2</code>
          </li>
          <li>Windows (using Chocolatey for MinGW):<br />
            <code className="block bg-gray-100 p-1 rounded">choco install mingw -y</code>
          </li>
          <li>macOS (Xcode Command Line Tools):<br />
            <code className="block bg-gray-100 p-1 rounded">xcode-select --install</code>
          </li>
          <li>Linux (Debian/Ubuntu):<br />
            <code className="block bg-gray-100 p-1 rounded">sudo apt-get update && sudo apt-get install -y build-essential</code>
          </li>
          <li>Linux (Fedora/CentOS):<br />
            <code className="block bg-gray-100 p-1 rounded">sudo dnf groupinstall -y "Development Tools"</code>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default AfterDownloadSteps; 