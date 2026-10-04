"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  faArrowLeft,
  faBagShopping,
  faBox,
  faCheck,
  faCircleInfo,
  faCity,
  faCreditCard,
  faEnvelope,
  faHouse,
  faLocationDot,
  faMoneyBill,
  faPhone,
  faPlus,
  faReceipt,
  faShieldHalved,
  faTruck,
  faWallet,
  faTriangleExclamation,
  faBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetCart } from "@/src/api/Actions/cart.actions";
import { addAddress, getAddresses } from "@/src/api/Actions/address.actions";
import {
  createCashOrder,
  createOnlineOrder,
} from "@/src/api/Actions/orders.actions";
import { Address } from "@/src/types/Address";
import { CartResponse } from "@/src/types/Cart";
import { useEffect, useState } from "react";
import { Checkout } from "@/src/types/Checkout";
import { checkoutSchema } from "@/src/Schema/CheckoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutSkeleton from "./CheckoutSkeleton";

export default function CheckoutComp() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string>();

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  const { data: cartData, isLoading: isCartLoading } =
    useQuery<CartResponse | null>({
      queryKey: ["GetCart"],
      queryFn: GetCart,
    });

  const { data: savedAddresses, isLoading: isAddressesLoading } = useQuery<
    Address[]
  >({
    queryKey: ["GetAddresses"],
    queryFn: getAddresses,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Checkout>({
    mode: "onBlur",
    resolver: zodResolver(checkoutSchema),
  });

  const { mutate: cashOrderMutate } = useMutation({
    mutationFn: ({
      cartId,
      shippingAddress,
    }: {
      cartId: string;
      shippingAddress: Checkout;
    }) => createCashOrder(cartId, shippingAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GetCart"] });
      queryClient.invalidateQueries({ queryKey: ["GetOrders"] });
      toast.success("Order created successfully");
      router.push("/orders");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  function handleSelectAddress(address: Address) {
    setSelectedAddress(address._id);
    setUseNewAddress(false);
    setValue("name", address.name, { shouldValidate: true });
    setValue("city", address.city, { shouldValidate: true });
    setValue("postalCode", address?.postalCode || "", { shouldValidate: true });
    setValue("details", address.details, { shouldValidate: true });
    setValue("phone", address.phone, { shouldValidate: true });
  }

  function handleUseNewAddress() {
    setSelectedAddress(undefined);
    setUseNewAddress(true);
    setValue("name", "");
    setValue("city", "");
    setValue("postalCode", "");
    setValue("details", "");
    setValue("phone", "");
  }

  async function handleCheckout(data: Checkout) {
    console.log(cartData);
    if (
      !cartData?.cartId ||
      !cartData?.data?.products.length ||
      !data.name ||
      !data.phone ||
      !data.city ||
      !data.details ||
      !paymentMethod ||
      !data.postalCode
    )
      return;
    if (useNewAddress) {
      await addAddress(data);
    }
    if (paymentMethod === "cash") {
      cashOrderMutate({
        cartId: cartData.cartId,
        shippingAddress: {
          name: data.name,
          details: data.details,
          phone: data.phone,
          city: data.city,
          postalCode: data.postalCode,
        },
      });
    } else if (paymentMethod === "online") {
      const onlineOrder = await createOnlineOrder(cartData.cartId, data);
      setCheckoutUrl(onlineOrder?.session?.url);
    }
  }

  const products = cartData?.data?.products || [];
  const numOfCartItems = cartData?.numOfCartItems ?? products.length;
  const totalCartPrice = cartData?.data?.totalCartPrice ?? 0;

  if (isCartLoading || isAddressesLoading) {
    return <CheckoutSkeleton />;
  }

  if (!products.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-4xl text-amber-500"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mb-6">
            Add some items to your cart before checking out.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-linear-to-r from-[#16a34a] to-[#15803d] text-white py-3.5 px-8 rounded-xl font-semibold hover:from-[#15803d] hover:to-[#14532d] transition-all shadow-lg shadow-[#16a34a]/20"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#16a34a] transition">
              Home
            </Link>

            <span className="text-gray-300">/</span>

            <Link href="/cart" className="hover:text-[#16a34a] transition">
              Cart
            </Link>

            <span className="text-gray-300">/</span>

            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-br from-[#16a34a] to-[#15803d] text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-[#16a34a]/20">
                  <FontAwesomeIcon icon={faReceipt} />
                </span>
                Complete Your Order
              </h1>

              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>

            <Link
              href="/cart"
              className="text-[#16a34a] hover:text-[#15803d] font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#f0fdf4] transition-all"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Cart
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleCheckout)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faHouse} />
                    Shipping Address
                  </h2>

                  <p className="text-[#dcfce7] text-sm mt-1">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  {savedAddresses && savedAddresses.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="text-[#16a34a]"
                        />

                        <div>
                          <h3 className="font-bold text-gray-900">
                            Saved Addresses
                          </h3>

                          <p className="text-sm text-gray-500">
                            Select a saved address or enter a new one below
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {savedAddresses.map((address) => (
                          <button
                            key={address._id}
                            type="button"
                            onClick={() => handleSelectAddress(address)}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                              selectedAddress === address._id
                                ? "border-[#22c55e] bg-[#f0fdf4]"
                                : "border-gray-200 hover:border-[#bbf7d0] hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  selectedAddress === address._id
                                    ? "bg-[#dcfce7] text-[#16a34a]"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                <FontAwesomeIcon icon={faLocationDot} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900">
                                  {address.name || address.city}
                                </p>

                                <p className="text-sm text-gray-500 truncate">
                                  {address.details}
                                </p>

                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <FontAwesomeIcon
                                      icon={faPhone}
                                      className="text-[10px]"
                                    />
                                    {address.phone}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <FontAwesomeIcon
                                      icon={faCity}
                                      className="text-[10px]"
                                    />
                                    {address.city}
                                  </span>
                                </div>
                              </div>

                              {selectedAddress === address._id && (
                                <div className="w-7 h-7 rounded-full bg-[#16a34a] text-white flex items-center justify-center">
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="text-xs"
                                  />
                                </div>
                              )}
                            </div>
                          </button>
                        ))}

                        <button
                          type="button"
                          onClick={handleUseNewAddress}
                          className={`w-full p-4 rounded-xl border-2 border-dashed text-left transition-all duration-200 cursor-pointer ${
                            useNewAddress
                              ? "border-[#22c55e] bg-[#f0fdf4]"
                              : "border-gray-300 hover:border-[#86efac] hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                useNewAddress
                                  ? "bg-[#22c55e] text-white"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </div>

                            <div>
                              <p
                                className={`font-semibold ${
                                  useNewAddress
                                    ? "text-[#15803d]"
                                    : "text-gray-700"
                                }`}
                              >
                                Use a different address
                              </p>

                              <p className="text-xs text-gray-500 mt-0.5">
                                Enter a new shipping address manually
                              </p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="text-blue-600 text-sm"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-blue-800 font-medium">
                        Delivery Information
                      </p>

                      <p className="text-xs text-blue-600 mt-0.5">
                        {selectedAddress && !useNewAddress
                          ? "Using your saved address. You can edit the details below if needed."
                          : "Please ensure your address is accurate for smooth delivery"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Address Name / Recipient Name{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-500 text-sm"
                        />
                      </div>

                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all text-black placeholder-[#9aa0a8] ${
                          errors.name
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-[#22c55e] focus:ring-2 focus:ring-[#dcfce7]"
                        }`}
                        placeholder="e.g. Home, Office, or Full Name"
                      />
                    </div>

                    {errors.name && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        City <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faCity}
                            className="text-gray-500 text-sm"
                          />
                        </div>

                        <input
                          id="city"
                          type="text"
                          {...register("city")}
                          className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all text-black placeholder-[#9aa0a8] ${
                            errors.city
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                              : "border-gray-200 focus:border-[#22c55e] focus:ring-2 focus:ring-[#dcfce7]"
                          }`}
                          placeholder="e.g. Cairo, Alexandria, Giza"
                        />
                      </div>

                      {errors.city && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Postal Code <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-gray-500 text-sm"
                          />
                        </div>

                        <input
                          id="postalCode"
                          type="text"
                          {...register("postalCode")}
                          className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all text-black placeholder-[#9aa0a8] ${
                            errors.postalCode
                              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                              : "border-gray-200 focus:border-[#22c55e] focus:ring-2 focus:ring-[#dcfce7]"
                          }`}
                          placeholder="e.g. 11511"
                        />
                      </div>

                      {errors.postalCode && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.postalCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Street Address
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="text-gray-500 text-sm"
                        />
                      </div>

                      <textarea
                        id="details"
                        rows={3}
                        {...register("details")}
                        className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none text-black placeholder-[#9aa0a8] ${
                          errors.details
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-[#22c55e] focus:ring-2 focus:ring-[#dcfce7]"
                        }`}
                        placeholder="Street name, building number, floor, apartment..."
                      />
                    </div>

                    {errors.details && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.details.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-gray-500 text-sm"
                        />
                      </div>

                      <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all text-black placeholder-[#9aa0a8] ${
                          errors.phone
                            ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-[#22c55e] focus:ring-2 focus:ring-[#dcfce7]"
                        }`}
                        placeholder="01xxxxxxxxx"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        Egyptian numbers only
                      </span>
                    </div>

                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faWallet} />
                    Payment Method
                  </h2>

                  <p className="text-[#dcfce7] text-sm mt-1">
                    Choose how you&apos;d like to pay
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group cursor-pointer ${
                      paymentMethod === "cash"
                        ? "border-[#22c55e] bg-linear-to-r from-[#f0fdf4] to-emerald-50 shadow-sm"
                        : "border-gray-200 hover:border-[#bbf7d0] hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                        paymentMethod === "cash"
                          ? "bg-linear-to-br from-[#22c55e] to-[#16a34a] text-white shadow-lg shadow-[#22c55e]/30"
                          : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                      }`}
                    >
                      <FontAwesomeIcon icon={faMoneyBill} className="text-xl" />
                    </div>

                    <div className="flex-1 text-left">
                      <h3
                        className={`font-bold ${
                          paymentMethod === "cash"
                            ? "text-[#15803d]"
                            : "text-gray-900"
                        }`}
                      >
                        Cash on Delivery
                      </h3>

                      <p className="text-sm text-gray-500 mt-0.5">
                        Pay when your order arrives at your doorstep
                      </p>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        paymentMethod === "cash"
                          ? "bg-[#16a34a] text-white"
                          : "border-2 border-gray-200"
                      }`}
                    >
                      {paymentMethod === "cash" && (
                        <FontAwesomeIcon icon={faCheck} className="text-xs" />
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group cursor-pointer ${
                      paymentMethod === "online"
                        ? "border-[#22c55e] bg-linear-to-r from-[#f0fdf4] to-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-[#bbf7d0] hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                        paymentMethod === "online"
                          ? "bg-linear-to-br from-[#22c55e] to-blue-600 text-white shadow-lg shadow-[#22c55e]/30"
                          : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className="text-xl"
                      />
                    </div>

                    <div className="flex-1 text-left">
                      <h3
                        className={`font-bold ${
                          paymentMethod === "online"
                            ? "text-[#15803d]"
                            : "text-gray-900"
                        }`}
                      >
                        Pay Online
                      </h3>

                      <p className="text-sm text-gray-500 mt-0.5">
                        Secure payment with Credit/Debit Card via Stripe
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Image
                          alt="Visa"
                          className="h-5 w-auto"
                          width={48}
                          height={48}
                          src="https://img.icons8.com/color/48/visa.png"
                        />

                        <Image
                          alt="Mastercard"
                          className="h-5 w-auto"
                          width={48}
                          height={48}
                          src="https://img.icons8.com/color/48/mastercard.png"
                        />

                        <Image
                          alt="Amex"
                          className="h-5 w-auto"
                          width={48}
                          height={48}
                          src="https://img.icons8.com/color/48/amex.png"
                        />
                      </div>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        paymentMethod === "online"
                          ? "bg-[#16a34a] text-white"
                          : "border-2 border-gray-200"
                      }`}
                    >
                      {paymentMethod === "online" && (
                        <FontAwesomeIcon icon={faCheck} className="text-xs" />
                      )}
                    </div>
                  </button>

                  <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <FontAwesomeIcon
                        icon={faShieldHalved}
                        className="text-green-600"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Secure &amp; Encrypted
                      </p>

                      <p className="text-xs text-green-600 mt-0.5">
                        Your payment info is protected with 256-bit SSL
                        encryption
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                <div className="bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faBagShopping} />
                    Order Summary
                  </h2>

                  <p className="text-[#dcfce7] text-sm mt-1">
                    {numOfCartItems} items
                  </p>
                </div>

                <div className="p-5">
                  <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                    {products.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                          <Image
                            alt={item.product?.title || "Product"}
                            className="w-full h-full object-contain"
                            width={56}
                            height={56}
                            src={item.product?.imageCover}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.product?.title}
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.count} × {item.price} EGP
                          </p>
                        </div>

                        <p className="text-sm font-bold text-gray-900 shrink-0">
                          {(item.count * item.price).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <hr className="border-gray-100 my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>

                      <span className="font-medium">
                        {totalCartPrice.toLocaleString()} EGP
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faTruck}
                          className="text-gray-400"
                        />
                        Shipping
                      </span>

                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>

                    <hr className="border-gray-100" />

                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>

                      <div className="text-right">
                        <span className="text-2xl font-bold text-[#16a34a]">
                          {totalCartPrice.toLocaleString()}
                        </span>

                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-linear-to-r from-[#16a34a] to-[#15803d] text-white py-4 rounded-xl font-bold hover:from-[#15803d] hover:to-[#14532d] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#16a34a]/20 active:scale-[0.98] cursor-pointer"
                  >
                    {paymentMethod === "online" ? (
                      <>
                        <FontAwesomeIcon icon={faShieldHalved} />
                        {isSubmitting ? "Processing..." : "Proceed to Payment"}
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faBox} />
                        {isSubmitting ? "Placing Order..." : "Place Order"}
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FontAwesomeIcon
                        icon={faShieldHalved}
                        className="text-green-500"
                      />
                      <span>Secure</span>
                    </div>

                    <div className="w-px h-4 bg-gray-200" />

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FontAwesomeIcon
                        icon={faTruck}
                        className="text-blue-500"
                      />
                      <span>Fast Delivery</span>
                    </div>

                    <div className="w-px h-4 bg-gray-200" />

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FontAwesomeIcon
                        icon={faBox}
                        className="text-orange-500"
                      />
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
