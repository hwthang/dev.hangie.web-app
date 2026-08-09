import React from "react";
import "@/styles/global.css";
import QueryProvider from "@/providers/query-provider";
import AuthProvider from "@/features/auth/auth.provider";
type Props = {
  children: React.ReactNode;
};
const RootLayout = ({ children }: Props) => {
  return (
    <html>
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
