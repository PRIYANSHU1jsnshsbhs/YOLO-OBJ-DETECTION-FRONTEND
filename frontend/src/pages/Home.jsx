import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Camera, ArrowDown, Zap, Shield, Brain, Rocket } from 'lucide-react';
import Scene3D from '../components/Scene3D';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToDetection = () => {
    const detectionSection = document.getElementById('detection-preview');
    detectionSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm">
                <Zap className="w-4 h-4 text-cyan-400 mr-2" />
                <span className="text-cyan-300 text-sm font-medium">AI-Powered Space Safety</span>
              </div>

              {/* Main Headlines */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-8xl font-black leading-tight">
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    Spot.
                  </span>
                  <span className="block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-pulse delay-300">
                    Detect.
                  </span>
                  <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse delay-500">
                    Protect.
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                AI-powered detection of critical space station gear. 
                <span className="text-cyan-400 font-semibold"> Real-time identification</span> of 
                fire extinguishers, oxygen tanks, and emergency toolkits.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Shield, text: 'YOLOv8 Powered', color: 'from-green-500 to-emerald-500' },
                  { icon: Brain, text: 'Real-time AI', color: 'from-blue-500 to-cyan-500' },
                  { icon: Rocket, text: 'Space Optimized', color: 'from-purple-500 to-pink-500' }
                ].map((feature, index) => (
                  <div key={index} className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${feature.color}/10 border border-current/20 backdrop-blur-sm`}>
                    <feature.icon className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/detection"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-cyan-500/25 transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
                >
                  <Upload className="w-6 h-6 mr-3 transform transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
                  Upload Image for Detection
                </Link>
                
                <Link
                  to="/detection?mode=camera"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-black/20 hover:bg-black/30 border-2 border-gray-600 hover:border-gray-400 text-white font-bold text-lg rounded-2xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
                >
                  <Camera className="w-6 h-6 mr-3 transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  Capture from Camera
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - 3D Scene */}
          <div className={`relative h-96 lg:h-[600px] transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-3xl backdrop-blur-sm border border-white/10">
              <Scene3D />
            </div>
            
            {/* Floating Labels */}
            <div className="absolute top-4 left-4 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 text-cyan-300 text-sm font-medium">
              Interactive 3D Models
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-blue-500/30 text-blue-300 text-sm font-medium">
              Click & Drag to Explore
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={scrollToDetection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        >
          <div className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors duration-300">
            <span className="text-sm font-medium">Explore Detection</span>
            <div className="w-8 h-12 border-2 border-current rounded-full flex justify-center">
              <ArrowDown className="w-4 h-4 mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Detection Preview Section */}
      <section id="detection-preview" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Advanced Detection System
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our YOLOv8-powered system identifies critical safety equipment in space environments with 
              <span className="text-cyan-400 font-semibold"> real-time precision</span>.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: 'Fire Extinguisher Detection',
                description: 'Instantly identify fire safety equipment with precise bounding box localization and confidence scoring.',
                color: 'from-red-500 to-orange-500'
              },
              {
                icon: Brain,
                title: 'Oxygen Tank Recognition',
                description: 'Detect life-support oxygen cylinders with advanced computer vision and machine learning algorithms.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Rocket,
                title: 'Emergency Toolkit Scanning',
                description: 'Locate essential emergency toolkits and maintenance equipment for mission-critical operations.',
                color: 'from-blue-500 to-cyan-500'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative p-8 bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-black/30 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              to="/detection"
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-bold text-xl rounded-2xl shadow-2xl shadow-cyan-500/25 transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
            >
              <Zap className="w-6 h-6 mr-3 animate-pulse" />
              Start Detection Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;