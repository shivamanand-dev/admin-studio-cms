import { useRouter } from "next/router";
import React from "react";

import { StyledStaticPageData } from "@/components/StyledPages";
import NavbarData from "@/components/UploadData/NavbarData";

function StaticPageData() {
  const router = useRouter();
  const routerPid = router.query.pid;
  return (
    <StyledStaticPageData>
      <div className="heading">
        <p>{routerPid?.charAt(0).toUpperCase() + routerPid?.slice(1)} Page</p>
      </div>
      <p>Navbar Data</p>
      <NavbarData />
    </StyledStaticPageData>
  );
}

export default StaticPageData;
