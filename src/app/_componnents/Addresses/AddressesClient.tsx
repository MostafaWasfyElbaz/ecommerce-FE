"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faLocationDot,
  faXmark,
  faPhone,
  faCity,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Address } from "@/src/types/Address";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  getSpecificAddress,
  updateAddress,
} from "@/src/api/Actions/address.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddressesSkeleton from "./AddressesSkeleton";
import Swal from "sweetalert2";

export default function AddressesClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: addresses, isLoading } = useQuery({
    queryKey: ["GetAddresses"],
    queryFn: getAddresses,
  });
  const {
    handleSubmit,
    formState: { errors, touchedFields },
    register,
    reset,
  } = useForm<Address>({
    mode: "onBlur",
  });

  function openAddModal() {
    setEditingAddressId(null);
    reset({
      name: "",
      details: "",
      phone: "",
      city: "",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingAddressId(null);
    reset({
      name: "",
      details: "",
      phone: "",
      city: "",
    });
  }

  const { mutate: addAddressMutation, isPending: addPending } = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast.success("Address added successfully");
      queryClient.invalidateQueries({ queryKey: ["GetAddresses"] });
      closeModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error adding address");
    },
  });

  const { mutate: updateAddressMutation, isPending: updatePending } =
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: Address }) =>
        updateAddress(id, data),
      onSuccess: () => {
        toast.success("Address updated successfully");
        queryClient.invalidateQueries({ queryKey: ["GetAddresses"] });
        closeModal();
      },
      onError: (error: Error) => {
        toast.error(error.message || "Error updating address");
      },
    });

  const { mutate: deleteAddressMutation, isPending: deletePending } =
    useMutation({
      mutationFn: deleteAddress,
      onSuccess: () => {
        toast.success("Address deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["GetAddresses"] });
      },
      onError: (error: Error) => {
        toast.error(error.message || "Error deleting address");
      },
    });

  const { mutate: getSpecificAddressMutation, isPending: getSpecificPending } =
    useMutation({
      mutationFn: getSpecificAddress,
      onSuccess: (data: Address) => {
        reset({
          name: data.name,
          details: data.details,
          phone: data.phone,
          city: data.city,
        });
        setIsModalOpen(true);
      },
      onError: (error: Error) => {
        setEditingAddressId(null);
        toast.error(error.message || "Error editing address");
      },
    });

  function handleFormSubmit(data: Address) {
    if (editingAddressId) {
      updateAddressMutation({ id: editingAddressId, data });
    } else {
      addAddressMutation(data);
    }
  }

  function handleDeleteAddress(id?: string, name?: string) {
    if (!id) return;

    Swal.fire({
      html: `
      <div class="text-center py-2">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Address?</h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          Are you sure you want to delete ${name ? `<span class="font-semibold text-gray-700">"${name}"</span>` : "this address"}? This action cannot be undone.
        </p>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-2xl border-0 p-0",
        htmlContainer: "p-6 m-0",
        actions: "px-6 pb-6 pt-0 gap-3 flex flex-row-reverse justify-center",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer",
        cancelButton:
          "bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAddressMutation(id);
      }
    });
  }

  function handleEditAddress(id?: string) {
    if (!id) return;

    setEditingAddressId(id);

    const localAddr = addresses?.find((a) => a._id === id);
    if (localAddr) {
      reset({
        name: localAddr.name,
        details: localAddr.details,
        phone: localAddr.phone,
        city: localAddr.city,
      });
      setIsModalOpen(true);
      return;
    }

    getSpecificAddressMutation(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your saved delivery addresses
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] transition-colors shadow-lg shadow-[#16a34a]/25"
        >
          <FontAwesomeIcon icon={faPlus} className="text-sm" />
          Add Address
        </button>
      </div>

      {isLoading ? (
        <AddressesSkeleton />
      ) : !addresses || addresses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-3xl text-gray-400"
            />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No Addresses Yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Add your first delivery address to make checkout faster and easier.
          </p>
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-xl bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] transition-colors shadow-lg shadow-[#16a34a]/25"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr, index) => (
            <div
              key={addr._id || index}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-lg text-green-600"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {addr.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {addr.details}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faPhone} className="text-xs" />
                        {addr.phone}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faCity} className="text-xs" />
                        {addr.city}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 flex items-center justify-center transition-colors cursor-pointer"
                    title="Edit address"
                    disabled={getSpecificPending}
                    onClick={() => handleEditAddress(addr._id)}
                  >
                    <FontAwesomeIcon icon={faPen} className="text-sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(addr._id, addr.name)}
                    disabled={deletePending}
                    className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    title="Delete address"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingAddressId ? "Edit Address" : "Add New Address"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Name
                </label>
                <input
                  placeholder="e.g. Home, Office"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all placeholder-[#9aa0a8] text-black"
                  required
                  type="text"
                  {...register("name")}
                />
                {touchedFields.name && errors.name && (
                  <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                    <span className="max-w-47.5">{errors.name.message}</span>
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address
                </label>
                <textarea
                  placeholder="Street, building, apartment..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all resize-none placeholder-[#9aa0a8] text-black"
                  required
                  {...register("details")}
                />
                {touchedFields.details && errors.details && (
                  <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                    <span className="max-w-47.5">{errors.details.message}</span>
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    placeholder="01xxxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all placeholder-[#9aa0a8] text-black"
                    required
                    type="tel"
                    {...register("phone")}
                  />
                  {touchedFields.phone && errors.phone && (
                    <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                      <span className="max-w-47.5">{errors.phone.message}</span>
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    placeholder="Cairo"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none transition-all placeholder-[#9aa0a8] text-black"
                    required
                    type="text"
                    {...register("city")}
                  />
                  {touchedFields.city && errors.city && (
                    <span className="mt-2 flex justify-between text-[10px] font-normal leading-3 text-[#7c8795]">
                      <span className="max-w-47.5">{errors.city.message}</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addPending || updatePending}
                  className="flex-1 py-3 px-6 rounded-xl bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] transition-colors disabled:opacity-50 shadow-lg shadow-[#16a34a]/25 cursor-pointer disabled:cursor-not-allowed"
                >
                  {editingAddressId
                    ? updatePending
                      ? "Updating..."
                      : "Update Address"
                    : addPending
                      ? "Saving..."
                      : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
