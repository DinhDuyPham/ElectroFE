import React, { useState, useEffect } from 'react';
import './blog.scss';
import blogApi from "../../../api/blogApi"; // Đảm bảo bạn đã export đúng blogApi

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  // Lấy danh sách các blog khi component được mount
  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogApi.getListBlog();
      setBlogs(fetchedBlogs);
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {/* Blog Section */}
      <section className="section-blog padding-tb-50">
        <div className="container">
          <div className="row mb-minus-24">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <div
                  key={blog._id}
                  className="col-lg-4 col-md-6 col-12 mb-24"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={index * 200}
                >
                  <div className="bb-blog-card">
                    <div className="blog-image">
             
                      <img
                        src={`http://localhost:8080/static/images/${blog.image || 'default-image.jpg'}`}
                        alt={blog.title}  
                      />
                    </div>
                    <div className="blog-contact">
                      <h5>
                        <a href={`blog-details/${blog._id}`}>{blog.title}</a>
                      </h5>
                      <p>{blog.content}</p>
                      <div className="blog-btn">
                        <a href={`blog-details/${blog._id}`} className="bb-btn-2">Read More</a>
                      </div>
                    </div>
                  </div>
                </div> 
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>

       
        </div>
      </section>
    </>
  );
};

export default Blog;
