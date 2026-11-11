import './Loader.css';
import { createPortal } from "react-dom";
import { useLoader } from "./useLoader.tsx";
import { IcapIcon } from "@shared/components/IcapIcon";

export type LoaderProps = {
	loaderMessage?: string;
};

export const Loader = ({ loaderMessage }: LoaderProps) => {

	const { loading } = useLoader();
	const loader = createPortal(<div className='icap-loader'>
		<div className='loader-overlay'></div>
		<div className='icap-loader-content'>
			<IcapIcon icon='loader' size='70px' color='var(--color-primary-800)' />
			<span className='text-primary-400'>
				{loaderMessage || 'Loading ...'}
			</span>
		</div>
	</div>, document.body);

	return (
		loading && loader
	);
};
