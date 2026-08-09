import { redirect } from "next/navigation";
import React from "react";

const ConsoleRedirect = () => {
  redirect("/console/dashboard");
};

export default ConsoleRedirect;
