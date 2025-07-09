
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Flower2, 
  PenTool, 
  Mail, 
  Home,
  Brain,
  Sparkles,
  ArrowRight,
  Zap
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
      color: "text-blue-400",
      stats: "95% Accuracy"
    },
    {
      id: 2,
      title: "Iris Flower Classification",
      description: "Classify iris flower species based on petal and sepal measurements",
      icon: Flower2,
      path: "/iris-classification",
      gradient: "from-pink-500 to-rose-600",
      color: "text-pink-400",
      stats: "99% Precision"
    },
    {
      id: 3,
      title: "Handwritten Digit Recognition",
      description: "Draw a digit and watch AI recognize it using neural networks",
      icon: PenTool,
      path: "/digit-recognition",
      gradient: "from-green-500 to-emerald-600",
      color: "text-green-400",
      stats: "98% Recognition"
    },
    {
      id: 4,
      title: "Email Spam Detection",
      description: "Classify emails as spam or ham using natural language processing",
      icon: Mail,
      path: "/spam-detection",
      gradient: "from-orange-500 to-red-600",
      color: "text-orange-400",
      stats: "97% Detection"
    },
    {
      id: 5,
      title: "House Price Prediction",
      description: "Estimate house prices based on features like area, bedrooms, and location",
      icon: Home,
      path: "/house-prices",
      gradient: "from-cyan-500 to-blue-600",
      color: "text-cyan-400",
      stats: "92% Accuracy"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Glassmorphic header background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 backdrop-blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="mb-8"
          >
            {/* Animated logo with glassmorphic effect */}
            <motion.div 
              animate={floatingAnimation}
              className="inline-flex items-center justify-center gap-4 mb-6 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Brain className="w-16 h-16 text-blue-400" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"
                />
              </motion.div>
              
              <div className="text-left">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Machine Mind
                </h1>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="flex items-center gap-2 mt-2"
                >
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300 font-medium">AI-Powered Predictions</span>
                </motion.div>
              </div>
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-12 h-12 text-purple-400" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-2xl text-gray-300 leading-relaxed mb-8">
              Explore the power of machine learning through interactive demonstrations. 
              From predicting student scores to recognizing handwritten digits, 
              discover how AI can solve real-world problems.
            </p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center gap-8 mb-12"
            >
              {[
                { label: "ML Models", value: "5+" },
                { label: "Accuracy", value: "96%" },
                { label: "Predictions", value: "∞" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-sm" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ML Tasks Grid */}
      <section className="relative max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Explore AI Capabilities
          </h2>
          <p className="text-xl text-gray-400">
            Choose a model to see machine learning in action
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mlTasks.map((task, index) => {
            const IconComponent = task.icon;
            return (
              <motion.div key={task.id} variants={itemVariants}>
                <Link to={task.path}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      y: -10,
                      rotateY: 5,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer overflow-hidden h-full"
                  >
                    {/* Animated background gradient */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${task.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      whileHover={{ scale: 1.1 }}
                    />
                    
                    {/* Glassmorphic shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon with floating animation */}
                      <motion.div
                        animate={floatingAnimation}
                        className="mb-6"
                      >
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${task.gradient} p-5 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                          <IconComponent className="w-full h-full text-white" />
                        </div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 1 }}
                          className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-xs font-medium text-gray-300"
                        >
                          {task.stats}
                        </motion.div>
                      </motion.div>

                      {/* Text content */}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                          {task.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors mb-4">
                          {task.description}
                        </p>

                        {/* Call to action */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 text-blue-400 font-medium"
                        >
                          <span>Try it now</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/40 rounded-full"
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                          style={{
                            left: '50%',
                            top: '50%'
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-gray-400 mb-4">
              Built with React, Framer Motion, and Machine Learning
            </p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
