import React from "react";
import {
  Home as HomeIcon,
  TrendingUp as TrendingUpIcon,
  Library as LibraryIcon,
  Search as SearchIcon,
  Music as Music,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-96 bg-black text-white px-4 py-6 flex flex-col justify-between h-screen">
      <div>
        <div className="flex items-center justify-center mb-10">
          <Music className="mr-2 text-8xl text-red-500" strokeWidth={3.5} />
          <h1 className="text-4xl font-bold">
            <span className="text-red-500">Dream</span>
            <span className="text-white">Music</span>
          </h1>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-400 uppercase mb-4 ml-14">Menu</p>
          <div>
            {[
              { icon: HomeIcon, label: "Home" },
              { icon: TrendingUpIcon, label: "Trends" },
              { icon: LibraryIcon, label: "Library" },
              { icon: SearchIcon, label: "Discover" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center space-x-3 px-14 py-3 hover:bg-green-900/50 transition-colors cursor-pointer group"
              >
                <Icon
                  className="text-xl text-red-500 group-hover:opacity-80"
                  fill="currentColor"
                  strokeWidth={1.5}
                />
                <span className="text-lg ml-2 group-hover:text-gray-200">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-[40px]">
        <p className="text-sm text-gray-400 uppercase mb-4 ml-14">General</p>
        <div>
          {[
            { icon: SettingsIcon, label: "Settings" },
            { icon: LogOutIcon, label: "Log Out" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center space-x-3 px-14 py-3 hover:bg-green-900/50 transition-colors cursor-pointer group"
            >
              <Icon
                className="text-xl text-red-500 group-hover:opacity-80"
                fill="currentColor"
                strokeWidth={1.5}
              />
              <span className="text-lg ml-2 group-hover:text-gray-200">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
