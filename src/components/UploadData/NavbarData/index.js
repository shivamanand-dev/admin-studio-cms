// import { useState } from "react";

import { PrimaryButton } from "@/components/Buttons";

import { StyledNavbarData } from "./StyledNavbarData";

function NavbarItem() {
  return (
    <>
      <p className="navbar-menu-item" href="#">
        <input type="text" value="Services" /> <button>-</button>
      </p>
    </>
  );
}

function NavbarData({ pageData }) {
  // const navbarData = pageData?.navbar;
  // console.log(navbarData);

  return (
    <StyledNavbarData>
      <nav className="navbar">
        <p className="navbar-brand" href="#">
          Logo: <input type="file" /> <button>-</button>
        </p>
        <div className="navbar-menu">
          {pageData && <NavbarItem />}
          <div className="navbar-menu-plus">
            <PrimaryButton buttonText="Add Item" />
          </div>
        </div>
      </nav>
    </StyledNavbarData>
  );
}

export default NavbarData;
