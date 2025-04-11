

import { h } from "vue"
import { ColumnBase, type DatalistColumnBase } from "devkit-admin/datalist"

export class ColumnRichText<TRecord extends Record<string, unknown>> extends ColumnBase<TRecord> implements DatalistColumnBase<TRecord> {
	renderHtml = (value: TRecord) => {
		try {
			console.log('typeos', typeof value[this.columnName])
			if (this.columnName in value) {
				if (typeof value[this.columnName] == 'string') {
					return h('span', { innerHTMl: value[this.columnName] as string })
				}
			}
		} catch (e) {
			return h('span', 'error_parsing_column')
		}

		return h('span', 'unable_to_parse')
	}
}
