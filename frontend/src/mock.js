// Mock data for space-themed AI object detection

export const mockDetections = [
  {
    id: 1,
    object: "Toolbox",
    confidence: 94.2,
    bbox: { x: 120, y: 80, width: 150, height: 100 },
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    object: "Oxygen Tank",
    confidence: 89.7,
    bbox: { x: 300, y: 200, width: 80, height: 120 },
    timestamp: new Date().toISOString()
  },
  {
    id: 3,
    object: "Fire Extinguisher",
    confidence: 91.5,
    bbox: { x: 450, y: 150, width: 60, height: 140 },
    timestamp: new Date().toISOString()
  }
];

export const mockStats = {
  totalDetections: 1247,
  avgConfidence: 92.3,
  uptime: "99.8%",
  fps: 30
};

export const mockRecentActivity = [
  { time: "2 seconds ago", object: "Toolbox", confidence: 94.2 },
  { time: "5 seconds ago", object: "Oxygen Tank", confidence: 89.7 },
  { time: "12 seconds ago", object: "Fire Extinguisher", confidence: 91.5 },
  { time: "18 seconds ago", object: "Communication Device", confidence: 87.3 },
  { time: "25 seconds ago", object: "Sample Container", confidence: 93.1 }
];