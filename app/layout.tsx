import { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/toast-provider";
import { ToastContainer } from "@/components/toast-container";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Hỗ Trợ Dịch Vụ Công Thống Nhất - Anh Trí",
  description: "Dịch vụ hỗ trợ làm thủ tục hành chính, giấy tờ pháp lý tại Xã Thống Nhất, Đồng Nai. Nhanh chóng, uy tín, tiết kiệm thời gian.",
  keywords: "dịch vụ công, thủ tục hành chính, giấy tờ pháp lý, Thống Nhất, Đồng Nai, hỗ trợ dịch vụ công",
  viewport: "width=device-width, initial-scale=1",
};

const geistSans = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full" suppressHydrationWarning>
      <body className={`${geistSans.className} h-full bg-white dark:bg-gray-900 transition-colors`}>
        <ThemeProvider>
          <ToastProvider>
            {children}
            <ToastContainer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
