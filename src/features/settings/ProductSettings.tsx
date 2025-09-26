import Heading from "../../ui/Heading";
import FormProductSettings from "./FormProductSettings";

function ProductSettings() {
  return (
    <div className="space-y-6">
      <Heading name="Product Settings" size="tiny" />

      <FormProductSettings />
    </div>
  );
}

export default ProductSettings;
