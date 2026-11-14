import { type ComponentProps, createContext, type ReactNode, use, useState } from "react";
import { IcapCard } from "@shared/components/IcapCard";
import "./IcapTable.css";

/* ---------------------------------------------------------------- types */

export type IcapTableSortDirection = "asc" | "desc";
export type IcapTableSort = { key: string; direction: IcapTableSortDirection } | null;
export type IcapTableAlign = "start" | "center" | "end";

export type IcapTableProps = Omit<ComponentProps<"table">, "children"> & {
	/** `IcapTableHeader` and `IcapTableBody`. */
	children?: ReactNode;
	/** Current sort (controlled). `null` = unsorted. */
	sort?: IcapTableSort;
	/** Initial sort (uncontrolled). */
	defaultSort?: IcapTableSort;
	/**
	 * Fired when the user clicks a sortable header. Cycles ascending → descending → unsorted.
	 * The table doesn't reorder rows itself: sort your data here and render the rows in that order.
	 */
	onSortChange?: (sort: IcapTableSort) => void;
	/** Classes on the wrapping `IcapCard` (`className` goes on the `<table>`). */
	cardClassName?: string;
};

export type IcapTableHeaderProps = ComponentProps<"thead">;
export type IcapTableBodyProps = ComponentProps<"tbody">;

export type IcapTableHeaderCellProps = Omit<ComponentProps<"th">, "align"> & {
	/** Makes the column sortable; this key is reported in `onSortChange`. */
	sortKey?: string;
	/** Text alignment. Default: `"start"`. */
	align?: IcapTableAlign;
};

export type IcapTableRowProps = ComponentProps<"tr"> & {
	/** Highlights the row on hover (e.g. for clickable rows). Default: `false`. */
	hoverable?: boolean;
};

export type IcapTableRowCellProps = Omit<ComponentProps<"td">, "align"> & {
	/** Text alignment. Default: `"start"`. */
	align?: IcapTableAlign;
};

/* -------------------------------------------------------------- context */

type SortContextValue = { sort: IcapTableSort; toggleSort: (key: string) => void };
const SortContext = createContext<SortContextValue | null>(null);

/** asc → desc → unsorted; a different column starts at asc. */
const nextSort = (current: IcapTableSort, key: string): IcapTableSort => {
	if (current?.key !== key) return { key, direction: "asc" };
	return current.direction === "asc" ? { key, direction: "desc" } : null;
};

/* ---------------------------------------------------------------- parts */

/**
 * Table inside an `IcapCard`. The table itself is borderless; body rows alternate, and the
 * darker rows get top and bottom borders.
 *
 * ```tsx
 * <IcapTable onSortChange={setSort}>
 *   <IcapTableHeader>
 *     <IcapTableHeaderCell>Fund</IcapTableHeaderCell>
 *     <IcapTableHeaderCell sortKey="units" align="end">Units</IcapTableHeaderCell>
 *   </IcapTableHeader>
 *   <IcapTableBody>
 *     <IcapTableRow hoverable>
 *       <IcapTableRowCell>…</IcapTableRowCell>
 *       <IcapTableRowCell align="end">…</IcapTableRowCell>
 *     </IcapTableRow>
 *   </IcapTableBody>
 * </IcapTable>
 * ```
 */
export const IcapTable = ({
	sort,
	defaultSort = null,
	onSortChange,
	cardClassName = "",
	className = "",
	children,
	...props
}: IcapTableProps) => {
	const [internalSort, setInternalSort] = useState<IcapTableSort>(defaultSort);
	const currentSort = sort !== undefined ? sort : internalSort;

	const toggleSort = (key: string) => {
		const next = nextSort(currentSort, key);
		if (sort === undefined) setInternalSort(next);
		onSortChange?.(next);
	};

	return (
		<IcapCard className={ `icap-table-card ${ cardClassName }` }>
			{/* Scrolls horizontally on narrow screens instead of squeezing the columns */ }
			<div className='icap-table-scroll'>
				<SortContext value={ { sort: currentSort, toggleSort } }>
					<table className={ `icap-table ${ className }` } { ...props }>
						{ children }
					</table>
				</SortContext>
			</div>
		</IcapCard>
	);
};

/** `<thead>` with a single row: put `IcapTableHeaderCell`s directly inside. */
export const IcapTableHeader = ({ className = "", children, ...props }: IcapTableHeaderProps) => (
	<thead className={ `icap-table-header ${ className }` } { ...props }>
		<tr>{ children }</tr>
	</thead>
);

const SortIcon = ({ direction }: { direction?: IcapTableSortDirection }) => (
	<svg className='icap-table-sort-icon' viewBox='0 0 10 16' aria-hidden='true' focusable='false'>
		<path className={ direction === "asc" ? "active" : "" } d='M5 1.5 8.5 6.5h-7z'/>
		<path className={ direction === "desc" ? "active" : "" } d='M5 14.5 1.5 9.5h7z'/>
	</svg>
);

/** Header cell. Pass `sortKey` to make the column sortable. */
export const IcapTableHeaderCell = ({ sortKey, align = "start", className = "", children, ...props }: IcapTableHeaderCellProps) => {
	const ctx = use(SortContext);
	const direction = sortKey && ctx?.sort?.key === sortKey ? ctx.sort.direction : undefined;

	return (
		<th
			scope='col'
			className={ `icap-table-header-cell align-${ align } ${ className }` }
			aria-sort={ sortKey ? (direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none") : undefined }
			{ ...props }>
			{ sortKey && ctx
				? (
					<button type='button' className={ `icap-table-sort ${ direction ? "sorted" : "" }` } onClick={ () => ctx.toggleSort(sortKey) }>
						{ children }
						<SortIcon direction={ direction }/>
					</button>
				)
				: children }
		</th>
	);
};

export const IcapTableBody = ({ className = "", ...props }: IcapTableBodyProps) =>
	<tbody className={ `icap-table-body ${ className }` } { ...props }/>;

export const IcapTableRow = ({ hoverable = false, className = "", ...props }: IcapTableRowProps) =>
	<tr className={ `icap-table-row ${ hoverable ? "hoverable" : "" } ${ className }` } { ...props }/>;

export const IcapTableRowCell = ({ align = "start", className = "", ...props }: IcapTableRowCellProps) =>
	<td className={ `icap-table-row-cell align-${ align } ${ className }` } { ...props }/>;
