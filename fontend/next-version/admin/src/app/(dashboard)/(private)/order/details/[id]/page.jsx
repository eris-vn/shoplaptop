'use client'
// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

// Component Imports
import OrderDetailsCard from './OrderDetailsCard'
import { Card, CardContent, CardHeader, Chip, MenuItem } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { useEffect, useMemo, useState } from 'react'

import useFetch from '@/hooks/useFetch'

// MUI Imports
import Checkbox from '@mui/material/Checkbox'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import styles from '@core/styles/table.module.css'

// Component Imports
import Link from '@components/Link'

const OrderDetails = ({ orderData, params }) => {
  const { data: order } = useFetch(`admin/orders/info?id=${params.id}`)

  useEffect(() => {
    if (order) {
      setStatus(order.data.status)
      setData(order.data.OrderDetails)
    }
  }, [order])

  const [status, setStatus] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(() => [])

  const onUpdate = async file => {
    fetch(`${process.env.API_URL}/admin/orders/update`, {
      method: 'put',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        id: order.data.id,
        status: status
      })
    })

    window.location.href = '/order'
  }

  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <div className='flex items-center'>
            <Checkbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler()
              }}
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
          </div>
        )
      },
      columnHelper.accessor('product.name', {
        cell: info => info.getValue(),
        header: 'SẢN PHẨM'
      }),
      columnHelper.accessor('product.price', {
        cell: info =>
          parseInt(info.getValue()).toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND'
          }),
        header: 'Giá'
      }),
      columnHelper.accessor('quantity', {
        cell: info => info.getValue(),
        header: 'Số lượng'
      }),
      columnHelper.accessor('total', {
        cell: ({ row }) => (
          <>
            <div>
              {(parseInt(row.original.product.price) * parseInt(row.original.quantity)).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND'
              })}
            </div>
          </>
        ),
        header: 'Tổng cộng'
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: () => false
    }
  })

  return (
    <>
      <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6 mb-6'>
        <div>
          <Typography variant='h4' className='mbe-1'>
            ĐƠN HÀNG #{params.id}
          </Typography>
        </div>
        <div className='flex flex-wrap max-sm:flex-col gap-4'>
          <Button variant='contained' onClick={() => onUpdate()}>
            Lưu
          </Button>
        </div>
      </div>

      {order ? (
        <>
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title='Chi tiết đơn hàng' />
                    <div className='overflow-x-auto'>
                      <table className={styles.table}>
                        <thead>
                          {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                              {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody>
                          {table
                            .getRowModel()
                            .rows.slice(0, 10)
                            .map(row => {
                              return (
                                <tr key={row.id} {...(row.getIsSelected() && { className: 'selected' })}>
                                  {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                  ))}
                                </tr>
                              )
                            })}
                        </tbody>
                      </table>
                    </div>
                    <CardContent>
                      Tổng cộng:{' '}
                      {order.data.total_price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND'
                      })}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title='Địa chỉ giao hàng' />
                    <CardContent>
                      <div>
                        <div>Tên người nhận: {order.data.address.name}</div>
                        <div> Số điện thoại: {order.data.address.phone_number}</div>
                        <div>Địa chỉ: {order.data.address.address}</div>
                      </div>
                      <div class='mt-6'>
                        <div class='text-body-1 text-body-1 text-high-emphasis font-weight-medium'>
                          Phương thức thanh toán{' '}
                        </div>
                        <div class='text-body-1'>Ship COD</div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <CustomTextField
                        select
                        fullWidth
                        label='Trạng thái'
                        value={status}
                        placeholder='Chọn trạng thái'
                        onChange={e => setStatus(e.target.value)}
                      >
                        <MenuItem value={0}>Chờ xử lý</MenuItem>
                        <MenuItem value={1}>Đã đóng gói</MenuItem>
                        <MenuItem value={2}>Đang giao hàng</MenuItem>
                        <MenuItem value={3}>Giao hàng thành công</MenuItem>
                        <MenuItem value={4}>Giao thất bại</MenuItem>
                        <MenuItem value={5}>Đã huỷ</MenuItem>
                      </CustomTextField>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title='Thông tin khách hàng' />
                    <CardContent>
                      <div class='d-flex align-center'>
                        <div>
                          <div class='text-body-1 font-weight-medium'>{order.data.user.name}</div>
                          <span class='text-sm text-disabled'>Customer ID: #{order.data.user.id}</span>
                        </div>
                      </div>
                      <div class='mt-6'>
                        <span>Email: {order.data.user.email}</span> <br />
                        <span>Số điện thoại: {order.data.address.phone_number ?? 'chưa liên kết'}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default OrderDetails
