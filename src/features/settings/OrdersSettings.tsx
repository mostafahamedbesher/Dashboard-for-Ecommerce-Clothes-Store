import Heading from "../../ui/Heading";
import FormOrdersSettings from "./FormOrdersSettings";

function OrdersSettings() {
  return (
    <div className="space-y-6">
      <Heading name="Orders Settings" size="tiny" />

      <FormOrdersSettings />
    </div>
  );
}

export default OrdersSettings;
