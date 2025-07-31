from fastapi import FastAPI, APIRouter, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cv2
import numpy as np
import io
import base64
import time
from typing import List, Optional
import logging
from pathlib import Path
import os
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="Eleven11 Space Safety Detection API")

# Create API router
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class BoundingBox(BaseModel):
    x: float
    y: float
    width: float
    height: float

class Detection(BaseModel):
    class_name: str
    confidence: float
    bbox: List[float]  # [x, y, width, height]

class DetectionResponse(BaseModel):
    success: bool
    detections: List[Detection]
    total_detections: int
    processing_time: str
    image_dimensions: Optional[List[int]] = None
    model_version: str = "YOLOv8n-space-v1.0"

# Mock YOLO detection function (replace with actual model)
def mock_yolo_detection(image: np.ndarray) -> List[Detection]:
    """
    Mock YOLO detection function. Replace this with actual YOLOv8 model inference.
    """
    height, width = image.shape[:2]
    
    # Mock detections with realistic bounding boxes
    mock_detections = [
        {
            "class_name": "fire_extinguisher",
            "confidence": 0.942,
            "bbox": [int(width * 0.15), int(height * 0.25), int(width * 0.12), int(height * 0.3)]
        },
        {
            "class_name": "oxygen_tank", 
            "confidence": 0.887,
            "bbox": [int(width * 0.65), int(height * 0.15), int(width * 0.08), int(height * 0.4)]
        },
        {
            "class_name": "toolkit",
            "confidence": 0.915,
            "bbox": [int(width * 0.35), int(height * 0.55), int(width * 0.15), int(height * 0.2)]
        }
    ]
    
    # Randomly select 1-3 detections to simulate real scenarios
    import random
    num_detections = random.randint(1, 3)
    selected_detections = random.sample(mock_detections, num_detections)
    
    detections = []
    for det in selected_detections:
        detections.append(Detection(
            class_name=det["class_name"],
            confidence=det["confidence"] + random.uniform(-0.1, 0.05),  # Add some variation
            bbox=det["bbox"]
        ))
    
    return detections

def process_image_for_detection(image_bytes: bytes) -> np.ndarray:
    """Process uploaded image bytes into OpenCV format"""
    try:
        # Convert bytes to numpy array
        nparr = np.frombuffer(image_bytes, np.uint8)
        
        # Decode image
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise ValueError("Could not decode image")
            
        return image
        
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")

@api_router.post("/detect", response_model=DetectionResponse)
async def detect_objects(image: UploadFile = File(...)):
    """
    Detect space safety equipment in uploaded image using YOLOv8 model
    """
    try:
        start_time = time.time()
        
        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image data
        image_data = await image.read()
        
        # Process image
        cv_image = process_image_for_detection(image_data)
        height, width = cv_image.shape[:2]
        
        logger.info(f"Processing image: {width}x{height}")
        
        # Perform detection (replace with actual YOLO model)
        detections = mock_yolo_detection(cv_image)
        
        # Calculate processing time
        processing_time = time.time() - start_time
        
        # Prepare response
        response = DetectionResponse(
            success=True,
            detections=detections,
            total_detections=len(detections),
            processing_time=f"{processing_time:.3f}s",
            image_dimensions=[width, height]
        )
        
        logger.info(f"Detection completed: {len(detections)} objects found in {processing_time:.3f}s")
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Detection error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Detection failed: {str(e)}")

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Eleven11 Detection API", "version": "1.0.0"}

@api_router.get("/model-info")
async def get_model_info():
    """Get information about the detection model"""
    return {
        "model_name": "YOLOv8n-space-v1.0",
        "model_type": "Object Detection",
        "framework": "YOLOv8",
        "classes": ["fire_extinguisher", "oxygen_tank", "toolkit"],
        "input_size": [640, 640],
        "description": "Specialized model for detecting space station safety equipment"
    }

# Root endpoint
@api_router.get("/")
async def root():
    return {
        "message": "Eleven11 Space Safety Detection API", 
        "version": "1.0.0",
        "endpoints": {
            "detection": "/api/detect",
            "health": "/api/health",
            "model_info": "/api/model-info"
        }
    }

# Include router
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)