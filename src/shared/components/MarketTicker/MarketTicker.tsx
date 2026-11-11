import { IcapIcon } from "@shared/components/IcapIcon";
import './MarketTicker.css';

export type MarketTickerProps = {
	amount: number;
	transparent?: boolean;
};

export const MarketTicker = ({ amount, transparent }: MarketTickerProps) => {

	const isTrendUp = amount > 0;
	const isNeutral = amount === 0;
	const isTrendDown = amount < 0;
	return (
		<div className={ `icap-market-ticker flex items-center p-2 rounded-lg
		${ transparent && 'transparent' }
		${ isTrendUp && 'trend-up' } ${ isTrendDown && 'trend-down' }` }>
			{ !isNeutral && <IcapIcon icon='arrow' size='13px' className='ticker-arrow me-3'></IcapIcon> }
			{ !isNeutral && <span className='ticker-sign me-0.5'>
				{ isTrendUp ? '+' : '-' }
			</span> }
			<span className='ticker-amount'>{ Math.abs(amount) }</span>
		</div>
	)
}