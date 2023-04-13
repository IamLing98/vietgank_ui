import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
} from "@/base-components";
import { useEffect, useState } from "react";
import CommonTable from "../../components/common-table";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { goToCreate, goToUpdate, setDataSource } from "../../redux/reducers/pageSlice";

function AdminList({ pageReducer, dispatch }) {
  const columns = [
    {
      title: "Tên tài khoản",
      dataIndex: "username",
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      render: (value, record) => {
        return (
          <div className="flex justify-center items-center">
            <button onClick={(e) => dispatch(goToUpdate(record))} className="flex items-center mr-3" href="#">
              <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Sửa
            </button>
            <a
              className="flex items-center text-danger"
              href="#"
              onClick={() => {
                setDeleteConfirmationModal(record);
              }}
            >
              <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Xóa
            </a>
          </div>
        );
      },
    },
  ];

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  async function getDataSource() {
    axios
      .get(`/api/admin-accounts`)
      .then(async (response) => {
        let data = response.data;
        if (data?.success) {
          dispatch(setDataSource(data?.data));
        }
      })
      .catch((err) => {
        setData([]);
      });
  }
  useEffect(() => {
    getDataSource();
  }, []);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-4">Tài khoản quản trị viên</h2>
      <div className="grid grid-cols-12 gap-6 mt-4">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center ">
          <button className="btn btn-primary shadow-md mr-2" onClick={(e) => dispatch(goToCreate())}>
            Thêm tài khoản
          </button>
          <Dropdown>
            <DropdownToggle className="btn px-2 box">
              <span className="w-5 h-5 flex items-center justify-center">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="w-40">
              <DropdownContent>
                <DropdownItem>
                  <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to Excel
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to PDF
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          <div className="hidden md:block mx-auto text-slate-500"> </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input type="text" className="form-control w-56 box pr-10" placeholder="Search..." />
              <Lucide icon="Search" className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
            </div>
          </div>
        </div>
      </div>
      <CommonTable columns={columns} dataSource={pageReducer.dataSource} />
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide icon="XCircle" className="w-16 h-16 text-danger mx-auto mt-3" />
            <div className="text-3xl mt-5">Chắc chắn?</div>
            <div className="text-slate-500 mt-2">
              Bạn muốn xóa bản ghi này? <br />
              Thao tác sẽ không được hoàn lại
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Đóng
            </button>
            <button
              onClick={(e) => {
                console.log(deleteConfirmationModal);
              }}
              type="button"
              className="btn btn-danger w-24"
            >
              Xóa
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default AdminList;
