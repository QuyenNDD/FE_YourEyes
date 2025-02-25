import { useEffect,useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCatsFetch } from "../redux/slices/catSlice";
import { useNavigate } from "react-router-dom";

export default function Home() { 
  const cats = useSelector((state) => state.cats.cats);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getCatsFetch());
  }, [dispatch]);
  console.log(cats);


  
  return (
    <div>
    {Array.isArray(cats) ? (
      cats.map((cat, index) => <p key={index}>{cat.name}</p>)
    ) : (
      <p>{JSON.stringify(cats)}</p> 
    )}


  </div>
  );
}