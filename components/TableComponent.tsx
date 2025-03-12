import { DataTable } from "react-native-paper";
import React, { useState, useEffect } from "react";

export interface ITableData {
	items: Record<string, any>[];
	columns: { title: string; key: string; numeric?: boolean }[];
	numberOfItemsPerPage?: number;
}

export function TableComponent(props: ITableData) {
	const [page, setPage] = useState(0);
	const itemsPerPage = props.numberOfItemsPerPage || 2;

	const from = page * itemsPerPage;
	const to = Math.min((page + 1) * itemsPerPage, props.items.length);

	useEffect(() => {
		setPage(0);
	}, [itemsPerPage]);

	return (
		<DataTable>
			<DataTable.Header>
				{props.columns.map((col) => (
					<DataTable.Title key={col.key} numeric={col.numeric}>
						{col.title}
					</DataTable.Title>
				))}
			</DataTable.Header>

			{props.items.slice(from, to).map((item, index) => (
				<DataTable.Row key={index}>
					{props.columns.map((col) => (
						<DataTable.Cell key={col.key} numeric={col.numeric}>
							{item[col.key]}
						</DataTable.Cell>
					))}
				</DataTable.Row>
			))}

			<DataTable.Pagination
				page={page}
				numberOfPages={Math.ceil(props.items.length / itemsPerPage)}
				onPageChange={(page) => setPage(page)}
				label={`${from + 1}-${to} de ${props.items.length}`}
				showFastPaginationControls
			/>
		</DataTable>	
	);
}
