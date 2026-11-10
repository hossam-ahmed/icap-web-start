import { Outlet } from "react-router-dom";
import { Header } from "@shared/components/Header";

/** Layout for unauthenticated pages (e.g. login): header only. */
export const PublicLayout = () => (
	<div className='flex flex-col min-h-screen'>
		<Header/>
		<main className='flex-1'>
			<Outlet/>
		</main>
	</div>
);
