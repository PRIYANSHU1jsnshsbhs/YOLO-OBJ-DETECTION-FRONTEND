import React, { useState, useRef, useCallback } from 'react';
import { Upload, Camera, X, Download, AlertCircle, CheckCircle, Loader2, ZoomIn } from 'lucide-react';
import Webcam from 'react-webcam';

const Detection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

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
      
      // Draw bounding boxes on canvas
      if (results.detections && results.detections.length > 0) {
        drawBoundingBoxes(results.detections);
      }
      
    } catch (err) {
      setError(err.message);
      console.error('Detection error:', err);
    } finally {
      setIsLoading(false);
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
        
        // Set box style
        ctx.strokeStyle = getColorForClass(class_name);
        ctx.lineWidth = 3;
        ctx.fillStyle = getColorForClass(class_name, 0.2);
        
        // Draw bounding box
        ctx.strokeRect(x, y, width, height);
        ctx.fillRect(x, y, width, height);
        
        // Draw label background
        const label = `${class_name} ${(confidence * 100).toFixed(1)}%`;
        ctx.font = '16px Inter, sans-serif';
        const textMetrics = ctx.measureText(label);
        const labelHeight = 24;
        
        ctx.fillStyle = getColorForClass(class_name);
        ctx.fillRect(x, y - labelHeight, textMetrics.width + 10, labelHeight);
        
        // Draw label text
        ctx.fillStyle = 'white';
        ctx.fillText(label, x + 5, y - 8);
      });
    };
    
    img.src = imagePreview;
  };

  // Get color for each class
  const getColorForClass = (className, alpha = 1) => {
    const colors = {
      'fire_extinguisher': `rgba(239, 68, 68, ${alpha})`, // red
      'oxygen_tank': `rgba(34, 197, 94, ${alpha})`, // green
      'toolkit': `rgba(59, 130, 246, ${alpha})`, // blue
      'default': `rgba(168, 85, 247, ${alpha})` // purple
    };
    return colors[className?.toLowerCase()] || colors.default;
  };

  // Reset all states
  const resetDetection = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDetectionResults(null);
    setError(null);
    setShowCamera(false);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Space Gear Detection
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Upload an image or capture from camera to detect critical space station safety equipment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-cyan-400" />
                Image Input
              </h2>

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full mb-4 p-6 border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 rounded-2xl bg-cyan-500/5 hover:bg-cyan-500/10 transition-all duration-300 group cursor-pointer"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-white font-semibold mb-2">Upload Image</p>
                <p className="text-gray-400 text-sm">Click to select or drag & drop</p>
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Camera Button */}
              <button
                onClick={() => setShowCamera(!showCamera)}
                className="w-full mb-6 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 hover:border-purple-500/50 rounded-2xl transition-all duration-300 group"
              >
                <Camera className="w-12 h-12 mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-white font-semibold mb-2">Use Camera</p>
                <p className="text-gray-400 text-sm">Capture live image</p>
              </button>

              {/* Detection Button */}
              <button
                onClick={performDetection}
                disabled={!selectedImage || isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-5 h-5 mr-2" />
                    Start Detection
                  </>
                )}
              </button>

              {/* Reset Button */}
              {(selectedImage || detectionResults) && (
                <button
                  onClick={resetDetection}
                  className="w-full mt-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center"
                >
                  <X className="w-5 h-5 mr-2" />
                  Reset
                </button>
              )}
            </div>

            {/* Results Summary */}
            {detectionResults && (
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Detection Results
                  </h3>
                  <button
                    onClick={downloadResults}
                    className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors duration-200"
                    title="Download Results"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Detections:</span>
                    <span className="text-white font-semibold">
                      {detectionResults.detections?.length || 0}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Processing Time:</span>
                    <span className="text-white font-semibold">
                      {detectionResults.processing_time || 'N/A'}
                    </span>
                  </div>

                  {/* Detection List */}
                  {detectionResults.detections?.map((detection, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg border-l-4" style={{ borderLeftColor: getColorForClass(detection.class_name) }}>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{detection.class_name}</span>
                        <span className="text-cyan-400 font-semibold">
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
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-6 h-full">
              <h2 className="text-2xl font-bold text-white mb-6">Analysis View</h2>

              {/* Camera View */}
              {showCamera && (
                <div className="relative mb-6">
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full rounded-2xl"
                    videoConstraints={{
                      width: 1280,
                      height: 720,
                      facingMode: "user"
                    }}
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <button
                      onClick={captureImage}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      <Camera className="w-5 h-5 mr-2 inline" />
                      Capture
                    </button>
                    <button
                      onClick={() => setShowCamera(false)}
                      className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
                    >
                      <X className="w-5 h-5 mr-2 inline" />
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Image Display */}
              <div className="relative bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-600/50 min-h-96 flex items-center justify-center">
                {imagePreview ? (
                  <div className="relative w-full">
                    {/* Original Image */}
                    <img
                      src={imagePreview}
                      alt="Selected"
                      className="w-full max-h-96 object-contain rounded-2xl"
                      style={{ display: detectionResults ? 'none' : 'block' }}
                    />
                    
                    {/* Canvas with Bounding Boxes */}
                    {detectionResults && (
                      <canvas
                        ref={canvasRef}
                        className="w-full max-h-96 object-contain rounded-2xl"
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg font-medium">No image selected</p>
                    <p className="text-gray-500 text-sm">Upload an image or capture from camera to begin detection</p>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl flex items-center">
                  <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg font-semibold">Processing Image...</p>
                    <p className="text-gray-400">This may take a few seconds</p>
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