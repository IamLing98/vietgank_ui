import { ClassicEditor, TomSelect } from "@/base-components";
import { useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { goToList } from "../../../redux/reducers/pageSlice";
import FormMessage from "../../../base-components/form-message";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";

function Update({ dispatch ,pageReducer}) {
  const { addToast } = useToasts();

  const schema = yup.object().shape({
    place_name: yup.string().required("Trường thông tin bắt buộc "),
    place_address: yup.string().required("Trường thông tin bắt buộc "),
    camping_number: yup.number().required("Trường thông tin bắt buộc "),
    table_number: yup.number().required("Trường thông tin bắt buộc "),
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
    defaultValues: useMemo(() => {
      console.log(pageReducer?.record);
      return pageReducer?.record;
    }, JSON.stringify(pageReducer?.record)),
  });

  const onSubmit = (values) => {
    axios
      .post("/api/horse-place", values)
      .then((response) => {
        console.log(response);
        if (response?.data?.success) {
          addToast("Tạo mới thành công", {
            appearance: "success",
            autoDismiss: true,
          });
          dispatch(goToList());
        } else {
          addToast("Tạo mới thất bại", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      })
      .catch((error) => {
        addToast("Tạo mới thất bại", {
          appearance: "error",
          autoDismiss: true,
        });
        console.log(error);
      });
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Thêm mới cơ sở Vietgangz</h2>
      </div>
      <div className="grid grid-cols-6 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6">
          <div className="intro-y box p-5">
            <div>
              <label htmlFor="crud-form-1" className="form-label">
                Tên cơ sở
              </label>
              <input
                id="crud-form-1"
                {...register("place_name", { required: true })}
                type="text"
                className="form-control w-full"
                placeholder="Tên cơ sở"
              />
              <FormMessage errors={errors} field="place_name" />
            </div>
            <div>
              <label htmlFor="crud-form-1" className="form-label">
                Địa chỉ
              </label>
              <input
                id="crud-form-1"
                {...register("place_address", { required: true })}
                type="text"
                className="form-control w-full"
                placeholder="Địa chỉ"
              />
              <FormMessage errors={errors} field="place_address" />
            </div>

            <div className="mt-3">
              <label htmlFor="crud-form-1" className="form-label">
                Số lều
              </label>
              <input
                id="crud-form-1"
                {...register("camping_number", { required: true })}
                type="number"
                className="form-control w-full"
                placeholder="Số lều"
              />
              <FormMessage errors={errors} field="camping_number" />
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-1" className="form-label">
                Số bàn ăn
              </label>
              <input
                id="crud-form-1"
                {...register("table_number", { required: true })}
                type="text"
                className="form-control w-full"
                placeholder="Số bàn ăn"
              />
              <FormMessage errors={errors} field="table_number" />
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

export default Update;
