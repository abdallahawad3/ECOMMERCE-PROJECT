import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../../app/store";
import { getAllCategories } from "../../app/feature/categories/CategoriesSlice";

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
