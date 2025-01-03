"use server";

import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: "ap-northeast-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function getFileFromS3() {
  try {
    const params = {
      Bucket: "04-matchdata",
      Key: "matchData_all.csv",
    };

    const data = await s3.getObject(params).promise();
    return data.Body?.toString("utf-8") || "";
  } catch (error) {
    console.error("Error fetching file from S3:", error);
    throw new Error("Error fetching file");
  }
}
