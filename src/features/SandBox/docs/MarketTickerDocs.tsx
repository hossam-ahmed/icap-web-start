import { MarketTicker } from "@shared/components/MarketTicker";
import {
	Callout,
	DocPage,
	DocSection,
	Example,
	InlineCode,
	type PropDoc,
	PropsTable
} from "../doc-kit/DocKit.tsx";

const marketTickerProps: PropDoc[] = [
	{
		name       : "amount",
		type       : "number",
		required   : true,
		description: <>The change to display. Positive values render green with an up arrow and
			a <InlineCode>+</InlineCode> sign;
			negative values render red with a flipped arrow and
			a <InlineCode>-</InlineCode> sign; <InlineCode>0</InlineCode> renders
			neutral (grey, no arrow or sign). The number is always shown as its absolute value.</>
	},
	{
		name       : "transparent",
		type       : "boolean",
		default    : "false",
		description: <>Drops the <InlineCode>trend-up</InlineCode> / <InlineCode>trend-down</InlineCode> styling, so the
			ticker renders without the green/red pill background and colors. The arrow and sign are still shown.</>
	}
];

export const MarketTickerDocs = () => (
	<DocPage
		title='MarketTicker'
		description={ <>A compact pill that shows a market change with a trend arrow and sign. The
			color, arrow and
			sign are derived from <InlineCode>amount</InlineCode>: up, down, or neutral for zero.</> }
		importCode={ `import { MarketTicker } from "@shared/components/MarketTicker";` }>

		<DocSection title='Trends'>
			<Example
				title='Up & down'
				description='Positive amounts use the success palette; negative amounts use the error palette and flip the arrow.'
				code={ `
<MarketTicker amount={2.45} />
<MarketTicker amount={-1.3} />` }>
				<MarketTicker amount={ 2.45 }/>
				<MarketTicker amount={ -1.3 }/>
			</Example>

			<Example
				title='Neutral'
				description='Zero is neutral: a grey pill with just the number, no arrow or sign.'
				code={ `<MarketTicker amount={0} />` }>
				<MarketTicker amount={ 0 }/>
			</Example>
		</DocSection>

		<DocSection title='Transparent'>
			<Example
				title='Without trend styling'
				description='Use transparent when the ticker sits on a colored surface or inline with text and the pill background would be too heavy.'
				code={ `
<MarketTicker amount={2.45} transparent />
<MarketTicker amount={-1.3} transparent />
<MarketTicker amount={0} transparent />` }>
				<MarketTicker amount={ 2.45 } transparent/>
				<MarketTicker amount={ -1.3 } transparent/>
				<MarketTicker amount={ 0 } transparent/>
			</Example>
		</DocSection>

		<DocSection title='Formatting'>
			<Example
				title='Pre-format the value'
				description='The amount is rendered as-is, so round it before passing it in if you need fixed decimals.'
				code={ `<MarketTicker amount={Number(change.toFixed(2))} />` }>
				<MarketTicker amount={ Number((3.14159).toFixed(2)) }/>
			</Example>
		</DocSection>

		<DocSection title='Props'>
			<PropsTable props={ marketTickerProps }/>
			<Callout>
				Styles live
				in <InlineCode>MarketTicker.css</InlineCode> under <InlineCode>.icap-market-ticker</InlineCode>,
				with <InlineCode>.trend-up</InlineCode> / <InlineCode>.trend-down</InlineCode> modifiers.
				With neither
				modifier (zero, or <InlineCode>transparent</InlineCode>) it falls back to the neutral <InlineCode>bg-neutral-100</InlineCode> base.
			</Callout>
		</DocSection>
	</DocPage>
);
