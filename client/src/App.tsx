
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
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
          <Router>
            <Switch>
              <Route path="/">
                <Layout>
                  <Index />
                </Layout>
              </Route>
              <Route path="/formula-builder">
                <Layout>
                  <FormulaBuilderPage />
                </Layout>
              </Route>
              <Route path="/analytics">
                <Layout>
                  <AnalyticsPage />
                </Layout>
              </Route>
              <Route path="/activity">
                <Layout>
                  <ActivityPage />
                </Layout>
              </Route>
              <Route path="/sources">
                <Layout>
                  <SourcesPage />
                </Layout>
              </Route>
              <Route>
                <Layout>
                  <NotFound />
                </Layout>
              </Route>
            </Switch>
          </Router>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
