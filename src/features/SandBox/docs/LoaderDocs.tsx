import { Button } from "@shared/components/Button";
import { useLoader } from "@shared/components/Loader";
import { Callout, CodeBlock, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const hookApi: PropDoc[] = [
	{
		name       : "loading",
		type       : "boolean",
		description: "True while at least one showLoader() call is still pending a matching hideLoader()."
	},
	{
		name       : "showLoader",
		type       : "() => void",
		description: "Increments the pending counter and shows the overlay."
	},
	{
		name       : "hideLoader",
		type       : "() => void",
		description: "Decrements the counter (never below 0). The overlay hides when it reaches 0."
	}
];

export const LoaderDocs = () => {
	const { showLoader, hideLoader, loading } = useLoader();

	const runTask = async (ms: number) => {
		showLoader();
		try {
			await wait(ms);
		} finally {
			hideLoader();
		}
	};

	const runParallel = () => {
		void runTask(800);
		void runTask(2000);
	};

	return (
		<DocPage
			title='Loader'
			description={ <>A global, full-screen loading overlay rendered into <InlineCode>document.body</InlineCode> via a portal.
				It is controlled from anywhere with the <InlineCode>useLoader()</InlineCode> hook and is reference-counted, so
				overlapping requests keep it visible until the last one finishes.</> }
			importCode={ `import { Loader, LoaderProvider, useLoader } from "@shared/components/Loader";` }>

			<DocSection title='Setup' description='Already done in App.tsx — mount the provider once and render <Loader/> inside it.'>
				<CodeBlock code={ `
<LoaderProvider>
  <Loader />
  <ICapRouter />
</LoaderProvider>` }/>
			</DocSection>

			<DocSection title='Usage'>
				<Example
					title='Show for an async task'
					description='Always pair showLoader with hideLoader in a finally block.'
					code={ `
const { showLoader, hideLoader } = useLoader();

const save = async () => {
  showLoader();
  try {
    await api.save();
  } finally {
    hideLoader();
  }
};` }>
					<Button className='text-white' onClick={ () => runTask(1500) }>Show loader for 1.5s</Button>
				</Example>

				<Example
					title='Overlapping tasks'
					description='Two tasks (0.8s and 2s) start together; the overlay stays until the slower one ends.'
					code={ `
runTask(800);
runTask(2000); // loader hides after ~2s, not 0.8s` }>
					<Button className='text-white' onClick={ runParallel }>Run 2 tasks in parallel</Button>
				</Example>

				<Example
					title='Reading the state'
					code={ `
const { loading } = useLoader();
<p>Loading: {String(loading)}</p>` }>
					<p>Loading: <InlineCode>{ String(loading) }</InlineCode></p>
				</Example>
			</DocSection>

			<DocSection title='useLoader() API'>
				<PropsTable props={ hookApi }/>
				<Callout type='warning'>
					<InlineCode>useLoader()</InlineCode> must be called inside <InlineCode>LoaderProvider</InlineCode>; outside it the
					context is <InlineCode>null</InlineCode> and destructuring will throw.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
