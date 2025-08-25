
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const AdminDashboard = () => {
  // Example Data (replace with API fetched data)
  const placementData = {
    labels: ["2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Students Placed",
        data: [120, 180, 250, 300],
        backgroundColor: "rgba(59,130,246,0.7)", // Tailwind blue-500
      },
    ],
  };

  const dropoutData = {
    labels: ["Active", "Dropouts"],
    datasets: [
      {
        label: "Dropout Ratio",
        data: [450, 50],
        backgroundColor: ["#22c55e", "#ef4444"], // green-500, red-500
      },
    ],
  };

  const progressData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Career Progress Score",
        data: [40, 55, 70, 65, 80, 90],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.4)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📊 Y4D Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placement Stats */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Yearly Placements</h2>
          <Bar data={placementData} />
        </div>

        {/* Dropout Ratio */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Dropout vs Active</h2>
          <Doughnut data={dropoutData} />
        </div>

        {/* Career Progress */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-3">Career Progress Trends</h2>
          <Line data={progressData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;