import { StyledProfile } from "@/components/StyledPages";
import UserAccountInfo from "@/components/UserAccountInfo";
import { userService } from "@/services/user.services";

function Profile() {
  const user = userService.userValue;
  return (
    <StyledProfile>
      <UserAccountInfo
        src={user?.profileImageUrl}
        name={user?.name}
        userName={user?.username}
        follower={user?.followers?.length}
        following={user?.following?.length}
      />
    </StyledProfile>
  );
}

export default Profile;
