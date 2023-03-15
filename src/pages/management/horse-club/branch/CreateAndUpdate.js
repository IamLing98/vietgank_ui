import React, { useEffect, useMemo, useState } from 'react';
import constants from 'utils/constants';

import { useForm, Controller } from 'react-hook-form';

import { toast } from 'react-toastify';

import * as yup from 'yup';
import { 
  Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow,
  TableSortLabel, Toolbar, Typography, Paper, TextField,
  Checkbox, IconButton, Tooltip, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup';
import { visuallyHidden } from '@mui/utils';
import ServiceDialog from './ServiceDialog'
import CKEditor from 'components/Editor'

// import TextField from '@mui/material/TextField';

import DateFnsUtils from '@date-io/date-fns';
// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider
// } from "@mui/material";
// import MuiAutoComplete from "./MuiAutoComplete";

import DatePicker from '@mui/lab/DatePicker';
import dataUtils from 'utils/dataUtils';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CloseCircleOutlined } from '@ant-design/icons'

const initDefaultValues = {
  bookingInfo: {
    name: null,
    description: null,
    address: null,
    images: [],
    thumbnail: null
  },
  services: [],
  bookingTypeCode: 'HORSE_CLUB'
};

export default ({ onSubmit, pageStatus, setPageStatus, services }) => {
  const [defaultValues, setDefaultValues] = useState({ ...initDefaultValues });
  const [newImages, setNewImages] = useState([])
  const [dense, setDense] = React.useState(true)
  const [orderBy, setOrderBy] = React.useState('calories');

  const [thumbnail, setThumbnail] = useState(null)
  const [currentServices, setCurrentServices] = useState([
    ...pageStatus.record?.services || []
  ])

  const [currentImages, setCurrentImages] = useState([])
  const [updating, setUpdating] = useState(false)
  const [serviceDialogTitle, setServiceDialogTitle] = useState('Thêm mới dịch vụ')

  const schema = yup.object().shape({
    bookingInfo: yup.object().shape({
      name: yup.string().nullable().required('Trường thông tin bắt buộc'),
      address: yup.string().nullable().required('Trường thông tin bắt buộc')
    })
  });

  const [servicesModalOpen, setServicesModalOpen] = useState(false)
  const handleOpenServicesModal = () => setServicesModalOpen(true)
  const handleCloseServicesModal = () => setServicesModalOpen(false)

  const serviceHeadCells = useMemo(() => {
    return [
      {
        id: 'serviceName',
        numeric: false,
        disablePadding: true,
        label: 'Tên dịch vụ',
        render: (value, record, index) => {
          return (
            <p className="text-ellipsis overflow-hidden whitespace-nowrap" style={{
              maxWidth: '200px'
            }}>
              {record?.serviceInfo?.name}
            </p>
          );
        }
      },
    ]
  }, [])

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    control
  } = useForm({
      resolver: yupResolver(schema),
      mode: 'onChange',
      defaultValues: useMemo(() => {
        return pageStatus.record;
      }, [JSON.stringify(pageStatus)])
    })
  
  const onNewImages = e => {
    e.preventDefault();
    const newFiles = []
    const files = e.target.files
    for (const file of files) {
      let url = URL.createObjectURL(file)
      file.url = url
      newFiles.push(file)
    }   
    setNewImages([
      ...newImages,
      ...newFiles
  ])
  }

  const onNewThumbnail = e => {
    e.preventDefault()
    console.log(e.target.files)
    let file = e.target.files[0]
    let url = URL.createObjectURL(file)
    file.url = url
    setThumbnail(file)
  }

  const onRemoveNewImage = idx => {
    setNewImages([
      ...newImages.slice(0, idx),
      ...newImages.slice(idx + 1, newImages.length)
    ])
  }

  const onRemoveImage = idx => {
    console.log(idx)
    setCurrentImages([
      ...currentImages.slice(0, idx),
      ...currentImages.slice(idx + 1, currentImages.length)
    ])
  }

  const handleNewService = serviceInfo => {
    console.log(serviceInfo)
    let existedService = currentServices.find(item => item._id == serviceInfo._id)
    if (existedService) {
      toast.error('Dịch vụ đã tồn tại ở chi nhánh này')
      return
    }
    setCurrentServices([
      ...currentServices,
      serviceInfo
    ])
    setServicesModalOpen(false)
  }

  useEffect(() => {
    if (updating) {
      toast.info('Đang cập nhật')
    }
  }, [updating])

  useEffect(() => {
    if (pageStatus.status == 'UPDATE') {
      setCurrentImages([...pageStatus.record?.bookingInfo?.images])
    }
}, [JSON.stringify(pageStatus.record?.bookingInfo?.images )])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }}>
      <div className="py-3">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            {pageStatus?.status === constants?.PAGE_STATUS.CREATE.status ? `Tạo mới địa điểm` : `Cập nhật địa điểm (${pageStatus?.record?.bookingInfo?.name})`} 
          </h2>
        </div>
      </div>
      <form>
        <div className="container bg-white p-3">
          <div className="flex items-center gap-x-3">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Thông tin chi nhánh</h3>
          </div>
          <div className="grid grid-cols-2 gap-4"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-3">
          <Box>
            <Controller
              render={({ field, formState, fieldState }) => {
                return (
                  <TextField
                    {...field}
                    label="Tên chi nhánh"
                    error={!!formState.errors?.bookingInfo?.name}
                    placeholder="Tên chi nhánh"
                    className="mt-3 w-full"
                    type="text"
                    required
                    inputProps={{ maxLength: 50 }}
                  />
                );
              }}
              name="bookingInfo.name"
              control={control}
            />
            <p className="text-red">{errors?.bookingInfo?.name?.message}</p>
          </Box>
          <Box>
            <Controller
              render={({ field, formState, fieldState }) => {
                return (
                  <TextField
                    {...field}
                    label="Địa chỉ"
                    error={!!formState.errors?.bookingInfo?.address}
                    placeholder="Địa chỉ"
                    className="mt-3 w-full"
                    type="text"
                    required
                  />
                );
              }}
              name="bookingInfo.address"
              control={control}
            />
            <p className="text-red">{errors?.bookingInfo?.address?.message}</p>
          </Box>
        </div>
        <div className="container bg-white p-3 mt-5">
          <div className="flex items-center gap-x-3">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Thumbnail</h3>

            <Button style={{ margin: '5px' }}>
              <label style={{
                cursor: 'pointer',
                }}
                htmlFor="thumbnail">
                  Cập nhật
              </label>
              <input type="file"
                accept='image/*'
                onChange={onNewThumbnail}
                id="thumbnail"
                style={{
                  display: 'none'
                }}
              />
            </Button>
          </div>
          <div className="flex items-center gap-x-3 flex-wrap">
            {thumbnail && <div 
              className="cursor-pointer bg-cover bg-no-repeat bg-center"
              style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                backgroundImage: `url(${thumbnail.url})` 
            }}></div>}
            {!thumbnail && pageStatus.record?.bookingInfo?.thumbnail && <div 
              className="cursor-pointer bg-cover bg-no-repeat bg-center"
              style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                backgroundImage: `url(${pageStatus.record?.bookingInfo?.thumbnail})` 
            }}></div>}
          </div>
      </div>
      <div className="container bg-white p-3 mt-5">
        <div className="flex items-center gap-x-3">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Hình ảnh chi nhánh</h3>

          <Button style={{ margin: '5px' }}>
            <label style={{
              cursor: 'pointer',
              }}
              htmlFor="files">
                  Thêm mới
            </label>
            <input type="file"
              accept='image/*'
              onChange={onNewImages}
              multiple="multiple"
              id="files"
              style={{
                  display: 'none'
              }}
            />
          </Button>
        </div>
          <div className="flex items-center gap-x-3 flex-wrap">
            {newImages.map((image, idx) => (
              <div key={idx} 
                className="cursor-pointer bg-cover bg-no-repeat bg-center" 
                style={{
                  position: 'relative',
                  width: '200px',
                  height: '200px',
                  backgroundImage: `url(${image.url})` 
                }}>
                <Tooltip title="Xóa">
                  <CloseCircleOutlined color='red' size='large' style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    fontSize: '25px',
                    cursor: 'pointer',
                    color: 'red'
                  }} onClick={e => {
                    e.preventDefault()
                    onRemoveNewImage(idx)}} 
                  />
                </Tooltip>
              </div>
            ))}
            {currentImages.map((image, idx) => (
              <div key={image} 
                className="cursor-pointer bg-cover bg-no-repeat bg-center" 
                style={{
                  position: 'relative',
                  width: '200px',
                  height: '200px',
                  backgroundImage: `url(${image})` 
                }}>
                <Tooltip title="Xóa">
                  <CloseCircleOutlined color='red' size='large' style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    fontSize: '25px',
                    cursor: 'pointer',
                    color: 'red'
                  }} onClick={e => {
                    e.preventDefault()
                    onRemoveImage(idx)}} 
                  />
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      <div className="container bg-white p-3 mt-5">
        <CKEditor
          title='Mô tả địa điểm'
          onChange={(event, editor, data) => {
            console.log(event.data)
            setValue('bookingInfo.description', event.data)
          }}
          defaultData={getValues('bookingInfo.description')}
        />
      </div>
      <div className="container bg-white p-3 mt-5">
        <div className="flex items-center gap-x-3">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Danh sách dịch vụ</h3>
          <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              onClick={handleOpenServicesModal}
          >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
              >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Thêm</span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {serviceHeadCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                  >
                    {headCell.label?.toUpperCase()}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
            <TableBody>
              {currentServices.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={false}
                    tabIndex={-1}
                    key={row._id}
                    selected={false}
                  >
                    {serviceHeadCells.map((cell, cellIndex) => {
                        return (
                          <TableCell align="left">
                              {cell?.render ? cell?.render(row[cell.id], row, index) : row[cell.id]}
                          </TableCell>
                        );
                    })}
                  </TableRow>
                )})}
            </TableBody>
          </TableHead>
          </Table>
          </TableContainer>
        </div>
      </div>
      <ServiceDialog 
        open={servicesModalOpen}
        services={services}
        handleClose={handleCloseServicesModal}
        title={serviceDialogTitle}
        isNew={true}
        handleOk={handleNewService}
      />
      <div className="container flex justify-end p-3 mt-5">
        <button
          type="button "
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit(function (values) {
            console.log(values)
            setUpdating(true)
            values.bookingInfo.images = currentImages
            values.bookingTypeCode = 'HORSE_CLUB'
            values.services = dataUtils.camelToSnakeCaseWithArray(currentServices)
            onSubmit({
              newImages,
              thumbnail,
              booking: dataUtils.camelToSnakeCase(values)
            }, () => setUpdating(false));
          })}
          disabled={updating}
        >
          {pageStatus?.status === constants?.PAGE_STATUS.CREATE.status ? 'Tạo mới ' : 'Cập nhật '}
        </button>
        <button
          type="button "
          className="mx-3 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setPageStatus(constants.PAGE_STATUS.LIST)}
          disabled={updating}
        >
          Quay lại
        </button>
      </div>
      </form>
    </div>
  )
}