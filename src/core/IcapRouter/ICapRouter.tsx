import { type ReactElement, ViewTransition } from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./paths.ts";
import { ProtectedRoute } from "@core/ProtectedRoute/ProtectedRoute.tsx";
import { PublicLayout } from "@core/layouts/PublicLayout/PublicLayout.tsx";
import { ProtectedLayout } from "@core/layouts/ProtectedLayout/ProtectedLayout.tsx";

/**
 * Lazily loaded pages.
 *
 * Each page lives in its own bundle chunk and is only fetched when its route
 * is first visited. `Home` is a named export, so we remap it to the `default`
 * shape that {@link lazy} expects.
 */
const Home = lazy(() => import("@features/Home/Home.tsx").then(module => ({ default: module.Home })));
const Login = lazy(() =>
	import("@features/Login/Login.tsx").then(module => ({
		default: module.Login
	}))
);
const SandBox = lazy(() =>
	import("@features/SandBox/SandBox.tsx").then(module => ({
		default: module.SandBox
	}))
);

/**
 * Wrap a lazily loaded element in a {@link Suspense} boundary so the router can
 * render a fallback while the page chunk is downloading.
 */
const lazyRoute = (element: ReactElement): ReactElement => (
	<ViewTransition>
		<Suspense fallback={ <p className='p-3'>Loading…</p> }>
			{ element }
		</Suspense>
	</ViewTransition>
);

const router = createBrowserRouter([
	// Public routes: header only
	{
		element : <PublicLayout/>,
		children: [{
			path   : ROUTES.login,
			element: lazyRoute(<Login/>)
		}]
	},
	// Protected routes: auth check, then header + side menu
	{
		element : <ProtectedRoute/>,
		children: [{
			element : <ProtectedLayout/>,
			children: [{
				path   : ROUTES.home,
				element: lazyRoute(<Home/>)
			}, {
				path   : ROUTES.sandbox,
				element: lazyRoute(<SandBox/>)
			}]
		}]
	}
]);

/**
 * Application router.
 *
 * Owns the route table and renders the active page. Mount this once near the
 * root of the tree (see `App`).
 */
export const ICapRouter = () => <RouterProvider router={ router }/>;
