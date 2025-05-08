import { Suspense } from 'react';
import { client, dbs } from '@/app/_db/mongodb';
import { ListingCard } from '@/app/components/marketplace/listing-card';
import type { ListingPayload } from '@/app/components/forms/marketplace-listing-form';
import type { ObjectId } from 'mongodb';


type Listing = ListingPayload & { _id: ObjectId; };

const getAllListings = async () =>
{
  const connection = await client.connect();

    

  try
  {

    const collection = connection.db( dbs.client.dbName ).collection( dbs.client.collections.listings );

    const cursor = await collection.find();


    const data = cursor.toArray();

    return data;

  } catch ( error )
  {

    console.log( error );
  } 
};


const twinPines: ListingPayload & { cardImgUrl?: string; } = {
  'businessName': 'Twin Pines',
  'cardImgUrl': '/twin-pines.jpg',
  'desc': 'Some desc',
  'discount': '10',
  'period': {
    'from': 'random date',
    'to': 'random to'
  },
  'title': 'Some title',
  'url_website': '#'
}


export default async function Marketplace()
{

  const listings = await getAllListings() as Listing[];

  return (
    <Suspense fallback={ <p>Loading...</p> }>
      <div className='px-20 py-10 space-y-12 bg-white min-h-screen'>
        <h1 className='text-2xl font-2xl tracking-wide text-slate-800'>Marketplace</h1>
        <div className='grid grid-cols-3 auto-cols-fr gap-8 w-full'>
          {
            listings.map( l =>
            {
              const { _id, ...other } = l;

              return (
                
                  <ListingCard key={ _id.toString() } { ...other } />
              
              );
            } )
          }

          <ListingCard { ...twinPines } />
        </div>
      </div>
    </Suspense>
  );
}