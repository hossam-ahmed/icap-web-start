import { Suspense } from "react";
import { useAuth } from "./useAuth";

export const AuthGate = () => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		/*return <ICapRouter/>;*/
		return <></>;
	}

	return (
		<Suspense fallback={ <p className='p-3'>Loading…</p> }>
			{/*login component*/ }
		</Suspense>
	);
};