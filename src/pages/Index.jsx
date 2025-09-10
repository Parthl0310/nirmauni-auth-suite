import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Popup } from "@/components/ui/popup";

const Index = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navbar />
      
      <div className="flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">Wardiere</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your gateway to seamless authentication and user management. 
            Join our community with secure and elegant authentication.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/signup">
              <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium px-8 py-3 rounded-full shadow-soft">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-full">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Demo buttons for popup component */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setShowSuccessPopup(true)}
              variant="secondary"
              className="px-6 py-2"
            >
              Show Success Popup
            </Button>
            <Button 
              onClick={() => setShowErrorPopup(true)}
              variant="secondary"
              className="px-6 py-2"
            >
              Show Error Popup
            </Button>
          </div>
        </div>
      </div>

      {/* Popup components */}
      {showSuccessPopup && (
        <Popup 
          type="success" 
          message="Your action was completed successfully!" 
          onClose={() => setShowSuccessPopup(false)}
          visible={showSuccessPopup}
        />
      )}
      
      {showErrorPopup && (
        <Popup 
          type="error" 
          message="Something went wrong! Please try again." 
          onClose={() => setShowErrorPopup(false)}
          visible={showErrorPopup}
        />
      )}
    </div>
  );
};

export default Index;