import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoBackground from "./components/VideoBackground";
import FloatingObjects from "./components/FloatingObjects";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { 
  Rocket, 
  Satellite, 
  Brain, 
  Star, 
  Upload, 
  Camera, 
  Shield, 
  Eye, 
  Zap, 
  Activity,
  CheckCircle
} from "lucide-react";

const Home = () => {
  const [selectedInput, setSelectedInput] = useState(null);

  return (
    <div className="min-h-screen text-white relative">
      <VideoBackground />
      <FloatingObjects />
      
      {/* Navigation */}
      <nav className="relative z-10 p-6 flex items-center justify-between backdrop-blur-sm bg-black/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Satellite className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">SpaceSafe AI</h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#detection" className="text-gray-300 hover:text-white transition-colors">Detection</a>
          <a href="#models" className="text-gray-300 hover:text-white transition-colors">3D Models</a>
        </div>
        
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none">
          Get Started
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 text-left max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Space
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Station
              </span>
              <br />
              <span className="text-white">
                Safety
              </span>
              <br />
              <span className="text-white">
                Detection
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              Advanced AI-powered safety equipment detection for space stations. Ensure mission-critical safety with real-time identification of O2 cylinders, fire extinguishers, and emergency toolkits.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 text-lg">
                Start Detection
              </Button>
              <Button variant="outline" className="border-gray-400 text-white hover:bg-white/10 px-8 py-3 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* This space will have the floating objects */}
          </div>
        </div>
      </section>

      {/* Interactive 3D Space Models Section */}
      <section id="models" className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Interactive 3D Space Models
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our interactive 3D models. Click and drag to interact with the astronaut and space station
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Interactive Astronaut</h3>
            <div className="relative h-64 flex items-center justify-center">
              {/* Astronaut 3D representation */}
              <div className="relative animate-float" style={{ animationDuration: '4s' }}>
                <div className="w-24 h-32 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full relative mx-auto">
                  <div className="absolute top-3 left-4 w-16 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg">
                    <div className="w-4 h-4 bg-red-500 rounded-full absolute top-2 left-2"></div>
                    <div className="w-6 h-3 bg-blue-800 rounded absolute bottom-2 left-3"></div>
                  </div>
                  <div className="absolute -left-4 top-12 w-8 h-4 bg-gray-300 rounded-full"></div>
                  <div className="absolute -right-4 top-12 w-8 h-4 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Space Station Model</h3>
            <div className="relative h-64 flex items-center justify-center">
              {/* Space Station 3D representation */}
              <div className="relative animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full relative mx-auto">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg">
                    <div className="w-4 h-4 bg-green-400 rounded-full absolute top-2 left-2"></div>
                    <div className="w-6 h-2 bg-blue-600 rounded absolute bottom-2 left-5"></div>
                  </div>
                  <div className="absolute -left-12 top-1/2 w-24 h-3 bg-blue-500 transform -translate-y-1/2 rounded"></div>
                  <div className="absolute -right-12 top-1/2 w-24 h-3 bg-blue-500 transform -translate-y-1/2 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Safety Features */}
      <section id="features" className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Advanced Safety Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cutting-edge technology designed specifically for the unique challenges of space station safety monitoring
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-black/30 backdrop-blur-sm border-gray-700 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Detection</h3>
              <p className="text-gray-300 leading-relaxed">
                Advanced AI vision systems that instantly identify safety equipment in space environments
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 backdrop-blur-sm border-gray-700 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Safety Compliance</h3>
              <p className="text-gray-300 leading-relaxed">
                Ensure all critical safety equipment is present and properly positioned in space stations
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 backdrop-blur-sm border-gray-700 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Instant Analysis</h3>
              <p className="text-gray-300 leading-relaxed">
                Get immediate feedback on safety equipment status with confidence scores and recommendations
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 backdrop-blur-sm border-gray-700 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mx-auto flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Advanced AI</h3>
              <p className="text-gray-300 leading-relaxed">
                Powered by cutting-edge machine learning models trained specifically for space environments
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Safety Detection System */}
      <section id="detection" className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Advanced Safety Detection System
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            AI-powered real-time detection of critical safety equipment in space station environments
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Input */}
          <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-cyan-400" />
                Image Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6 text-lg"
                onClick={() => setSelectedInput('upload')}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
              </Button>
              
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-6 text-lg"
                onClick={() => setSelectedInput('camera')}
              >
                <Camera className="mr-2 h-5 w-5" />
                Live Camera
              </Button>
            </CardContent>
          </Card>
          
          {/* Analysis View */}
          <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Analysis View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black/40 rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center">
                <Shield className="h-16 w-16 text-gray-500 mb-4" />
                <p className="text-gray-400 text-center mb-2">No image selected</p>
                <p className="text-gray-500 text-sm text-center">Upload an image to begin analysis</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Detection Results */}
          <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-yellow-400" />
                Detection Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12">
                <Shield className="h-16 w-16 text-gray-500 mb-4" />
                <p className="text-white font-semibold mb-2">Ready for Analysis</p>
                <p className="text-gray-400 text-sm text-center">Upload an image to detect safety equipment</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;