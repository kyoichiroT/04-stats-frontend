"use client";

import { useState } from "react";
import { getFileFromS3 } from "./server/getFileFromS3";

const Home = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFileContent = async () => {
    try {
      const content = await getFileFromS3();
      setFileContent(content);
    } catch (err) {
      setError("Error fetching file");
    }
  };

  return (
    <div>
      <h1>S3 File Content</h1>
      <button onClick={fetchFileContent}>Fetch File Content</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {fileContent && <pre>{fileContent}</pre>}
    </div>
  );
};

export default Home;
