import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, Camera, X, Download, AlertCircle, CheckCircle, Loader2, ZoomIn, Activity, Terminal, Scan } from 'lucide-react';
import Webcam from 'react-webcam';

const Detection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState('READY');
  
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    // Simulate system initialization
    const initSequence = ['INITIALIZING', 'LOADING_MODELS', 'CALIBRATING', 'READY'];
    let currentStep = 0;
    
    const initInterval = setInterval(() => {
      if (currentStep < initSequence.length - 1) {
        currentStep++;
        setSystemStatus(initSequence[currentStep]);
      } else {
        clearInterval(initInterval);
      }
    }, 800);

    return () => clearInterval(initInterval);
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setError(null);
      setDetectionResults(null);
      setSystemStatus('FILE_LOADED');
    }
  };

  // Handle webcam capture
  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Convert base64 to blob
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' });
          setSelectedImage(file);
          setImagePreview(imageSrc);
          setShowCamera(false);
          setError(null);
          setDetectionResults(null);
          setSystemStatus('CAPTURE_COMPLETE');
        });
    }
  }, [webcamRef]);

  // Send image for detection
  const performDetection = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSystemStatus('ANALYZING');
    setScanProgress(0);

    // Simulate scan progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch(`${BACKEND_URL}/api/detect`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Detection failed: ${response.statusText}`);
      }

      const results = await response.json();
      setDetectionResults(results);
      setScanProgress(100);
      setSystemStatus('ANALYSIS_COMPLETE');
      
      // Draw bounding boxes on canvas
      if (results.detections && results.detections.length > 0) {
        drawBoundingBoxes(results.detections);
      }
      
    } catch (err) {
      setError(err.message);
      setSystemStatus('ERROR');
      console.error('Detection error:', err);
    } finally {
      setIsLoading(false);
      clearInterval(progressInterval);
    }
  };

  // Draw bounding boxes on canvas
  const drawBoundingBoxes = (detections) => {
    const canvas = canvasRef.current;
    const img = new Image();
    
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image
      ctx.drawImage(img, 0, 0);
      
      // Draw bounding boxes
      detections.forEach((detection, index) => {
        const { bbox, class_name, confidence } = detection;
        const [x, y, width, height] = bbox;
        
        // Set box style - minimalistic white/gray
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        
        // Draw bounding box
        ctx.strokeRect(x, y, width, height);
        ctx.fillRect(x, y, width, height);
        
        // Draw label background
        const label = `${class_name.toUpperCase()} ${(confidence * 100).toFixed(1)}%`;
        ctx.font = '14px JetBrains Mono, monospace';
        const textMetrics = ctx.measureText(label);
        const labelHeight = 20;
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(x, y - labelHeight, textMetrics.width + 10, labelHeight);
        
        // Draw label text
        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, x + 5, y - 6);
      });
    };
    
    img.src = imagePreview;
  };

  // Reset all states
  const resetDetection = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDetectionResults(null);
    setError(null);
    setShowCamera(false);
    setScanProgress(0);
    setSystemStatus('READY');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Download results
  const downloadResults = () => {
    if (detectionResults) {
      const dataStr = JSON.stringify(detectionResults, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'detection_results.json';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="hexagonal-grid opacity-5"></div>
        <div className="scan-lines">
          <div className="scan-line scan-line-1"></div>
          <div className="scan-line scan-line-2"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-7xl font-black mb-6 text-white font-mono tracking-tight">
            DETECTION_TERMINAL
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-mono">
            Neural network analysis for critical space station safety equipment identification
          </p>
          
          {/* System Status */}
          <div className="mt-8 inline-flex items-center px-6 py-3 bg-gray-900/50 border border-gray-700 backdrop-blur-xl font-mono text-sm">
            <div className={`w-2 h-2 rounded-full mr-3 ${systemStatus === 'ERROR' ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></div>
            <span className="text-gray-300">SYSTEM_STATUS: </span>
            <span className="text-white ml-2">{systemStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900/20 backdrop-blur-sm border border-gray-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center font-mono">
                <Terminal className="w-6 h-6 mr-3 text-gray-400" />
                INPUT_MODULE
              </h2>

              {/* Upload Button - Less Colorful, Industrial */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full mb-4 p-6 border border-gray-700 hover:border-gray-500 bg-gray-900/30 hover:bg-gray-800/50 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative z-10">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <p className="text-white font-semibold mb-2 font-mono">UPLOAD_IMAGE</p>
                  <p className="text-gray-500 text-sm font-mono">SELECT FILE OR DRAG & DROP</p>
                </div>
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Camera Button - Less Colorful, Industrial */}
              <button
                onClick={() => setShowCamera(!showCamera)}
                className="w-full mb-6 p-6 bg-gray-900/30 hover:bg-gray-800/50 border border-gray-700 hover:border-gray-500 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative z-10">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <p className="text-white font-semibold mb-2 font-mono">CAMERA_MODULE</p>
                  <p className="text-gray-500 text-sm font-mono">CAPTURE LIVE IMAGE</p>
                </div>
              </button>

              {/* Detection Button - Minimalistic */}
              <button
                onClick={performDetection}
                disabled={!selectedImage || isLoading}
                className="w-full bg-white text-black hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-500 font-bold py-4 px-6 transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center font-mono relative overflow-hidden group"
              >
                {!isLoading && (
                  <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                )}
                <div className="relative z-10 flex items-center">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      ANALYZING...
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5 mr-2 group-hover:text-white transition-colors" />
                      <span className="group-hover:text-white transition-colors">INITIALIZE_SCAN</span>
                    </>
                  )}
                </div>
              </button>

              {/* Progress Bar */}
              {isLoading && (
                <div className="mt-4">
                  <div className="flex justify-between mb-2 font-mono text-sm">
                    <span className="text-gray-400">PROGRESS</span>
                    <span className="text-white">{Math.round(scanProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2">
                    <div 
                      className="bg-white h-2 transition-all duration-200"
                      style={{ width: `${scanProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Reset Button */}
              {(selectedImage || detectionResults) && (
                <button
                  onClick={resetDetection}
                  className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 transition-all duration-300 flex items-center justify-center font-mono"
                >
                  <X className="w-5 h-5 mr-2" />
                  RESET_SYSTEM
                </button>
              )}
            </div>

            {/* Results Summary */}
            {detectionResults && (
              <div className="bg-gray-900/20 backdrop-blur-sm border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center font-mono">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    ANALYSIS_RESULTS
                  </h3>
                  <button
                    onClick={downloadResults}
                    className="p-2 bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                    title="Download Results"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">DETECTIONS:</span>
                    <span className="text-white font-semibold">
                      {detectionResults.detections?.length || 0}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">PROCESS_TIME:</span>
                    <span className="text-white font-semibold">
                      {detectionResults.processing_time || 'N/A'}
                    </span>
                  </div>

                  {/* Detection List */}
                  {detectionResults.detections?.map((detection, index) => (
                    <div key={index} className="p-3 bg-gray-800/50 border-l-2 border-white">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium font-mono">{detection.class_name.toUpperCase()}</span>
                        <span className="text-gray-300 font-semibold">
                          {(detection.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Display Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/20 backdrop-blur-sm border border-gray-800 p-6 h-full">
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">ANALYSIS_VIEWPORT</h2>

              {/* Camera View */}
              {showCamera && (
                <div className="relative mb-6">
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full"
                    videoConstraints={{
                      width: 1280,
                      height: 720,
                      facingMode: "user"
                    }}
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <button
                      onClick={captureImage}
                      className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-6 transition-all duration-300 transform hover:scale-105 font-mono"
                    >
                      <Camera className="w-5 h-5 mr-2 inline" />
                      CAPTURE
                    </button>
                    <button
                      onClick={() => setShowCamera(false)}
                      className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 transition-all duration-300 font-mono"
                    >
                      <X className="w-5 h-5 mr-2 inline" />
                      CLOSE
                    </button>
                  </div>
                </div>
              )}

              {/* Image Display */}
              <div className="relative bg-gray-900/50 border border-gray-700 min-h-96 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <div className="relative w-full">
                    {/* HUD Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      {/* Corner Brackets */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white"></div>
                      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white"></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white"></div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white"></div>
                      
                      {/* Status Indicator */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 border border-gray-600 font-mono text-xs text-green-400">
                        [ACTIVE] NEURAL_ANALYSIS_MODE
                      </div>
                    </div>
                    
                    {/* Original Image */}
                    <img
                      src={imagePreview}
                      alt="Selected"
                      className="w-full max-h-96 object-contain"
                      style={{ display: detectionResults ? 'none' : 'block' }}
                    />
                    
                    {/* Canvas with Bounding Boxes */}
                    {detectionResults && (
                      <canvas
                        ref={canvasRef}
                        className="w-full max-h-96 object-contain"
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium font-mono">NO_IMAGE_LOADED</p>
                    <p className="text-gray-600 text-sm font-mono">UPLOAD FILE OR CAPTURE FROM CAMERA</p>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-4 bg-red-900/20 border border-red-800 text-red-400 flex items-center font-mono">
                  <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>ERROR: {error}</span>
                </div>
              )}

              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-white animate-pulse mx-auto mb-4" />
                    <p className="text-white text-lg font-semibold font-mono">PROCESSING_IMAGE...</p>
                    <p className="text-gray-400 font-mono">NEURAL_NETWORK_ACTIVE</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detection;