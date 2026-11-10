import { useContext } from "react";
import { LoaderContext, type LoaderContextType } from "./LoaderContext.tsx";

export const useLoader = (): LoaderContextType => {
	return useContext(LoaderContext) as LoaderContextType;
}
