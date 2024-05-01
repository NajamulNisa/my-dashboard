import React from 'react';
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
      {csvData}
    </div>
  );
}

export default App;
