
import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import { env } from "../../../env/server.mjs";
import { PrismaClient } from "@prisma/client";
import { getServerAuthSession } from "../../../server/auth";
const prisma = new PrismaClient()

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

try {
  const session= await getServerAuthSession({req, res}) 
  const isAdmin=session?.user?.role==="ADMIN"
  const userId= isAdmin? (req.query.userId as string): session?.user?.id

    // make entries to logo table for the product logos
   
  if (userId) {
  const logo = await prisma.logo.create({
    data: {
      userId,
    
    
    },})
  
    const Key = logo.id;
  
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
} catch (error) {
  console.log(error)
}
}