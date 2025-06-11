import { client, DBs, COLLECTIONS } from '@/app/_db/mongodb';
import { ObjectId } from 'mongodb';
import { auth } from '@/app/api/auth';
import type { DefaultUser } from 'next-auth';
import { NewVendorPayload } from '../../../../components/forms/new-vendor-form';
import { Dashboard } from '../layout/main';
import { ProfileControl } from './ProfileControl';
import
{
  Phone,
  Mail,
  LocateIcon,
  Building2,
  MapPin,
  BriefcaseBusiness,
  Globe
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

    const collection = dbConnection
      .db( DBs.CLIENT_DATA )
      .collection( COLLECTIONS.ACCOUNTS );

    const result = await collection.
      findOne<NewVendorPayload>(
        { _id: new ObjectId( id ) },
        { projection: { _id: 0, pwd: 0, role: 0 } } );

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

  if ( !profile )
    return <div className='h-full w-full flex items-center justify-center'>Profile not found. Try refreshing</div>;

  const iconStyles =
    'aspect-square bg-neutral [&_svg]:size-5 stroke-2 mr-1.5 rounded-lg p-1 flex items-center justify-center';

  return (
    <Dashboard.PortalView title='Profile'>
      <ProfileControl config={ {
        businessName: profile.business?.name,
        category: profile.category
      } } />
      <table className='w-full max-w-sm text-sm [&_td:first-of-type]:flex [&_td:first-of-type]:w-[7rem] [&_td:first-of-type]:py-2.5 [&_td:first-of-type]:text-zinc-500 [&_td:first-of-type]:items-center [&_td:first-of-type]:font-normal [&_td:last-of-type]:text-nowrap [&_td:last-of-type]:truncate [&_td:last-of-type]:font-medium'>
        <thead>
          <tr>
            <th className='text-left py-2.5 font-normal'>About</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div >
                <Phone className={ iconStyles } />
              </div>
              <span>Phone</span>
            </td>
            <td>
              { profile.business?.phone ?? '' }
            </td>
          </tr>
          <tr>
            <td>
              <Mail className={ iconStyles } />
              <span>Email</span>
            </td>
            <td>
              { profile.email }
            </td>
          </tr>
          <tr>
            <td>
              <Globe className={ iconStyles } />
              <span>Website</span>
            </td>
            <td>
              http://{ profile.business?.url ?? '' }
            </td>
          </tr>
          <tr>
            <th className='text-left py-2.5 w-fit font-normal'>Business</th>
          </tr>
          <tr>
            <td>
              <div >
                <BriefcaseBusiness className={ iconStyles } />
              </div>
              <span>Name</span>
            </td>
            <td>
              { profile.business?.name ?? '' }
            </td>
          </tr>
          <tr>
            <td>
              <div >
                <LocateIcon className={ iconStyles } />
              </div>
              <span>Address</span>
            </td>
            <td>
              { profile.business?.address.street ?? '' }
            </td>
          </tr>
          <tr>
            <td>
              <div >
                <Building2 className={ iconStyles } />
              </div>
              <span>City</span>
            </td>
            <td>
              { profile.business?.address.city ?? '' }
            </td>
          </tr>
          <tr>
            <td>
              <div >
                <MapPin className={ iconStyles } />
              </div>
              <span>Zipcode</span>
            </td>
            <td>
              { profile.business?.address.zipcode ?? '' }
            </td>
          </tr>
        </tbody>
      </table>
    </Dashboard.PortalView>
  );
}