import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Để lấy ID từ URL
import blogApi from "../../../api/blogApi"; // Đảm bảo bạn đã export đúng blogApi

const BlogDetails = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [blog, setBlog] = useState(null);

  // Lấy thông tin blog khi component được mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogApi.getBlogById(id); // Gọi API để lấy thông tin bài viết theo ID
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };

    fetchBlog();
  }, [id]); // Fetch lại khi ID thay đổi

  if (!blog) {
    return <p>Loading...</p>; // Hiển thị khi chưa có dữ liệu
  }

  return (
    <section className="section-blog-details padding-tb-50">
      <div className="container">
        <div className="row mb-minus-24">
          <div className="col-xl-4 col-lg-5 col-12 mb-24">
            <div className="bb-blog-sidebar">
              <div className="blog-inner-contact" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <div className="blog-sidebar-title">
                  <h4>Bài Viết Gần đây</h4>
                </div>
                {blog.relatedArticles && blog.relatedArticles.map((article, index) => (
                  <div className="blog-sidebar-card" key={index}>
                    <div className="inner-image">
                      <img src={`http://localhost:8080/static/images/${article.image}`} alt="blog" />
                    </div>
                    <div className="blog-sidebar-contact">
                      <span>{article.category}</span>
                      <h4><a href={`/blog-details/${article._id}`}>{article.title}</a></h4>
                      <p>{article.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-lg-7 col-12 mb-24">
            <div className="bb-blog-details-contact" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
              <div className="inner-blog-details-image">
                <img src={`http://localhost:8080/static/images/${blog.image}`} alt={blog.title} />
              </div>
              <div className="inner-blog-details-contact">
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                <h4 className="sub-title">{blog.title}</h4>
                <p>{blog.content}</p>
                <div className="row">
                  {blog.images && blog.images.map((image, index) => (
                    <div className="col-lg-6" key={index}>
                      <div className="blog-inner-image">
                        <img src={`http://localhost:8080/static/images/${image}`} alt={`blog-${index + 1}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <p>{blog.extraContent}</p>
              </div>

              <div className="bb-blog-details-comment">
                <div className="main-title">
                  <h4>Comments</h4>
                </div>
                {blog.comments && blog.comments.map((comment, index) => (
                  <div className="bb-comment-box" key={index}>
                    <div className="inner-image">
                      <img src={`http://localhost:8080/static/images/${comment.userImage}`} alt={`reviews-${index + 1}`} />
                    </div>
                    <div className="inner-contact">
                      <h5 className="sub-title">{comment.name}</h5>
                      <span>{new Date(comment.date).toLocaleDateString()}</span>
                      <p>{comment.message}</p>
                      <a href="#" className="bb-details-btn">Reply <i className="ri-arrow-right-line"></i></a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bb-blog-details-comment">
                <div className="main-title">
                  <h4>Leave A Reply</h4>
                </div>
                <form method="post">
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <div className="bb-details-input">
                        <input type="text" placeholder="Enter Your Name" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="bb-details-input">
                        <input type="email" placeholder="Enter Your Email" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="bb-details-input">
                        <textarea placeholder="Message"></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="bb-details-buttons">
                        <a href="#" className="bb-btn-2">Submit Comment</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
