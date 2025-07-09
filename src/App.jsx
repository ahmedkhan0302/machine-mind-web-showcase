
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentScores from "./pages/StudentScores";
import IrisClassification from "./pages/IrisClassification";
import DigitRecognition from "./pages/DigitRecognition";
import SpamDetection from "./pages/SpamDetection";
import HousePrices from "./pages/HousePrices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student-scores" element={<StudentScores />} />
          <Route path="/iris-classification" element={<IrisClassification />} />
          <Route path="/digit-recognition" element={<DigitRecognition />} />
          <Route path="/spam-detection" element={<SpamDetection />} />
          <Route path="/house-prices" element={<HousePrices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
