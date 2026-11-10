import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClientInstance } from "./QueryClientInstance.ts";
import type { PropsWithChildren } from "react";

export const IcapClientProvider = ({ children }: PropsWithChildren) => {
	return <QueryClientProvider client={ QueryClientInstance }>{ children }</QueryClientProvider>
}