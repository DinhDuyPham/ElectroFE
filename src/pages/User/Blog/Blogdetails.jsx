// BlogDetail.jsx
import React from 'react';

const BlogDetails = () => {
  return (
    <section className="section-blog-details padding-tb-50">
      <div className="container">
        <div className="row mb-minus-24">
          <div className="col-xl-4 col-lg-5 col-12 mb-24">
            <div className="bb-blog-sidebar">
              <div className="blog-inner-contact" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <div className="blog-sidebar-title">
                  <h4>Recent Articles</h4>
                </div>
                {[
                  { title: 'Marketing Guide: 5 Steps to Success.', date: 'February 10, 2025', category: 'Marketing', img: 'assets/img/blog/7.jpg' },
                  { title: 'Business ideas to grow your business.', date: 'Jan 1, 2024', category: 'Business', img: 'assets/img/blog/8.jpg' },
                  { title: 'Best way to solve business deal issue.', date: 'Jun 02, 2024', category: 'Business', img: 'assets/img/blog/9.jpg' },
                  { title: '31 customer stats know in 2025.', date: 'May 20, 2024', category: 'Customer', img: 'assets/img/blog/10.jpg' },
                ].map((article, index) => (
                  <div className="blog-sidebar-card" key={index}>
                    <div className="inner-image">
                      <img src={article.img} alt="blog" />
                    </div>
                    <div className="blog-sidebar-contact">
                      <span>{article.category}</span>
                      <h4><a href="blog-detail-left-sidebar.html">{article.title}</a></h4>
                      <p>{article.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="blog-inner-contact" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                <div className="blog-sidebar-title">
                  <h4>Categories</h4>
                </div>
                <div className="blog-categories">
                  <ul>
                    {['Business', 'Marketing', 'Food blogs', 'Lifestyle', 'Fashion', 'Travel', 'Fitness'].map((category, index) => (
                      <li key={index}>
                        <div className="bb-sidebar-block-item">
                          <input type="checkbox" />
                          <a href="javascript:void(0)">{category}</a>
                          <span className="checked"></span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7 col-12 mb-24">
            <div className="bb-blog-details-contact" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
              <div className="inner-blog-details-image">
                <img src="assets/img/blog-details/one.jpg" alt="details-one" />
              </div>
              <div className="inner-blog-details-contact">
                <span>May 30, 2022</span>
                <h4 className="sub-title">Marketing Guide: 5 Steps to Success.</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis inventore fuga at iure voluptate, laudantium commodi officiis provident facere quis quae, laboriosam ducimus nihil molestiae vel beatae numquam assumenda dicta modi. Mollitia soluta ipsa cum pariatur! Obcaecati similique amet fuga minima vitae corporis odio eius tenetur repudiandae quaerat maiores quo officia, sunt, ab omnis id soluta explicabo quas? Quasi nam, inventore voluptas tempore ex modi consequuntur reiciendis enim, molestias labore neque! A nostrum necessitatibus dolorem sequi earum inventore labore error.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam harum inventore, ipsa velit, laudantium perspiciatis exercitationem veritatis, molestiae magnam voluptatibus suscipit accusamus fuga veniam laborum cumque vitae cum? Cumque, aliquid.</p>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="blog-inner-image">
                      <img src="assets/img/blog/1.jpg" alt="blog-1" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="blog-inner-image">
                      <img src="assets/img/blog/2.jpg" alt="blog-2" />
                    </div>
                  </div>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis inventore fuga at ducimus nihil molestiae vel beatae numquam assumenda dicta modi. Mollitia soluta ipsa repudiandae quaerat maiores quo officia, sunt, ab omnis id soluta explicabo quas? Quasi nam, inventore voluptas tempore ex modi consequuntur reiciendis enim, molestias labore neque! A nostrum necessitatibus dolorem sequi earum inventore labore error.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam harum inventore, ipsa suscipit accusamus fuga veniam laborum cumque vitae cum? Cumque, aliquid.</p>
              </div>
              <div className="col-12">
                <div className="bb-pro-pagination">
                  <p>Showing 1-12 of 21 item(s)</p>
                  <ul>
                    {Array.from({ length: 4 }, (_, index) => (
                      <li key={index} className={index === 0 ? 'active' : ''}>
                        <a href="javascript:void(0)">{index + 1}</a>
                      </li>
                    ))}
                    <li>
                      <a href="javascript:void(0)" className="next">Next <i className="ri-arrow-right-s-line"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bb-blog-details-comment">
                <div className="main-title">
                  <h4>Comments</h4>
                </div>
                {[
                  { name: 'Mariya Lykra', date: 'May 14, 2020', message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, et?', img: 'assets/img/reviews/1.jpg' },
                  { name: 'Saddika Alard', date: 'May 14, 2020', message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, et?', img: 'assets/img/reviews/2.jpg' },
                ].map((comment, index) => (
                  <div className="bb-comment-box" key={index}>
                    <div className="inner-image">
                      <img src={comment.img} alt={`reviews-${index + 1}`} />
                    </div>
                    <div className="inner-contact">
                      <h5 className="sub-title">{comment.name}</h5>
                      <span>{comment.date}</span>
                      <p>{comment.message}</p>
                      <a href="javascript:void(0)" className="bb-details-btn">Reply <i className="ri-arrow-right-line"></i></a>
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
                        <a href="javascript:void(0)" className="bb-btn-2">Shop Now</a>
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
