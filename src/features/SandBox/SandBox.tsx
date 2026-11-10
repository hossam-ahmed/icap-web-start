import { useEffect, useState } from "react";
import { componentDocs } from "./docs/registry.ts";

const getIdFromHash = () => {
	const id = window.location.hash.slice(1);
	return componentDocs.some(doc => doc.id === id) ? id : componentDocs[0].id;
};

/**
 * Component documentation playground for everything in `src/shared`.
 * Each page lives in `./docs` and is registered in `./docs/registry.ts`.
 */
export const SandBox = () => {
	const [activeId, setActiveId] = useState(getIdFromHash);

	useEffect(() => {
		const onHashChange = () => setActiveId(getIdFromHash());
		window.addEventListener("hashchange", onHashChange);
		return () => window.removeEventListener("hashchange", onHashChange);
	}, []);

	const active = componentDocs.find(doc => doc.id === activeId) ?? componentDocs[0];
	const ActivePage = active.page;

	return (
		<div className='flex min-h-screen bg-white text-neutral-800'>
			<aside className='w-60 shrink-0 border-e border-neutral-200 bg-neutral-50 p-4 sticky top-0 h-screen overflow-y-auto'>
				<p className='text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3'>Shared components</p>
				<nav className='flex flex-col gap-1'>
					{ componentDocs.map(doc => (
						<a
							key={ doc.id }
							href={ `#${ doc.id }` }
							className={ `rounded-md px-3 py-2 text-sm transition-colors ${
								doc.id === active.id
									? "bg-primary-100 text-primary-800 font-medium"
									: "text-neutral-700 hover:bg-neutral-100"
							}` }>
							{ doc.name }
						</a>
					)) }
				</nav>
			</aside>

			<main className='flex-1 min-w-0 p-8 max-w-5xl'>
				<ActivePage/>
			</main>
		</div>
	);
};
