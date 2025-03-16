import Sliderr from "../components/Sliderr";
import ShowProductSale from "../components/ShowProductSale";
import ShowProduct from "../components/ShowProduct";

const TrangChu = () => {
    return (
        <>
            <Sliderr />
            <ShowProductSale />
            <div className="containerr">
                <br />
                <h2>SẢN PHẨM NỔI BẬT</h2>
            </div>
            <ShowProduct />

        </>
    );
};
export default TrangChu;