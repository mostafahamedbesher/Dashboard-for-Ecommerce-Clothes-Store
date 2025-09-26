import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Header from "../ui/Header";
import { MobileMenuProvider } from "../contexts/MobileMenuContext";
import MobileMenu from "../ui/MobileMenu";

function RootLayout() {
  return (
    <MobileMenuProvider>
      <div className="grid grid-cols-[310px_auto] max-xl:grid-cols-1">
        {/* desktop */}
        <div className="max-xl:hidden">
          <Sidebar />
        </div>
        {/* mobile */}
        <MobileMenu />

        <div>
          <Header />
          <main className="p-10 max-sm:p-6 h-[calc(100vh-64px)] overflow-scroll custom-scrollbar">
            <Outlet />
          </main>
        </div>
      </div>
    </MobileMenuProvider>
  );
}

export default RootLayout;
