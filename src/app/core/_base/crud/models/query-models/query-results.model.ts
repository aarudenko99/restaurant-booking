export class QueryResultsModel {
	// fields
	data: any[];
	totalCount: number;
	errorMessage: string;

	constructor(_items: any[] = [], _totalCount: number = 0, _errorMessage: string = '') {
		this.data = _items;
		this.totalCount = _totalCount ? _totalCount : _items.length;
	}
}
