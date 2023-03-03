import * as React from 'react'; 
import Dialog from '@mui/material/Dialog'; 
import constants from 'utils/constants';

export default function AlertDialog({ open, pageStatus, setPageStatus, onSubmit, title, content }) {
    const handleClose = () => {
        setPageStatus({ ...constants.PAGE_STATUS.LIST });
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                {/* <DialogContent> */}
                {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
                <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                    <div className="md:flex items-center">
                        <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            <i className="bx bx-error text-3xl" />
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                            <p className="font-bold">{title || 'Xóa tài khoản'}</p>
                            <p className="text-sm text-gray-700 mt-1">{content || 'Xóa tài khoản này sẽ ngăn người dùng truy cập hệ thống?'}</p>
                        </div>
                    </div>
                    <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button
                            onClick={() => onSubmit(pageStatus?.record)}
                            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2 hover:bg-red-300"
                        >
                            Đồng ý
                        </button>
                        <button
                            onClick={() => handleClose()}
                            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
    md:mt-0 md:order-1  hover:bg-gray-300"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
                {/* </DialogContent> */}
                {/* <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}
