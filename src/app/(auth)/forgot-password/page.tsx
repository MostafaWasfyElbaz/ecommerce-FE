"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faKey,
  faLock,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import {
  forgotPasswordAction,
  verifyResetCodeAction,
  resetPasswordAction,
} from "@/src/api/Actions/auth.actions";
import {
  codeSchema,
  emailSchema,
  passwordSchema,
} from "@/src/Schema/ForgotPassword";
import {
  CodeFormValues,
  EmailFormValues,
  PasswordFormValues,
} from "@/src/types/ForgotPassword";
import { signIn } from "next-auth/react";

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [userEmail, setUserEmail] = useState("");

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: isSubmittingEmail },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
  });

  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: codeErrors, isSubmitting: isSubmittingCode },
  } = useForm<CodeFormValues>({
    resolver: zodResolver(codeSchema),
    mode: "onBlur",
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  });

  async function onSendCode(data: EmailFormValues) {
    try {
      await forgotPasswordAction(data.email);
      setUserEmail(data.email);
      setStep(2);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to send reset code";
      toast.error(message);
    }
  }

  async function onVerifyCode(data: CodeFormValues) {
    try {
      await verifyResetCodeAction(data.resetCode);
      setStep(3);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Invalid or expired reset code";
      toast.error(message);
    }
  }

  async function onResetPassword(data: PasswordFormValues) {
    try {
      await resetPasswordAction(userEmail, data.newPassword);

      const res = await signIn("credentials", {
        email: userEmail,
        password: data.newPassword,
        redirect: false,
      });

      if (!res?.ok) {
        toast.error(
          res?.error ||
            "Password reset succeeded, but automatic login failed. Please log in.",
        );
        router.push("/login");
        return;
      }

      toast.success("Password reset and logged in successfully");
      router.push("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to reset password";
      toast.error(message);
    }
  }

  async function handleResendCode() {
    if (!userEmail) return;
    try {
      await forgotPasswordAction(userEmail);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to resend code";
      toast.error(message);
    }
  }

  return (
    <div className="container py-16 mx-auto px-4" id="forgot-password-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="w-full h-96 bg-linear-to-br from-green-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-green-100/50" />
              <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50" />
              <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-100/50" />
              <div className="relative flex flex-col items-center gap-6 z-10">
                <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-green-600 text-4xl"
                    />
                  </div>
                </div>
                <div className="absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-green-500 text-xl"
                  />
                </div>
                <div className="absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="text-green-500 text-xl"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse [animation-delay:150ms]" />
                  <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Reset Your Password
              </h2>
              <p className="text-lg text-gray-600">
                Don&apos;t worry, it happens to the best of us. We&apos;ll help
                you get back into your account in no time.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-green-600 mr-2"
                  />
                  Email Verification
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="text-green-600 mr-2"
                  />
                  Secure Reset
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-green-600 mr-2"
                  />
                  Encrypted
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-green-600">
                  Fresh<span className="text-gray-800">Cart</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {step === 1 && "Forgot Password?"}
                {step === 2 && "Verify Reset Code"}
                {step === 3 && "Reset Password"}
              </h1>
              <p className="text-gray-600">
                {step === 1 && "No worries, we'll send you a reset code"}
                {step === 2 && "Enter the verification code sent to your email"}
                {step === 3 && "Create a strong new password for your account"}
              </p>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= 1
                      ? "bg-green-600 text-white ring-4 ring-green-100"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                </div>
                <div
                  className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                    step > 1 ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              </div>

              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= 2
                      ? "bg-green-600 text-white ring-4 ring-green-100"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <FontAwesomeIcon icon={faKey} className="text-xs" />
                </div>
                <div
                  className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                    step > 2 ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              </div>

              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step === 3
                      ? "bg-green-600 text-white ring-4 ring-green-100"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <FontAwesomeIcon icon={faLock} className="text-xs" />
                </div>
              </div>
            </div>

            {step === 1 && (
              <form
                className="space-y-6"
                onSubmit={handleSubmitEmail(onSendCode)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...registerEmail("email")}
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-black placeholder:text-[#9aa0a8]"
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                  {emailErrors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {emailErrors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingEmail}
                  className="cursor-pointer w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingEmail ? "Sending Code..." : "Send Reset Code"}
                </button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              </form>
            )}

            {step === 2 && (
              <form
                className="space-y-6"
                onSubmit={handleSubmitCode(onVerifyCode)}
              >
                <div>
                  <label
                    htmlFor="resetCode"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Reset Code
                  </label>
                  <div className="relative">
                    <input
                      id="resetCode"
                      type="text"
                      placeholder="Enter verification code"
                      {...registerCode("resetCode")}
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all font-mono tracking-widest text-lg text-black placeholder:text-[#9aa0a8]"
                    />
                    <FontAwesomeIcon
                      icon={faKey}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                  {codeErrors.resetCode && (
                    <p className="mt-1 text-xs text-red-500">
                      {codeErrors.resetCode.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingCode}
                  className="cursor-pointer w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingCode ? "Verifying..." : "Verify Code"}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="cursor-pointer text-gray-500 hover:text-gray-700 font-medium transition-colors"
                  >
                    ← Change Email
                  </button>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="cursor-pointer text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Resend Code
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form
                className="space-y-6"
                onSubmit={handleSubmitPassword(onResetPassword)}
              >
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      {...registerPassword("newPassword")}
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-black placeholder:text-[#9aa0a8]"
                    />
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {passwordErrors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      {...registerPassword("confirmPassword")}
                      className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-black placeholder:text-[#9aa0a8]"
                    />
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="cursor-pointer w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingPassword ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Remember your password?{" "}
                <Link
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                  href="/login"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
