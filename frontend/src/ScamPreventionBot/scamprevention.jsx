// App.jsx
import React, { useState, useRef } from "react";
import { Send, Paperclip, Trash, Loader2 } from "lucide-react";
// import axios from "axios"; // Removed axios import

export default function ScamPrevention() {
  const [userPrompt, setUserPrompt] = useState("");
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  // Function to convert files to base64 for API submission
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userPrompt.trim() === "" && files.length === 0) return;

    setIsLoading(true);
    setHasSubmitted(true);

    try {
      // Prepare files - convert to base64
      const filePromises = files.map(async (file) => {
        const base64Content = await fileToBase64(file);
        return {
          name: file.name,
          type: file.type,
          content: base64Content,
        };
      });

      const processedFiles = await Promise.all(filePromises);

      // Create JSON payload
      const payload = {
        prompt: userPrompt,
        timestamp: new Date().toISOString(),
        files: processedFiles,
        settings: {
          responseFormat: "detailed",
          language: "en",
        },
      };

      // Log the request payload to console
      console.log("Request Payload:", payload);

      // Store the JSON payload in local storage
      localStorage.setItem("scamPreventionPayload", JSON.stringify(payload));

      // Simulate API response for demo purposes
      const apiResponse = {
        data: {
          response: "This is a simulated response.",
        },
      };

      // Console log the JSON response
      console.log("API Response Data:", apiResponse.data);

      // Process response
      setResponse({
        content: apiResponse.data.response || "No response data received",
        jsonResponse: apiResponse.data,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      console.error("Error processing request:", error);

      // Fallback response for demo purposes
      setResponse({
        content: `Error occurred: ${error.message}. In a production environment, proper error handling would be implemented.`,
        errorDetails: error,
        timestamp: new Date().toLocaleTimeString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const resetChat = () => {
    setUserPrompt("");
    setFiles([]);
    setResponse(null);
    setHasSubmitted(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-white text-blue-900">
      {/* Header */}
      <header className="border-b border-blue-100 p-6">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <span className="text-xl font-bold text-white">AI</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Intelligence Assistant
            </h1>
          </div>

          {hasSubmitted && (
            <button
              onClick={resetChat}
              className="px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full transition-colors"
            >
              New Question
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col p-6">
          {!hasSubmitted && (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 mb-10">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                <span className="text-4xl text-white">✨</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-blue-800">
                How can I assist you today?
              </h2>
              <p className="text-blue-600 max-w-md">
                Ask me anything or upload documents for analysis. I'll provide a
                concise, informative response.
              </p>
            </div>
          )}

          {hasSubmitted && (
            <div className="flex-1 overflow-y-auto mb-6">
              {/* User query recap */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-500 mb-1">Your query:</div>
                <div className="font-medium text-blue-800">{userPrompt}</div>
                {files.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center bg-blue-100 rounded-md px-2 py-1"
                      >
                        <span className="text-xs text-blue-700">
                          {file.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Loading state */}
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-40">
                  <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                  <p className="text-blue-600">Processing request...</p>
                  <p className="text-xs text-blue-400 mt-2">
                    Check console for request and response logs
                  </p>
                </div>
              )}

              {/* Response content */}
              {response && (
                <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-white">AI</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-800">Assistant</h3>
                      <div className="text-xs text-blue-500">
                        {response.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="prose max-w-none text-blue-800">
                    <p>{response.content}</p>
                    <p className="text-sm text-blue-500 mt-2">
                      Check the browser console (F12) to see the full JSON
                      response
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input area - shown only if not submitted or if reset */}
          {!hasSubmitted && (
            <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-lg">
              {/* File preview area */}
              {files.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-50 rounded-md px-3 py-2 group"
                    >
                      <span className="text-sm text-blue-700 mr-2">
                        {file.name}
                      </span>
                      <button
                        onClick={() => removeFile(file)}
                        className="text-blue-400 hover:text-red-500 transition-colors"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Input form */}
              <form onSubmit={handleSubmit} className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    className="w-full bg-blue-50 border border-blue-100 rounded-lg py-4 pl-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-800 placeholder-blue-400 min-h-[100px]"
                    placeholder="Ask anything..."
                    rows={3}
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 bottom-3 text-blue-400 hover:text-blue-600 transition-colors"
                    onClick={triggerFileInput}
                  >
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    className="hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-4 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition-all"
                  disabled={userPrompt.trim() === "" && files.length === 0}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-blue-100 py-4 px-6">
        <div className="max-w-3xl mx-auto text-center text-sm text-blue-500">
          Advanced AI Assistant • Responses are generated to provide helpful
          information
        </div>
      </footer>
    </div>
  );
}
