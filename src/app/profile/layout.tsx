import type { Metadata } from "next";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";
import ProfileSidebar from "@/src/app/_componnents/Profile/ProfileSidebar";
import ProfileSidebarSkeleton from "@/src/app/_componnents/Profile/ProfileSidebarSkeleton";
import PageHeader from "@/src/app/_componnents/PageHeader/PageHeader";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your addresses and account settings on FreshCart.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageHeader
        name="My Account"
        description="Manage your addresses and account settings"
        icon={faUser}
        links={[{ label: "Home", href: "/" }, { label: "My Account" }]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <Suspense fallback={<ProfileSidebarSkeleton />}>
            <ProfileSidebar />
          </Suspense>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
