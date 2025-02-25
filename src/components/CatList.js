import React from "react";

const CardList = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://via.placeholder.com/300"
              className="card-img-top"
              alt="Placeholder"
            />
            <div className="card-body">
              <h5 className="card-title">Tiêu đề Card</h5>
              <p className="card-text">
                Đây là nội dung mô tả của card. Bạn có thể thay đổi nó theo ý muốn.
              </p>
              <a href="#" className="btn btn-primary">
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardList;