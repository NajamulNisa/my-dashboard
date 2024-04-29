import React, { useState } from 'react';
import axios from 'axios';

function DataUploader({ onDataUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('File is required.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file); // Append the file with the field name 'file'

      // Verify the FormData contents (optional)
      console.log([...formData.entries()]);

      // Make the request to the server
      const response = await axios.post('https://cors-anywhere.herokuapp.com/https://fastapi-x21t.onrender.com/upload/', formData);

      // Handle the response
      onDataUpload(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="data-uploader">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
}

export default DataUploader;
