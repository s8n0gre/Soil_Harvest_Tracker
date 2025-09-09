import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';

export default function PlantDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with setTimeout
    setTimeout(() => {
      // Mock analysis result
      const mockResults = [
        {
          disease: 'Leaf Blight',
          confidence: 92,
          severity: 'Moderate',
          description: 'Bacterial leaf blight is a common rice disease caused by Xanthomonas oryzae.',
          symptoms: [
            'Yellow to brown stripes on leaves',
            'Water-soaked lesions',
            'Leaves may dry and become straw-colored'
          ],
          treatment: [
            'Apply copper-based fungicide spray',
            'Improve field drainage',
            'Remove and destroy infected plant debris',
            'Use resistant varieties for future planting'
          ],
          prevention: [
            'Avoid overhead irrigation',
            'Ensure proper plant spacing',
            'Regular field monitoring',
            'Crop rotation with non-host plants'
          ]
        },
        {
          disease: 'Healthy Plant',
          confidence: 95,
          severity: 'None',
          description: 'The plant appears healthy with no visible signs of disease or pest damage.',
          symptoms: ['No symptoms detected'],
          treatment: ['Continue regular care and monitoring'],
          prevention: [
            'Maintain good field hygiene',
            'Regular watering schedule',
            'Balanced nutrition',
            'Preventive spray schedule'
          ]
        }
      ];
      
      // Randomly select a result for demonstration
      const result = mockResults[Math.random() > 0.7 ? 0 : 1];
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'severe':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'mild':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Plant Disease Detection</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
              {selectedImage ? (
                <div className="space-y-4">
                  <img
                    src={selectedImage}
                    alt="Selected plant"
                    className="max-h-64 mx-auto rounded-lg shadow-md"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Change Image
                    </button>
                    <button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span>Analyze Plant</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Plant Image</h3>
                    <p className="text-gray-600 mb-4">Take a clear photo of the affected plant leaves or upload from gallery</p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Image</span>
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Take Photo</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Tips for Better Detection</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Take photos in good lighting conditions</li>
                    <li>• Focus on affected areas of the plant</li>
                    <li>• Avoid blurry or distant shots</li>
                    <li>• Include multiple affected leaves if possible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {analysisResult && (
              <div className="space-y-6">
                <div className={`border-2 rounded-xl p-6 ${getSeverityColor(analysisResult.severity)}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{analysisResult.disease}</h3>
                    {analysisResult.disease === 'Healthy Plant' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Confidence:</span>
                      <span className="font-bold">{analysisResult.confidence}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Severity:</span>
                      <span className="font-bold">{analysisResult.severity}</span>
                    </div>
                    <p className="text-sm">{analysisResult.description}</p>
                  </div>
                </div>

                {analysisResult.disease !== 'Healthy Plant' && (
                  <>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                        Symptoms
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.symptoms.map((symptom: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Zap className="w-5 h-5 text-red-500 mr-2" />
                        Immediate Treatment
                      </h4>
                      <ul className="space-y-2">
                        {analysisResult.treatment.map((step: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Prevention Tips
                  </h4>
                  <ul className="space-y-2">
                    {analysisResult.prevention.map((tip: string, index: number) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Consult Agricultural Expert
                </button>
              </div>
            )}

            {!analysisResult && !isAnalyzing && (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">AI Analysis Ready</h3>
                <p className="text-gray-500">Upload an image to get instant plant disease detection and treatment recommendations.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}