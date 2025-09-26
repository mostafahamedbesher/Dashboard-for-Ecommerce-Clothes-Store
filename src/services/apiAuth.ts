import { LoginType, SignUpUserType } from "../types/AuthTypes";
import supabase, { supabaseUrl } from "./supabase";

/////////
// User Login
export async function login({ email, password }: LoginType) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/////////
// Get Current User
export async function getCurrentUser() {
  // check if there is no user session
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // get current user
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

/////////
// User Logout
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

/////////
// User SignUp
export async function signUp({
  email,
  password,
  fullName,
  role,
}: SignUpUserType) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        role,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/////////
// Update User Data
export async function updateUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File;
}) {
  const updateData: {
    password?: string;
    data?: {
      fullName?: string;
      avatar?: File;
    };
  } = {};

  //update fullName or password
  if (password) {
    updateData.password = password;
  }

  if (fullName) {
    updateData.data = { fullName };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  console.log(avatar);

  if (!avatar) {
    return data;
  }

  ////update avatar
  // 1-upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: avatarStorageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (avatarStorageError) throw new Error(avatarStorageError.message);

  // 2-update user avatar
  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object//public/avatars/${fileName}`,
      },
    });

  if (avatarError) throw new Error(avatarError.message);

  return updatedUser;
}

/////////
// Verify User Password
export async function verifyOldPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return !error;
}
