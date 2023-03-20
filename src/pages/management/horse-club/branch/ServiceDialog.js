import React, { useEffect, useMemo, useState } from 'react'

import {
  Button, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Box,
  TextField
} from '@mui/material'

export default ({ open, handleClose, handleOk, title, values, services, isNew }) => {

  const [serviceType, setServiceType] = useState(values?.serviceType || null)
  const [serviceName, setServiceName] = useState(values?.serviceInfo?.name || '')
  const [priceDetail, setPriceDetail] = useState(values?.priceDetail || {})

  useEffect(() => {
    if (serviceName) {
      let service = services.find(item => item.serviceInfo?.name == serviceName)
      console.log(service)
      if (service) {
        if (!values || !values.priceDetail) {
          setPriceDetail(service.priceDetail)
        }
        setServiceType(service.serviceType)
      }
    }
  }, [serviceName])

  useEffect(() => {
    setServiceType(values?.serviceType || null)
    setServiceName(values?.serviceInfo.name || '')      
    setPriceDetail(values?.priceDetail || {})
  }, [JSON.stringify(values)])


  const onClose = () => {
    setServiceType(null)
    setServiceName('')
    setPriceDetail({})
    handleClose()
  }

  function getPriceDetailForm(priceDetail, serviceType) {
    switch(serviceType) {
      case null:
        return <></>
      case "JUST_FOR_ONE_DAY":
        return (
          <>
            {priceDetail &&  Object.keys(priceDetail).map(key => {
                return (<>
                  <h2 className='my-3 text-base'>{priceDetail[key].title}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Box>
                      <FormControl sx={{ minWidth: 120 }} className="w-full" fullWidth>
                        <TextField
                          label={`Giá`}
                          value={priceDetail[key].price}
                          placeholder={priceDetail[key].title}
                          className="mt-3 w-full"
                          type="number"
                          required
                          inputProps={{ maxLength: 50 }}
                          onChange={e => setPriceDetail({
                            ...priceDetail,
                            [key]: {
                              ...priceDetail[key],
                              price: Number(e.target.value) || 0
                            }
                          })}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl sx={{ minWidth: 120 }} className="w-full" fullWidth>
                          <TextField
                            label={`Ghi chú`}
                            value={priceDetail[key].note}
                            placeholder={'Ghi chú'}
                            className="mt-3 w-full"
                            type="text"
                            inputProps={{ maxLength: 50 }}
                            onChange={e => setPriceDetail({
                              ...priceDetail,
                              [key]: {
                                ...priceDetail[key],
                                note: e.target.value
                              }
                            })}
                          />
                        </FormControl>
                    </Box>
                  </div>
                </>)
              })
            }
          </>
        )
      case "COURSE":
        return (<>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <Box>
              <FormControl sx={{ minWidth: 120 }} className="w-full" fullWidth>
                <TextField
                  label={`Giá`}
                  value={priceDetail.price}
                  placeholder={`Giá`}
                  className="mt-3 w-full"
                  type="number"
                  required
                  inputProps={{ maxLength: 50 }}
                  onChange={e => setPriceDetail({
                    ...priceDetail,
                    price: Number(e.target.value) || 0
                  })}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ minWidth: 120 }} className="w-full" fullWidth>
                  <TextField
                    label={`Số tháng học`}
                    value={priceDetail.numberOfMonths}
                    placeholder={'Số tháng học'}
                    className="mt-3 w-full"
                    type="number"
                    required
                    inputProps={{ maxLength: 50 }}
                    onChange={e => setPriceDetail({
                      ...priceDetail,
                      numberOfMonths: Number(e.target.value) || 0
                    })}
                  />
                </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ minWidth: 120 }} className="w-full" fullWidth>
                  <TextField
                    label={`Số buổi học`}
                    value={priceDetail.numberOfSessions}
                    placeholder={'Số buổi học'}
                    className="mt-3 w-full"
                    type="number"
                    required
                    inputProps={{ maxLength: 50 }}
                    onChange={e => setPriceDetail({
                      ...priceDetail,
                      numberOfSessions: Number(e.target.value) || 0
                    })}
                  />
                </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ minWidth: 120 }} className="w-full" fullWidth>
                  <TextField
                    label={`Ghi chú`}
                    value={priceDetail.note}
                    placeholder={'Ghi chú'}
                    className="mt-3 w-full"
                    type="text"
                    inputProps={{ maxLength: 50 }}
                    onChange={e => setPriceDetail({
                      ...priceDetail,
                        note: e.target.value
                    })}
                  />
                </FormControl>
            </Box>
          </div>
        </>)
      default:
        return (
          <div className="grid grid-cols-2 gap-4 mt-3">
            <Box>
              <FormControl sx={{ minWidth: 120 }} className="w-full" fullWidth>
                <TextField
                  label={`Giá`}
                  value={priceDetail.price}
                  placeholder={`Giá`}
                  className="mt-3 w-full"
                  type="number"
                  required
                  inputProps={{ maxLength: 50 }}
                  onChange={e => setPriceDetail({
                    ...priceDetail,
                    price: Number(e.target.value) || 0
                  })}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ minWidth: 120 }} className="w-full" fullWidth>
                  <TextField
                    label={`Ghi chú`}
                    value={priceDetail.note}
                    placeholder={'Ghi chú'}
                    className="mt-3 w-full"
                    type="text"
                    inputProps={{ maxLength: 50 }}
                    onChange={e => setPriceDetail({
                      ...priceDetail,
                        note: e.target.value
                    })}
                  />
                </FormControl>
            </Box>
          </div>
        )
    }
  }

  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={'md'}
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
      keepMounted={false}
    >
      <DialogTitle>
        <h2 style={{
          fontSize: 'large'
        }}>{title}</h2>
      </DialogTitle>
      <DialogContent>
        <Box>
          <FormControl sx={{ minWidth: 120 }} className="mt-3 w-full" fullWidth>
            <InputLabel required id="demo-simple-select-helper-label">
              Loại dịch vụ
            </InputLabel>{' '}
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Loại dịch vụ"
              fullWidth
              required
              value={serviceName}
              onChange={e => setServiceName(e.target.value)}
            >
              <MenuItem key={'null'} value={null} disabled={true}>
                Loại dịch vụ
              </MenuItem>
              {services?.map((item, index) => {
                return (
                  <MenuItem key={index + item?._id} value={item?.serviceInfo?.name}>
                      {item?.serviceInfo?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        {getPriceDetailForm(priceDetail, serviceType)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={(e) => {
          e.preventDefault()
          let service = services.find(item => item.serviceInfo?.name == serviceName)
          if (!service) return
          handleOk && handleOk({
            ...service,
            priceDetail
          })
        }}>{!values ? 'Thêm' : 'Cập nhật'}</Button>
      </DialogActions>
    </Dialog>
  )
}