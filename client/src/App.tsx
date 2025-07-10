
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import FormulaBuilderPage from "./pages/FormulaBuilderPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ActivityPage from "./pages/ActivityPage";
import SourcesPage from "./pages/SourcesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { theme } = useTheme();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={theme}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <Layout>
                  <Index />
                </Layout>
              } />
              <Route path="/formula-builder" element={
                <Layout>
                  <FormulaBuilderPage />
                </Layout>
              } />
              <Route path="/analytics" element={
                <Layout>
                  <AnalyticsPage />
                </Layout>
              } />
              <Route path="/activity" element={
                <Layout>
                  <ActivityPage />
                </Layout>
              } />
              <Route path="/sources" element={
                <Layout>
                  <SourcesPage />
                </Layout>
              } />
              <Route path="*" element={
                <Layout>
                  <NotFound />
                </Layout>
              } />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
