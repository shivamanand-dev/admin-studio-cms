/* eslint-disable react-hooks/exhaustive-deps */
import _debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StyledStaticPageData } from "@/components/StyledPages";
import NavbarData from "@/components/UploadData/NavbarData";
import { reduxStoreState, setPageData } from "@/redux/reduxStore";
import { staticPageServices } from "@/services/staticPage.services";

function StaticPageData() {
  const state = useSelector(reduxStoreState);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await staticPageServices.fetchPageData();

    dispatch(setPageData(data));
  };

  const debounceFn = useCallback(
    _debounce(staticPageServices.updateData, 2000),
    []
  );

  const updatePage = (data) => {
    debounceFn(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const router = useRouter();
  const routerPid = router.query.pid;
  return (
    <StyledStaticPageData>
      <div className="heading">
        <p>{routerPid?.charAt(0).toUpperCase() + routerPid?.slice(1)} Page</p>
      </div>
      <p>Navbar Data</p>
      <NavbarData
        pageData={state?.pageData?.data}
        debounceFn={debounceFn}
        updatePage={updatePage}
      />
    </StyledStaticPageData>
  );
}

export default StaticPageData;
