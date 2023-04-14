import { ClassicEditor, TomSelect } from "@/base-components";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { goToList } from "../../../redux/reducers/pageSlice";
import FormMessage from "../../../base-components/form-message";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";

function Create({ dispatch }) {
  const { addToast } = useToasts(); 

  const schema = yup.object().shape({
    username: yup.string().required("Trường thông tin bắt buộc "),
    full_name: yup.string().required("Trường thông tin bắt buộc "),
    role: yup.string().required("Trường thông tin bắt buộc "),
    phone_number: yup.string().required("Trường thông tin bắt buộc "),
    email: yup.string().required("Trường thông tin bắt buộc "),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    axios
      .post("/api/admin-accounts", values)
      .then((response) => {
        console.log(response);
        addToast("Tạo mới thành công", {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch(goToList());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Thêm mới tài khoản</h2>
      </div>
      <div className="grid grid-cols-6 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box p-5">
            <div>
              <label htmlFor="crud-form-1" className="form-label">
                Tài khoản
              </label>
              <input
                id="crud-form-1"
                {...register("username", { required: true })}
                type="text"
                className="form-control w-full"
                placeholder="Tài khoản"
              />
              <FormMessage errors={errors} field="username" />
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-2" className="form-label">
                Quyền tài khoản
              </label>
              <TomSelect
                id="crud-form-2"
                value={getValues("role")}
                onChange={(value) => {
                  console.log(value);
                  setValue("role", value);
                }}
                className="w-full"
              >
                <option value="admin">ADMIN</option>
                <option value="super_admin">Super Admin</option>
              </TomSelect>
              <FormMessage errors={errors} field="full_name" />
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-1" className="form-label">
                Họ và tên
              </label>
              <input
                id="crud-form-1"
                {...register("full_name", { required: true })}
                type="text"
                className="form-control w-full"
                placeholder="Họ và tên"
              />
              <FormMessage errors={errors} field="full_name" />
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-1" className="form-label">
                Email
              </label>
              <input
                id="crud-form-1"
                {...register("email", { required: true })}
                type="text"
                className="form-control w-full"
                placeholder="Email"
              />
              <FormMessage errors={errors} field="email" />
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-1" className="form-label">
                Số điện thoại
              </label>
              <input
                id="crud-form-1"
                {...register("phone_number", { required: true })}
                type="text"
                className="form-control w-full"
                placeholder="Số điện thoại"
              />
              <FormMessage errors={errors} field="phone_number" />
            </div>

            <div className="text-right mt-5">
              <button
                onClick={(e) => dispatch(goToList())}
                type="button"
                className="btn btn-outline-secondary w-24 mr-1"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary w-24"
                onClick={handleSubmit(function (values) {
                  onSubmit(values);
                })}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
