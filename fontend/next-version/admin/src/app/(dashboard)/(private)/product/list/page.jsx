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
  0: { title: 'Công khai', color: 'success' },
  1: { title: 'Không công khai', color: 'error' }
}

import CustomTextField from '@core/components/mui/TextField'
import useFetch from '@/hooks/useFetch'

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
  const [categoryList, setCategoryList] = useState([])
  const [status, setStatus] = useState('')

  const { data: categoryData } = useFetch('/admin/category/list', {
    method: 'POST'
  })

  useEffect(() => {
    if (categoryData) {
      setCategoryList(categoryData.data)
    }
  }, [categoryData])

  const handleClose = () => setOpenAlert(false)

  const onDelete = () => {
    fetch(`${process.env.API_URL}/admin/product/delete`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        id: deleteID
      })
    })
      .then(file => file.json())
      .then(data => {
        setDeleteID('')
        setOpenAlert(false)
        fetchProduct()
      })
  }

  const [data, setData] = useState(() => [])

  const fetchProduct = () => {
    fetch(`${process.env.API_URL}/admin/product/list`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        page: currentPage,
        category: categoryID,
        status: status
      })
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

  const onClear = () => {
    setCategory('')
    setStatus('')
    console.log(status)
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
      columnHelper.accessor('name', {
        cell: info => info.getValue(),
        header: 'SẢN PHẨM'
      }),
      columnHelper.accessor('category.name', {
        cell: info => info.getValue() ?? 'Không tìm thấy',
        header: 'Danh mục'
      }),
      columnHelper.accessor('price', {
        cell: info =>
          parseInt(info.getValue()).toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND'
          }),
        header: 'Giá'
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
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <Link href={`/product/edit/${row.original.id}`}>
              <IconButton>
                <i className='tabler-edit text-textSecondary' />
              </IconButton>
            </Link>

            <IconButton
              onClick={() => {
                setDeleteID(row.original.id)
                setOpenAlert(true)
              }}
            >
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
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
      <CardHeader title='Danh sách sản phẩm' />
      <div className='flex flex-wrap justify-between gap-4 px-6'>
        <div className='flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
          <Button
            variant='contained'
            component={Link}
            className='max-sm:is-full is-auto'
            href={`/product/add`}
            startIcon={<i className='tabler-plus' />}
          >
            Tạo sản phẩm
          </Button>
        </div>
      </div>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item md={4}>
            <CustomTextField
              select
              fullWidth
              label='Danh mục'
              value={categoryID}
              placeholder='Chọn danh mục'
              onChange={e => setCategory(e.target.value)}
            >
              {categoryList.map(category => {
                return <MenuItem value={category.id}>{category.name}</MenuItem>
              })}
            </CustomTextField>
          </Grid>
          <Grid item md={4}>
            <CustomTextField
              select
              fullWidth
              label='Trạng thái'
              value={status}
              placeholder='Chọn trạng thái'
              onChange={e => setStatus(e.target.value)}
            >
              <MenuItem value={0}>Công khai</MenuItem>
              <MenuItem value={1}>Không công khai</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item md={4}>
            <label>Hành động</label> <br />
            <Button variant='contained' className='max-sm:is-full is-auto' onClick={() => onClear()}>
              Xoá lọc
            </Button>
          </Grid>
        </Grid>
      </CardContent>
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

      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>XÁC NHẬN XOÁ #{deleteID}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Bạn có chắc muốn xoá sản phẩm này</DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Đóng</Button>
          <Button onClick={onDelete}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default Page
