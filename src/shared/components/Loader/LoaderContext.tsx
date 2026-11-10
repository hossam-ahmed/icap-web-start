import { createContext, type PropsWithChildren, useEffect, useMemo, useState } from "react";
import type { StateSetter } from "@core/globals/Globals.model.ts";

export type LoaderContextType = {
	loading: boolean;
	showLoader: StateSetter<void>;
	hideLoader: StateSetter<void>;
}

export const LoaderContext = createContext<LoaderContextType | null>(null);

export const LoaderProvider = ({ children }: PropsWithChildren) => {

	const [loading, setLoading] = useState(false);
	const [loaderCount, setLoaderCount] = useState<number>(0);

	useEffect(() => {
		setLoading(loaderCount > 0);
	}, [loaderCount]);

	const showLoader = () => {
		setLoaderCount((count) => count + 1);
	};
	const hideLoader = () => {
		setLoaderCount((count) => Math.max(0, count - 1));
	};

	const value = useMemo(
		() => ({
			showLoader,
			hideLoader,
			loading
		}),
		[loaderCount, loading]
	);

	return <LoaderContext.Provider value={ value }>{ children }</LoaderContext.Provider>
}
