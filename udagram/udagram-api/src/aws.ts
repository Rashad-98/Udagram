import AWS = require("aws-sdk");
import { config } from "./config/config";

//Credentials are auto set according to the documentation https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html and the default profile is "Default anyway"

export const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: config.aws_region,
  params: { Bucket: config.aws_media_bucket },
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl("getObject", {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 600 * 5;

  return s3.getSignedUrl("putObject", {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// (async ()=>{
//   await s3.putObject({
//     Body: "hello world",
//     Bucket: config.aws_media_bucket,
//     Key: "my-file2.txt"
//   }).promise();
// })()
