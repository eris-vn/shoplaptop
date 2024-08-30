'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Pagination from '@mui/material/Pagination'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Style Imports
import styles from '@core/styles/table.module.css'
import { CardContent } from '@mui/material'

const productStatusObj = {
  0: { title: 'Chờ xử lý', color: 'primary' },
  1: { title: 'Đã đóng gói', color: 'success' },
  2: { title: 'Đang giao hàng', color: 'info' },
  3: { title: 'Giao thành công', color: 'primary' },
  4: { title: 'Giao hàng thất bại', color: 'warning' },
  5: { title: 'Đã huỷ', color: 'error' }
}

// Column Definitions
const columnHelper = createColumnHelper()

const Page = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [deleteID, setDeleteID] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [length, setLength] = useState(1)
  const [categoryID, setCategory] = useState('')
  const [status, setStatus] = useState('')

  const [data, setData] = useState(() => [])

  const fetchProduct = () => {
    fetch(`${process.env.API_URL}/admin/orders/list?page=${currentPage}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(data => data.json())
      .then(data => {
        setData(data.data)
        setCurrentPage(data.paginate.current_page)
        setLength(Math.ceil(data.paginate.total / data.paginate.per_page))
      })
  }

  useEffect(() => {
    fetchProduct()
  }, [currentPage, status, categoryID])

  const formatDate = date => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
  }

  // Hooks
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
      columnHelper.accessor('id', {
        cell: info => (
          <>
            <Link href={`/order/details/${info.getValue()}`}>#{info.getValue()}</Link>
          </>
        ),
        header: 'MÃ ĐƠN'
      }),
      columnHelper.accessor('created_at', {
        cell: info => `${formatDate(new Date(info.getValue()))}` ?? 'Không tìm thấy',
        header: 'Ngày đặt'
      }),
      columnHelper.accessor('total_price', {
        cell: info =>
          parseInt(info.getValue()).toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND'
          }),
        header: 'TỔNG GIÁ'
      }),
      columnHelper.accessor('status', {
        header: 'Trạng thái',
        cell: ({ row }) => (
          <Chip
            label={productStatusObj[row.original.status].title}
            variant='tonal'
            color={productStatusObj[row.original.status].color}
            size='small'
          />
        )
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
    <Card>
      <CardHeader title='Danh sách đơn hàng' />

      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
        <Pagination
          page={currentPage}
          onChange={(e, page) => {
            setCurrentPage(page)
          }}
          count={length}
          color='primary'
          variant='tonal'
        />
      </CardContent>
    </Card>
  )
}

export default Page
