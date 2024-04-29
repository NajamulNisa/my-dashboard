import React from 'react';
import DataDashboard from './components/DataDashboard';
import DataUploader from './components/DataUploader';

function App() {
  const [csvData, setCsvData] = React.useState(null);

  const handleDataUpload = (data) => {
    setCsvData(data);
  };

  return (
    <div>
      <h1>Data Visualization Dashboard</h1>
      <DataUploader onDataUpload={handleDataUpload} />
      {csvData && <DataDashboard data={csvData} />}
    </div>
  );
}

export default App;
