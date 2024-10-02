import React, { useState } from "react";

const App = () => {
  const [language, setLanguage] = useState("es"); // Default to Spanish

  const handleTranslate = () => {
    // Send message to content script to translate the page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: translatePage, // Calls the translate function inside the content script
        args: [language],
      });
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">WhatsApp Web Translator</h2>
      <label htmlFor="language" className="block mb-2">
        Choose Language:
      </label>
      <select
        id="language"
        className="border p-2 w-full"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        {/* Add more language options as needed */}
      </select>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2"
        onClick={handleTranslate}>
        Translate Page
      </button>
    </div>
  );
};

export default App;
