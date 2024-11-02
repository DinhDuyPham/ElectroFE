// import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Aside from "../../../components/User/Aside/Aside";
import ProductItem from "../../../components/User/ProductItem/ProductItem";
import productApi from "../../../api/productApi";

function Store() {
  const [productsCategory, setProdcutsCategory] = useState([]);
  let { id } = useParams();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const keyword = urlParams.get("search");

  const fetchProductsCategory = async () => {
    let data;

    if (id) {
      data = await productApi.getListProductByCategory(id);
    } else {
      data = await productApi.getListProduct();
    }

    if (data?.length > 0) setProdcutsCategory(data);
  };

  const fetchSearhProduct = async (keyword) => {
    const result = await productApi.searchProduct(keyword);

    if (result?.length > 0) {
      setProdcutsCategory(result);
    }
  };

  useEffect(() => {
    fetchProductsCategory();

    if (keyword !== "") {
      fetchSearhProduct(keyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, keyword]);

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div id="aside" className="col-md-3">
            <Aside setProdcutsCategory={setProdcutsCategory} />
          </div>

          <div id="store" className="col-md-9">
            <div className="row">
              {productsCategory?.length > 0 ? (
                productsCategory.map((product) => {
                  const { id, _id, name, price, image } = product;
                  return (
                    <div className="col-md-4 col-xs-6" key={id}>
                      <ProductItem
                        id={id || _id}
                        name={name}
                        image={image}
                        price={price}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="not-found">Không tìm thấy kết quả</p>
              )}
            </div>

            {/* <div className="store-filter clearfix">
              <span className="store-qty">Showing 20-100 products</span>
              <ul className="store-pagination">
                <li>
                  <a href="#">
                    <MdArrowBackIos />
                  </a>
                </li>
                <li className="active">1</li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">
                    <MdArrowForwardIos />
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
