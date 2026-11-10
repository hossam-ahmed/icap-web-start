import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { SideMenu } from "../SideMenu";

export const ProtectedLayout = () => (
	<div className='flex flex-col h-screen'>
		<Header/>
		<div className='flex flex-1 min-h-0'>
			<SideMenu/>
			<main className='flex-1 overflow-auto'>
				<Outlet/>
			</main>
		</div>
	</div>
);
