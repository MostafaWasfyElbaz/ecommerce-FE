"use client";

import { RegisterValues } from "@/src/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTruck,
  faShieldHalved,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerSchema } from "@/src/Schema/RegisterSchema";
import { register as registerUserAction } from "@/src/api/Actions/auth.actions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(data: RegisterValues) {
    setIsLoading(true);
    try {
      await registerUserAction(data);
      toast.success("Account created successfully!");

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res?.ok) {
        toast.success("Account created. Please log in.");
        router.push("/login");
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create account",
      );
    } finally {
      setIsLoading(false);
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto w-full max-w-376 px-5 py-7 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_604px] lg:items-start lg:gap-10">
          <section className=" lg:pt-6">
            <h1 className="max-w-65 text-[26px] font-bold leading-[0.9] tracking-tight text-[#21313c] sm:max-w-none sm:text-4xl sm:leading-none">
              Welcome to{" "}
              <span className="block text-[#16a34a] sm:inline">FreshCart</span>
            </h1>
            <p className="mt-2 max-w-75 text-xs leading-4 text-[#5f6b7a] sm:max-w-xl sm:text-base sm:leading-5">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>

            <div className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                  <FontAwesomeIcon icon={faStar} className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-sm font-medium text-[#21313c]">
                    Premium Quality
                  </h2>
                  <p className="max-w-67.5 text-xs leading-4 text-[#5f6b7a]">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                  <FontAwesomeIcon icon={faTruck} className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-sm font-medium text-[#21313c]">
                    Fast Delivery
                  </h2>
                  <p className="max-w-67.5 text-xs leading-4 text-[#5f6b7a]">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                  <FontAwesomeIcon icon={faShieldHalved} className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-sm font-medium text-[#21313c]">
                    Secure Shopping
                  </h2>
                  <p className="max-w-67.5 text-xs leading-4 text-[#5f6b7a]">
                    Your data and payments are completely secure
                  </p>
                </div>
              </div>
            </div>

            <aside className="mt-6 rounded-lg border border-[#e5e7eb] p-4 shadow-sm sm:mt-7 sm:p-5">
              <div className="flex items-center gap-3">
                <div
                  className="relative flex h-11 w-11 shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#bbf7d0]"
                  aria-hidden="true"
                >
                  <span className="absolute bottom-1 h-5 w-7 rounded-t-full bg-[#f97316]" />
                  <span className="absolute bottom-4 h-5 w-4 rounded-full bg-[#f4c7a1]" />
                  <span className="absolute bottom-7 h-3.5 w-5 rounded-t-full bg-[#1f2937]" />
                  <span className="relative mb-1.5 h-1 w-1 rounded-full bg-[#1f2937] shadow-[3px_0_0_#1f2937]" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-4 text-[#21313c]">
                    Sarah Johnson
                  </p>
                  <div
                    className="flex gap-0.5 text-[#fbbf24]"
                    aria-label="5 star rating"
                  >
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="h-3.5 w-3.5 text-[#fbbf24]"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs italic leading-4 text-[#5f6b7a] sm:mt-3 sm:text-sm sm:leading-5">
                FreshCart has transformed my shopping experience. The quality of
                the products is outstanding, and the delivery is always on time.
                Highly recommend!
              </p>
            </aside>
          </section>

          <section className="w-full justify-self-end rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#21313c] sm:text-2xl">
                Create Your Account
              </h2>
              <p className="mt-0.5 text-xs text-[#5f6b7a] sm:mt-1 sm:text-sm">
                Start your fresh journey with us today
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
              <button
                type="button"
                className="cursor-pointer flex h-8 items-center justify-center gap-2 rounded-md border border-[#dfe3e8] text-xs font-medium text-[#21313c] sm:h-10 sm:text-sm"
              >
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="h-4 w-4 text-[#ea4335]"
                />
                Google
              </button>
              <button
                type="button"
                className="cursor-pointer flex h-8 items-center justify-center gap-2 rounded-md border border-[#dfe3e8] text-xs font-medium text-[#21313c] sm:h-10 sm:text-sm"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="h-4 w-4 text-[#1877f2]"
                />
                Facebook
              </button>
            </div>
            <div className="my-4 flex items-center gap-3 sm:my-5">
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              <span className="text-xs text-[#7c8795] sm:text-sm">or</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-[#21313c]"
              >
                Name*
                <input
                  className="mt-1 h-10 w-full rounded-md border border-[#dfe3e8] px-3 text-xs text-[#21313c] outline-none placeholder:text-[#a0a8b5] focus:border-[#16a34a] focus:ring-2 focus:ring-[#dcfce7]"
                  type="text"
                  placeholder="Ali"
                  {...register("name")}
                />
                {touchedFields.name && errors.name && (
                  <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                    <span className="max-w-47.5">{errors.name.message}</span>
                  </span>
                )}
              </label>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#21313c]"
              >
                Email*
                <input
                  className="mt-1 h-10 w-full rounded-md border border-[#dfe3e8] px-3 text-xs text-[#21313c] outline-none placeholder:text-[#a0a8b5] focus:border-[#16a34a] focus:ring-2 focus:ring-[#dcfce7]"
                  type="email"
                  placeholder="example@example.com"
                  {...register("email")}
                />
                {touchedFields.email && errors.email && (
                  <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                    <span className="max-w-47.5">{errors.email.message}</span>
                  </span>
                )}
              </label>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[#21313c]"
              >
                Password*
                <input
                  className="mt-1 h-10 w-full rounded-md border border-[#dfe3e8] px-3 text-xs text-[#21313c] outline-none placeholder:text-[#a0a8b5] focus:border-[#16a34a] focus:ring-2 focus:ring-[#dcfce7]"
                  type="password"
                  placeholder="create a strong password"
                  {...register("password")}
                />
              </label>

              {touchedFields.password && errors.password && (
                <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                  <span className="max-w-47.5">{errors.password.message}</span>
                </span>
              )}

              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-[#21313c]"
              >
                Confirm Password*
                <input
                  className="mt-1 h-10 w-full rounded-md border border-[#dfe3e8] px-3 text-xs text-[#21313c] outline-none placeholder:text-[#a0a8b5] focus:border-[#16a34a] focus:ring-2 focus:ring-[#dcfce7]"
                  type="password"
                  placeholder="confirm your password"
                  {...register("rePassword")}
                />
                {touchedFields.rePassword && errors.rePassword && (
                  <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                    <span className="max-w-47.5">
                      {errors.rePassword.message}
                    </span>
                  </span>
                )}
              </label>
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-[#21313c]"
              >
                Phone Number*
                <input
                  className="mt-1 h-10 w-full rounded-md border border-[#dfe3e8] px-3 text-xs text-[#21313c] outline-none placeholder:text-[#a0a8b5] focus:border-[#16a34a] focus:ring-2 focus:ring-[#dcfce7]"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  {...register("phone")}
                />
                {touchedFields.phone && errors.phone && (
                  <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                    <span className="max-w-47.5">{errors.phone.message}</span>
                  </span>
                )}
              </label>
              <label className="flex items-start gap-2 text-xs leading-4 text-[#5f6b7a]">
                <input
                  type="checkbox"
                  className="cursor-pointer mt-0.5 h-3 w-3 rounded border-[#cbd5e1] accent-[#16a34a]"
                  {...register("terms")}
                />
                <span>
                  I agree to the
                  <Link href="/terms" className="font-medium text-[#16a34a]">
                    Terms of Service
                  </Link>
                  and
                  <Link href="/privacy" className="font-medium text-[#16a34a]">
                    Privacy Policy
                  </Link>
                  *
                </span>
              </label>
              {touchedFields.terms && errors.terms && (
                <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                  <span className="max-w-47.5">{errors.terms.message}</span>
                </span>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-[#16a34a] text-xs font-medium text-white transition hover:bg-[#15803d] disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faUserPlus} className="h-3.5 w-3.5" />
                {isLoading ? "Creating Account..." : "Create My Account"}
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-[#5f6b7a]">
              Already have an account?
              <Link href="/login" className="font-medium text-[#16a34a]">
                Sign In
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
