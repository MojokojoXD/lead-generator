import
  {
    S3Client,
    PutObjectCommand,
    type PutObjectCommandInput,
    HeadObjectCommand,
    S3ServiceException,
    GetObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';





const client = new S3Client( {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: <string>process.env.AWS_ACCESS_KEY,
    secretAccessKey: <string>process.env.AWS_ACCESS_SECRET,
    accountId: process.env.AWS_ACCOUNTID
  }
} );


export async function uploadFileToAWS( filename: string, file: Buffer)
{
  const input: PutObjectCommandInput = {
    Body: file,
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename
  }
  
  try
  {
    
    await client.send( new PutObjectCommand( input ) );

    return true;
    
  } catch (error) {
    
    console.log( error )
    
    return false;
  }
}


async function isFileAvailable( fileName: string )
{
  try {
    // Check if the object exists
    await client.send(
      new HeadObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
      })
    );

    // If the object exists, return true
    return true;
  } catch (err) {
    if (err instanceof S3ServiceException && err.name === 'NotFound') {
      // File not found in AWS bucket, return false
      return false;
    } else {
      // Handle other errors
      return false;
    }
  }
}


export async function generatePromoImgURL( fileName: string )
{
  const fileExists = await isFileAvailable( fileName );

  if ( fileExists )
  {
    try
    {
       
      const command = new GetObjectCommand( {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName
       })
      
      const url = await getSignedUrl( client, command );

      return url
       
     } catch (error) {
      console.log( error );
      return ''
     }
  }
  else return 'error'
}