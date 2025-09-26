import Heading from "../../ui/Heading";
import FormStoreSettings from "./FormStoreSettings";

function StoreSettings() {
  return (
    <div className="space-y-6">
      <Heading name="Store Settings" size="tiny" />

      <FormStoreSettings />
    </div>
  );
}

export default StoreSettings;
