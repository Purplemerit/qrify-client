import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to settings page by default to match the screenshots
    navigate("/settings");
  }, [navigate]);

  return null;
};

export default Index;
