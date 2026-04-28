import { useState, useEffect } from "react";
import Navbar     from "./components/Navbar";
import Sidebar    from "./components/Sidebar";
import Home       from "./pages/Home";
import Auth       from "./pages/Auth";
import Dashboard  from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Patients   from "./pages/Patients";
import Pricing    from "./pages/Pricing";
import Contact    from "./pages/Contact";

export default function App() {
  const [page,       setPage]       = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isDash = ["dashboard","appointments","patients"].includes(page);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top:0, behavior:"instant" }); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "landing":      return <Home         setPage={setPage}/>;
      case "login":        return <Auth mode="login"   setPage={setPage} setIsLoggedIn={setIsLoggedIn}/>;
      case "signup":       return <Auth mode="signup"  setPage={setPage} setIsLoggedIn={setIsLoggedIn}/>;
      case "dashboard":    return <Dashboard    setPage={setPage}/>;
      case "appointments": return <Appointments/>;
      case "patients":     return <Patients/>;
      case "pricing":      return <Pricing      setPage={setPage}/>;
      case "contact":      return <Contact      setPage={setPage}/>;
      default:             return <Home         setPage={setPage}/>;
    }
  };

  return (
    <div style={{ minHeight:"100vh" }}>
      {isDash && (
        <Sidebar page={page} setPage={setPage} setIsLoggedIn={setIsLoggedIn}/>
      )}
      <Navbar
        page={page}
        setPage={setPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      {/* Page transition wrapper */}
      <div key={page} className="afi">
        {renderPage()}
      </div>
    </div>
  );
}
