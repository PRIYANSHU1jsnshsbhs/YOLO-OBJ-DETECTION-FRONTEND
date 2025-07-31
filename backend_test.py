#!/usr/bin/env python3
"""
Comprehensive Backend Testing for Eleven11 Space Safety Detection API
Tests all API endpoints, error handling, and file processing functionality
"""

import requests
import json
import time
import os
from io import BytesIO
from PIL import Image
import numpy as np

# Get backend URL from environment
BACKEND_URL = "https://760af87b-6614-45f9-a27d-7a84efac691e.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        self.total_tests = 0
        self.passed_tests = 0
        
    def log_test(self, test_name, passed, details=""):
        """Log test results"""
        self.total_tests += 1
        if passed:
            self.passed_tests += 1
            status = "✅ PASS"
        else:
            status = "❌ FAIL"
        
        result = f"{status} - {test_name}"
        if details:
            result += f" | {details}"
        
        self.test_results.append(result)
        print(result)
        
    def create_test_image(self, format='JPEG', size=(640, 480)):
        """Create a test image for upload testing"""
        # Create a simple test image with some content
        img_array = np.random.randint(0, 255, (size[1], size[0], 3), dtype=np.uint8)
        img = Image.fromarray(img_array)
        
        img_bytes = BytesIO()
        img.save(img_bytes, format=format)
        img_bytes.seek(0)
        
        return img_bytes.getvalue()
    
    def test_health_endpoint(self):
        """Test /api/health endpoint"""
        try:
            response = requests.get(f"{self.base_url}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                expected_keys = ["status", "service", "version"]
                
                if all(key in data for key in expected_keys):
                    if data["status"] == "healthy":
                        self.log_test("Health Check", True, f"Status: {data['status']}, Service: {data['service']}")
                    else:
                        self.log_test("Health Check", False, f"Unexpected status: {data['status']}")
                else:
                    self.log_test("Health Check", False, f"Missing keys in response: {data}")
            else:
                self.log_test("Health Check", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
    
    def test_model_info_endpoint(self):
        """Test /api/model-info endpoint"""
        try:
            response = requests.get(f"{self.base_url}/model-info", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                expected_keys = ["model_name", "model_type", "framework", "classes", "input_size", "description"]
                
                if all(key in data for key in expected_keys):
                    expected_classes = ["fire_extinguisher", "oxygen_tank", "toolkit"]
                    if set(data["classes"]) == set(expected_classes):
                        self.log_test("Model Info", True, f"Model: {data['model_name']}, Classes: {len(data['classes'])}")
                    else:
                        self.log_test("Model Info", False, f"Unexpected classes: {data['classes']}")
                else:
                    self.log_test("Model Info", False, f"Missing keys in response: {data}")
            else:
                self.log_test("Model Info", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Model Info", False, f"Exception: {str(e)}")
    
    def test_root_endpoint(self):
        """Test /api/ root endpoint"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                expected_keys = ["message", "version", "endpoints"]
                
                if all(key in data for key in expected_keys):
                    endpoints = data["endpoints"]
                    expected_endpoints = ["detection", "health", "model_info"]
                    
                    if all(ep in endpoints for ep in expected_endpoints):
                        self.log_test("Root Endpoint", True, f"Message: {data['message']}")
                    else:
                        self.log_test("Root Endpoint", False, f"Missing endpoints: {endpoints}")
                else:
                    self.log_test("Root Endpoint", False, f"Missing keys in response: {data}")
            else:
                self.log_test("Root Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Exception: {str(e)}")
    
    def test_detection_endpoint_valid_image(self):
        """Test /api/detect with valid JPEG image"""
        try:
            # Create test image
            test_image = self.create_test_image('JPEG')
            
            files = {'image': ('test_image.jpg', test_image, 'image/jpeg')}
            
            start_time = time.time()
            response = requests.post(f"{self.base_url}/detect", files=files, timeout=30)
            processing_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                expected_keys = ["success", "detections", "total_detections", "processing_time", "image_dimensions", "model_version"]
                
                if all(key in data for key in expected_keys):
                    if data["success"] and isinstance(data["detections"], list):
                        # Validate detection structure
                        valid_detections = True
                        for detection in data["detections"]:
                            required_det_keys = ["class_name", "confidence", "bbox"]
                            if not all(key in detection for key in required_det_keys):
                                valid_detections = False
                                break
                            
                            # Validate detection values
                            if not (0 <= detection["confidence"] <= 1):
                                valid_detections = False
                                break
                            
                            if len(detection["bbox"]) != 4:
                                valid_detections = False
                                break
                        
                        if valid_detections:
                            self.log_test("Detection - Valid JPEG", True, 
                                        f"Detections: {data['total_detections']}, Time: {data['processing_time']}")
                        else:
                            self.log_test("Detection - Valid JPEG", False, "Invalid detection structure")
                    else:
                        self.log_test("Detection - Valid JPEG", False, f"Success: {data['success']}")
                else:
                    self.log_test("Detection - Valid JPEG", False, f"Missing keys: {data}")
            else:
                self.log_test("Detection - Valid JPEG", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Detection - Valid JPEG", False, f"Exception: {str(e)}")
    
    def test_detection_endpoint_valid_png(self):
        """Test /api/detect with valid PNG image"""
        try:
            # Create test PNG image
            test_image = self.create_test_image('PNG')
            
            files = {'image': ('test_image.png', test_image, 'image/png')}
            
            response = requests.post(f"{self.base_url}/detect", files=files, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data["success"] and isinstance(data["detections"], list):
                    self.log_test("Detection - Valid PNG", True, 
                                f"Detections: {data['total_detections']}, Time: {data['processing_time']}")
                else:
                    self.log_test("Detection - Valid PNG", False, f"Success: {data['success']}")
            else:
                self.log_test("Detection - Valid PNG", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Detection - Valid PNG", False, f"Exception: {str(e)}")
    
    def test_detection_endpoint_invalid_file(self):
        """Test /api/detect with invalid file type"""
        try:
            # Create a text file instead of image
            text_content = b"This is not an image file"
            files = {'image': ('test.txt', text_content, 'text/plain')}
            
            response = requests.post(f"{self.base_url}/detect", files=files, timeout=10)
            
            if response.status_code == 400:
                self.log_test("Detection - Invalid File Type", True, "Correctly rejected non-image file")
            else:
                self.log_test("Detection - Invalid File Type", False, 
                            f"Expected 400, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Detection - Invalid File Type", False, f"Exception: {str(e)}")
    
    def test_detection_endpoint_no_file(self):
        """Test /api/detect without file upload"""
        try:
            response = requests.post(f"{self.base_url}/detect", timeout=10)
            
            if response.status_code == 422:  # FastAPI validation error
                self.log_test("Detection - No File", True, "Correctly rejected request without file")
            else:
                self.log_test("Detection - No File", False, 
                            f"Expected 422, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Detection - No File", False, f"Exception: {str(e)}")
    
    def test_detection_endpoint_corrupted_image(self):
        """Test /api/detect with corrupted image data"""
        try:
            # Create corrupted image data
            corrupted_data = b"corrupted_image_data_not_valid"
            files = {'image': ('corrupted.jpg', corrupted_data, 'image/jpeg')}
            
            response = requests.post(f"{self.base_url}/detect", files=files, timeout=10)
            
            if response.status_code == 400:
                self.log_test("Detection - Corrupted Image", True, "Correctly rejected corrupted image")
            else:
                self.log_test("Detection - Corrupted Image", False, 
                            f"Expected 400, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Detection - Corrupted Image", False, f"Exception: {str(e)}")
    
    def test_mock_detection_system(self):
        """Test that mock YOLO detection system produces consistent results"""
        try:
            # Test multiple times to verify randomization works
            detection_counts = []
            class_names_found = set()
            
            for i in range(3):
                test_image = self.create_test_image('JPEG')
                files = {'image': ('test_image.jpg', test_image, 'image/jpeg')}
                
                response = requests.post(f"{self.base_url}/detect", files=files, timeout=30)
                
                if response.status_code == 200:
                    data = response.json()
                    detection_counts.append(data["total_detections"])
                    
                    for detection in data["detections"]:
                        class_names_found.add(detection["class_name"])
                else:
                    self.log_test("Mock Detection System", False, f"Request {i+1} failed")
                    return
            
            # Verify we get 1-3 detections as expected
            if all(1 <= count <= 3 for count in detection_counts):
                expected_classes = {"fire_extinguisher", "oxygen_tank", "toolkit"}
                if class_names_found.issubset(expected_classes):
                    self.log_test("Mock Detection System", True, 
                                f"Detection counts: {detection_counts}, Classes found: {len(class_names_found)}")
                else:
                    self.log_test("Mock Detection System", False, f"Unexpected classes: {class_names_found}")
            else:
                self.log_test("Mock Detection System", False, f"Invalid detection counts: {detection_counts}")
                
        except Exception as e:
            self.log_test("Mock Detection System", False, f"Exception: {str(e)}")
    
    def test_processing_performance(self):
        """Test API processing performance"""
        try:
            # Test with larger image
            test_image = self.create_test_image('JPEG', size=(1920, 1080))
            files = {'image': ('large_test.jpg', test_image, 'image/jpeg')}
            
            start_time = time.time()
            response = requests.post(f"{self.base_url}/detect", files=files, timeout=60)
            total_time = time.time() - start_time
            
            if response.status_code == 200:
                data = response.json()
                processing_time = float(data["processing_time"].replace('s', ''))
                
                # Check if processing is reasonable (under 10 seconds for mock)
                if processing_time < 10.0 and total_time < 30.0:
                    self.log_test("Processing Performance", True, 
                                f"Processing: {processing_time:.3f}s, Total: {total_time:.3f}s")
                else:
                    self.log_test("Processing Performance", False, 
                                f"Too slow - Processing: {processing_time:.3f}s, Total: {total_time:.3f}s")
            else:
                self.log_test("Processing Performance", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Processing Performance", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 80)
        print("ELEVEN11 SPACE SAFETY DETECTION API - BACKEND TESTING")
        print("=" * 80)
        print(f"Testing backend at: {self.base_url}")
        print()
        
        # Test all endpoints
        self.test_health_endpoint()
        self.test_model_info_endpoint()
        self.test_root_endpoint()
        
        # Test detection functionality
        self.test_detection_endpoint_valid_image()
        self.test_detection_endpoint_valid_png()
        
        # Test error handling
        self.test_detection_endpoint_invalid_file()
        self.test_detection_endpoint_no_file()
        self.test_detection_endpoint_corrupted_image()
        
        # Test mock detection system
        self.test_mock_detection_system()
        
        # Test performance
        self.test_processing_performance()
        
        # Print summary
        print()
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {self.total_tests}")
        print(f"Passed: {self.passed_tests}")
        print(f"Failed: {self.total_tests - self.passed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests)*100:.1f}%")
        print()
        
        if self.passed_tests == self.total_tests:
            print("🎉 ALL TESTS PASSED! Backend is working correctly.")
        else:
            print("⚠️  Some tests failed. Check the details above.")
        
        print()
        print("DETAILED RESULTS:")
        for result in self.test_results:
            print(result)
        
        return self.passed_tests == self.total_tests

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)