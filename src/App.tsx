
import * as React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "@/components/Layout";
import AnalyticsPage from './pages/AnalyticsPage';
import MolecularLabPage from './pages/MolecularLabPage';
import QuantumSimulatorPage from './pages/QuantumSimulatorPage';
import NanoExplorerPage from './pages/NanoExplorerPage';
import BioReactorPage from './pages/BioReactorPage';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.Fragment>
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/molecular-lab" element={<MolecularLabPage />} />
                <Route path="/quantum-simulator" element={<QuantumSimulatorPage />} />
                <Route path="/nano-explorer" element={<NanoExplorerPage />} />
                <Route path="/bio-reactor" element={<BioReactorPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.Fragment>
);

export default App;
