import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 700 },
    { name: 'Jun', value: 600 },
    { name: 'Jul', value: 800 },
    { name: 'Aug', value: 900 },
    { name: 'Sep', value: 1000 },
    { name: 'Oct', value: 1100 },
    { name: 'Nov', value: 1200 },
    { name: 'Dec', value: 1300 }
];

export default function ChartCard({ title }) {
  const isLineChart = title.toLowerCase().includes("line");

  return (
    <div className="bg-[#343434] p-4 rounded-lg shadow-lg">
      <h3 className="text-white text-md font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        {isLineChart ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={2} />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
