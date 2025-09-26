import FormUpdateUserData from "../features/authentication/FormUpdateUserData";
import FormUpdateUserPassword from "../features/authentication/FormUpdateUserPassword";
import Heading from "../ui/Heading";

function Account() {
  return (
    <div>
      <Heading name="Account" size="medium" />

      <div className="space-y-14">
        <div className="space-y-2">
          <p className="text-primary_2 text-xl font-medium">Update User Data</p>
          <FormUpdateUserData />
        </div>

        <div className="space-y-2">
          <p className="text-primary_2 text-xl font-medium">Update Password</p>
          <FormUpdateUserPassword />
        </div>
      </div>
    </div>
  );
}

export default Account;
