import type { Metadata } from "next";
import "./globals.css";
import Header from "./_componnents/NavBar/NavBar";
import Footer from "./_componnents/Footer/Footer";
import { Toaster } from "react-hot-toast";
import MyProvider from "./_componnents/MyProvider/MyProvider";
import Providers from "./_componnents/TanstackProvider/TanstackProvider";

export const metadata: Metadata = {
  title: {
    default: "FreshCart | Fresh Products Delivered",
    template: "%s | FreshCart",
  },
  description:
    "Shop fresh groceries, daily essentials, and quality products delivered to your door.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          <MyProvider>
            <Toaster position="top-right" />
            <Header />
            {children}
            <Footer />
          </MyProvider>
        </Providers>
      </body>
    </html>
  );
}
