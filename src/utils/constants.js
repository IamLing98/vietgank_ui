const constants = {
    PAGE_STATUS: {
        LIST: {
            status:'LIST'
        },
        CREATE: {
            status:'CREATE'
        },
        UPDATE: {
            status:'UPDATE'
        },
        DELETE: {
            status:'DELETE'
        },
        DETAIL: {
            status:'DETAIL'
        },
    },
    AUTH:{
        TOKEN:'12346598723471447711445AAVVAASD',
        USER_INFO:'USER_INFO1777514451277711233',
        P_DEFAULT:'123456'
    },
    TAB_ACTIVE_CLASS:{
        ACTIVE:'px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300',
        INACTIVE:'px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100',
    },
    HORSE_SERVICES_MAP: {
        "JUST_FOR_ONE_DAY": "Khóa tham quan",
        "COURSE": "Khóa học",
        "PICNIC": "Picnic",
        "STAY": "Lưu trú"
    },
    ORDER_STATUS: {
        ORDER_SUCCESS: "Đặt hàng thành công",
        ORDER_COMFIRM: "Xác nhận đặt hàng",
        ORDER_PREPARING: "Đang chuẩn bị hàng",
        ORDER_TRANSFORM: "Đã giao cho đơn vị vận chuyển",
        ORDER_DELIVERYING: "Đang giao hàng",
        ORDER_RECEIVED: "Nhận hàng thành công",
        ORDER_FAILED: "Từ chối/Không nhận hàng",
        WAIT_FOR_PAY: "Chờ thanh toán"
    },
    PAYMENT_TYPE: {
        MOMO: 'MOMO',
        BANK: 'Chuyển khoản ngân hàng',
        CASH: 'Tiền mặt'
    },
};

export default constants;
