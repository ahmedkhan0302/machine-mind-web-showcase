
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Flower2, 
  PenTool, 
  Mail, 
  Home,
  Brain,
  Sparkles
} from "lucide-react";

const Index = () => {
  const mlTasks = [
    {
      id: 1,
      title: "Student Score Prediction",
      description: "Predict student exam scores based on study hours using linear regression",
      icon: GraduationCap,
      path: "/student-scores",
      gradient: "from-blue-500 to-purple-600",
      color: "text-blue-400"
    },
    {
      id: 2,
      title: "Iris Flower Classification",
      description: "Classify iris flower species based on petal and sepal measurements",
      icon: Flower2,
      path: "/iris-classification",
      gradient: "from-pink-500 to-rose-600",
      color: "text-pink-400"
    },
    {
      id: 3,
      title: "Handwritten Digit Recognition",
      description: "Draw a digit and watch AI recognize it using neural networks",
      icon: PenTool,
      path: "/digit-recognition",
      gradient: "from-green-500 to-emerald-600",
      color: "text-green-400"
    },
    {
      id: 4,
      title: "Email Spam Detection",
      description: "Classify emails as spam or ham using natural language processing",
      icon: Mail,
      path: "/spam-detection",
      gradient: "from-orange-500 to-red-600",
      color: "text-orange-400"
    },
    {
      id: 5,
      title: "House Price Prediction",
      description: "Estimate house prices based on features like area, bedrooms, and location",
      icon: Home,
      path: "/house-prices",
      gradient: "from-cyan-500 to-blue-600",
      color: "text-cyan-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Brain className="w-12 h-12 text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Machine Mind
            </h1>
            <Sparkles className="w-8 h-8 text-purple-400" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Explore the power of machine learning through interactive demonstrations. 
            From predicting student scores to recognizing handwritten digits, 
            discover how AI can solve real-world problems.
          </motion.p>
        </div>
      </header>

      {/* ML Tasks Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mlTasks.map((task) => {
            const IconComponent = task.icon;
            return (
              <motion.div key={task.id} variants={itemVariants}>
                <Link to={task.path}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${task.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${task.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {task.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="absolute top-6 right-6 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-400">
            Built with React, Framer Motion, and Machine Learning
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
