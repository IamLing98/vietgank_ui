const data = { 
    columns :[
        {
            title:'#',
            value:'o_number',
            render:(value, record, index)=>{
                return 
            }
        },
        {
            title:'Tên người dùng',
            value:'info.fullName'
        },
        {
            title:'Tên tài khoản',
            value:'o_number'
        },
        {
            title:'Ngày tạo',
            value:'o_number'
        },
        {
            title:'Ngày cập nhật',
            value:'o_number'
        }, 
    ],
    dataSource:[
        {
            o_number:1,
            userInfo:{
                fullName:'Doan Van Linh'
            }

        }
    ]
}


export default {...data};