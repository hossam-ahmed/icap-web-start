import { type PropsWithChildren, type ReactNode, useState } from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type PropDoc = {
	name: string;
	type: string;
	default?: string;
	required?: boolean;
	description: ReactNode;
};

/* ------------------------------------------------------------------ */
/* Page / section layout                                               */
/* ------------------------------------------------------------------ */

type DocPageProps = PropsWithChildren<{
	title: string;
	description: ReactNode;
	/** Import statement shown at the top of the page. */
	importCode: string;
}>;

export const DocPage = ({ title, description, importCode, children }: DocPageProps) => (
	<article className='flex flex-col gap-8'>
		<header className='flex flex-col gap-3'>
			<h1 className='text-3xl font-bold text-neutral-900'>{ title }</h1>
			<div className='text-neutral-600 leading-relaxed'>{ description }</div>
			<CodeBlock code={ importCode }/>
		</header>
		{ children }
	</article>
);

type DocSectionProps = PropsWithChildren<{
	title: string;
	description?: ReactNode;
}>;

export const DocSection = ({ title, description, children }: DocSectionProps) => (
	<section className='flex flex-col gap-4'>
		<div className='flex flex-col gap-1'>
			<h2 className='text-xl font-semibold text-neutral-900'>{ title }</h2>
			{ description && <p className='text-neutral-600'>{ description }</p> }
		</div>
		{ children }
	</section>
);

/* ------------------------------------------------------------------ */
/* Code                                                                */
/* ------------------------------------------------------------------ */

export const CodeBlock = ({ code }: { code: string }) => {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		await navigator.clipboard?.writeText(code.trim());
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className='relative group'>
			<pre className='bg-neutral-900/75 text-neutral-100 text-sm rounded-lg p-4 overflow-x-auto'>
				<code>{ code.trim() }</code>
			</pre>
			<button
				type='button'
				onClick={ copy }
				className='absolute top-2 right-2 text-xs px-2 py-1 rounded bg-neutral-700 text-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity'>
				{ copied ? "Copied" : "Copy" }
			</button>
		</div>
	);
};

export const InlineCode = ({ children }: PropsWithChildren) => (
	<code className='bg-neutral-100 text-primary-700 rounded px-1 py-0.5 text-[0.9em]'>{ children }</code>
);

/* ------------------------------------------------------------------ */
/* Live example: preview + toggleable source                           */
/* ------------------------------------------------------------------ */

type ExampleProps = PropsWithChildren<{
	title: string;
	description?: ReactNode;
	/** Source code displayed under the live preview. Keep it in sync with `children`. */
	code: string;
	className?: string;
	contentClassName?: string;
}>;

export const Example = ({ title, className, contentClassName, description, code, children }: ExampleProps) => {
	const [showCode, setShowCode] = useState(false);

	return (
		<div className={`border border-neutral-200 rounded-lg overflow-hidden ${className}`}>
			<div className='px-4 py-3 border-b border-neutral-200 bg-neutral-50'>
				<h3 className='font-medium text-neutral-900'>{ title }</h3>
				{ description && <p className='text-sm text-neutral-600'>{ description }</p> }
			</div>
			<div className={`p-6 flex flex-wrap items-center gap-4 bg-white ${contentClassName}`}>
				{ children }
			</div>
			<div className='border-t border-neutral-200'>
				<button
					type='button'
					onClick={ () => setShowCode(v => !v) }
					className='w-full text-left text-sm px-4 py-2 text-primary-700 hover:bg-neutral-50'>
					{ showCode ? "Hide code" : "Show code" }
				</button>
				{ showCode && <div className='px-4 pb-4'><CodeBlock code={ code }/></div> }
			</div>
		</div>
	);
};

/* ------------------------------------------------------------------ */
/* Props table                                                         */
/* ------------------------------------------------------------------ */

export const PropsTable = ({ props, note }: { props: PropDoc[]; note?: ReactNode }) => (
	<div className='flex flex-col gap-2'>
		<div className='overflow-x-auto border border-neutral-200 rounded-lg'>
			<table className='w-full text-sm text-left'>
				<thead className='bg-neutral-50 text-neutral-700'>
					<tr>
						<th className='px-4 py-2 font-semibold'>Prop</th>
						<th className='px-4 py-2 font-semibold'>Type</th>
						<th className='px-4 py-2 font-semibold'>Default</th>
						<th className='px-4 py-2 font-semibold'>Description</th>
					</tr>
				</thead>
				<tbody>
					{ props.map(prop => (
						<tr key={ prop.name } className='border-t border-neutral-200 align-top'>
							<td className='px-4 py-2 whitespace-nowrap'>
								<InlineCode>{ prop.name }</InlineCode>
								{ prop.required && <span className='text-red-600 ms-1'>*</span> }
							</td>
							<td className='px-4 py-2 font-mono text-xs text-neutral-700'>{ prop.type }</td>
							<td className='px-4 py-2 font-mono text-xs text-neutral-500'>{ prop.default ?? "—" }</td>
							<td className='px-4 py-2 text-neutral-700'>{ prop.description }</td>
						</tr>
					)) }
				</tbody>
			</table>
		</div>
		{ note && <p className='text-sm text-neutral-500'>{ note }</p> }
	</div>
);

/* ------------------------------------------------------------------ */
/* Callouts                                                            */
/* ------------------------------------------------------------------ */

const calloutStyles = {
	info   : "border-primary-300 bg-primary-50 text-primary-900",
	warning: "border-amber-300 bg-amber-50 text-amber-900"
} as const;

export const Callout = ({ type = "info", children }: PropsWithChildren<{ type?: keyof typeof calloutStyles }>) => (
	<div className={ `border-s-4 rounded-md px-4 py-3 text-sm ${ calloutStyles[type] }` }>
		{ children }
	</div>
);
