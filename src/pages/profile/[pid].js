import { useRouter } from "next/router";

import { PrimaryButton } from "@/components/Buttons";
import { StyledProfile } from "@/components/StyledPages";
import UserAccountInfo from "@/components/UserAccountInfo";
import { userService } from "@/services/user.services";
import { app_routes } from "@/utils/constants/app_constants";

function Profile() {
  const user = userService.userValue;
  const router = useRouter();
  const routeTo = (route) => {
    router.push(route);
  };

  return (
    <StyledProfile>
      <UserAccountInfo
        src={user?.profileImageUrl}
        name={user?.name}
        userName={user?.username}
      />
      <PrimaryButton
        buttonText="Create a Website"
        onClick={() => {
          routeTo(app_routes.staticPage);
        }}
      />
    </StyledProfile>
  );
}

export default Profile;
