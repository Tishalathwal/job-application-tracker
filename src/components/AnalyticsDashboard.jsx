import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const STATUS_COLORS = {
  Applied: '#3b82f6',
  'OA/Test': '#a855f7',
  Interview: '#eab308',
  Offer: '#22c55e',
  Rejected: '#ef4444',
};

export default function AnalyticsDashboard({ applications }) {
  const stats = useMemo(() => {
    const total = applications.length;
    const statusCounts = {};
    const sourceCounts = {};

    applications.forEach((app) => {
      statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
      sourceCounts[app.source] = (sourceCounts[app.source] || 0) + 1;
    });

    const responded = applications.filter(
      (app) => app.status !== 'Applied'
    ).length;
    const responseRate = total > 0 ? ((responded / total) * 100).toFixed(1) : 0;

    const statusData = Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));

    // Group by week for trend chart
    const weeklyMap = {};
    applications.forEach((app) => {
      if (!app.dateApplied) return;
      const date = new Date(app.dateApplied);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const key = weekStart.toISOString().split('T')[0];
      weeklyMap[key] = (weeklyMap[key] || 0) + 1;
    });

    const trendData = Object.entries(weeklyMap)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([week, count]) => ({ week, count }));

    return { total, statusData, sourceCounts, responseRate, trendData };
  }, [applications]);

  if (stats.total === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
        Add applications to see analytics
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"> 
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Total Applications</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Response Rate</p>
          <p className="text-3xl font-bold">{stats.responseRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Top Source</p>
          <p className="text-xl font-bold">
            {Object.entries(stats.sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status breakdown pie chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3">Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {stats.statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.name] || '#94a3b8'}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Applications over time */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3">Applications Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}