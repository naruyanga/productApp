"use client";
import { useState, useEffect } from "react";

import Cart from "../app/components/Cart";

const Page = () => {
  const [product, setProduct] = useState([]);
  const [skipCount, setSkipCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const limit = 10;

  const fetchData = async () => {
    if (selectedCategory == null) {
      const jsonData = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${
          skipCount * limit
        }`
      );
      let data = await jsonData.json();
      setProduct(data.products);
    } else {
      const jsonData = await fetch(
        `https://dummyjson.com/products/category/${selectedCategory}`
      );
      const data = await jsonData.json();
      setProduct(data.products);
    }
  };

  useEffect(() => {
    fetchData();
  }, [skipCount, selectedCategory]);

  const handleIncrease = () => setSkipCount(skipCount + 1);
  const handleDecrease = () => {
    if (skipCount == 0) return;
    setSkipCount(skipCount - 1);
  };

  const fetchCategories = async () => {
    const jsonData = await fetch(
      "https://dummyjson.com/products/category-list"
    );
    const data = await jsonData.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(product);

  return (
    <div>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((category) => {
          return <option value={category}>{category}</option>;
        })}
      </select>
      <div className="skip">
        <button className="button" onClick={handleDecrease}>
          {"<"}
        </button>
        <h1>{skipCount}</h1>
        <button className="button" onClick={handleIncrease}>
          {">"}
        </button>
      </div>
      {product?.map((item, index) => {
        return (
          <Cart
            title={item.title}
            thumbnail={item.thumbnail}
            price={item.price}
            id={item.id}
            rate={item.rating}
            key={index}
          />
        );
      })}
    </div>
  );
};
export default Page;
