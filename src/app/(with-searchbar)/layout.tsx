import Searchbar from "@/components/searchbar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Searchbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
