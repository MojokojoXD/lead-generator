import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { ObjectId } from 'mongodb';
import { auth } from '@/app/api/auth';
import type { DefaultUser } from 'next-auth';
import { NewVendorPayload } from '../../../../components/forms/new-vendor-form';
import { DashboardParts } from '../layout/main';
import
{
  Phone,
  Mail,
  LocateIcon,
  Building2,
  MapPin,
  BriefcaseBusiness
} from 'lucide-react';


interface UserWithId extends DefaultUser
{
  id: string;
}


const getProfile = async ( id: string ) =>
{
  const dbConnection = await client.connect();
  try
  {

    const collection = dbConnection.db( DBs.CLIENT_DATA ).collection( COLLECTIONS.ACCOUNTS );

    const result = await collection.findOne<NewVendorPayload>( { _id: new ObjectId( id ) }, { projection: { _id: 0, pwd: 0, role: 0 } } );

    if ( !result ) throw new Error( 'Profile not found' );

    if ( result ) await dbConnection.close();

    return result;

  } catch ( error )
  {

    console.log( error );
  }
};

export async function ProfilePortal()
{

  const session = ( await auth() )!;

  const user = ( session.user ?? {} ) as UserWithId;


  const profile = await getProfile( user.id );

  if ( !profile ) return <div>Profile not found</div>;

  const iconStyles = 'size-4 stroke-2 mr-1.5';

  return (
    <DashboardParts.PortalView title='Profile'>
      <ul className='text-slate-700 space-y-6 font-bold max-w-sm'>
        <div className='space-y-3'>
          <h2>About</h2>
          
          <li className='flex space-x-2.5 items-center'>
            <div className='flex items-center text-zinc-500'>
              <Phone className={ iconStyles } />
              <span>Phone: </span>
            </div>
            <span> { profile.business.phone }</span>
          </li>
          <li className='flex space-x-2.5 items-center'>
            <div className='flex items-center text-zinc-500'>
              <Mail className={ iconStyles } />
              <span>Email: </span>
            </div>
            <span> { profile.email }</span>
          </li>
        </div>
        <hr />
        <div className='space-y-3'>
          <h2>Business Info</h2>
          <li className='flex space-x-2.5 items-center'>
            <div className='flex items-center text-zinc-500'>
              <BriefcaseBusiness className={ iconStyles } />
              <span>Name: </span>
            </div>
            <span> { profile.business.name }</span>
          </li>
          <li className='flex space-x-2.5 items-center'>
            <div className='flex items-center text-zinc-500'>
              <LocateIcon className={ iconStyles } />
              <span>Address: </span>
            </div>
            <span> { profile.business.address.street }</span>
          </li>
          <li className='flex space-x-2.5 items-center'>
            <div className='flex items-center text-zinc-500'>
              <Building2 className={ iconStyles } />
              <span>City: </span>
            </div>
            <span> { profile.business.address.city }</span>
          </li>
          <li className='flex space-x-2.5 items-center'>
            <div className='flex items-center text-zinc-500'>
              <MapPin className={ iconStyles } />
              <span>Zipcode: </span>
            </div>
            <span> { profile.business.address.zipcode }</span>
          </li>
        </div>
      </ul>
    </DashboardParts.PortalView>
  );
}