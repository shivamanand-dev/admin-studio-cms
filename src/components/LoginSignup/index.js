/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "src/services/user.services";

import { reduxStoreState, setShowAlert } from "@/redux/reduxStore";
import { createFileName } from "@/services/createFileName";
// import { encryptAll } from "@/services/RSAEncryption";
import uploadToFirebase from "@/services/uploadFirebase";
import { ip_data_API } from "@/utils/constants/app_config";
import { app_routes } from "@/utils/constants/app_constants";

// import { app_routes } from "@/utils/constants/app_constants";
import AlertMessage from "../AlertMessage";
import { PrimaryButton } from "../Buttons";
import InputField from "../InputField";
import StyledLoginSignup from "./StyledLoginSignup";

function LoginSignup({ activeForm = "login" }) {
  const router = useRouter();
  const state = useSelector(reduxStoreState);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImageUrl: "",
    username: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState({
    title: "Success",
    colorType: "success",
    message: "",
  });

  const [profilePicture, setProfilePicture] = useState();
  const [submitBtnIsDisabled, setSubmitBtnIsDisabled] = useState(false);
  const [submitBtnText, setSubmitBtnText] = useState(
    activeForm === "login" ? "Login" : "Sign Up"
  );

  const [uploadBtnText, setuploadBtnText] = useState("Upload");

  // handle on Change for login
  function handleOnchange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleOnchangeProfilePic(e) {
    setProfilePicture(e.target.files[0]);
  }

  // handle email type
  async function handleOnErrorEmail(e) {
    let emailValid = await e.toLowerCase().match(/\S+@\S+\.\S+/);
    // setEmailIdValid(emailValid !== null);

    return emailValid !== null;
  }

  function timeOut() {
    setTimeout(() => {
      dispatch(setShowAlert(false));
    }, 1500);
  }

  // On click Login
  async function onclickLogin() {
    setSubmitBtnIsDisabled(true);
    setSubmitBtnText("Loading...");

    const loginDetails = {
      username: formData.username,
      password: formData.password,
    };

    // const encryptedLoginDetails = encryptAll(loginDetails);
    const response = await userService.login(loginDetails);

    if (!response?.success) {
      dispatch(setShowAlert(true));
      setShowMessage({
        title: "Error",
        colorType: "error",
        message: response?.error,
      });

      timeOut();

      setSubmitBtnIsDisabled(false);
      setSubmitBtnText("Login");
    } else {
      dispatch(setShowAlert(true));
      setShowMessage({
        title: "Success",
        colorType: "success",
        message: "Logged In Successfully",
      });
      timeOut();
    }

    return router.push(
      `${app_routes.profile}/${response?.userDetails?.username}`
    );
  }

  // On click Sign up
  async function onclickSignUp() {
    setSubmitBtnIsDisabled(true);
    setSubmitBtnText("Loading...");
    const validEmail = handleOnErrorEmail(formData.email);
    if (!validEmail) {
      setSubmitBtnIsDisabled(false);
      dispatch(setShowAlert(true));
      setShowMessage({
        title: "Error",
        colorType: "error",
        message: "Incorrect Email",
      });
      timeOut();
      setSubmitBtnText("Sign up");
      return true;
    }
    // const toEncrypt = {
    //   email: formData.email,
    //   username: formData.username,
    //   password: formData.password,
    // };
    // const encryptedData = encryptAll(toEncrypt);
    // const encryptedFormData = { ...formData, ...encryptedData };
    const response = await userService.signup(formData);

    if (!response?.success) {
      dispatch(setShowAlert(true));
      setShowMessage({
        title: "Error",
        colorType: "error",
        message: response?.message,
      });
      timeOut();
      setSubmitBtnIsDisabled(false);
      setSubmitBtnText("Sign up");
      // eslint-disable-next-line sonarjs/no-redundant-jump
      return;
    } else {
      dispatch(setShowAlert(true));
      setShowMessage({
        title: "Success",
        colorType: "success",
        message: "Signed Up Successfully",
      });
      timeOut();
    }

    await userService.updateUserCountry(ip_data_API);
    return router.push(
      `${app_routes.profile}/${response?.userDetails?.username}`
    );
  }

  async function uploadProfilePic() {
    setuploadBtnText("uploading");
    setSubmitBtnIsDisabled(true);

    const fileName = await createFileName();
    const imageUploadRes = await uploadToFirebase(
      profilePicture,
      fileName,
      "images"
    );
    setuploadBtnText("Success");
    setFormData({ ...formData, profileImageUrl: imageUploadRes });
    setSubmitBtnIsDisabled(false);
  }

  return (
    <StyledLoginSignup>
      {state?.showAlert && (
        <AlertMessage
          title={showMessage.title}
          message={showMessage.message}
          severity={showMessage.colorType}
        />
      )}
      <div>
        <div>
          {activeForm === "signUp" && (
            <div>
              <InputField
                placeholder="Name"
                type="text"
                name="name"
                onChange={handleOnchange}
              />
              <InputField
                placeholder="Name"
                type="file"
                name="profilePic"
                onChange={handleOnchangeProfilePic}
              />
              <PrimaryButton
                buttonText={uploadBtnText}
                onClick={() => {
                  uploadProfilePic();
                }}
                disabled={!profilePicture || uploadBtnText !== "Upload"}
              />
              <InputField
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleOnchange}
              />
            </div>
          )}

          <InputField
            placeholder="Username"
            type="text"
            name="username"
            onChange={handleOnchange}
          />

          <InputField
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleOnchange}
          />
          <PrimaryButton
            buttonText={submitBtnText}
            onClick={activeForm === "login" ? onclickLogin : onclickSignUp}
            disabled={submitBtnIsDisabled}
          />

          <p
            onClick={() => {
              if (activeForm === "login") {
                router.push(app_routes.signup);
              } else {
                router.push(app_routes.login);
              }
            }}
            onKeyDown={() => {
              router.push(app_routes.signup);
            }}
            className="switchForm"
          >
            {activeForm === "login" ? "Sign Up" : "Login"}
          </p>

          {/* {showMessage.showing && (
            <p style={{ color: "red" }}>{showMessage.message}</p>
          )} */}
        </div>
      </div>
    </StyledLoginSignup>
  );
}

export default LoginSignup;
