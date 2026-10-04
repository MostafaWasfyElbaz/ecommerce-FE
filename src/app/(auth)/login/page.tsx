"use client";

import { LoginValues } from "@/src/types/auth";
import { loginSchema } from "@/src/Schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import loginIllustration from "@/src/assets/images/login-illustration-desktop.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faShieldHalved,
  faLock,
  faUsers,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(data: LoginValues) {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (!res?.ok) {
        toast.error(res?.error || "Invalid email or password");
      } else {
        toast.success("Logged in successfully");
        reset();
        router.push("/");
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to log in");
    } finally {
      setIsLoading(false);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  return (
    <main className="bg-white">
      <section className="container mx-auto px-4 py-16" id="login-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={loginIllustration}
                alt="FreshCart"
                width={640}
                height={384}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <h1 className="mt-6 text-center text-3xl font-bold leading-tight text-[#21313c]">
              FreshCart - Your One-Stop Shop for Fresh
              <br />
              Products
            </h1>

            <p className="mx-auto mt-4 text-center text-lg text-[#52606d]">
              Join thousands of happy customers who trust FreshCart
              <br />
              for their daily grocery needs
            </p>

            <div className="mt-4 flex items-center justify-center gap-8 text-sm text-[#6b7280]">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faTruck}
                  className="h-3.5 w-3.5 text-[#0aad4b] mr-1"
                />
                Free Delivery
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="h-3.5 w-3.5 text-[#0aad4b] mr-1"
                />
                Secure Payment
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faClock}
                  className="h-3.5 w-3.5 text-[#0aad4b] mr-1"
                />
                24/7 Support
              </div>
            </div>
          </div>

          <div className="w-full rounded-2xl bg-white p-8 shadow-xl lg:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#21313c]">
                <span className="text-[#0aad4b]">Fresh</span>Cart
              </h2>

              <h3 className="mt-3 text-2xl font-bold text-[#21313c]">
                Welcome Back!
              </h3>

              <p className="mt-4 text-base text-[#52606d]">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            <div className="mb-6 space-y-3">
              <button
                type="button"
                className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 px-4 py-3 text-base text-[#374151] transition hover:border-[#bbf7d0] hover:bg-[#f0fdf4]"
              >
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="h-4 w-4 text-[#ea4335]"
                />
                Continue with Google
              </button>

              <button
                type="button"
                className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 px-4 py-3 text-base text-[#374151] transition hover:border-[#bbf7d0] hover:bg-[#f0fdf4]"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="h-4 w-4 text-[#1877f2]"
                />
                Continue with Facebook
              </button>
            </div>

            <div className="relative my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e5e7eb]" />
              <span className="whitespace-nowrap bg-white px-4 text-sm font-medium text-gray-500">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-[#e5e7eb]" />
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[11px] font-medium text-[#374151]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="h-4 w-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-12 text-base text-[#374151] outline-none transition placeholder:text-[#9ca3af] focus:border-[#0aad4b] focus:ring-2 focus:ring-[#dcfce7]"
                  />
                </div>
                {touchedFields.email && errors.email && (
                  <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                    <span className="max-w-47.5">{errors.email.message}</span>
                  </span>
                )}
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[11px] font-medium text-[#374151]"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-[10px] text-[#0aad4b] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="h-4 w-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-12 pr-12 text-base text-[#374151] outline-none transition placeholder:text-[#9ca3af] focus:border-[#0aad4b] focus:ring-2 focus:ring-[#dcfce7]"
                  />

                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-black transition"
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="h-4 w-4"
                    />
                  </button>
                </div>
                {touchedFields.password && errors.password && (
                  <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                    <span className="max-w-47.5">
                      {errors.password.message}
                    </span>
                  </span>
                )}
              </div>

              <label className="flex items-center gap-2 text-[10px] text-[#52606d]">
                <input
                  type="checkbox"
                  className="cursor-pointer h-3 w-3 rounded border-gray-300 accent-[#0aad4b]"
                  {...register("remember")}
                />
                Keep me signed in
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full rounded-xl bg-[#16a34a] px-4 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-[#15803d] disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="my-5 h-px bg-[#f0f0f0]" />

            <p className="text-center text-base text-[#52606d]">
              New to FreshCart?
              <Link
                href="/register"
                className="font-medium text-[#0aad4b] hover:underline"
              >
                Create an account
              </Link>
            </p>

            <div className="mt-5 flex justify-center gap-5 text-[9px] text-[#7b8490]">
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faLock} className="h-3 w-3 mr-1" />
                SSL Secured
              </span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faUsers} className="h-3 w-3 mr-1" />
                50K+ Users
              </span>
              <span className="flex items-center gap-1">
                <FontAwesomeIcon
                  icon={faStar}
                  className="h-3 w-3 mr-1 text-[#f59e0b]"
                />
                4.9 Rating
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
