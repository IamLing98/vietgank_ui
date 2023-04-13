import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import logoUrl from "@/assets/images/logo.svg";
import illustrationUrl from "@/assets/images/illustration.svg";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormMessage from "../../base-components/form-message";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required("Trường thông tin bắt buộc "),
  password: yup.string().required("Trường thông tin bắt buộc "),
});

function Login() {
  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  async function onSubmit(values) {
    try {
      await axios
        .post("/signin", values)
        .then(async (response) => {
          console.log(response.data);
          let data = response.data;
          if (data?.success) {
            await dispatch(
              loginSuccess({ token: data?.data?.access_token, userInfo: data?.data?.user_info }),
            );
            await navigate("/");
          } else {
            toast.error("Lỗi đăng nhập");
          }
        })
        .catch((error) => {
          toast.error("Lỗi đăng nhập");
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <img alt="Midone Tailwind HTML Admin Template" className="w-6" src={logoUrl} />
                <span className="text-white text-lg ml-3"> Vietgangz </span>
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="-intro-x w-1/2 -mt-16"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                  Manage all your e-commerce accounts in one place
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">Đăng nhập</h2>
                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                  A few more clicks to sign in to your account. Manage all your e-commerce accounts in one
                  place
                </div>
                <div className="intro-x mt-8">
                  <input
                    type="text"
                    className="intro-x login__input form-control py-3 px-4 block"
                    placeholder="Tài khoản"
                    {...register("username", { required: true })}
                  />
                  <FormMessage errors={errors} field="username" />
                  <input
                    type="password"
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Mật khẩu"
                    {...register("password", { required: true })}
                  />
                  <FormMessage errors={errors} field="password" />
                </div>
                <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                  <div className="flex items-center mr-auto">
                    <input id="remember-me" type="checkbox" className="form-check-input border mr-2" />
                    <label className="cursor-pointer select-none" htmlFor="remember-me">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <a href="">Quên mật khẩu</a>
                </div>
                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                  <button
                    className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                    onClick={handleSubmit(function (values) {
                      onSubmit(values);
                    })}
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
