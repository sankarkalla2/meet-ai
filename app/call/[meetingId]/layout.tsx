import React from "react";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <div className="bg-black h-screen text-white">{children}</div>;
};

export default Layout;
