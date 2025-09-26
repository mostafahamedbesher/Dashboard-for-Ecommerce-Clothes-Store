/////////////
// GET
import { SettingsFormValues } from "../types/SettingsTypes";
import supabase from "./supabase";

export async function getAllSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    throw new Error(
      "Settings couldnot be loaded!! Please Check your internet connection"
    );
  }

  return { data, error };
}

/////////////
// UPDATE
export async function updateSettings(updatedSettings: SettingsFormValues) {
  const { data, error } = await supabase
    .from("settings")
    .update({
      ...updatedSettings,
    })
    .eq("id", 1) //id=1 because we have only one settings column
    .select();

  if (error || !data || data.length === 0) {
    throw new Error(
      "Settings couldnot be Updated!! Please Check your internet connection"
    );
  }

  return data;
}
