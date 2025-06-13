import React, { useState, useEffect, useCallback } from "react";
import { LogOut, UserIcon } from "lucide-react";

import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Footer from "./components/Footers/Footer";
import HomeFooter from "./components/Footers/HomeFooter";
import UserPage from "./components/User/UserPage";
import Calendar from "./components/Calendars/Calendar";
import SimpleTables from "./components/Tables/SimpleTables";
import DataTable from "./components/Tables/DataTable";
import Components from "./components/Cards/Components";
import Buttons from "./components/Buttons/Buttons";
import Contact from "./components/Contact/Contact";
import Chat from "./components/Chat/Chat";

function App() {
  // 1. Central Theme State: This is the single source of truth for the theme.
  const [theme, setTheme] = useState("dark");

  // Sidebar expansion states and handlers (these will be passed to Sidebar)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [currentPage, setCurrentPage] = useState("dashboard"); // 'login', 'signup', 'dashboard'

  useEffect(() => {
    const handleResize = () => {
      const currentIsLargeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(currentIsLargeScreen);
      if (currentIsLargeScreen) {
        setIsSidebarExpanded(true);
      } else {
        setIsSidebarExpanded(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarExpanded((prev) => !prev);
  }, []);

  // 2. Theme Toggle Handler: This function updates the central theme state.
  // This function is passed down to Sidebar as a prop.
  const handleThemeToggle = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }, []);

  const toggleSubmenu = useCallback((itemText) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [itemText]: !prevState[itemText],
    }));
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setCurrentPage("dashboard");
  }, []);

  const handleNavigateToSignup = useCallback((e) => {
    e.preventDefault();
    setCurrentPage("signup");
  }, []);

  const handleNavigateToLogin = useCallback((e) => {
    e.preventDefault();
    setCurrentPage("login");
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentPage("login");
    // Optionally clear any session data here, e.g., localStorage.removeItem('userToken');
  }, []);

  // New navigation handler for Profile Page
  const handleNavigateToProfile = useCallback((e) => {
    e.preventDefault(); // Prevent default link behavior
    setCurrentPage("profile");
  }, []);

  const handleNavigateToDashboard = useCallback((e) => {
    e.preventDefault();
    setCurrentPage('dashboard');
  }, []);

  const handleNavigateToCalendar = useCallback((e) => {
    e.preventDefault();
    setCurrentPage('calendar');
  }, []);

  const handleNavigateToDataTables = useCallback((e) => { // Added 'e' parameter
    e.preventDefault(); // Prevent default anchor behavior
    setCurrentPage('data-tables');
  }, []);

  // Placeholder for updating profile (e.g., sending to backend)
  const handleUpdateProfile = useCallback((profileData) => {
    console.log("Profile updated:", profileData);
    // Here you would typically send profileData to your backend
  }, []);

  const handleNavigateToProductTable = useCallback((e) => { // Added 'e' parameter
    e.preventDefault(); // Prevent default anchor behavior
    setCurrentPage('product-table');
  }, []);

  const handleNavigateToComponents = useCallback((e) => {
    e.preventDefault();
    setCurrentPage('components');
  }, []);

  const handleNavigateToButtons = useCallback((e) => {
    e.preventDefault();
    setCurrentPage('buttons');
  }, []);

  const handleNavigateToContact = useCallback((e) => {
    e.preventDefault();
    setCurrentPage('contact');
  }, []);

  // Dynamic classes for the overall App background based on the central theme state
  const appThemeClasses = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";

  return (
    <div className={`flex h-screen font-sans ${appThemeClasses}`}>
      {currentPage === "login" && (
        <SignIn theme={theme} onThemeChange={handleThemeToggle} onLoginSuccess={handleLoginSuccess} onNavigateToSignup={handleNavigateToSignup} />
      )}
      {currentPage === "signup" && <SignUp theme={theme} onThemeChange={handleThemeToggle} onNavigateToLogin={handleNavigateToLogin} />}
      {currentPage === 'profile' && (
        <>
          {/* Header Component for Profile Page */}
          <Header theme={theme} onThemeChange={handleThemeToggle} />

          {/* <Sidebar
            theme={theme}
            isSidebarExpanded={isSidebarExpanded}
            onToggleSidebar={toggleSidebar}
            isLargeScreen={isLargeScreen}
            openSubmenus={openSubmenus}
            onToggleSubmenu={toggleSubmenu}
            onNavigateToDashboard={handleNavigateToDashboard} // Pass dashboard navigation
            onThemeChange={handleThemeToggle} // Pass theme toggle to sidebar
            hideThemeToggle={true} // Hide theme toggle in sidebar for profile page
            onNavigateToCalendar={handleNavigateToCalendar}
            onNavigateToProductTable={handleNavigateToProductTable}
          /> */}
          
          <main className={`flex-1 p-8 pt-20 overflow-y-auto transition-all duration-300 ease-in-out flex flex-col items-center`}>
            {/* The ProfilePage component itself now takes w-full, allowing the grid inside to control layout */}
            <UserPage theme={theme} onUpdateProfile={handleUpdateProfile} />
            <div className="flex-grow"></div> {/* Push footer to bottom */}
            <HomeFooter theme={theme} />
          </main>
          <Chat theme={theme} />
        </>
      )}
      {currentPage === "dashboard" && (
        <>
          <Sidebar
            theme={theme}
            onThemeChange={handleThemeToggle}
            isSidebarExpanded={isSidebarExpanded}
            onToggleSidebar={toggleSidebar}
            isLargeScreen={isLargeScreen}
            openSubmenus={openSubmenus}
            onToggleSubmenu={toggleSubmenu}
            onNavigateToDashboard={handleNavigateToDashboard}
            onNavigateToCalendar={handleNavigateToCalendar}
            onNavigateToDataTables={handleNavigateToDataTables}
            onNavigateToProductTable={handleNavigateToProductTable}
            onNavigateToComponents={handleNavigateToComponents}
            onNavigateToButtons={handleNavigateToButtons}
            onNavigateToContact={handleNavigateToContact}
          />
          <main className={`flex-1 p-8 pt-20 overflow-y-auto transition-all duration-300 ease-in-out flex flex-col`}>
            {/* Dashboard Title, Profile Button and Logout Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6"> {/* Added flex-col for small screens, flex-row for sm+, justify-between for spacing */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold whitespace-nowrap mb-4 sm:mb-0"> {/* Responsive font sizes, margin adjusted */}
                    Welcome to Your Dashboard
                </h1>
                <div className="flex space-x-4"> {/* Kept buttons grouped */}
                    <button
                        onClick={handleNavigateToProfile}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors duration-200
                            ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50' : 'bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-500/50'}`}
                    >
                        <UserIcon size={20} />
                        <span>Profile</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors duration-200
                            ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/50' : 'bg-red-700 hover:bg-red-800 text-white shadow-lg shadow-red-500/50'}`}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
            <p className="text-lg mb-4">Below is your customizable dashboard. You can **drag and drop** the cards to reorder them.</p>
            <Dashboard theme={theme} />

            <div className="flex-grow"></div>
            <Footer theme={theme} />
          </main>
          <Chat theme={theme} />
        </>
      )}
      {currentPage === 'calendar' && (
        <>
          <Sidebar
            theme={theme}
            isSidebarExpanded={isSidebarExpanded}
            onToggleSidebar={toggleSidebar}
            isLargeScreen={isLargeScreen}
            openSubmenus={openSubmenus}
            onToggleSubmenu={toggleSubmenu}
            onNavigateToDashboard={handleNavigateToDashboard}
            onNavigateToCalendar={handleNavigateToCalendar} // Pass to sidebar
            onThemeChange={handleThemeToggle}
            hideThemeToggle={false} // Show theme toggle in sidebar for calendar page
            onNavigateToDataTables={handleNavigateToDataTables}
            onNavigateToProductTable={handleNavigateToProductTable}
            onNavigateToComponents={handleNavigateToComponents}
            onNavigateToButtons={handleNavigateToButtons}
            onNavigateToContact={handleNavigateToContact}
          />
          <main className={`flex-1 p-8 pt-20 overflow-y-auto transition-all duration-300 ease-in-out flex flex-col`}>
            <Calendar theme={theme} />
            <div className="flex-grow"></div>
            <Footer theme={theme} />
          </main>
          <Chat theme={theme} />
        </>
      )}
      {currentPage === 'data-tables' && (
        <>
          <Sidebar
            theme={theme}
            isSidebarExpanded={isSidebarExpanded}
            onToggleSidebar={toggleSidebar}
            isLargeScreen={isLargeScreen}
            openSubmenus={openSubmenus}
            onToggleSubmenu={toggleSubmenu}
            onNavigateToDashboard={handleNavigateToDashboard}
            onNavigateToCalendar={handleNavigateToCalendar}
            onNavigateToDataTables={handleNavigateToDataTables} // Pass new handler
            onThemeChange={handleThemeToggle}
            onNavigateToProductTable={handleNavigateToProductTable}
            hideThemeToggle={false}
            onNavigateToComponents={handleNavigateToComponents}
            onNavigateToButtons={handleNavigateToButtons}
            onNavigateToContact={handleNavigateToContact}
          />
          <main className={`flex-1 p-8 mt-[64px] overflow-y-auto transition-all duration-300 ease-in-out flex flex-col min-h-[calc(100vh-64px)]`}>
            <SimpleTables theme={theme} />
            <div className="flex-grow"></div>
            <Footer theme={theme} />
          </main>
          <Chat theme={theme} />
        </>
      )}
      {currentPage === 'product-table' && (
        <>
          <Sidebar
            theme={theme}
            isSidebarExpanded={isSidebarExpanded}
            onToggleSidebar={toggleSidebar}
            isLargeScreen={isLargeScreen}
            openSubmenus={openSubmenus}
            onToggleSubmenu={toggleSubmenu}
            onNavigateToDashboard={handleNavigateToDashboard}
            onNavigateToCalendar={handleNavigateToCalendar}
            onNavigateToDataTables={handleNavigateToDataTables} // Pass new handler
            onThemeChange={handleThemeToggle}
            onNavigateToProductTable={handleNavigateToProductTable}
            hideThemeToggle={false}
            onNavigateToComponents={handleNavigateToComponents}
            onNavigateToButtons={handleNavigateToButtons}
            onNavigateToContact={handleNavigateToContact}
          />
          <main className={`flex-1 p-8 mt-[64px] overflow-y-auto transition-all duration-300 ease-in-out flex flex-col min-h-[calc(100vh-64px)]`}>
            <DataTable theme={theme} />
            <div className="flex-grow"></div>
            <Footer theme={theme} />
          </main>
          <Chat theme={theme} />
        </>
      )}
      {currentPage === 'components' && (
        <>
          <Header theme={theme} onThemeChange={handleThemeToggle} />
          <Sidebar
            theme={theme}
            isSidebarExpanded={isSidebarExpanded}
            onToggleSidebar={toggleSidebar}
            isLargeScreen={isLargeScreen}
            openSubmenus={openSubmenus}
            onToggleSubmenu={toggleSubmenu}
            onNavigateToDashboard={handleNavigateToDashboard}
            onNavigateToCalendar={handleNavigateToCalendar} // Pass to sidebar
            onThemeChange={handleThemeToggle}
            hideThemeToggle={false} // Show theme toggle in sidebar for calendar page
            onNavigateToDataTables={handleNavigateToDataTables}
            onNavigateToProductTable={handleNavigateToProductTable}
            onNavigateToComponents={handleNavigateToComponents}
            onNavigateToButtons={handleNavigateToButtons}
            onNavigateToContact={handleNavigateToContact}
          />
          <main className={`flex-1 p-8 mt-[64px] overflow-y-auto transition-all duration-300 ease-in-out flex flex-col min-h-[calc(100vh-64px)]`}>
            <Components theme={theme} />
            <div className="flex-grow"></div>
            <HomeFooter theme={theme} />
          </main>
          <Chat theme={theme} />
        </>
      )}
      {currentPage === 'buttons' && (
        <>
          <Sidebar
            theme={theme}
            isSidebarExpanded={isSidebarExpanded}
            onToggleSidebar={toggleSidebar}
            isLargeScreen={isLargeScreen}
            openSubmenus={openSubmenus}
            onToggleSubmenu={toggleSubmenu}
            onNavigateToDashboard={handleNavigateToDashboard}
            onNavigateToCalendar={handleNavigateToCalendar} // Pass to sidebar
            onThemeChange={handleThemeToggle}
            hideThemeToggle={false} // Show theme toggle in sidebar for calendar page
            onNavigateToDataTables={handleNavigateToDataTables}
            onNavigateToProductTable={handleNavigateToProductTable}
            onNavigateToComponents={handleNavigateToComponents}
            onNavigateToButtons={handleNavigateToButtons}
            onNavigateToContact={handleNavigateToContact}
          />
          <main className={`flex-1 p-8 mt-[64px] overflow-y-auto transition-all duration-300 ease-in-out flex flex-col min-h-[calc(100vh-64px)]`}>
            <Buttons theme={theme} />
            <div className="flex-grow"></div>
            <Footer theme={theme} />
          </main>
          <Chat theme={theme} />
        </>
      )}
      {currentPage === 'contact' && (
        <>
          <Sidebar
            theme={theme}
            isSidebarExpanded={isSidebarExpanded}
            onToggleSidebar={toggleSidebar}
            isLargeScreen={isLargeScreen}
            openSubmenus={openSubmenus}
            onToggleSubmenu={toggleSubmenu}
            onNavigateToDashboard={handleNavigateToDashboard}
            onNavigateToCalendar={handleNavigateToCalendar} // Pass to sidebar
            onThemeChange={handleThemeToggle}
            hideThemeToggle={false} // Show theme toggle in sidebar for calendar page
            onNavigateToDataTables={handleNavigateToDataTables}
            onNavigateToProductTable={handleNavigateToProductTable}
            onNavigateToComponents={handleNavigateToComponents}
            onNavigateToButtons={handleNavigateToButtons}
            onNavigateToContact={handleNavigateToContact}
          />
          <main className={`flex-1 p-8 mt-[64px] overflow-y-auto transition-all duration-300 ease-in-out flex flex-col min-h-[calc(100vh-64px)]`}>
            <Contact theme={theme} />
            <div className="flex-grow"></div>
            <HomeFooter theme={theme} />
          </main>
          <Chat theme={theme} />
        </>
      )}
    </div>
  );
}

export default App;
