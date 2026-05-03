import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const CATEGORY_COLORS = {
  food: '#FF6384',
  housing: '#36A2EB',
  utilities: '#FFCE56',
  transport: '#4BC0C0',
  entertainment: '#9966FF',
  salary: '#2ECC71',
  other: '#FF9F40',
};

function SpendingChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense');

  const byCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
    return acc;
  }, {});

  const pieData = Object.entries(byCategory).map(([name, value]) => ({ name, value }));

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const barData = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expenses', amount: totalExpenses },
  ];

  if (transactions.length === 0) return null;

  return (
    <div className="charts">
      <div className="chart-section">
        <h2>Expenses by Category</h2>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100} labelLine={false}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="chart-empty">No expenses to display.</p>
        )}
      </div>

      <div className="chart-section">
        <h2>Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              <Cell fill="#2ECC71" />
              <Cell fill="#FF6384" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SpendingChart;
