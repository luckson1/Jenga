
import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import { env } from "../../../env/server.mjs";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  region: env.REGION,
  signatureVersion: "v4",
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {



  const Key = `${randomUUID()}`;

  const s3Params = {
    Bucket: env.BUCKET_NAME,
    Key,
    Expires: 60,

  };

  const uploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);



  res.status(200).json({
    uploadUrl,
    key: Key,
  });
}