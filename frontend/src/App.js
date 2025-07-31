import React, { useState, useEffect } from "react";
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
  CheckCircle,
  ArrowRight,
  Play
} from "lucide-react";

const Home = () => {
  const [selectedInput, setSelectedInput] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Stagger animations for elements
    const timer = setTimeout(() => {
      setIsVisible({
        hero: true,
        nav: true,
        models: true,
        features: true,
        detection: true
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <VideoBackground />
      <FloatingObjects />
      
      {/* Navigation */}
      <nav className={`relative z-10 p-6 flex items-center justify-between backdrop-blur-lg bg-black/5 border-b border-white/10 transition-all duration-1000 ${isVisible.nav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="p-3 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl shadow-blue-500/25 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-blue-500/40">
            <Satellite className="h-7 w-7 text-white animate-pulse" />
          </div>
          <div className="transform transition-all duration-300 group-hover:translate-x-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">SpaceSafe AI</h1>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Detection', '3D Models'].map((item, index) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className="relative group text-gray-300 hover:text-white transition-all duration-300 font-medium text-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <Button className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white border-none px-8 py-3 text-lg font-semibold shadow-2xl shadow-blue-500/25 transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40">
          <span className="mr-2">Get Started</span>
          <ArrowRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-32 text-left max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`transform transition-all duration-1500 ease-out ${isVisible.hero ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tight">
                <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent transform transition-all duration-1000 hover:scale-105 inline-block animate-gradient-x">
                  Space
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent transform transition-all duration-1000 hover:scale-105 inline-block animate-gradient-x" style={{ animationDelay: '0.2s' }}>
                  Station
                </span>
                <span className="block text-white transform transition-all duration-1000 hover:scale-105 inline-block" style={{ animationDelay: '0.4s' }}>
                  Safety
                </span>
                <span className="block text-white transform transition-all duration-1000 hover:scale-105 inline-block" style={{ animationDelay: '0.6s' }}>
                  Detection
                </span>
              </h1>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-light">
                Advanced AI-powered safety equipment detection for space stations. Ensure mission-critical safety with 
                <span className="text-cyan-400 font-medium"> real-time identification</span> of O2 cylinders, fire extinguishers, and emergency toolkits.
              </p>
            </div>
            
            <div className={`flex flex-wrap gap-6 transform transition-all duration-1000 delay-500 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Button className="group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white px-10 py-4 text-xl font-bold shadow-2xl shadow-cyan-500/30 transform transition-all duration-500 hover:scale-110 hover:shadow-cyan-500/50 rounded-2xl">
                <Play className="mr-3 h-6 w-6 transform transition-transform duration-300 group-hover:scale-125" />
                <span>Start Detection</span>
              </Button>
              <Button variant="outline" className="group border-2 border-gray-400/50 text-white hover:bg-white/10 hover:border-white/70 px-10 py-4 text-xl font-bold backdrop-blur-sm transform transition-all duration-500 hover:scale-105 rounded-2xl">
                <span className="mr-3">Watch Demo</span>
                <ArrowRight className="h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </div>
          </div>
          
          <div className={`relative transform transition-all duration-1500 delay-200 ${isVisible.hero ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Floating orbs with enhanced animations */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-orbital"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + i * 10}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${4 + i}s`
                  }}
                >
                  <div className={`w-${4 + i * 2} h-${4 + i * 2} bg-gradient-to-r ${
                    i % 2 === 0 
                      ? 'from-cyan-400 to-blue-500' 
                      : 'from-purple-400 to-pink-500'
                  } rounded-full blur-sm opacity-60 animate-pulse`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Space Models Section */}
      <section id="3d-models" className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible.models ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
            Interactive 3D Space Models
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            Explore our interactive 3D models. Click and drag to interact with the 
            <span className="text-cyan-400 font-medium"> astronaut</span> and 
            <span className="text-purple-400 font-medium"> space station</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className={`text-center group transform transition-all duration-1000 delay-200 ${isVisible.models ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <h3 className="text-3xl font-bold text-cyan-400 mb-8 group-hover:text-cyan-300 transition-colors duration-300">Interactive Astronaut</h3>
            <div className="relative h-80 flex items-center justify-center cursor-pointer transform transition-all duration-500 group-hover:scale-105">
              <div className="relative animate-float-enhanced" style={{ animationDuration: '6s' }}>
                <div className="w-32 h-40 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-full relative mx-auto shadow-2xl shadow-cyan-500/20 transform transition-all duration-500 group-hover:shadow-cyan-500/40">
                  <div className="absolute top-4 left-8 w-16 h-20 bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-600 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full absolute top-3 left-2 animate-pulse"></div>
                    <div className="w-8 h-4 bg-gradient-to-r from-blue-700 to-blue-800 rounded absolute bottom-3 left-4"></div>
                  </div>
                  <div className="absolute -left-6 top-16 w-12 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-lg"></div>
                  <div className="absolute -right-6 top-16 w-12 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`text-center group transform transition-all duration-1000 delay-400 ${isVisible.models ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <h3 className="text-3xl font-bold text-blue-400 mb-8 group-hover:text-blue-300 transition-colors duration-300">Space Station Model</h3>
            <div className="relative h-80 flex items-center justify-center cursor-pointer transform transition-all duration-500 group-hover:scale-105">
              <div className="relative animate-float-enhanced" style={{ animationDuration: '8s', animationDelay: '2s' }}>
                <div className="w-40 h-40 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-full relative mx-auto shadow-2xl shadow-blue-500/20 transform transition-all duration-500 group-hover:shadow-blue-500/40">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-lg transform transition-all duration-300 group-hover:rotate-12">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full absolute top-3 left-3 animate-pulse"></div>
                    <div className="w-8 h-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded absolute bottom-3 left-6"></div>
                  </div>
                  <div className="absolute -left-16 top-1/2 w-32 h-4 bg-gradient-to-r from-blue-400 to-blue-500 transform -translate-y-1/2 rounded-full shadow-lg"></div>
                  <div className="absolute -right-16 top-1/2 w-32 h-4 bg-gradient-to-r from-blue-400 to-blue-500 transform -translate-y-1/2 rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Safety Features */}
      <section id="features" className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
            Advanced Safety Features
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            Cutting-edge technology designed specifically for the unique challenges of 
            <span className="text-purple-400 font-medium"> space station safety monitoring</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Eye, title: "Real-time Detection", desc: "Advanced AI vision systems that instantly identify safety equipment in space environments", color: "from-blue-500 to-blue-600", delay: "delay-100" },
            { icon: CheckCircle, title: "Safety Compliance", desc: "Ensure all critical safety equipment is present and properly positioned in space stations", color: "from-green-500 to-green-600", delay: "delay-200" },
            { icon: Zap, title: "Instant Analysis", desc: "Get immediate feedback on safety equipment status with confidence scores and recommendations", color: "from-purple-500 to-pink-500", delay: "delay-300" },
            { icon: Brain, title: "Advanced AI", desc: "Powered by cutting-edge machine learning models trained specifically for space environments", color: "from-orange-500 to-red-500", delay: "delay-400" }
          ].map((feature, index) => (
            <Card key={index} className={`group bg-black/20 backdrop-blur-xl border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 rounded-3xl overflow-hidden ${feature.delay} ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <CardContent className="p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="mb-8 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-${feature.color.split('-')[1]}-500/30`}>
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-cyan-300 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed font-light group-hover:text-gray-200 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Advanced Safety Detection System */}
      <section id="detection" className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
        <div className={`text-center mb-20 transform transition-all duration-1000 ${isVisible.detection ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
            Advanced Safety Detection System
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            AI-powered real-time detection of critical safety equipment in 
            <span className="text-cyan-400 font-medium"> space station environments</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Image Input",
              icon: Zap,
              content: (
                <div className="space-y-6">
                  <Button 
                    className="group w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white py-8 text-xl font-bold shadow-2xl shadow-cyan-500/30 transform transition-all duration-500 hover:scale-105 hover:shadow-cyan-500/50 rounded-2xl"
                    onClick={() => setSelectedInput('upload')}
                  >
                    <Upload className="mr-3 h-6 w-6 transform transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
                    Upload Image
                  </Button>
                  
                  <Button 
                    className="group w-full bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 hover:from-purple-400 hover:via-pink-500 hover:to-red-500 text-white py-8 text-xl font-bold shadow-2xl shadow-purple-500/30 transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/50 rounded-2xl"
                    onClick={() => setSelectedInput('camera')}
                  >
                    <Camera className="mr-3 h-6 w-6 transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                    Live Camera
                  </Button>
                </div>
              ),
              delay: "delay-100"
            },
            {
              title: "Analysis View",
              icon: Activity,
              content: (
                <div className="aspect-video bg-black/40 rounded-2xl border-2 border-dashed border-gray-600/50 flex flex-col items-center justify-center backdrop-blur-sm transform transition-all duration-500 hover:border-cyan-500/50 hover:bg-black/60">
                  <Shield className="h-20 w-20 text-gray-500 mb-6 animate-pulse" />
                  <p className="text-white font-semibold text-lg mb-2">No image selected</p>
                  <p className="text-gray-400 text-center">Upload an image to begin analysis</p>
                </div>
              ),
              delay: "delay-200"
            },
            {
              title: "Detection Results",
              icon: Activity,
              content: (
                <div className="flex flex-col items-center justify-center py-16 transform transition-all duration-500 hover:scale-105">
                  <div className="relative mb-8">
                    <Shield className="h-20 w-20 text-gray-500 animate-pulse" />
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
                  </div>
                  <p className="text-white font-bold text-xl mb-3">Ready for Analysis</p>
                  <p className="text-gray-400 text-center leading-relaxed">Upload an image to detect safety equipment</p>
                </div>
              ),
              delay: "delay-300"
            }
          ].map((panel, index) => (
            <Card key={index} className={`group bg-black/20 backdrop-blur-xl border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 rounded-3xl overflow-hidden ${panel.delay} ${isVisible.detection ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-3 text-2xl font-bold group-hover:text-cyan-300 transition-colors duration-300">
                  <panel.icon className="h-7 w-7 text-cyan-400 transform transition-transform duration-300 group-hover:scale-125" />
                  {panel.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  {panel.content}
                </div>
              </CardContent>
            </Card>
          ))}
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