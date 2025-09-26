import supabase from "./supabase";

export async function getAllUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    throw new Error(
      "Users couldnot be loaded!! Please Check your internet connection"
    );
  }

  return { data, error };
}
