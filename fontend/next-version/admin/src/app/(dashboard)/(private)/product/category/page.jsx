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

import AddCategoryDrawer from './AddCategoryDrawer'

const productStatusObj = {
  0: { title: 'Hiển thị', color: 'success' },
  1: { title: 'Ẩn', color: 'error' }
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

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)

  const handleClose = () => setOpenAlert(false)

  const handleAddCategoryClick = () => {
    setEditMode(false)
    setCurrentCategory(null)
    setDrawerOpen(true)
  }

  // Handle Edit Category Click
  const handleEditCategoryClick = category => {
    setEditMode(true)
    setCurrentCategory(category)
    setDrawerOpen(true)
  }

  // Handle Drawer Close
  const handleDrawerClose = () => {
    setDrawerOpen(false)
    fetchCategoryList()
  }

  const onDelete = () => {
    fetch(`${process.env.API_URL}/admin/category/delete`, {
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
        fetchCategoryList()
      })
  }

  const [data, setData] = useState(() => [])

  const fetchCategoryList = () => {
    fetch(`${process.env.API_URL}/admin/category/list`, {
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
    fetchCategoryList()
  }, [currentPage, categoryID])

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
        header: 'TÊN DANH MỤC'
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
        header: 'HÀNH ĐỘNG',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleEditCategoryClick(row.original)}>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>

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
      <div className='flex flex-wrap justify-between gap-4 px-6 mt-6 mb-6'>
        <div className='flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
          <Button
            variant='contained'
            className='max-sm:is-full is-auto'
            startIcon={<i className='tabler-plus' />}
            onClick={() => handleAddCategoryClick()}
          >
            Tạo danh mục
          </Button>
        </div>
      </div>
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
          <DialogContentText id='alert-dialog-description'>Bạn có chắc muốn xoá danh mục này</DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Đóng</Button>
          <Button onClick={onDelete}>Đồng ý</Button>
        </DialogActions>
      </Dialog>

      <AddCategoryDrawer
        open={drawerOpen}
        handleClose={handleDrawerClose}
        editMode={editMode}
        currentCategory={currentCategory}
      />
    </Card>
  )
}

export default Page
