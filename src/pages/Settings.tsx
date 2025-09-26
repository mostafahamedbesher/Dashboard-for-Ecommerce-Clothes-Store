import { SettingsDataProvider } from "../contexts/SettingsDataContext";
import OrdersSettings from "../features/settings/OrdersSettings";
import ProductSettings from "../features/settings/ProductSettings";
import SettingsCategoryBox from "../features/settings/SettingsCategoryBox";
import StoreSettings from "../features/settings/StoreSettings";
import Heading from "../ui/Heading";
import Tabs from "../ui/Tabs";

function Settings() {
  return (
    <div className="space-y-8">
      <Heading name="Settings" size="medium" />

      <SettingsDataProvider>
        <Tabs defaultTab="productSettings">
          <Tabs.TabsList>
            <Tabs.Tab
              id="productSettings"
              textColor="text-primary_2"
              activeBgcolor="bg-secondary"
              activeTextColor="text-primary_4"
            >
              Product Settings
            </Tabs.Tab>

            <Tabs.Tab id="storeSettings" textColor="text-primary_2">
              Store Settings
            </Tabs.Tab>

            <Tabs.Tab id="ordersSettings" textColor="text-primary_2">
              Orders Settings
            </Tabs.Tab>
          </Tabs.TabsList>

          <Tabs.TabContent id="productSettings">
            <SettingsCategoryBox>
              <ProductSettings />
            </SettingsCategoryBox>
          </Tabs.TabContent>

          <Tabs.TabContent id="storeSettings">
            <SettingsCategoryBox>
              <StoreSettings />
            </SettingsCategoryBox>
          </Tabs.TabContent>

          <Tabs.TabContent id="ordersSettings">
            <SettingsCategoryBox>
              <OrdersSettings />
            </SettingsCategoryBox>
          </Tabs.TabContent>
        </Tabs>
      </SettingsDataProvider>
    </div>
  );
}

export default Settings;
