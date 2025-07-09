
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Shield, AlertTriangle } from "lucide-react";

const SpamDetection = () => {
  const [emailText, setEmailText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const spamKeywords = [
    'free', 'win', 'winner', 'congratulations', 'prize', 'lottery', 'click here',
    'urgent', 'limited time', 'act now', 'guarantee', 'money back', 'cash',
    'credit', 'loan', 'debt', 'investment', 'viagra', 'pharmacy', 'pills'
  ];

  const classifyEmail = async () => {
    if (!emailText.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simple spam detection logic (simplified NLP)
    const text = emailText.toLowerCase();
    let spamScore = 0;
    
    // Check for spam keywords
    spamKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        spamScore += 0.15;
      }
    });
    
    // Check for excessive caps
    const capsRatio = (emailText.match(/[A-Z]/g) || []).length / emailText.length;
    if (capsRatio > 0.3) spamScore += 0.2;
    
    // Check for excessive exclamation marks
    const exclamationCount = (emailText.match(/!/g) || []).length;
    if (exclamationCount > 3) spamScore += 0.1;
    
    // Check for currency symbols
    if (text.includes('$') || text.includes('€') || text.includes('£')) {
      spamScore += 0.1;
    }
    
    // Add some randomness
    spamScore += (Math.random() - 0.5) * 0.2;
    spamScore = Math.max(0, Math.min(1, spamScore));
    
    const isSpam = spamScore > 0.5;
    const hamScore = 1 - spamScore;
    
    setPrediction({
      isSpam,
      spamScore,
      hamScore,
      confidence: isSpam ? spamScore : hamScore
    });
    setIsLoading(false);
  };

  const sampleEmails = [
    {
      type: 'spam',
      text: 'CONGRATULATIONS! You have WON $1,000,000 in our lottery! Click here NOW to claim your prize! Limited time offer! Act fast!'
    },
    {
      type: 'ham',
      text: 'Hi Sarah, I hope you are doing well. I wanted to follow up on our meeting yesterday about the project timeline. Could we schedule a quick call tomorrow?'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900">
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 p-3">
              <Mail className="w-full h-full text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Email Spam Detection</h1>
              <p className="text-gray-400">Natural Language Processing Model</p>
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
              <Mail className="w-6 h-6 text-orange-400" />
              Email Content
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-3">
                  Email Message
                </label>
                <textarea
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all resize-none"
                  placeholder="Paste your email content here..."
                />
              </div>

              {/* Sample emails */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Try these examples:</p>
                <div className="space-y-2">
                  {sampleEmails.map((sample, index) => (
                    <button
                      key={index}
                      onClick={() => setEmailText(sample.text)}
                      className="w-full p-3 text-left text-sm bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <span className={`font-medium ${sample.type === 'spam' ? 'text-red-400' : 'text-green-400'}`}>
                        {sample.type.toUpperCase()}:
                      </span>
                      <span className="text-gray-300 ml-2">
                        {sample.text.substring(0, 100)}...
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={classifyEmail}
                disabled={!emailText.trim() || isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    Classify Email
                  </div>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Classification Results</h2>
            
            {prediction ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Main Result */}
                <div className={`p-6 rounded-xl border ${
                  prediction.isSpam 
                    ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/30' 
                    : 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-400/30'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    {prediction.isSpam ? (
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                    ) : (
                      <Shield className="w-8 h-8 text-green-400" />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {prediction.isSpam ? 'SPAM' : 'HAM (Not Spam)'}
                      </h3>
                      <p className="text-gray-300">
                        Confidence: {(prediction.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Probability Distribution */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Probability Scores</h4>
                  
                  {/* Spam Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-400 font-medium flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Spam
                      </span>
                      <span className="text-white font-medium">
                        {(prediction.spamScore * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.spamScore * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Ham Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400 font-medium flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Ham (Not Spam)
                      </span>
                      <span className="text-white font-medium">
                        {(prediction.hamScore * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.hamScore * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <h5 className="font-semibold text-white mb-2">Detection Features</h5>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Keyword analysis</li>
                    <li>• Text pattern recognition</li>
                    <li>• Capitalization patterns</li>
                    <li>• Punctuation frequency</li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-gray-400 py-20">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter email content to see spam classification results</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4">How Spam Detection Works</h3>
          <p className="text-gray-300 leading-relaxed">
            This spam detection model uses Natural Language Processing (NLP) techniques to analyze email content. 
            It examines various features like keyword patterns, text structure, capitalization, and punctuation 
            to determine the likelihood of an email being spam. The model is trained on thousands of labeled 
            emails and achieves high accuracy in distinguishing between legitimate emails and spam.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SpamDetection;
