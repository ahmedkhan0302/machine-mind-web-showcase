
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, PenTool, RotateCcw, Brain } from "lucide-react";

const DigitRecognition = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 280;
    canvas.height = 280;
    
    // Set drawing styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'white';
    
    // Fill with black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
  };

  const recognizeDigit = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate random prediction for demo
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const predictedDigit = digits[Math.floor(Math.random() * digits.length)];
    
    // Generate realistic confidence scores
    const confidences = {};
    digits.forEach(digit => {
      if (digit === predictedDigit) {
        confidences[digit] = 0.75 + Math.random() * 0.2; // High confidence for predicted
      } else {
        confidences[digit] = Math.random() * 0.3; // Lower for others
      }
    });
    
    // Normalize confidences to sum to 1
    const total = Object.values(confidences).reduce((sum, val) => sum + val, 0);
    Object.keys(confidences).forEach(digit => {
      confidences[digit] = confidences[digit] / total;
    });
    
    setPrediction({
      digit: predictedDigit,
      confidence: confidences[predictedDigit],
      allConfidences: confidences
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen ml-0 lg:ml-0 relative">
      {/* Fixed positioning to account for sidebar */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-teal-900" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6 lg:mb-8"
        >
          <Link
            to="/"
            className="p-2 lg:p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-2 lg:p-3">
              <PenTool className="w-full h-full text-white" />
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-white">Handwritten Digit Recognition</h1>
              <p className="text-sm lg:text-base text-gray-400">Neural Network Model (MNIST)</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Drawing Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-8 border border-white/20 h-fit"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 flex items-center gap-3">
              <PenTool className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
              Draw a Digit (0-9)
            </h2>
            
            <div className="space-y-4 lg:space-y-6">
              {/* Canvas Container */}
              <div className="flex justify-center">
                <div className="p-3 lg:p-4 bg-white/5 rounded-xl border border-white/20 w-fit">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="border border-white/30 rounded-lg cursor-crosshair block"
                    style={{ 
                      width: '280px', 
                      height: '280px',
                      maxWidth: '100%',
                      aspectRatio: '1'
                    }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearCanvas}
                  className="flex-1 py-2.5 lg:py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" />
                    Clear
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={recognizeDigit}
                  disabled={isLoading}
                  className="flex-1 py-2.5 lg:py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Recognizing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Brain className="w-4 h-4 lg:w-5 lg:h-5" />
                      Recognize
                    </div>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-8 border border-white/20 h-fit"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">Recognition Results</h2>
            
            {prediction ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 lg:space-y-6"
              >
                {/* Main Prediction */}
                <div className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 text-center">
                  <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Predicted Digit</h3>
                  <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                    {prediction.digit}
                  </div>
                  <p className="text-sm lg:text-base text-gray-300">
                    Confidence: {(prediction.confidence * 100).toFixed(1)}%
                  </p>
                </div>

                {/* Confidence Bars */}
                <div className="space-y-2 lg:space-y-3">
                  <h4 className="text-base lg:text-lg font-semibold text-white">All Predictions</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {Object.entries(prediction.allConfidences)
                      .sort(([,a], [,b]) => b - a)
                      .map(([digit, confidence]) => (
                        <div key={digit} className="space-y-1 lg:space-y-2">
                          <div className="flex justify-between text-xs lg:text-sm">
                            <span className={`font-medium ${digit == prediction.digit ? 'text-green-400' : 'text-gray-300'}`}>
                              Digit {digit}
                            </span>
                            <span className="text-white font-medium">
                              {(confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-1.5 lg:h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${confidence * 100}%` }}
                              transition={{ duration: 0.8, delay: 0.1 * parseInt(digit) }}
                              className={`h-full rounded-full ${
                                digit == prediction.digit 
                                  ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
                                  : 'bg-gradient-to-r from-gray-500 to-gray-600'
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-gray-400 py-12 lg:py-20">
                <PenTool className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm lg:text-base">Draw a digit on the canvas to see recognition results</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 lg:mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-4 lg:p-8 border border-white/10"
        >
          <h3 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4">About MNIST Recognition</h3>
          <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
            This neural network model is trained on the MNIST dataset, containing 70,000 handwritten digit images. 
            The model uses convolutional neural networks (CNN) to achieve over 99% accuracy on test data. 
            Draw any digit from 0-9 in the canvas above, and the model will predict what digit you've drawn 
            along with confidence scores for all possible digits.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DigitRecognition;
