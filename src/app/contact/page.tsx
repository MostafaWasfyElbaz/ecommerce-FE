"use client";

import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCircleQuestion,
  faEnvelope,
  faHeadset,
  faLocationDot,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { ContactFormData } from "@/src/types/Contact";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async () => {
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4]">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-lg text-[#16a34a]"
                />
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-gray-900">Phone</h3>

                <p className="mb-2 text-sm text-gray-500">
                  Mon-Fri from 8am to 6pm
                </p>

                <a
                  href="tel:+18001234567"
                  className="font-medium text-[#16a34a] hover:underline"
                >
                  +1 (800) 123-4567
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4]">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-lg text-[#16a34a]"
                />
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-gray-900">Email</h3>

                <p className="mb-2 text-sm text-gray-500">
                  We&apos;ll respond within 24 hours
                </p>

                <a
                  href="mailto:support@freshcart.com"
                  className="font-medium text-[#16a34a] hover:underline"
                >
                  support@freshcart.com
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4]">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-lg text-[#16a34a]"
                />
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-gray-900">Office</h3>

                <p className="text-sm text-gray-500">
                  123 Commerce Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4]">
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-lg text-[#16a34a]"
                />
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-gray-900">
                  Business Hours
                </h3>

                <p className="text-sm text-gray-500">
                  Monday - Friday: 8am - 6pm
                  <br />
                  Saturday: 9am - 4pm
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">Follow Us</h3>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-[#16a34a] hover:text-white"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-[#16a34a] hover:text-white"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-[#16a34a] hover:text-white"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-[#16a34a] hover:text-white"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fdf4]">
                <FontAwesomeIcon
                  icon={faHeadset}
                  className="text-lg text-[#16a34a]"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-black">
                  Send us a Message
                </h2>

                <p className="text-sm text-black">
                  Fill out the form and we&apos;ll get back to you
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-black"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name", {
                      required: "Full name is required",
                    })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-black transition-all focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 focus:outline-none"
                  />

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-black"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-black transition-all focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 focus:outline-none"
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  {...register("subject", {
                    required: "Please select a subject",
                  })}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-black transition-all focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 focus:outline-none"
                >
                  <option value="" className="text-black">
                    Select a subject
                  </option>
                  <option value="general" className="text-black">
                    General Inquiry
                  </option>
                  <option value="order" className="text-black">
                    Order Support
                  </option>
                  <option value="shipping" className="text-black">
                    Shipping Question
                  </option>
                  <option value="returns" className="text-black">
                    Returns & Refunds
                  </option>
                  <option value="product" className="text-black">
                    Product Information
                  </option>
                  <option value="feedback" className="text-black">
                    Feedback & Suggestions
                  </option>
                  <option value="other" className="text-black">
                    Other
                  </option>
                </select>

                {errors.subject && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={5}
                  placeholder="How can we help you?"
                  {...register("message", {
                    required: "Message is required",
                  })}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-black transition-all focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 focus:outline-none"
                />

                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-8 py-3.5 font-semibold text-white shadow-sm shadow-[#16a34a]/20 transition-colors hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-6 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  className="text-xl text-[#16a34a]"
                />
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-gray-900">
                  Looking for quick answers?
                </h3>

                <p className="mb-3 text-sm text-gray-600">
                  Check out our Help Center for frequently asked questions about
                  orders, shipping, returns, and more.
                </p>

                <Link
                  href="/help"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#16a34a] hover:underline"
                >
                  Visit Help Center →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
