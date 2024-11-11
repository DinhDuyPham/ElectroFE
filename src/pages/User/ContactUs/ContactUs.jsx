// src/components/ContactUs.js
import React, { useState } from "react";
import "./ContactUs.scss"; // Import file SCSS

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Xử lý thay đổi trong các input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Kiểm tra lỗi form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Tên là bắt buộc!";
    if (!formData.email) newErrors.email = "Email là bắt buộc!";
    if (!formData.phone) newErrors.phone = "Số điện thoại là bắt buộc!";
    if (!formData.message) newErrors.message = "Thông tin cần hỗ trợ là bắt buộc!";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra lỗi trước khi gửi form
    if (!validateForm()) return;

    setLoading(true);
    setStatus(null);  // Reset trạng thái khi gửi yêu cầu

    try {
      // Giả lập gọi API (thực tế sẽ là gọi đến API backend)
      console.log("Form Data Submitted:", formData);
      setStatus("Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu của bạn.");
    } catch (error) {
      setStatus("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-container">
      <h2>Liên Hệ Với Chúng Tôi</h2>

      <div className="contact-info">
        <p><strong>Địa Chỉ:</strong> Số 123, Đường ABC, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
        <p><strong>Email hỗ trợ:</strong> <a href="mailto:support@myphamxyz.com">support@myphamxyz.com</a></p>
        <p><strong>Số Điện Thoại:</strong> 1800-1234</p>
      </div>

      <h3>Gửi Thông Tin Cho Chúng Tôi</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Họ Tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={errors.name ? "error" : ""}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={errors.email ? "error" : ""}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="phone">Số Điện Thoại:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div>
          <label htmlFor="message">Thông Tin Cần Hỗ Trợ:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={errors.message ? "error" : ""}
          />
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Đang Gửi..." : "Gửi"}
        </button>
      </form>

      {status && <div className={`status-message ${status.includes("Cảm ơn") ? "success" : "error"}`}>{status}</div>}
    </div>
  );
};

export default ContactUs;
