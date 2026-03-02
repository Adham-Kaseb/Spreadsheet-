import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface Props {
  data: Record<string, any>[];
}

const Dashboard: React.FC<Props> = ({ data }) => {
  // Simple heuristic to find numeric columns for visualization
  const numericKeys =
    data.length > 0
      ? Object.keys(data[0]).filter(
          (key) =>
            !isNaN(Number(data[0][key])) && typeof data[0][key] !== "boolean",
        )
      : [];

  const categoryKey = data.length > 0 ? Object.keys(data[0])[0] : "";
  const valueKey = numericKeys[0] || "";

  const chartData = data.slice(0, 10); // Limit to top 10 for dashboard preview

  if (data.length === 0) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <div
        className="glass-card"
        style={{ padding: "1.5rem", minHeight: "300px" }}
      >
        <h3
          style={{
            marginBottom: "1.5rem",
            fontSize: "1rem",
            color: "var(--text-muted)",
          }}
        >
          Activity Overview
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#58a6ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey={categoryKey}
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--bg-color)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "var(--primary)" }}
            />
            <Area
              type="monotone"
              dataKey={valueKey}
              stroke="#58a6ff"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div
        className="glass-card"
        style={{ padding: "1.5rem", minHeight: "300px" }}
      >
        <h3
          style={{
            marginBottom: "1.5rem",
            fontSize: "1rem",
            color: "var(--text-muted)",
          }}
        >
          Value Distribution
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey={categoryKey}
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                background: "var(--bg-color)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey={valueKey} fill="#58a6ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
