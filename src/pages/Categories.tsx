import { useEffect } from "react";
import { getAllCategories } from "../app/feature/categories/CategoriesSlice";
import { useAppDispatch, type RootState } from "../app/store";
import { useSelector } from "react-redux";

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { categories, loading } = useSelector((state: RootState) => {
    return state.category;
  });

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (loading) return <h1>Loading...</h1>;
  console.log(categories);
  return <div></div>;
};

export default CategoriesPage;
