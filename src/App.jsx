import React from 'react';
import DataUploader from './components/DataUploader';
import CsvDataDropdown from './components/CsvDataDropdown';



function App() {
  const [csvData, setCsvData] = React.useState(null);

  const handleDataUpload = (data) => {
    setCsvData(data);
  };

  return (
    <div>
      <h1 className='Heading'>Data Visualization Dashboard</h1>
      <DataUploader onDataUpload={handleDataUpload} />
      {csvData && <CsvDataDropdown data={csvData} />}
    </div>
  );
}

export default App;







