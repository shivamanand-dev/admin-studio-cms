/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import { PrimaryButton } from "@/components/Buttons";
import InputField from "@/components/InputField";
import { createFileName } from "@/services/createFileName";
import uploadToFirebase from "@/services/uploadFirebase";

import { StyledNavbarData } from "./StyledNavbarData";

function NavbarItem({ data, onChangeNavbarmenu, index }) {
  return (
    <>
      <div className="navbar-menu-item" href="#">
        {/* <input type="text" value={data} onChange={onChangeNavbarmenu} /> */}
        <InputField
          type="text"
          value={data}
          onChange={(event) => {
            onChangeNavbarmenu(event, index);
          }}
          customStyle={{
            width: "75px",
            margin: "0 5px",
            display: "inline-block",
          }}
        />
        <button>-</button>
      </div>
    </>
  );
}

function NavbarData({ pageData }) {
  const [navbarData, setNavbarData] = useState(pageData?.navbar);
  const [newLogoFile, setNewLogoFile] = useState();
  const [newProfilePic, setNewProfilePic] = useState();

  const onChangeLogo = (e) => {
    const file = e.target.files[0];

    setNewLogoFile(file);

    const reader = new FileReader();
    // const url = reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      setNewProfilePic(reader.result);
    });

    reader.readAsDataURL(file);
    // const updatedLogo = file.
  };

  const onClickUploadProfilePic = async () => {
    const fileName = await createFileName();
    const imageUploadRes = await uploadToFirebase(
      newLogoFile,
      fileName,
      "logo"
    );

    setNavbarData({ ...navbarData, logo: imageUploadRes });
  };

  const onChangeNavbarmenu = (event, index) => {
    let navOptions = [...navbarData.navOptions];
    // navOptions = navOptions.slice(index + 1);
    // navOptions.splice(index, 0, event.target.value);

    navOptions[index] = event.target.value;

    setNavbarData({
      ...navbarData,
      navOptions: navOptions,
    });
  };

  useEffect(() => {
    setNavbarData(pageData?.navbar);
  }, [pageData]);

  return (
    <StyledNavbarData>
      <nav className="navbar">
        <p className="navbar-brand" href="#">
          <label htmlFor="logoInput">
            {!newProfilePic ? (
              <img
                src={navbarData?.logo}
                height={50}
                style={{ cursor: "pointer" }}
                alt=""
              />
            ) : (
              <img
                src={newProfilePic}
                height={50}
                style={{ cursor: "pointer" }}
                alt=""
              />
            )}
          </label>
          <input id="logoInput" type="file" onChange={onChangeLogo} />
        </p>
        <div className="navbar-menu">
          {navbarData?.navOptions.map((e, i) => {
            return (
              <NavbarItem
                key={e}
                index={i}
                data={e}
                onChangeNavbarmenu={onChangeNavbarmenu}
              />
            );
          })}
          <div className="navbar-menu-plus">
            <PrimaryButton buttonText="Add Item" />
          </div>
        </div>
      </nav>

      <PrimaryButton
        buttonText="Upload Profile Pic"
        customStyle={{ marginTop: "1rem" }}
        onClick={onClickUploadProfilePic}
        disabled={!newLogoFile}
      />
    </StyledNavbarData>
  );
}

export default NavbarData;
