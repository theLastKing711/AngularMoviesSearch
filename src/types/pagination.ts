export interface IPaginationResult<T> {
  page: number,
  results: T[],
  total_results: number
}
