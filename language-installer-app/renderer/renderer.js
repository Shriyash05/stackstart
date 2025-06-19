window.addEventListener('DOMContentLoaded', () => {
  const osSelect = document.getElementById('os');
  const output = document.getElementById('output');
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const language = btn.getAttribute('data-lang');
      const os = osSelect.value;
      output.textContent = `Installing ${language} for ${os}...\n`;
      try {
        const result = await window.installerAPI.runInstallScript(language, os);
        if (result.success) {
          output.textContent += `\nSuccess!\n${result.output}`;
        } else {
          output.textContent += `\nError:\n${result.output}`;
        }
      } catch (err) {
        output.textContent += `\nUnexpected error: ${err}`;
      }
    });
  });
}); 