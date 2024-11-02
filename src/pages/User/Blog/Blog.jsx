import React from 'react'
import './blog.scss';
const Blog = () => {
  return (
    <>
      {/* Blog Section */}
<section className="section-blog padding-tb-50">
  <div className="container">
    <div className="row mb-minus-24">
      {/* Blog Card 1 */}
      <div
        className="col-lg-4 col-md-6 col-12 mb-24"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        <div className="bb-blog-card">
          <div className="blog-image">
            <img src="assets/img/blog/1.jpg" alt="blog-1" />
          </div>
          <div className="blog-contact">
            <h5>
              <a href="javascript:void(0)">Marketing Guide: 5 Steps to Success.</a>
            </h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores
              error neque amet rem quod consequuntur? Iste, rerum.
            </p>
            <div className="blog-btn">
              <a href="blog-detail-left-sidebar.html" className="bb-btn-2">Read More</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Card 2 */}
      <div
        className="col-lg-4 col-md-6 col-12 mb-24"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="400"
      >
        <div className="bb-blog-card">
          <div className="blog-image">
            <img src="assets/img/blog/2.jpg" alt="blog-2" />
          </div>
          <div className="blog-contact">
            <h5>
              <a href="javascript:void(0)">Best way to solve business deal issue.</a>
            </h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores
              error neque amet rem quod consequuntur? Iste, rerum.
            </p>
            <div className="blog-btn">
              <a href="blog-detail-left-sidebar.html" className="bb-btn-2">Read More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Card 3 */}
      <div
        className="col-lg-4 col-md-6 col-12 mb-24"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="600"
      >
        <div className="bb-blog-card">
          <div className="blog-image">
            <img src="assets/img/blog/3.jpg" alt="blog-3" />
          </div>
          <div className="blog-contact">
            <h5>
              <a href="javascript:void(0)">31 customer stats know in 2019.</a>
            </h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores
              error neque amet rem quod consequuntur? Iste, rerum.
            </p>
            <div className="blog-btn">
              <a href="blog-detail-left-sidebar.html" className="bb-btn-2">Read More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Card 4 */}
      <div
        className="col-lg-4 col-md-6 col-12 mb-24"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        <div className="bb-blog-card">
          <div className="blog-image">
            <img src="assets/img/blog/4.jpg" alt="blog-4" />
          </div>
          <div className="blog-contact">
            <h5>
              <a href="javascript:void(0)">Business ideas to grow your business.</a>
            </h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores
              error neque amet rem quod consequuntur? Iste, rerum.
            </p>
            <div className="blog-btn">
              <a href="blog-detail-left-sidebar.html" className="bb-btn-2">Read More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Card 5 */}
      <div
        className="col-lg-4 col-md-6 col-12 mb-24"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="400"
      >
        <div className="bb-blog-card">
          <div className="blog-image">
            <img src="assets/img/blog/5.jpg" alt="blog-5" />
          </div>
          <div className="blog-contact">
            <h5>
              <a href="javascript:void(0)">Marketing Guide: 5 Steps to Success.</a>
            </h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores
              error neque amet rem quod consequuntur? Iste, rerum.
            </p>
            <div className="blog-btn">
              <a href="blog-detail-left-sidebar.html" className="bb-btn-2">Read More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Card 6 */}
      <div
        className="col-lg-4 col-md-6 col-12 mb-24"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="600"
      >
        <div className="bb-blog-card">
          <div className="blog-image">
            <img src="assets/img/blog/6.jpg" alt="blog-6" />
          </div>
          <div className="blog-contact">
            <h5>
              <a href="javascript:void(0)">31 customer stats know in 2019.</a>
            </h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores
              error neque amet rem quod consequuntur? Iste, rerum.
            </p>
            <div className="blog-btn">
              <a href="blog-detail-left-sidebar.html" className="bb-btn-2">Read More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="col-12">
        <div className="bb-pro-pagination">
          <p>Showing 1-12 of 21 item(s)</p>
          <ul>
            <li className="active">
              <a href="javascript:void(0)">1</a>
            </li>
            <li>
              <a href="javascript:void(0)">2</a>
            </li>
            <li>
              <a href="javascript:void(0)">3</a>
            </li>
            <li>
              <a href="javascript:void(0)">4</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="next">Next <i className="ri-arrow-right-s-line"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Blog
