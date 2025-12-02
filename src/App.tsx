import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <h1 className="text-4xl font-bold text-center py-8">DenBayar</h1>
          <p className="text-center text-muted-foreground">
            Premium Financial Services & Fund Management
          </p>
        </div>
        <Toaster />
        <Sonner />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
