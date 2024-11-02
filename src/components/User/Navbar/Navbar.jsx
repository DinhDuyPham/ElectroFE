import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import categoryApi from "../../../api/categoryApi";

function Navbar(props) {
  // eslint-disable-next-line react/prop-types
  const { categoryID } = props;
  const [categoryList, setCategoryList] = useState([]);

  const fetchListCate = async () => {
    const data = await categoryApi.getListCategory();
    if (data && data.length > 0) setCategoryList(data);
  };

  useEffect(() => {
    fetchListCate();
  }, []);

  return (
    <nav id="navigation">
      <div className="container">
        <div id="responsive-nav">
          <ul className="main-nav nav navbar-nav">
            {/* <li className="active">
              <Link href="/">Store</Link>
            </li> */}
            {categoryList.map((item) => {
              const { category } = item;
              const { id, name } = category;

              return (
                <li key={id} className={categoryID === id ? "active" : ""}>
                  <Link to={`/store/${id}`}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
