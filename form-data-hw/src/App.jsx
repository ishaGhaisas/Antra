import { useEffect, useState } from 'react';
import './App.css';
function App() {
  const mock = [
    { region: "US", model: "A", sales: 150 },
    { region: "US", model: "B", sales: 120 },
    { region: "US", model: "C", sales: 350 },
    { region: "EU", model: "A", sales: 200 },
    { region: "EU", model: "B", sales: 100 },
    { region: "EU", model: "C", sales: 250 },
    { region: "CA", model: "A", sales: 200 },
    { region: "CA", model: "B", sales: 100 },
    { region: "CA", model: "C", sales: 230 },
    { region: "CA", model: "D", sales: 400 }
  ];

  const [mockData, setMockData] = useState([]);
  const [region, setRegion] = useState("all");
  const [model, setModel] = useState("all");

  useEffect(() => {
    const dict = {};
    mock.forEach((data) => {
      if (!dict[data.region]) dict[data.region] = [];
      dict[data.region].push(data);
    });

    const finalResult = [];
    for (const region in dict) {
      const items = dict[region];
      const sum = items.reduce((acc, item) => acc + item.sales, 0);
      finalResult.push({ region, model: "sum", sales: sum });
      finalResult.push(...items);
    }

    setMockData(finalResult);
  }, []);

  // Create dropdown options
  let regions = [], models = [];
  mock.forEach(item => {
    if (!regions.includes(item.region)) regions.push(item.region);
    if (!models.includes(item.model)) models.push(item.model);
  });

  const filteredData = mockData.filter(item =>
    (region === 'all' || item.region === region) &&
    (model === 'all' || item.model === model || item.model === 'sum')
  );

  return (
    <>
      <div>
        <label>
          Region:
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="all">All</option>
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>

        <label>
          Model:
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="all">All</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>

        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>Model</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => (
              <tr key={index}>
                <td>{data.region}</td>
                <td>{data.model}</td>
                <td>{data.sales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
