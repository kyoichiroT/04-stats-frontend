"use server";

import { MatchData } from "@/app/_types/match-data.types";
import AWS from "aws-sdk";
import csv from "csv-parser";
import { Readable } from "stream";

/**
 * Validates that all required environment variables are defined
 * @throws {Error} If any required environment variable is missing
 */
function validateEnvironmentVariables(): void {
  const requiredEnvVars = {
    AWS_REGION: process.env.AWS_REGION || "ap-northeast-1",
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}. ` +
      "Please ensure these are set in your environment or .env.local file."
    );
  }
}

// Initialize S3 client with default authentication mechanism
// This will use AWS credentials from environment variables, IAM roles, or AWS profiles
validateEnvironmentVariables();
const s3 = new AWS.S3({
  region: process.env.AWS_REGION || "ap-northeast-1",
  // Removed explicit accessKeyId and secretAccessKey to use default authentication
});

/**
 * Fetches and parses CSV data from S3 bucket
 * @returns {Promise<MatchData[]>} Parsed match data from CSV
 * @throws {Error} If S3 operation fails or CSV parsing fails
 */
export async function getFileFromS3(): Promise<MatchData[]> {
  const bucketName = "04-matchdata";
  const fileName = "matchData_all.csv";

  try {
    console.log(`Fetching file ${fileName} from S3 bucket ${bucketName}...`);
    
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };

    const data = await s3.getObject(params).promise();
    
    if (!data.Body) {
      throw new Error(`File ${fileName} has no content or could not be retrieved from S3`);
    }

    const csvContent = data.Body.toString("utf-8");
    const contentSize = csvContent.length;
    
    console.log(`Successfully retrieved file. Size: ${contentSize} bytes`);

    if (contentSize === 0) {
      console.warn(`File ${fileName} is empty`);
      return [];
    }

    // For smaller files (< 10MB), use simplified parsing for better performance
    // For larger files, maintain streaming approach for memory efficiency
    if (contentSize < 10 * 1024 * 1024) {
      return await parseCSVSimple(csvContent);
    } else {
      console.log("Large file detected, using streaming parser...");
      return await parseCSVStream(csvContent);
    }
  } catch (error) {
    // Enhanced error handling with more specific error messages
    if (error && typeof error === 'object' && 'code' in error) {
      const awsError = error as { code?: string; message?: string; statusCode?: number };
      
      if (awsError.code === "NoSuchBucket") {
        console.error(`S3 bucket '${bucketName}' does not exist or is not accessible`);
        throw new Error(
          `S3 bucket '${bucketName}' not found. Please verify the bucket name and your AWS permissions.`
        );
      } else if (awsError.code === "NoSuchKey") {
        console.error(`File '${fileName}' not found in bucket '${bucketName}'`);
        throw new Error(
          `File '${fileName}' not found in S3 bucket '${bucketName}'. Please verify the file exists.`
        );
      } else if (awsError.code === "AccessDenied") {
        console.error(`Access denied to S3 bucket '${bucketName}' or file '${fileName}'`);
        throw new Error(
          `Access denied to S3 resource. Please check your AWS credentials and IAM permissions for bucket '${bucketName}'.`
        );
      } else {
        console.error("Error fetching file from S3:", {
          message: awsError.message,
          code: awsError.code,
          statusCode: awsError.statusCode,
        });
        throw new Error(
          `Failed to fetch file from S3: ${awsError.message || 'Unknown AWS error'}. Please check your AWS configuration and network connectivity.`
        );
      }
    } else if (error instanceof Error) {
      console.error("Error fetching file from S3:", error.message);
      throw new Error(
        `Failed to fetch file from S3: ${error.message}. Please check your AWS configuration and network connectivity.`
      );
    } else {
      console.error("Unknown error fetching file from S3:", error);
      throw new Error("An unexpected error occurred while fetching data from S3");
    }
  }
}

/**
 * Simplified CSV parsing for smaller files
 * @param csvContent The CSV content as string
 * @returns {Promise<MatchData[]>} Parsed match data
 */
async function parseCSVSimple(csvContent: string): Promise<MatchData[]> {
  try {
    const results: MatchData[] = [];
    const stream = Readable.from(csvContent);
    
    return new Promise<MatchData[]>((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (data: MatchData) => {
          results.push(data);
        })
        .on("end", () => {
          console.log(`Successfully parsed ${results.length} records from CSV`);
          resolve(results);
        })
        .on("error", (error) => {
          console.error("CSV parsing error:", error);
          reject(new Error(`Failed to parse CSV data: ${error.message}`));
        });
    });
  } catch (error) {
    console.error("Error in CSV parsing setup:", error);
    throw new Error(`Failed to setup CSV parsing: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Streaming CSV parsing for larger files (maintains original approach)
 * @param csvContent The CSV content as string
 * @returns {Promise<MatchData[]>} Parsed match data
 */
async function parseCSVStream(csvContent: string): Promise<MatchData[]> {
  try {
    const results: MatchData[] = [];
    const stream = Readable.from(csvContent);
    
    return new Promise<MatchData[]>((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (data: MatchData) => results.push(data))
        .on("end", () => {
          console.log(`Successfully streamed and parsed ${results.length} records from large CSV`);
          resolve(results);
        })
        .on("error", (error) => {
          console.error("CSV streaming error:", error);
          reject(new Error(`Failed to stream CSV data: ${error.message}`));
        });
    });
  } catch (error) {
    console.error("Error in CSV streaming setup:", error);
    throw new Error(`Failed to setup CSV streaming: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
