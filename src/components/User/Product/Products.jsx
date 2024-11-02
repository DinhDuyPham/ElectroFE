import { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import ProductItem from "../ProductItem/ProductItem";
import productApi from "../../../api/productApi";

const getTypeListProduct = async (type, category_id) => {
  switch (type) {
    case "new-product":
      return await productApi.newProduct();
    case "top-selling":
      return await productApi.topSelling();
    case "recommended":
      return await productApi.recommendProduct();
    case "category":
      return await productApi.getListProductByCategory(category_id);
    default:
      return await productApi.getListProduct();
  }
};

function Product(props) {
  // eslint-disable-next-line react/prop-types
  const { title, type, paramId } = props;
  let sliderRef = useRef(null);

  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    const data = await getTypeListProduct(type, paramId);
    if (data?.length > 0) {
      setProducts(data);
    }
  }, [paramId, type]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, type]);

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    infinite: true,
    speed: 300,
    dots: false,
    arrows: false,
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="title">{title}</h3>
            </div>
          </div>

          <div className="col-md-12">
            <div className="row">
              <div className="products-tabs">
                <div id="tab1" className="tab-pane active">
                  <Slider
                    className="products-slick"
                    ref={(slider) => {
                      sliderRef = slider;
                    }}
                    {...settings}
                  >
                    {products.map((product) => {
                      const { _id, id, name, image, price } = product;
                      return (
                        <ProductItem
                          key={_id || id}
                          id={_id || id}
                          name={name}
                          image={image}
                          price={price}
                        />
                      );
                    })}
                  </Slider>

                  <div id="slick-nav-1" className="products-slick-nav">
                    <button
                      className="button slick-prev"
                      onClick={previous}
                    ></button>
                    <button
                      className="button slick-next"
                      onClick={next}
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
