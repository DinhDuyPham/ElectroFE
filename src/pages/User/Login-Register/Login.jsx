import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import cartApi from "../../../api/cartApi";

function Login() {
  const [accessToken, setAccessToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    page: "user",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const getUser = async () => {
    const response = await fetch("/api/auth/", {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = await response.json();

    if (user) {
      Cookies.set("user", JSON.stringify(user), {
        expires: 1,
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      navigate("/");
    }
  };

  if (accessToken) {
    getUser();
    cartApi.initCart(accessToken);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password.length >= 6) {
      const response = await fetch("/api/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setAccessToken(data.accessToken);
        Cookies.set("access_token", data.accessToken, {
          expires: 1,
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } else {
      toast.error("Mật khẩu phải ít nhất là 6 ký tự");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-register-user">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content-box">
              <h2 className="content-title mb-4">Đăng nhập tài khoản</h2>

              <div className="content-validation px-4">
                <form action="" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      Địa chỉ Email <span>*</span>{" "}
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Mật khẩu <span>*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                      {showPassword ? (
                        <FaEyeSlash onClick={handleTogglePassword} />
                      ) : (
                        <FaEye onClick={handleTogglePassword} />
                      )}
                    </div>
                  </div>

                  <div className="my-4">
                    <button className="btn btn-submit w-100 px-4">
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>

              <div className="text-center">
                <p>
                  Bạn chưa có tài khoản?
                  <Link to="/register" className="signup-link">
                    {" "}
                    Đăng ký
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
