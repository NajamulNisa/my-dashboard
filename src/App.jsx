import React from 'react';
import DataUploader from './components/DataUploader';
import CsvDataDropdown from './components/CsvDataDropdown';
import Footer from './components/Footer'



function App() {
  const [csvData, setCsvData] = React.useState(null);

  const handleDataUpload = (data) => {
    setCsvData(data);
  };

  return (
    <div>
      <h1 className='Heading'>Data Visualization Tool</h1>
      <DataUploader onDataUpload={handleDataUpload} />
      {csvData && <CsvDataDropdown data={csvData} />}
      <Footer />
    </div>
  );
}

export default App;







