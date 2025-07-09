
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  GraduationCap, 
  Flower2, 
  PenTool, 
  Mail, 
  Home,
  Brain,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      id: 1,
      title: "Home",
      path: "/",
      icon: Home,
      gradient: "from-blue-500 to-purple-600",
      color: "text-blue-400"
    },
    {
      id: 2,
      title: "Student Scores", 
      path: "/student-scores",
      icon: GraduationCap,
      gradient: "from-blue-500 to-purple-600",
      color: "text-blue-400"
    },
    {
      id: 3,
      title: "Iris Classification",
      path: "/iris-classification", 
      icon: Flower2,
      gradient: "from-pink-500 to-rose-600",
      color: "text-pink-400"
    },
    {
      id: 4,
      title: "Digit Recognition",
      path: "/digit-recognition",
      icon: PenTool,
      gradient: "from-green-500 to-emerald-600", 
      color: "text-green-400"
    },
    {
      id: 5,
      title: "Spam Detection",
      path: "/spam-detection",
      icon: Mail,
      gradient: "from-orange-500 to-red-600",
      color: "text-orange-400"
    },
    {
      id: 6,
      title: "House Prices",
      path: "/house-prices",
      icon: Brain,
      gradient: "from-cyan-500 to-blue-600",
      color: "text-cyan-400"
    }
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring", 
        stiffness: 300,
        damping: 30
      }
    }
  };

  const backdropVariants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    closed: {
      x: -20,
      opacity: 0
    },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    })
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        <Menu className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed left-0 top-0 h-full w-80 bg-gradient-to-br from-gray-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-xl border-r border-white/20 z-50 overflow-hidden"
            >
              {/* Glassmorphic overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              
              {/* Header */}
              <div className="relative p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                      <Brain className="w-full h-full text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Machine Mind</h2>
                      <p className="text-sm text-gray-400">ML Dashboard</p>
                    </div>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Navigation */}
              <div className="relative p-6">
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4"
                >
                  Navigation
                </motion.h3>
                
                <div className="space-y-2">
                  {menuItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <motion.div
                        key={item.id}
                        custom={index}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="block"
                        >
                          <motion.div
                            whileHover={{ 
                              scale: 1.02,
                              x: 5,
                              transition: { type: "spring", stiffness: 400, damping: 25 }
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                              relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group
                              ${isActive 
                                ? 'bg-gradient-to-r from-white/20 to-white/10 border border-white/30' 
                                : 'hover:bg-white/10 border border-transparent hover:border-white/20'
                              }
                            `}
                          >
                            {/* Active indicator */}
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}

                            {/* Icon */}
                            <div className={`
                              w-10 h-10 rounded-lg p-2 transition-all duration-300
                              ${isActive 
                                ? `bg-gradient-to-br ${item.gradient}` 
                                : 'bg-white/10 group-hover:bg-white/20'
                              }
                            `}>
                              <IconComponent className={`
                                w-full h-full transition-colors duration-300
                                ${isActive ? 'text-white' : item.color}
                              `} />
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                              <h4 className={`
                                font-semibold transition-colors duration-300
                                ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                              `}>
                                {item.title}
                              </h4>
                            </div>

                            {/* Arrow */}
                            <motion.div
                              initial={{ x: -10, opacity: 0 }}
                              whileHover={{ x: 0, opacity: 1 }}
                              className="text-gray-400"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </motion.div>

                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <p className="text-sm text-gray-400">
                    Built with React & ML
                  </p>
                  <div className="flex justify-center gap-1 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
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

              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full"
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -100, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      delay: i * 1.5
                    }}
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${30 + i * 15}%`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppSidebar;
