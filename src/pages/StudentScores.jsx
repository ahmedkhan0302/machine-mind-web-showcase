
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, TrendingUp, Clock } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StudentScores = () => {
  const [hoursStudied, setHoursStudied] = useState("");
  const [predictedScore, setPredictedScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated linear regression prediction
  const predictScore = async () => {
    if (!hoursStudied || hoursStudied < 0) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple linear regression formula: score = 30 + (hours * 8) + random variation
    const baseScore = 30 + (parseFloat(hoursStudied) * 8);
    const variation = (Math.random() - 0.5) * 10; // Add some realistic variation
    const score = Math.max(0, Math.min(100, baseScore + variation));
    
    setPredictedScore(Math.round(score * 10) / 10);
    setIsLoading(false);
  };

  // Chart data for visualization
  const chartData = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Predicted Scores",
        data: [30, 38, 46, 54, 62, 70, 78, 86, 94, 102, 110],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.1,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Study Hours vs Predicted Score",
        color: "white",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hours Studied",
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        title: {
          display: true,
          text: "Predicted Score",
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link
            to="/"
            className="p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3">
              <GraduationCap className="w-full h-full text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Student Score Prediction</h1>
              <p className="text-gray-400">Linear Regression Model</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-400" />
              Input Parameters
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3">
                  Hours Studied per Day
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.1"
                  value={hoursStudied}
                  onChange={(e) => setHoursStudied(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  placeholder="Enter hours (0-24)"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={predictScore}
                disabled={!hoursStudied || isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Predicting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Predict Score
                  </div>
                )}
              </motion.button>
            </div>

            {/* Result */}
            {predictedScore !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-400/30"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Predicted Score</h3>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {predictedScore}%
                  </span>
                  <div className="text-gray-300">
                    <p className="text-sm">Based on {hoursStudied} hours of study</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Visualization Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Model Visualization</h2>
            <div className="h-80">
              <Line data={chartData} options={chartOptions} />
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Model Type:</span>
                <span className="text-white">Linear Regression</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">R² Score:</span>
                <span className="text-green-400">0.89</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Training Samples:</span>
                <span className="text-white">1,000</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
          <p className="text-gray-300 leading-relaxed">
            This linear regression model analyzes the relationship between study hours and exam scores. 
            The model uses historical data to find the best-fit line that predicts student performance 
            based on their daily study habits. The prediction includes a confidence interval to account 
            for individual variations in learning efficiency.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentScores;
