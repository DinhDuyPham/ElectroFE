import { useState, useEffect } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import categoryApi from "../../../api/categoryApi";
import productApi from "../../../api/productApi";

function Aside(props) {
  // eslint-disable-next-line react/prop-types
  const { setProdcutsCategory } = props;

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100000000);
  const [categoryID, setCategoryID] = useState(0);
  const [categoryList, setCategoryList] = useState([]);

  const fetchListCate = async () => {
    const data = await categoryApi.getListCategory();
    if (data && data.length > 0) setCategoryList(data);
  };
  
  useEffect(() => {
    fetchListCate();
  }, []);

  // handle click price min
  const handleClickPriceMin = (type) => {
    if (type === "up" && priceMin < 100000000) {
      setPriceMin(priceMin + 1);
    }

    if (type === "down" && priceMin > 0) {
      setPriceMin(priceMin - 1);
    }
  };

  // handle click price max
  const handleClickPriceMax = (type) => {
    if (type === "up" && priceMax < 100000000) {
      setPriceMax(priceMax + 1);
    }

    if (type === "down" && priceMax > 0) {
      setPriceMax(priceMax - 1);
    }
  };

  // handle click category
  const handleClickFilter = async (event) => {
    event.preventDefault();

    const data = await productApi.filterProduct(categoryID, priceMin, priceMax);
    setProdcutsCategory(data);
  };

  return (
    <form className="aside-form">
      <div className="aside">
        <h3 className="aside-title">Danh mục</h3>
        <div className="checkbox-filter">
          {categoryList &&
            categoryList.map((item) => {
              const { category } = item;
              const { id, name } = category;

              return (
                <div className="input-radio" key={id}>
                  <input
                    type="radio"
                    id={`category-` + id}
                    value={id}
                    name="category"
                    onChange={(event) => setCategoryID(event.target.value)}
                  />
                  <label htmlFor={`category-` + id}>
                    <span></span>
                    {name}
                  </label>
                </div>
              );
            })}
        </div>
      </div>
      <div className="aside">
        <h3 className="aside-title">Giá</h3>
        <div className="price-filter">
          <div id="price-slider">
            <Nouislider
              range={{ min: 0, max: 100000000 }}
              start={[priceMin, priceMax]}
              step={1}
              connect
              animate={false}
              onUpdate={(values, handle) => {
                if (handle === 0) {
                  setPriceMin(parseInt(values[0]));
                } else if (handle === 1) {
                  setPriceMax(parseInt(values[1]));
                }
              }}
            />
          </div>
          <div className="input-number price-min">
            <input
              id="price-min"
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(parseInt(e.target.value))}
            />
            <span
              className="qty-up"
              onClick={(e) => handleClickPriceMin(e, "up")}
            >
              +
            </span>
            <span
              className="qty-down"
              onClick={(e) => handleClickPriceMin(e, "down")}
            >
              -
            </span>
          </div>
          <span>-</span>
          <div className="input-number price-max">
            <input
              id="price-max"
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(parseInt(e.target.value))}
            />
            <span className="qty-up" onClick={() => handleClickPriceMax("up")}>
              +
            </span>
            <span
              className="qty-down"
              onClick={() => handleClickPriceMax("down")}
            >
              -
            </span>
          </div>
        </div>
      </div>
      <button
        className="primary-btn btn-filter"
        onClick={(event) => handleClickFilter(event)}
      >
        Lọc
      </button>
    </form>
  );
}

export default Aside;
