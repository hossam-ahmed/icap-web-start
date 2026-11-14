import { useMemo, useState } from "react";
import {
	IcapTable,
	IcapTableBody,
	IcapTableHeader,
	IcapTableHeaderCell,
	IcapTableRow,
	IcapTableRowCell,
	type IcapTableSort
} from "@shared/components/IcapTable";
import { IcapAmount } from "@shared/components/IcapAmount";
import { IcapButton } from "@shared/components/IcapButton";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

type Fund = { id: string; name: string; change: number; units: number; unitPrice: number; marketValue: number };

const funds: Fund[] = [
	{ id: "1", name: "Alistithmar Capital Saudi Equity Fund", change: 5.25, units: 9350.2842, unitPrice: 543.5219, marketValue: 50.2 },
	{ id: "2", name: "Alistithmar Capital Saudi Companies Fund", change: 5.25, units: 7283.2746, unitPrice: 237.2847, marketValue: 145.2 },
	{ id: "3", name: "Alistithmar Capital Quarterly Dividend Fund", change: -5.25, units: 6364.1837, unitPrice: 172.3758, marketValue: 760.2 },
	{ id: "4", name: "Alistithmar Capital MENA Equity Fund", change: 5.25, units: 3475.1836, unitPrice: 90.5263, marketValue: 145.2 },
	{ id: "5", name: "Alistithmar Capital Freestyle Saudi Equity Fund", change: -5.25, units: 1274.19, unitPrice: 43.3746, marketValue: 50.2 }
];

const Change = ({ value }: { value: number }) => (
	<span className={ `inline-flex items-center gap-1.5 ${ value >= 0 ? "text-success" : "text-error" }` }>
		{ value >= 0 ? "+" : "" }{ value.toFixed(2) }%
		<svg viewBox='0 0 10 8' className='w-2.5 h-2' aria-hidden='true'>
			<path d={ value >= 0 ? "M5 0l5 8H0z" : "M5 8 0 0h10z" } fill='currentColor'/>
		</svg>
	</span>
);

const tableProps: PropDoc[] = [
	{ name: "sort", type: "{ key, direction } | null", description: "Current sort (controlled)." },
	{ name: "defaultSort", type: "{ key, direction } | null", default: "null", description: "Initial sort (uncontrolled)." },
	{
		name       : "onSortChange",
		type       : "(sort) => void",
		description: "Fired when a sortable header is clicked; cycles ascending → descending → unsorted. The table doesn't reorder rows: sort your data and render the rows in that order."
	},
	{ name: "cardClassName", type: "string", description: <>Classes on the wrapping <InlineCode>IcapCard</InlineCode>.</> },
	{ name: "...rest", type: `ComponentProps<"table">`, description: <>Forwarded to the <InlineCode>&lt;table&gt;</InlineCode> (<InlineCode>className</InlineCode>, <InlineCode>aria-*</InlineCode>, …).</> }
];

const headerCellProps: PropDoc[] = [
	{ name: "sortKey", type: "string", description: "Makes the column sortable; reported as sort.key in onSortChange." },
	{ name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Text alignment (also on IcapTableRowCell). Use end for numbers." }
];

const rowProps: PropDoc[] = [
	{ name: "hoverable", type: "boolean", default: "false", description: "Highlights the row on hover, e.g. for clickable rows." }
];

export const IcapTableDocs = () => {
	const [sort, setSort] = useState<IcapTableSort>(null);

	const sortedFunds = useMemo(() => {
		if (!sort) return funds;
		const key = sort.key as keyof Fund;
		const dir = sort.direction === "asc" ? 1 : -1;
		return [...funds].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * dir);
	}, [sort]);

	return (
		<DocPage
			title='IcapTable'
			description={ <>A table rendered inside an <InlineCode>IcapCard</InlineCode>. The table itself is borderless; body rows
				alternate, and the darker rows have top and bottom borders. Columns can be sortable, and rows can be hoverable.</> }
			importCode={ `import {
  IcapTable, IcapTableHeader, IcapTableHeaderCell,
  IcapTableBody, IcapTableRow, IcapTableRowCell, type IcapTableSort
} from "@shared/components/IcapTable";` }>

			<DocSection title='Usage'>
				<Example
					title='Sortable columns & hoverable rows'
					description='Click a column header to sort. Sorting is done by the page (the table only reports the sort).'
					code={ `
const [sort, setSort] = useState<IcapTableSort>(null);
const sortedFunds = useMemo(() => sortBy(funds, sort), [sort]);

<IcapTable sort={sort} onSortChange={setSort}>
  <IcapTableHeader>
    <IcapTableHeaderCell>Mutual Fund</IcapTableHeaderCell>
    <IcapTableHeaderCell sortKey="change" align="end">% Change</IcapTableHeaderCell>
    <IcapTableHeaderCell sortKey="units" align="end">Number of Units</IcapTableHeaderCell>
    …
    <IcapTableHeaderCell align="end">Actions</IcapTableHeaderCell>
  </IcapTableHeader>
  <IcapTableBody>
    {sortedFunds.map(fund => (
      <IcapTableRow key={fund.id} hoverable>
        <IcapTableRowCell>{fund.name}</IcapTableRowCell>
        <IcapTableRowCell align="end"><Change value={fund.change} /></IcapTableRowCell>
        …
      </IcapTableRow>
    ))}
  </IcapTableBody>
</IcapTable>` }>
					<div className='w-full flex flex-col gap-3'>
						<IcapTable sort={ sort } onSortChange={ setSort }>
							<IcapTableHeader>
								<IcapTableHeaderCell>Mutual Fund</IcapTableHeaderCell>
								<IcapTableHeaderCell sortKey='change' align='end'>% Change</IcapTableHeaderCell>
								<IcapTableHeaderCell sortKey='units' align='end'>Number of Units</IcapTableHeaderCell>
								<IcapTableHeaderCell sortKey='unitPrice' align='end'>Last Unit Price</IcapTableHeaderCell>
								<IcapTableHeaderCell sortKey='marketValue' align='end'>Market Value</IcapTableHeaderCell>
								<IcapTableHeaderCell align='end'>Actions</IcapTableHeaderCell>
							</IcapTableHeader>
							<IcapTableBody>
								{ sortedFunds.map(fund => (
									<IcapTableRow key={ fund.id } hoverable>
										<IcapTableRowCell className='min-w-56'>{ fund.name }</IcapTableRowCell>
										<IcapTableRowCell align='end'><Change value={ fund.change }/></IcapTableRowCell>
										<IcapTableRowCell align='end'>
											{ new Intl.NumberFormat("en-US", { minimumFractionDigits: 4 }).format(fund.units) }
										</IcapTableRowCell>
										<IcapTableRowCell align='end'><IcapAmount amount={ fund.unitPrice } decimals={ 4 } className='font-normal'/></IcapTableRowCell>
										<IcapTableRowCell align='end'><IcapAmount amount={ fund.marketValue } className='font-normal'/></IcapTableRowCell>
										<IcapTableRowCell align='end'>
											<div className='inline-flex gap-2'>
												<IcapButton variant='transparent' outlined className='bg-white py-2'>Redeem</IcapButton>
												<IcapButton variant='alternate' className='py-2 disabled:bg-neutral-200 disabled:text-neutral-400' disabled>Subscribe</IcapButton>
											</div>
										</IcapTableRowCell>
									</IcapTableRow>
								)) }
							</IcapTableBody>
						</IcapTable>
						<span className='text-sm'>sort: { JSON.stringify(sort) }</span>
					</div>
				</Example>

				<Example
					title='Plain'
					description='No sortable columns, rows not hoverable.'
					code={ `
<IcapTable>
  <IcapTableHeader>
    <IcapTableHeaderCell>Symbol</IcapTableHeaderCell>
    <IcapTableHeaderCell align="end">Quantity</IcapTableHeaderCell>
  </IcapTableHeader>
  <IcapTableBody>
    <IcapTableRow>
      <IcapTableRowCell>2222</IcapTableRowCell>
      <IcapTableRowCell align="end">150</IcapTableRowCell>
    </IcapTableRow>
    …
  </IcapTableBody>
</IcapTable>` }>
					<div className='w-full max-w-md'>
						<IcapTable>
							<IcapTableHeader>
								<IcapTableHeaderCell>Symbol</IcapTableHeaderCell>
								<IcapTableHeaderCell align='end'>Quantity</IcapTableHeaderCell>
							</IcapTableHeader>
							<IcapTableBody>
								{ [["2222", 150], ["1120", 40], ["7010", 1200]].map(([symbol, qty]) => (
									<IcapTableRow key={ symbol }>
										<IcapTableRowCell>{ symbol }</IcapTableRowCell>
										<IcapTableRowCell align='end'>{ qty }</IcapTableRowCell>
									</IcapTableRow>
								)) }
							</IcapTableBody>
						</IcapTable>
					</div>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<h3 className='font-semibold mb-2'>IcapTable</h3>
				<PropsTable props={ tableProps }/>
				<h3 className='font-semibold mt-4 mb-2'>IcapTableHeaderCell / IcapTableRowCell</h3>
				<PropsTable props={ headerCellProps }/>
				<h3 className='font-semibold mt-4 mb-2'>IcapTableRow</h3>
				<PropsTable props={ rowProps }/>
				<Callout>
					<InlineCode>IcapTableHeader</InlineCode> renders the <InlineCode>&lt;thead&gt;</InlineCode> and its row, so put header cells
					directly inside it. Every part forwards its native element's attributes (<InlineCode>onClick</InlineCode> on rows,
					<InlineCode>colSpan</InlineCode> on cells, …). On narrow screens the table scrolls horizontally inside the card.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
