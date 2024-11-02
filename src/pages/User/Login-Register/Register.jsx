import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    gender: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState([]);

  const handleTogglePassword = (index) => {
    setShowPassword((prevPasswords) => {
      const updatedPasswords = [...prevPasswords];
      updatedPasswords[index] = !updatedPasswords[index];
      return updatedPasswords;
    });
  };

  const handleSubmitResgister = async (event) => {
    event.preventDefault();

    if (
      formData.password.length >= 6 &&
      formData.confirm_password.length >= 6
    ) {
      const response = await fetch("/api/auth/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin");
      }
    } else {
      toast.error("Mật khẩu phải ít nhất là 6 ký tự");
    }
  };

  return (
    <div className="login-register-user">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content-box">
              <h2 className="content-title mb-4">Đăng ký tài khoản</h2>

              <div className="content-validation px-4">
                <form action="post" onSubmit={handleSubmitResgister}>
                  <div className="mb-3">
                    <label className="form-label">
                      Nhập tên <span>*</span>{" "}
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control"
                      value={formData.first_name}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          first_name: event.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Nhập họ <span>*</span>{" "}
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      className="form-control"
                      value={formData.last_name}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          last_name: event.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Địa chỉ Email <span>*</span>{" "}
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Mật khẩu <span>*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword[0] ? "text" : "password"}
                        name="password"
                        className="form-control"
                        required
                        value={formData.password}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            password: event.target.value,
                          })
                        }
                      />
                      {showPassword[0] ? (
                        <FaEyeSlash onClick={() => handleTogglePassword(0)} />
                      ) : (
                        <FaEye onClick={() => handleTogglePassword(0)} />
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Nhập lại mật khẩu <span>*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword[1] ? "text" : "password"}
                        name="confirm_password"
                        className="form-control"
                        value={formData.confirm_password}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            confirm_password: event.target.value,
                          })
                        }
                        required
                      />
                      {showPassword[1] ? (
                        <FaEyeSlash onClick={() => handleTogglePassword(1)} />
                      ) : (
                        <FaEye onClick={() => handleTogglePassword(1)} />
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Nhập số điện thoại <span>*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={(event) =>
                        setFormData({ ...formData, phone: event.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Chọn giới tính <span>*</span>
                    </label>
                    <div className="form-group">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="male"
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              gender: event.target.value,
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Nam
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="female"
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              gender: event.target.value,
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Nữ
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="my-4">
                    <button className="btn btn-submit w-100 px-4">
                      Đăng ký
                    </button>
                  </div>
                </form>
              </div>

              <div className="text-center">
                <p>
                  Bạn đã có tài khoản?
                  <Link to="/login" className="signup-link">
                    {" "}
                    Đăng nhập
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

export default Register;
