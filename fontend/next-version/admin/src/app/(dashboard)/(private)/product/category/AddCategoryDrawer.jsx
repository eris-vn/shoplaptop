// React Imports
import { useState, useRef, useEffect } from 'react'
import slugify from 'slugify'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const AddCategoryDrawer = props => {
  // Props
  const { open, handleClose, categoryData, setData, editMode, currentCategory } = props

  // States
  const [id, setID] = useState('')
  const [fileName, setFileName] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('0')

  // Refs
  const fileInputRef = useRef(null)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: ''
    }
  })

  useEffect(() => {
    if (editMode && currentCategory) {
      resetForm({
        title: currentCategory.name
      })
      setID(currentCategory.id)
      setImage(currentCategory.image_url)
      setStatus(currentCategory.status.toString())
      setFileName(currentCategory.image_url ? 'Image selected' : '')
    } else {
      handleReset()
    }
  }, [editMode, currentCategory])

  // Handle Form Submit
  const handleFormSubmit = data => {
    const newData = {
      id: id,
      title: data.title,
      slug: slugify(data.title, { lower: true }),
      image: image,
      status: status
    }

    const url = editMode
      ? `${process.env.API_URL}/admin/category/update`
      : `${process.env.API_URL}/admin/category/create`
    const method = editMode ? 'PUT' : 'POST'

    fetch(url, {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
      .then(file => file.json())
      .then(data => {
        if (data.status == 200) {
          handleReset()
        }
      })
  }

  // Handle Form Reset
  const handleReset = () => {
    handleClose()
    setID('')
    resetForm({ title: '' })
    setFileName('')
    setImage('')
    setStatus('0')
  }

  // Handle File Upload
  const handleFileUpload = event => {
    const { files } = event.target

    if (files && files.length !== 0) {
      setFileName(files[0].name)

      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-6 plb-5'>
        <Typography variant='h5'>{editMode ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-textSecondary text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit(data => handleFormSubmit(data))} className='flex flex-col gap-5'>
          <Controller
            name='title'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Tựa đề'
                placeholder='Fashion'
                {...(errors.title && { error: true, helperText: 'Trường này không được bỏ trống.' })}
              />
            )}
          />
          {image ? (
            <>
              <img src={image} alt='' />
            </>
          ) : (
            ''
          )}
          <div className='flex items-end gap-4'>
            <CustomTextField
              label='Attachment'
              placeholder='No file chosen'
              value={fileName}
              className='flex-auto'
              InputProps={{
                readOnly: true,
                endAdornment: fileName ? (
                  <InputAdornment position='end'>
                    <IconButton size='small' edge='end' onClick={() => setFileName('')}>
                      <i className='tabler-x' />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }}
            />
            <Button component='label' variant='tonal' htmlFor='contained-button-file' className='min-is-fit'>
              Choose
              <input hidden id='contained-button-file' type='file' onChange={handleFileUpload} ref={fileInputRef} />
            </Button>
          </div>

          <CustomTextField
            select
            fullWidth
            label='Trạng thái '
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <MenuItem value='0'>Hiển thị</MenuItem>
            <MenuItem value='1'>Ẩn</MenuItem>
          </CustomTextField>
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              {editMode ? 'Cập nhật' : 'Thêm danh mục'}
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset}>
              Thôi
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddCategoryDrawer
