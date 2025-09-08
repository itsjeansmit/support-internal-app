import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [activeUrl, setActiveUrl] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "config.json")
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data.menuItems);
        if (data.menuItems.length > 0) {
          setActiveUrl(data.menuItems[0].url);
        }
      });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-14"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <button
            className="p-2 rounded hover:bg-gray-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </button>
          {sidebarOpen && <span className="font-bold">Menu</span>}
        </div>
        <nav className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveUrl(item.url)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${
                activeUrl === item.url ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              {sidebarOpen ? item.label : item.label.charAt(0)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-2">
        <div className="bg-white rounded-2xl shadow h-full w-full overflow-hidden">
          {activeUrl ? (
            <iframe
              src={activeUrl}
              title="Content Frame"
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select an option from the menu
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
