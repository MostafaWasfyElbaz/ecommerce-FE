"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFloppyDisk,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ChangePassword, Profile } from "@/src/types/Settings";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  profileSchema,
} from "@/src/Schema/SettingsSchema";
import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  updateProfile,
} from "@/src/api/Actions/settings.actions";
import SettingsSkeleton from "@/src/app/_componnents/Profile/SettingsSkeleton";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    values: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
    },
    mode: "onBlur",
  });

  const {
    register: registerChangePassword,
    handleSubmit: handleSubmitChangePassword,
    formState: { errors: changePasswordErrors },
    reset: resetChangePassword,
  } = useForm<ChangePassword>({
    mode: "onBlur",
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate: changePasswordMutation, isPending: isChangingPassword } =
    useMutation({
      mutationFn: changePassword,
      onSuccess: () => {
        toast.success("Password changed successfully");
        resetChangePassword();
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to change password");
      },
    });

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: async (data) => {
      toast.success("Profile updated successfully");
      await update({
        name: data?.name,
        email: data?.email,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  if (status === "loading") {
    return <SettingsSkeleton />;
  }

  async function handleSaveProfile(data: Profile) {
    if (!data) return;
    const payload: { name?: string; email?: string; phone?: string } = {};
    if (data.name !== session?.user?.name) {
      payload.name = data.name;
    }
    if (data.email !== session?.user?.email) {
      payload.email = data.email;
    }

    if (data.phone && data.phone.trim() !== "") {
      payload.phone = data.phone.trim();
    }

    if (Object.keys(payload).length === 0) return;
    updateProfileMutation(payload);
  }

  function handleChangePassword(data: ChangePassword) {
    if (!data) return;
    changePasswordMutation(data);
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500 text-sm mt-1">
          Update your profile information and change your password
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#dcfce7] flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="text-2xl text-[#16a34a]"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-500">
                Update your personal details
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleSaveProfile)}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-black placeholder-[#9aa0a8]"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-black placeholder-[#9aa0a8]"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                placeholder="01xxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-black placeholder-[#9aa0a8]"
                type="tel"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-xl bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] transition-colors disabled:opacity-50 shadow-lg shadow-[#16a34a]/25"
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        <div className="p-6 sm:p-8 bg-gray-50">
          <h3 className="font-bold text-gray-900 mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-gray-700">
                {session?.user.id}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Role</span>
              <span className="px-3 py-1 rounded-lg bg-[#dcfce7] text-[#15803d] font-medium capitalize">
                {session?.user.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faLock}
                className="text-2xl text-amber-600"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-500">
                Update your account password
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmitChangePassword(handleChangePassword)}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  placeholder="Enter your current password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-black placeholder-[#9aa0a8]"
                  type={showCurrentPassword ? "text" : "password"}
                  {...registerChangePassword("currentPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={showCurrentPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {changePasswordErrors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {changePasswordErrors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-black placeholder-[#9aa0a8]"
                  type={showNewPassword ? "text" : "password"}
                  {...registerChangePassword("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {changePasswordErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {changePasswordErrors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all text-black placeholder-[#9aa0a8]"
                  type={showConfirmPassword ? "text" : "password"}
                  {...registerChangePassword("rePassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {changePasswordErrors.rePassword && (
                <p className="text-red-500 text-xs mt-1">
                  {changePasswordErrors.rePassword.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 shadow-lg shadow-amber-600/25"
              >
                <FontAwesomeIcon icon={faLock} />
                {isChangingPassword ? "Updating..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
