import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { StyledStaticPageData } from "@/components/StyledPages";
import NavbarData from "@/components/UploadData/NavbarData";
import { staticPageServices } from "@/services/staticPage.services";

function StaticPageData() {
  const [pageData, setPageData] = useState();

  const fetchPageData = async () => {
    const data = await staticPageServices.fetchPageData();

    setPageData(data?.data);
  };

  useEffect(() => {
    fetchPageData();
  }, []);
  const router = useRouter();
  const routerPid = router.query.pid;
  return (
    <StyledStaticPageData>
      <div className="heading">
        <p>{routerPid?.charAt(0).toUpperCase() + routerPid?.slice(1)} Page</p>
      </div>
      <p>Navbar Data</p>
      <NavbarData pageData={pageData} />
    </StyledStaticPageData>
  );
}

export default StaticPageData;
