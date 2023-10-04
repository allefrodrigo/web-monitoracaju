import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Logout() {
  useEffect(() => {
    handleSignOut(); // Automatically trigger sign-out when the component mounts
  }, []);

  const handleSignOut = async () => {
    const authToken = localStorage.getItem("authToken");
    
    try {
      await axios.post(
        `${backendUrl}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "x-access-token": authToken,
          },
        }
      );
      localStorage.removeItem("authToken"); // Clear the token from local storage
      console.log("Logout bem-sucedido!")
      // You can add any additional logic after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error here, e.g., show an error message
    }
  };

  return <Navigate to="/authentication/sign-in" />; // Redirect after successful logout
}

export default Logout;
