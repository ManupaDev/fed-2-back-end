import { S3Client } from "@aws-sdk/client-s3";

declare global {
  // eslint-disable-next-line no-var
  var cachedS3: S3Client;
}

let S3: S3Client;
if (process.env.NODE_ENV === "production") {
  S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
    },
  });
} else {
  if (!global.cachedS3) {
    global.cachedS3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
      },
    });
  }
  S3 = global.cachedS3;
}

export default S3;
