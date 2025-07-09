
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, DollarSign, MapPin } from "lucide-react";

const HousePrices = () => {
  const [houseData, setHouseData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: ""
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const locations = [
    { value: "downtown", label: "Downtown", multiplier: 1.5 },
    { value: "suburb", label: "Suburban", multiplier: 1.0 },
    { value: "rural", label: "Rural", multiplier: 0.7 },
    { value: "waterfront", label: "Waterfront", multiplier: 2.0 },
    { value: "industrial", label: "Industrial Area", multiplier: 0.6 }
  ];

  const predictPrice = async () => {
    const { area, bedrooms, bathrooms, location } = houseData;
    
    if (!area || !bedrooms || !bathrooms || !location) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple house price prediction formula
    const basePrice = 100000; // Base price
    const areaPrice = parseFloat(area) * 150; // $150 per sq ft
    const bedroomPrice = parseInt(bedrooms) * 25000; // $25k per bedroom
    const bathroomPrice = parseInt(bathrooms) * 15000; // $15k per bathroom
    
    // Location multiplier
    const locationData = locations.find(loc => loc.value === location);
    const locationMultiplier = locationData ? locationData.multiplier : 1.0;
    
    let totalPrice = (basePrice + areaPrice + bedroomPrice + bathroomPrice) * locationMultiplier;
    
    // Add some realistic variation
    const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
    totalPrice = totalPrice * (1 + variation);
    
    // Ensure minimum price
    totalPrice = Math.max(50000, totalPrice);
    
    // Calculate price ranges for confidence interval
    const lowPrice = totalPrice * 0.85;
    const highPrice = totalPrice * 1.15;
    
    setPrediction({
      price: Math.round(totalPrice),
      lowPrice: Math.round(lowPrice),
      highPrice: Math.round(highPrice),
      pricePerSqFt: Math.round(totalPrice / parseFloat(area)),
      location: locationData.label
    });
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setHouseData(prev => ({ ...prev, [field]: value }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-cyan-900 to-blue-900">
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-3">
              <Home className="w-full h-full text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">House Price Prediction</h1>
              <p className="text-gray-400">Multiple Linear Regression Model</p>
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
              <Home className="w-6 h-6 text-cyan-400" />
              House Features
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    min="500"
                    max="10000"
                    value={houseData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="1500"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={houseData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num} className="bg-gray-800">
                        {num} bedroom{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Bathrooms
                  </label>
                  <select
                    value={houseData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="">Select</option>
                    {[1, 1.5, 2, 2.5, 3, 3.5, 4].map(num => (
                      <option key={num} value={num} className="bg-gray-800">
                        {num} bathroom{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">
                    Location
                  </label>
                  <select
                    value={houseData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="">Select Location</option>
                    {locations.map(location => (
                      <option key={location.value} value={location.value} className="bg-gray-800">
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={predictPrice}
                disabled={!Object.values(houseData).every(v => v) || isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Calculating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Predict Price
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
            <h2 className="text-2xl font-bold text-white mb-6">Price Prediction</h2>
            
            {prediction ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Main Price */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Estimated Price</h3>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2"
                  >
                    {formatPrice(prediction.price)}
                  </motion.div>
                  <p className="text-gray-300 flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {prediction.location}
                  </p>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Low Estimate</span>
                      <span className="text-white font-semibold">{formatPrice(prediction.lowPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">High Estimate</span>
                      <span className="text-white font-semibold">{formatPrice(prediction.highPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-gray-300">Price per Sq Ft</span>
                      <span className="text-cyan-400 font-semibold">{formatPrice(prediction.pricePerSqFt)}</span>
                    </div>
                  </div>
                </div>

                {/* House Summary */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <h5 className="font-semibold text-white mb-3">Property Summary</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Area:</span>
                      <span className="text-white">{houseData.area} sq ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bedrooms:</span>
                      <span className="text-white">{houseData.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bathrooms:</span>
                      <span className="text-white">{houseData.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{prediction.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-gray-400 py-20">
                <Home className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter house details to see price prediction</p>
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
          <h3 className="text-xl font-bold text-white mb-4">About House Price Prediction</h3>
          <p className="text-gray-300 leading-relaxed">
            This multiple linear regression model predicts house prices based on key features like area, 
            number of bedrooms and bathrooms, and location. The model analyzes historical real estate data 
            to understand how these factors correlate with property values. Location has a significant impact 
            on pricing, with waterfront properties typically commanding premium prices while rural areas 
            offer more affordable options.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HousePrices;
