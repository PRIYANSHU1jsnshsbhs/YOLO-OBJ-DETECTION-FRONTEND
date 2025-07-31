import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpaceBackground from "./components/SpaceBackground";
import CameraFeed from "./components/CameraFeed";
import DetectionStats from "./components/DetectionStats";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Rocket, Satellite, Brain, Star } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen text-white relative">
      <SpaceBackground />
      
      {/* Navigation */}
      <nav className="relative z-10 p-6 flex items-center justify-between backdrop-blur-sm bg-black/20 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Satellite className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Falcon AI</h1>
            <p className="text-xs text-gray-400">Space Object Detection</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping" />
            System Online
          </Badge>
          <Button variant="outline" className="border-gray-700 text-white hover:bg-white/10">
            Settings
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain className="h-12 w-12 text-blue-400 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Falcon AI
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Advanced YOLOv8-powered object detection system for space station environments. 
            Real-time identification of tools, equipment, and safety devices.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Badge className="px-4 py-2 bg-blue-500/20 text-blue-300 border-blue-500/30 text-sm">
              <Rocket className="w-4 h-4 mr-2" />
              YOLOv8 Powered
            </Badge>
            <Badge className="px-4 py-2 bg-purple-500/20 text-purple-300 border-purple-500/30 text-sm">
              <Star className="w-4 h-4 mr-2" />
              Real-time Processing
            </Badge>
            <Badge className="px-4 py-2 bg-green-500/20 text-green-300 border-green-500/30 text-sm">
              <Brain className="w-4 h-4 mr-2" />
              Space Optimized
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Detection Stats */}
          <DetectionStats />
          
          {/* Camera Feed Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-black/20 backdrop-blur-sm border-gray-800 mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Satellite className="h-5 w-5 text-blue-400" />
                    Live Camera Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CameraFeed />
                </CardContent>
              </Card>
            </div>
            
            {/* System Info */}
            <div className="space-y-6">
              <Card className="bg-black/20 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    Model Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Model Version</p>
                    <p className="text-white font-semibold">YOLOv8n-space-v1.2</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Training Dataset</p>
                    <p className="text-white font-semibold">Falcon Synthetic Data</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Classes Detected</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">Toolbox</Badge>
                      <Badge variant="outline" className="text-xs">Oxygen Tank</Badge>
                      <Badge variant="outline" className="text-xs">Fire Extinguisher</Badge>
                      <Badge variant="outline" className="text-xs">+5 more</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-sm border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-orange-400" />
                    Mission Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Detection Active</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Data Stream</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">AI Processing</span>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
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