import React from "react";
import {
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Home,
  Settings,
  Users,
  BarChart,
  ShoppingCart,
  Briefcase,
  FileText,
  Bell,
  Mail,
  Calendar,
  Table,
  Columns,
  LayoutGrid,
  MousePointer2
} from "lucide-react";

function Sidebar({
  theme, // THEME PROP: Used for direct styling of sidebar elements
  onThemeChange, // THEME FUNCTION PROP: Called when the theme button is clicked
  isSidebarExpanded,
  onToggleSidebar,
  isLargeScreen,
  openSubmenus,
  onToggleSubmenu,
  onNavigateToDashboard,
  onNavigateToCalendar,
  onNavigateToDataTables,
  onNavigateToProductTable,
  onNavigateToComponents,
  onNavigateToButtons
}) {
  // Dynamic Tailwind CSS Classes (based on the 'theme' prop)
  const sidebarThemeClasses = theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900";

  const linkHoverClasses = theme === "dark" ? "hover:bg-gray-700 group-hover:text-white" : "hover:bg-gray-300 group-hover:text-gray-900";

  const iconColorClasses = theme === "dark" ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-gray-900";

  const submenuLinkClasses = theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-300";

  const sidebarWidthClass = isLargeScreen ? "w-64" : isSidebarExpanded ? "w-64" : "w-16";
  const textVisibilityClass = isLargeScreen || isSidebarExpanded ? "block" : "hidden";

  // Define sidebar menu items (can be moved out of component if static)
  const sidebarMenuItems = [
    { icon: Home, text: "Dashboard", onClick: onNavigateToDashboard },
    {
      icon: Users,
      text: "Users",
      subItems: [
        { text: "All Users", link: "#" },
        { text: "Add New User", link: "#" },
        { text: "User Groups", link: "#" },
      ],
    },
    { icon: Settings, text: "Settings" },
    {
      icon: Briefcase,
      text: "Projects",
      subItems: [
        { text: "All Projects", link: "#" },
        { text: "My Projects", link: "#" },
        { text: "New Project", link: "#" },
      ],
    },
    { icon: BarChart, text: "Analytics" },
    { icon: ShoppingCart, text: "Products" },
    {
      icon: FileText,
      text: "Reports",
      subItems: [
        { text: "Sales Report", link: "#" },
        { text: "Activity Log", link: "#" },
        { text: "Custom Reports", link: "#" },
      ],
    },
    { icon: Bell, text: "Notifications" },
    { icon: Mail, text: "Messages" },
    { icon: Calendar, text: "Calendar", onClick: onNavigateToCalendar },
    { icon: Table, text: 'Data Tables', onClick: onNavigateToDataTables },
    { icon: Columns, text: 'Products Table', onClick: onNavigateToProductTable },
    { icon: LayoutGrid, text: 'Components', onClick: onNavigateToComponents },
    { icon: MousePointer2, text: 'Buttons', onClick: onNavigateToButtons },
  ];

  return (
    <div
      className={`flex flex-col h-full transition-all duration-300 ease-in-out
        ${sidebarWidthClass} p-4 rounded-r-lg shadow-lg flex-shrink-0 ${sidebarThemeClasses}`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          {isLargeScreen || isSidebarExpanded ? (
            <h2 className={`text-2xl font-bold ${textVisibilityClass} whitespace-nowrap overflow-hidden`}>My App</h2>
          ) : null}

          {/* Theme Toggle Button:
              - Calls the `onThemeChange` prop, which updates the central theme state in App.jsx.
              - The icon dynamically changes based on the `theme` prop. */}
          {(isLargeScreen || isSidebarExpanded) && (
            <button
              onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
              className={`p-1 rounded-md focus:outline-none transition-colors duration-200
                ${theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          )}
        </div>

        {/* Sidebar Collapse/Expand Button */}
        {!isLargeScreen && (
          <button
            onClick={onToggleSidebar} // Calls the `onToggleSidebar` prop from App.jsx
            className={`p-2 rounded-md focus:outline-none ${
              theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
            }`}
            aria-label="Toggle sidebar"
          >
            {isSidebarExpanded ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul>
          {sidebarMenuItems.map((item, index) => (
            <li key={index} className="mb-2">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => onToggleSubmenu(item.text)} // Calls the `onToggleSubmenu` prop from App.jsx
                    className={`flex items-center justify-between w-full space-x-3 p-2 rounded-lg transition-colors duration-200 group focus:outline-none
                      ${linkHoverClasses}`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={20} className={`${iconColorClasses} min-w-[20px]`} />
                      <span className={`text-lg font-medium whitespace-nowrap ${textVisibilityClass} overflow-hidden`}>{item.text}</span>
                    </div>
                    <div className={`${textVisibilityClass}`}>
                      {openSubmenus[item.text] ? (
                        <ChevronUp size={16} className={`${iconColorClasses}`} />
                      ) : (
                        <ChevronDown size={16} className={`${iconColorClasses}`} />
                      )}
                    </div>
                  </button>
                  {openSubmenus[item.text] && (
                    <ul className={`ml-4 mt-2 border-l-2 ${theme === "dark" ? "border-gray-600" : "border-gray-400"} pl-3`}>
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="mb-1">
                          <a
                            href={subItem.link}
                            className={`flex items-center p-2 rounded-lg transition-colors duration-200 group text-sm
                              ${submenuLinkClasses} ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
                          >
                            <span className={`whitespace-nowrap ${textVisibilityClass} overflow-hidden`}>{subItem.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  href={`#${item.text.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={item.onClick}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 group
                    ${linkHoverClasses}`}
                >
                  <item.icon size={20} className={`${iconColorClasses} min-w-[20px]`} />
                  <span className={`text-lg font-medium whitespace-nowrap ${textVisibilityClass} overflow-hidden`}>{item.text}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
