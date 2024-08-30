'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

// Third-party Imports
import classnames from 'classnames'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

// Styled Component Imports
import AppReactDropzone from '@/libs/styles/AppReactDropzone'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

// Component Imports
import Link from '@components/Link'
import CustomAvatar from '@core/components/mui/Avatar'

const EditorToolbar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1 pbs-6 pbe-4 pli-6'>
      <CustomIconButton
        {...(editor.isActive('bold') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i className={classnames('tabler-bold', { 'text-textSecondary': !editor.isActive('bold') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('underline') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i className={classnames('tabler-underline', { 'text-textSecondary': !editor.isActive('underline') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('italic') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i className={classnames('tabler-italic', { 'text-textSecondary': !editor.isActive('italic') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive('strike') && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <i className={classnames('tabler-strikethrough', { 'text-textSecondary': !editor.isActive('strike') })} />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'left' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <i
          className={classnames('tabler-align-left', { 'text-textSecondary': !editor.isActive({ textAlign: 'left' }) })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'center' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <i
          className={classnames('tabler-align-center', {
            'text-textSecondary': !editor.isActive({ textAlign: 'center' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'right' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <i
          className={classnames('tabler-align-right', {
            'text-textSecondary': !editor.isActive({ textAlign: 'right' })
          })}
        />
      </CustomIconButton>
      <CustomIconButton
        {...(editor.isActive({ textAlign: 'justify' }) && { color: 'primary' })}
        variant='tonal'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        <i
          className={classnames('tabler-align-justified', {
            'text-textSecondary': !editor.isActive({ textAlign: 'justify' })
          })}
        />
      </CustomIconButton>
    </div>
  )
}

export default function Page() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something here...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    content: ``
  })

  const editor2 = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something here...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    content: ``
  })

  // States
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [price, setPrice] = useState(0)
  const [discountPrice, setDiscount] = useState(0)
  const [stockStatus, setStockStatus] = useState(true)
  const [status, setStatus] = useState('')
  const [categoryID, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const [categoryList, setCategoryList] = useState([])

  // data fetching
  useEffect(() => {
    fetch(`${process.env.API_URL}/admin/category/list`, {
      method: 'POST'
    })
      .then(data => data.json())
      .then(data => {
        setCategoryList(data.data)
      })
  }, [])

  useEffect(() => {
    files.map(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages([...images, { file: {}, url: reader.result }])
      }
      reader.readAsDataURL(file)
    })
  }, [files])

  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <i className='tabler-file-description' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)

    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    <ListItem key={file.name} className='pis-4 plb-3'>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name font-medium' color='text.primary'>
            {file.name}
          </Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className='tabler-x text-xl' />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const onCreate = async () => {
    const request = await fetch('http://localhost:4000/api/admin/product/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        slug: slug,
        short_description: editor.getHTML(),
        description: editor2.getHTML(),
        price: price,
        discount_price: discountPrice,
        category_id: categoryID,
        status: status,
        stock_status: stockStatus,
        images: images
      })
    })

    const res = await request.json()

    if (res.status == 200) {
      window.location.href = '/product/list'
    } else {
      toast.error(res.msg)
    }
  }

  return (
    <>
      <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6 mb-6'>
        <div>
          <Typography variant='h4' className='mbe-1'>
            Thêm sản phẩm mới
          </Typography>
        </div>
        <div className='flex flex-wrap max-sm:flex-col gap-4'>
          <Button variant='contained' onClick={onCreate}>
            Xuất Bản
          </Button>
        </div>
      </div>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Product Information' />
            <CardContent>
              <Grid container spacing={6} className='mbe-6'>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Tên sản phẩm'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Ví dụ: iPhone 14'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Đường dẫn'
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    placeholder='Ví dụ iphone-14'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography className='mbe-1'>Mô tả ngắn (Optional)</Typography>
                  <Card className='p-0 border shadow-none'>
                    <CardContent className='p-0'>
                      <EditorToolbar editor={editor} />
                      <Divider className='mli-6' />
                      <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex' />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Typography className='mbe-1'>Mô tả sản phẩm (Optional)</Typography>
                  <Card className='p-0 border shadow-none'>
                    <CardContent className='p-0'>
                      <EditorToolbar editor={editor2} />
                      <Divider className='mli-6' />
                      <EditorContent editor={editor2} className='bs-[135px] overflow-y-auto flex' />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Giá' />
            <CardContent>
              <Grid container spacing={6} className='mbe-6'>
                <Grid item xs={6}>
                  <CustomTextField
                    fullWidth
                    label='Giá bán'
                    value={price}
                    onChange={e => setPrice(parseInt(e.target.value))}
                    placeholder='Điền giá bán'
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextField
                    fullWidth
                    label='Giá giảm giá'
                    value={discountPrice}
                    onChange={e => setDiscount(e.target.value)}
                    placeholder='Điền giá giảm giá'
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Danh mục' />
            <CardContent>
              <Grid container spacing={6} className='mbe-6'>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Grid item>
            <Dropzone>
              <Card>
                <CardHeader title='Product Image' sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }} />
                <CardContent>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <div className='flex items-center flex-col gap-2 text-center'>
                      <CustomAvatar variant='rounded' skin='light' color='secondary'>
                        <i className='tabler-upload' />
                      </CustomAvatar>
                      <Typography variant='h4'>Drag and Drop Your Image Here.</Typography>
                      <Typography color='text.disabled'>or</Typography>
                      <Button variant='tonal' size='small'>
                        Browse Image
                      </Button>
                    </div>
                  </div>
                  {files.length ? (
                    <>
                      <List>{fileList}</List>
                      <div className='buttons'>
                        <Button color='error' variant='tonal' onClick={handleRemoveAllFiles}>
                          Remove All
                        </Button>
                        <Button variant='contained'>Upload Files</Button>
                      </div>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            </Dropzone>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
