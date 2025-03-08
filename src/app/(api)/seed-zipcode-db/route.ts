import { NextResponse } from 'next/server';
import fs from 'fs/promises'
import path from 'path';
import { client } from '../_db/mongodb';

const LAT_PROP_NAME = 'lat';
const LNG_PROP_NAME = 'lng';

const regexReplacement = /[""]/g;

interface DataPoint
{
  location: {
    type: string;
    coordinates: number[];
  };
  [ x: string ]: unknown;
}
export async function GET()
{
  
  const csvPath = path.resolve( 'public/uszips.csv' );

  try {
    
    const data = await fs.readFile( csvPath, { encoding: 'utf-8' } );

    const parsedCSV = data.split('\r\n');

    const dataProps = parsedCSV[0].replaceAll(regexReplacement, '').split(',');

    const formattedData = [];

    for ( let i = 1; i < parsedCSV.length; i++ )
    {
      
      const dataPoint: DataPoint = {
        location: {
          type: 'Point',
          coordinates: []
        }
      };

      const dataValues = parsedCSV[ i ].replaceAll( regexReplacement, '' ).split( ',' );

      let index = -1;

      for ( const value of dataValues )
      {
        index++;
        
        const propName = dataProps[ index ];

        if ( index === 5 ) break; // we don't care about property/values after the 5th index
        
         const numberConversion = parseFloat(value);

         const booleanConversion =
           value === 'TRUE'
             ? true
             : value === 'FALSE'
             ? false
               : undefined;
        
        const isValueANumber = !Number.isNaN(numberConversion);

        if ( propName === LAT_PROP_NAME && isValueANumber )
        {
          dataPoint.location.coordinates.push( numberConversion );
          continue;
        }

        if ( propName === LNG_PROP_NAME && isValueANumber )
        {
          dataPoint.location.coordinates.unshift( numberConversion );
          continue;
        }


         dataPoint[ propName ] = isValueANumber
           ? numberConversion
           : typeof booleanConversion === 'boolean'
           ? booleanConversion
             : value;
        
      }

      formattedData.push(dataPoint);
    }

    const connectedClient = await client;

    const db = connectedClient.db('metadata').collection('location-cluster');

    const res = await db.insertMany( formattedData );

    const indexRes = await db.createIndex( { 'location': '2dsphere' } );

    console.log( indexRes )

    if (res.acknowledged) {
      return NextResponse.json(null, {
        status: 200,
      });
    }


    return NextResponse.json(
      { message: 'failed to seed db' },
      {
        status: 500,
      }
    );

  } catch ( error )
  {
    
    console.log( error );

    return NextResponse.json( { message: 'failed to seed db' }, { status: 500 } );
    
  }
  
}
