import React from "react";
import LoginDropdown from "./loginDropdown";

export default function NavbarItems() {
  return (
    <div className="flex w-fit space-x-10">
      <div>About</div>
      <LoginDropdown />
      <div>Version</div>
    </div>
  );
}
