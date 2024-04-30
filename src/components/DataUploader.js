import React, { useState } from 'react';
import axios from 'axios';

function DataUploader() {
  const [file, setFile] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://cors-anywhere.herokuapp.com/https://fastapi-x21t.onrender.com/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadedData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
      {uploadedData && (
        <div>
          <h2>Uploaded Data:</h2>
          <pre>{JSON.stringify(uploadedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
export default DataUploader;
