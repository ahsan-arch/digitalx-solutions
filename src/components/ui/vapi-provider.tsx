"use client";

import dynamic from "next/dynamic";

const VapiButton = dynamic(
    () => import("@/components/ui/vapi-button").then((mod) => mod.VapiButton),
    { ssr: false }
);

export const VapiProvider = () => {
    return <VapiButton />;
};
