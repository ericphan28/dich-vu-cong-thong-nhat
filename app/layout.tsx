import { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

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
    <html lang="vi">
      <body className={geistSans.className}>
        {children}
      </body>
    </html>
  );
}
