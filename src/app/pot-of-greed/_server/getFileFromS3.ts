"use server";

import { MatchData } from "@/app/_types/match-data.types";
import AWS from "aws-sdk";
import csv from "csv-parser";
import { Readable } from "stream";

// Validate required environment variables
function validateEnvironmentVariables() {
  const requiredEnvVars = [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

// Initialize S3 client with default AWS SDK authentication
// This will use environment variables, IAM roles, or other AWS credential sources
const s3 = new AWS.S3({
  region: process.env.AWS_REGION || "ap-northeast-1",
});

// Type definition for raw CSV data
interface RawCSVData {
  [key: string]: string | undefined;
}

// Type-safe CSV row parser
function parseCSVRow(data: RawCSVData): MatchData {
  return {
    matchNumber: Number(data.matchNumber) || 0,
    firstPlayer: String(data.firstPlayer || ''),
    firstPlayer_isMobile: String(data.firstPlayer_isMobile || ''),
    firstPlayerLP: Number(data.firstPlayerLP) || 0,
    secondPlayer: String(data.secondPlayer || ''),
    secondPlayer_isMobile: String(data.secondPlayer_isMobile || ''),
    secondPlayerLP: Number(data.secondPlayerLP) || 0,
    winner: String(data.winner || ''),
    cause: String(data.cause || ''),
    turn_count: Number(data.turn_count) || 0,
    date: data.date || '',
    firstPlayer_PotOfGreed: Number(data.firstPlayer_PotOfGreed) || 0,
    firstPlayer_theForcefulSentry: Number(data.firstPlayer_theForcefulSentry) || 0,
    firstPlayer_confiscation: Number(data.firstPlayer_confiscation) || 0,
    firstPlayer_PainfulChoice: Number(data.firstPlayer_PainfulChoice) || 0,
    firstPlayer_changeOfHeart: Number(data.firstPlayer_changeOfHeart) || 0,
    firstPlayer_snatchSteal: Number(data.firstPlayer_snatchSteal) || 0,
    firstPlayer_magicianOfFaith: Number(data.firstPlayer_magicianOfFaith) || 0,
    firstPlayer_donZaloog_hand: Number(data.firstPlayer_donZaloog_hand) || 0,
    firstPlayer_spiritReaper: Number(data.firstPlayer_spiritReaper) || 0,
    firstPlayer_injectionFairyLily: Number(data.firstPlayer_injectionFairyLily) || 0,
    firstPlayer_fiberJar: Number(data.firstPlayer_fiberJar) || 0,
    firstPlayer_airknightParshath: Number(data.firstPlayer_airknightParshath) || 0,
    firstPlayer_airknightParshath_summon: Number(data.firstPlayer_airknightParshath_summon) || 0,
    firstPlayer_Jinzo_summon: Number(data.firstPlayer_Jinzo_summon) || 0,
    firstPlayer_blackLusterSoldier_summon: Number(data.firstPlayer_blackLusterSoldier_summon) || 0,
    firstPlayer_monster_length: Number(data.firstPlayer_monster_length) || 0,
    firstPlayer_monster1: Number(data.firstPlayer_monster1) || 0,
    firstPlayer_monster2: Number(data.firstPlayer_monster2) || 0,
    firstPlayer_monster3: Number(data.firstPlayer_monster3) || 0,
    firstPlayer_monster4: Number(data.firstPlayer_monster4) || 0,
    firstPlayer_monster5: Number(data.firstPlayer_monster5) || 0,
    firstPlayer_spell_trap_length: Number(data.firstPlayer_spell_trap_length) || 0,
    firstPlayer_spell_trap1: Number(data.firstPlayer_spell_trap1) || 0,
    firstPlayer_spell_trap2: Number(data.firstPlayer_spell_trap2) || 0,
    firstPlayer_spell_trap3: Number(data.firstPlayer_spell_trap3) || 0,
    firstPlayer_spell_trap4: Number(data.firstPlayer_spell_trap4) || 0,
    firstPlayer_spell_trap5: Number(data.firstPlayer_spell_trap5) || 0,
    firstPlayer_hand_length: Number(data.firstPlayer_hand_length) || 0,
    firstPlayer_hand_json: String(data.firstPlayer_hand_json || ''),
    firstPlayer_grave_length: Number(data.firstPlayer_grave_length) || 0,
    firstPlayer_grave_json: String(data.firstPlayer_grave_json || ''),
    firstPlayer_banish_length: Number(data.firstPlayer_banish_length) || 0,
    firstPlayer_banish_json: String(data.firstPlayer_banish_json || ''),
    secondPlayer_PotOfGreed: Number(data.secondPlayer_PotOfGreed) || 0,
    secondPlayer_theForcefulSentry: Number(data.secondPlayer_theForcefulSentry) || 0,
    secondPlayer_confiscation: Number(data.secondPlayer_confiscation) || 0,
    secondPlayer_PainfulChoice: Number(data.secondPlayer_PainfulChoice) || 0,
    secondPlayer_changeOfHeart: Number(data.secondPlayer_changeOfHeart) || 0,
    secondPlayer_snatchSteal: Number(data.secondPlayer_snatchSteal) || 0,
    secondPlayer_magicianOfFaith: Number(data.secondPlayer_magicianOfFaith) || 0,
    secondPlayer_donZaloog_hand: Number(data.secondPlayer_donZaloog_hand) || 0,
    secondPlayer_spiritReaper: Number(data.secondPlayer_spiritReaper) || 0,
    secondPlayer_injectionFairyLily: Number(data.secondPlayer_injectionFairyLily) || 0,
    secondPlayer_fiberJar: Number(data.secondPlayer_fiberJar) || 0,
    secondPlayer_airknightParshath: Number(data.secondPlayer_airknightParshath) || 0,
    secondPlayer_airknightParshath_summon: Number(data.secondPlayer_airknightParshath_summon) || 0,
    secondPlayer_Jinzo_summon: Number(data.secondPlayer_Jinzo_summon) || 0,
    secondPlayer_blackLusterSoldier_summon: Number(data.secondPlayer_blackLusterSoldier_summon) || 0,
    secondPlayer_monster_length: Number(data.secondPlayer_monster_length) || 0,
    secondPlayer_monster1: Number(data.secondPlayer_monster1) || 0,
    secondPlayer_monster2: Number(data.secondPlayer_monster2) || 0,
    secondPlayer_monster3: Number(data.secondPlayer_monster3) || 0,
    secondPlayer_monster4: Number(data.secondPlayer_monster4) || 0,
    secondPlayer_monster5: Number(data.secondPlayer_monster5) || 0,
    secondPlayer_spell_trap_length: Number(data.secondPlayer_spell_trap_length) || 0,
    secondPlayer_spell_trap1: Number(data.secondPlayer_spell_trap1) || 0,
    secondPlayer_spell_trap2: Number(data.secondPlayer_spell_trap2) || 0,
    secondPlayer_spell_trap3: Number(data.secondPlayer_spell_trap3) || 0,
    secondPlayer_spell_trap4: Number(data.secondPlayer_spell_trap4) || 0,
    secondPlayer_spell_trap5: Number(data.secondPlayer_spell_trap5) || 0,
    secondPlayer_hand_length: Number(data.secondPlayer_hand_length) || 0,
    secondPlayer_hand_json: String(data.secondPlayer_hand_json || ''),
    secondPlayer_grave_length: Number(data.secondPlayer_grave_length) || 0,
    secondPlayer_grave_json: String(data.secondPlayer_grave_json || ''),
    secondPlayer_banish_length: Number(data.secondPlayer_banish_length) || 0,
    secondPlayer_banish_json: String(data.secondPlayer_banish_json || ''),
  };
}

export async function getFileFromS3(): Promise<MatchData[]> {
  try {
    // Validate environment variables before proceeding
    validateEnvironmentVariables();

    const params = {
      Bucket: "04-matchdata",
      Key: "matchData_all.csv",
    };

    console.log(`Fetching file from S3: s3://${params.Bucket}/${params.Key}`);
    
    const data = await s3.getObject(params).promise();
    
    if (!data.Body) {
      throw new Error("No data received from S3 object");
    }
    
    const csvContent = data.Body.toString("utf-8");
    
    if (!csvContent.trim()) {
      throw new Error("CSV file is empty");
    }

    console.log(`Successfully retrieved CSV file with ${csvContent.split('\n').length} lines`);

    // Parse CSV with type safety
    const results: MatchData[] = [];
    const stream = Readable.from(csvContent);
    
    return new Promise<MatchData[]>((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (data) => {
          try {
            const parsedRow = parseCSVRow(data);
            results.push(parsedRow);
          } catch (parseError) {
            console.warn("Failed to parse CSV row:", parseError);
            // Continue processing other rows instead of failing completely
          }
        })
        .on("end", () => {
          console.log(`Successfully parsed ${results.length} match data records`);
          resolve(results);
        })
        .on("error", (streamError) => {
          console.error("CSV parsing stream error:", streamError);
          reject(new Error(`Failed to parse CSV data: ${streamError.message}`));
        });
    });
  } catch (error) {
    if (error instanceof Error) {
// AWS Error interface for better type safety
interface AWSError extends Error {
  code?: string;
  statusCode?: number;
}

      console.error("Error fetching file from S3:", {
        message: error.message,
        code: (error as AWSError).code,
        statusCode: (error as AWSError).statusCode,
        stack: error.stack
      });
      
      // Provide specific error messages based on error type
      const awsError = error as AWSError;
      if (awsError.code === 'NoSuchBucket') {
        throw new Error("S3 bucket '04-matchdata' does not exist or is not accessible");
      } else if (awsError.code === 'NoSuchKey') {
        throw new Error("CSV file 'matchData_all.csv' not found in S3 bucket");
      } else if (awsError.code === 'AccessDenied') {
        throw new Error("Access denied to S3 bucket. Please check AWS credentials and permissions");
      } else if (awsError.code === 'InvalidAccessKeyId') {
        throw new Error("Invalid AWS access key ID. Please check your AWS credentials");
      } else if (awsError.code === 'SignatureDoesNotMatch') {
        throw new Error("Invalid AWS secret access key. Please check your AWS credentials");
      } else if (error.message.includes('Missing required environment variables')) {
        throw error; // Re-throw environment variable errors as-is
      } else {
        throw new Error(`Failed to fetch match data from S3: ${error.message}`);
      }
    } else {
      console.error("Unknown error fetching file from S3:", error);
      throw new Error("An unexpected error occurred while fetching match data");
    }
  }
}
