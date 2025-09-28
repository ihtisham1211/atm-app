import { ReactNode, useEffect } from "react";
import Header from "./Header";
import { initStore } from "../../services/AccountStore";

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    (async () => {
      await initStore();
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-3/6 max-w-2/6 mx-auto h-full">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
