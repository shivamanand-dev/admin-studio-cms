import { useRouter } from "next/router";
import React from "react";

import { StyledStaticPageData } from "@/components/StyledPages";

function StaticPageData() {
  const router = useRouter();
  const routerPid = router.query.pid;
  return <StyledStaticPageData>{routerPid}</StyledStaticPageData>;
}

export default StaticPageData;
