import React, { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueAnalytics = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm gọi API để lấy dữ liệu
  useEffect(() => {
    console.log("Chart Data sau khi set:", chartData);
  }, [chartData]);
  useEffect(() => {
    console.log("Fetch dữ liệu cho năm:", selectedYear);
    fetchRevenueData(selectedYear);
  }, [selectedYear]);
  const fetchRevenueData = async (year) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/revenues/year/${year}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // Lấy dữ liệu từ API
      const data = await response.json();
      console.log("Dữ liệu từ API:", data);

      // Chỉ lấy các trường cần thiết
      const filteredData = data.map(({ revenueMonth, totalRenenue }) => ({
        revenueMonth,
        totalRenenue,
      }));
      // Tạo dữ liệu đầy đủ từ tháng 1 đến tháng 12
      const fullData = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const monthData = filteredData.find((item) => item.revenueMonth === month);
        return monthData ? monthData.totalRenenue : 0;
      });

      console.log("Filtered Data:", filteredData);
      console.log("Full Data:", fullData);
      console.log("Chart Data:", chartData);
      const labels = Array.from({ length: 12 }, (_, index) => `Tháng ${index + 1}`)
      console.log("Lables",labels)

      const updatedChartData = {
        labels: Array.from({ length: 12 }, (_, index) => `Tháng ${index + 1}`),
        datasets: [
          {
            label: "Doanh thu (VND)",
            data: fullData,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      console.log("Dữ liệu sắp được set:", updatedChartData);
      setChartData(updatedChartData);
      console.log("Sau khi set", chartData);
    } catch (error) {
      setError(error.message);
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYears([currentYear, currentYear + 1]);
  }, []);

  useEffect(() => {
    fetchRevenueData(selectedYear);
  }, [selectedYear]);

  return (
    <div>
      <MenuBar />
      <article className="p-4">
        <h2 className="text-xl font-bold mb-4">Doanh thu</h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <div className="mb-4">
            <label htmlFor="year" className="mr-2 font-semibold">
              Chọn năm:
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="text-red-500">Lỗi: {error}</p>
          ) : chartData.labels.length > 0 && chartData.datasets.length > 0 ?  (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: `Biểu đồ Doanh thu năm ${selectedYear}` },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          ) : (
            <p>Không có dữ liệu để hiển thị.</p>
          )}
        </div>
      </article>
    </div>
  );
};

export default RevenueAnalytics;
