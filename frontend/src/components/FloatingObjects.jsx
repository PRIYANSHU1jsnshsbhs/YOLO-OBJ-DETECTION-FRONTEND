import React from 'react';

const FloatingObjects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Astronaut illustration */}
      <div className="absolute top-1/4 right-1/4 animate-float" style={{ animationDuration: '6s' }}>
        <div className="relative">
          <div className="w-32 h-40 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full relative">
            <div className="absolute top-4 left-8 w-16 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg">
              <div className="w-6 h-6 bg-red-500 rounded-full absolute top-2 left-2"></div>
              <div className="w-8 h-4 bg-blue-800 rounded absolute bottom-2 left-4"></div>
            </div>
            <div className="absolute -left-6 top-16 w-12 h-6 bg-gray-300 rounded-full"></div>
            <div className="absolute -right-6 top-16 w-12 h-6 bg-gray-300 rounded-full"></div>
            <div className="absolute -bottom-8 left-6 w-8 h-16 bg-gray-300 rounded-full"></div>
            <div className="absolute -bottom-8 right-6 w-8 h-16 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Space Station */}
      <div className="absolute top-1/3 right-1/6 animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-400 rounded-lg">
              <div className="w-3 h-3 bg-green-400 rounded-full absolute top-2 left-2"></div>
            </div>
            <div className="absolute -left-8 top-1/2 w-16 h-2 bg-blue-500 transform -translate-y-1/2"></div>
            <div className="absolute -right-8 top-1/2 w-16 h-2 bg-blue-500 transform -translate-y-1/2"></div>
          </div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-8 bg-orange-400 rounded-t"></div>
          </div>
        </div>
      </div>

      {/* Rocket */}
      <div className="absolute bottom-1/3 left-1/4 animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}>
        <div className="relative">
          <div className="w-8 h-24 bg-gradient-to-b from-gray-200 to-gray-400 rounded-t-full">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-8 bg-gradient-to-b from-orange-400 to-red-500 rounded-b-full"></div>
            </div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-blue-500 rounded"></div>
          </div>
        </div>
      </div>

      {/* Floating Equipment */}
      <div className="absolute top-1/2 left-1/6 animate-float" style={{ animationDuration: '5s', animationDelay: '3s' }}>
        <div className="w-16 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg relative">
          <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute top-2 right-2 w-6 h-2 bg-red-500 rounded"></div>
        </div>
      </div>

      {/* Satellite */}
      <div className="absolute bottom-1/4 right-1/3 animate-float" style={{ animationDuration: '9s', animationDelay: '4s' }}>
        <div className="relative">
          <div className="w-12 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded"></div>
          </div>
          <div className="absolute -left-6 top-1/2 w-12 h-1 bg-yellow-400 transform -translate-y-1/2"></div>
          <div className="absolute -right-6 top-1/2 w-12 h-1 bg-yellow-400 transform -translate-y-1/2"></div>
        </div>
      </div>

      {/* Additional floating objects */}
      <div className="absolute top-3/4 left-1/3 animate-float" style={{ animationDuration: '6s', animationDelay: '2.5s' }}>
        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full absolute top-2 left-2"></div>
        </div>
      </div>

      <div className="absolute top-1/6 left-1/2 animate-float" style={{ animationDuration: '8s', animationDelay: '1.5s' }}>
        <div className="w-6 h-12 bg-gradient-to-b from-orange-400 to-orange-600 rounded">
          <div className="w-4 h-4 bg-yellow-400 rounded-full absolute top-2 left-1"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingObjects;