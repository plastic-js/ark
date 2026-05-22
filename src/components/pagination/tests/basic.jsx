import { Pagination } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Pagination.Root defaultPage={2} {...props}>
    <Pagination.FirstTrigger>«</Pagination.FirstTrigger>
    <Pagination.PrevTrigger>Prev</Pagination.PrevTrigger>
    <Pagination.Item data-page={1}>1</Pagination.Item>
    <Pagination.Item data-page={2}>2</Pagination.Item>
    <Pagination.Item data-page={3}>3</Pagination.Item>
    <Pagination.NextTrigger>Next</Pagination.NextTrigger>
    <Pagination.LastTrigger>»</Pagination.LastTrigger>
  </Pagination.Root>
)
