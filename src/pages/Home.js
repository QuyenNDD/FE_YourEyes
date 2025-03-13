import { useEffect,useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCatsFetch } from "../redux/slices/catSlice";
import { useNavigate } from "react-router-dom";
import Sliderr from "../components/Sliderr";
import ShowProductSale from "../components/ShowProductSale";
import ShowProduct from "../components/ShowProduct";

// export default function Home() { 
//   const cats = useSelector((state) => state.cats.cats);
//   const dispatch = useDispatch();



//   useEffect(() => {
//     dispatch(getCatsFetch());
//   }, [dispatch]);
//   console.log(cats);


  
//   return (
//     <div className="container mt-4">
//       <div className="row">
//         {Array.isArray(cats) ? (
//           cats.map((cat, index) => (
//             <div key={index} className="col-md-4 mt-2">
//               <div className="card h-200">
//                 <img src={cat.image} className="card-img-top" alt={cat.name} />
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{cat.name}</h5>
//                   <p className="card-text text-truncate">{cat.description}</p>
//                   <a href="#" className="btn btn-primary mt-auto">Xem thêm</a>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>{JSON.stringify(cats)}</p>
//         )}
//       </div>
//     </div>

//   );
// }
const TrangChu = () =>{
    return (
        <>
            <Sliderr />
            <ShowProductSale />
            <ShowProduct />
        </>
    );
};
export default TrangChu;