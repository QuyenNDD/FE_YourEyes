import React from "react";
import MenuBar from "../components/MenuBar";

const Admin = () => {


  return (
    <div>
      <MenuBar />
      <article>
        <div class="container-fluid py-2">
          <div class="row">
            <div class="ms-3">
              <h3 class="mb-0 h4 font-weight-bolder">Dashboard</h3>
              <p class="mb-4">
                Check the sales, value and bounce rate by country.
              </p>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-header p-2 ps-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="text-sm mb-0 text-capitalize">Today's Money</p>
                      <h4 class="mb-0">$53k</h4>
                    </div>
                    <div >
                      <i style={{ fontSize: "30px" }} class="fa-solid fa-calendar-week"></i>
                    </div>
                  </div>
                </div>
                <div class="horizontal-line"></div>
                <div class="card-footer p-2 ps-3">
                  <p class="mb-0 text-sm"><span class="text-success font-weight-bolder">+55% </span>than last week</p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-header p-2 ps-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="text-sm mb-0 text-capitalize">Today's Users</p>
                      <h4 class="mb-0">2300</h4>
                    </div>
                    <div >
                      <i style={{ fontSize: "30px" }} class="fa-solid fa-user"></i>

                    </div>
                  </div>
                </div>
                <div class="horizontal-line"></div>
                <div class="card-footer p-2 ps-3">
                  <p class="mb-0 text-sm"><span class="text-success font-weight-bolder">+3% </span>than last month</p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div class="card">
                <div class="card-header p-2 ps-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="text-sm mb-0 text-capitalize">Ads Views</p>
                      <h4 class="mb-0">3,462</h4>
                    </div>
                    <div >
                      <i style={{ fontSize: "30px" }} class="fa-solid fa-chart-simple"></i>
                    </div>
                  </div>
                </div>
                <div class="horizontal-line"></div>
                <div class="card-footer p-2 ps-3">
                  <p class="mb-0 text-sm"><span class="text-danger font-weight-bolder">-2% </span>than yesterday</p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-sm-6">
              <div class="card">
                <div class="card-header p-2 ps-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="text-sm mb-0 text-capitalize">Sales</p>
                      <h4 class="mb-0">$103,430</h4>
                    </div>
                    <div >
                      <i style={{ fontSize: "30px" }} class="fa-solid fa-bag-shopping"></i>
                    </div>
                  </div>
                </div>
                <div class="horizontal-line"></div>
                <div class="card-footer p-2 ps-3">
                  <p class="mb-0 text-sm"><span class="text-success font-weight-bolder">+5% </span>than yesterday</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-6 mt-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h6 class="mb-0 ">Website Views</h6>
                  <p class="text-sm ">Last Campaign Performance</p>
                  <div class="pe-2">
                    <div class="chart">
                      <img src="Chart.jpg" alt="" />
                    </div>
                  </div>
                  <div class="horizontal-line"></div>
                  <div class="d-flex ">
                    <i class="material-symbols-rounded text-sm my-auto me-1">schedule</i>
                    <p class="mb-0 text-sm"> campaign sent 2 days ago </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 mt-4 mb-4">
              <div class="card ">
                <div class="card-body">
                  <h6 class="mb-0 "> Daily Sales </h6>
                  <p class="text-sm "> (<span class="font-weight-bolder">+15%</span>) increase in today sales. </p>
                  <div class="pe-2">
                    <div class="chart">
                      <img src="Chart1.jpg" alt="" />
                    </div>
                  </div>
                  <div class="horizontal-line"></div>
                  <div class="d-flex ">
                    <i class="material-symbols-rounded text-sm my-auto me-1">schedule</i>
                    <p class="mb-0 text-sm"> updated 4 min ago </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 mt-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <h6 class="mb-0 ">Completed Tasks</h6>
                  <p class="text-sm ">Last Campaign Performance</p>
                  <div class="pe-2">
                    <div class="chart">
                      <img src="Chart2.png" alt="" />
                    </div>
                  </div>
                  <div class="horizontal-line"></div>
                  <div class="d-flex ">
                    <i class="material-symbols-rounded text-sm my-auto me-1">schedule</i>
                    <p class="mb-0 text-sm">just updated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-lg-6 mb-lg-0 mb-4">
              <div class="copyright text-center text-sm text-muted text-lg-start">
                © <script>
                  document.write(new Date().getFullYear())
                </script>,
                made with <i class="fa fa-heart"></i> by
                <a href="https://www.creative-tim.com" class="font-weight-bold" target="_blank">Creative Tim</a>
                for a better web.
              </div>
            </div>
          </div>
        </div>

      </article>
    </div>
  );

};

export default Admin;
