import React from 'react';
import { Github, ExternalLink, Users, Code, Brain, Rocket, Shield, Zap } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'AI Research Team',
      role: 'Machine Learning Engineers',
      description: 'Specialized in computer vision and object detection algorithms'
    },
    {
      name: 'Space Systems Team',
      role: 'Aerospace Engineers',
      description: 'Expert knowledge in space station operations and safety protocols'
    },
    {
      name: 'Software Development Team',
      role: 'Full Stack Developers',
      description: 'Building robust, scalable web applications for mission-critical systems'
    }
  ];

  const techStack = [
    {
      category: 'Frontend',
      technologies: ['React.js', 'Three.js', 'TailwindCSS', 'React Router'],
      icon: Code,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Backend',
      technologies: ['Flask', 'Python', 'FastAPI', 'OpenCV'],
      icon: Brain,
      color: 'from-green-500 to-emerald-500'
    },
    {
      category: 'AI/ML',
      technologies: ['YOLOv8', 'PyTorch', 'Computer Vision', 'Object Detection'],
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Infrastructure',
      technologies: ['Docker', 'MongoDB', 'REST APIs', 'WebRTC'],
      icon: Shield,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const projectFeatures = [
    {
      title: 'Real-time Detection',
      description: 'Advanced YOLOv8 model processes images in real-time with high accuracy for space station environments.',
      icon: Rocket
    },
    {
      title: 'Interactive 3D Models',
      description: 'Immersive 3D visualization of space equipment using Three.js and WebGL for enhanced user experience.',
      icon: Code
    },
    {
      title: 'Mission-Critical Safety',
      description: 'Designed specifically for space station safety protocols, ensuring astronaut protection and mission success.',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            About Eleven11
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A cutting-edge AI-powered system for detecting critical safety equipment in space station environments. 
            Built with modern web technologies and advanced machine learning algorithms.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
                  <Rocket className="w-10 h-10 mr-4 text-cyan-400" />
                  Mission Overview
                </h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    <strong className="text-white">Eleven11</strong> represents the next generation of space safety technology. 
                    Our mission is to enhance astronaut safety and mission success through intelligent, real-time detection 
                    of critical safety equipment aboard space stations.
                  </p>
                  <p>
                    Using state-of-the-art <span className="text-cyan-400 font-semibold">YOLOv8 object detection</span>, 
                    our system can instantly identify fire extinguishers, oxygen tanks, and emergency toolkits, 
                    providing crucial information for space operations and emergency response.
                  </p>
                  <p>
                    The project combines <span className="text-purple-400 font-semibold">advanced AI algorithms</span> 
                    with an intuitive web interface, making it accessible to mission controllers, astronauts, 
                    and ground support teams worldwide.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <div className="space-y-6">
                    {projectFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                          <feature.icon className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                          <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with modern, industry-standard technologies for maximum performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, index) => (
              <div key={index} className="group bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-black/30 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stack.color} rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl`}>
                    <stack.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                    {stack.category}
                  </h3>
                  <div className="space-y-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="inline-block mr-2 mb-2">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Team Eleven11
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A multidisciplinary team of experts in AI, aerospace engineering, and software development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-black/30 hover:border-white/20 transition-all duration-500 transform hover:scale-105">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:scale-110 shadow-2xl shadow-cyan-500/25">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub and Credits Section */}
        <div className="text-center">
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
              <Github className="w-8 h-8 mr-3 text-cyan-400" />
              Open Source & Credits
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Eleven11 is committed to advancing space safety technology through open collaboration. 
              Our project leverages cutting-edge research and industry-standard tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://github.com/eleven11/space-safety-detection"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Github className="w-6 h-6 mr-3 transform transition-transform duration-300 group-hover:rotate-12" />
                View on GitHub
                <ExternalLink className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="text-center space-y-2">
              <p className="text-gray-400">
                <strong className="text-white">Technologies:</strong> YOLOv8 by Ultralytics, React.js, Three.js, Flask
              </p>
              <p className="text-gray-400">
                <strong className="text-white">Special Thanks:</strong> NASA, ESA, Space Station Research Community
              </p>
              <p className="text-gray-400">
                <strong className="text-white">Team:</strong> Eleven11 Research & Development
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;