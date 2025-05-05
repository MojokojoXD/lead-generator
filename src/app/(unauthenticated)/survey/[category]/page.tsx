import { SurveyForm } from '../components/SurveryForm';

export default async function SurveyCategory( { params }: {params: Promise<{ category: string; }>} )
{
  const slug = await params;

  const headerInsert = slug.category.split( '-' ).join( ' ' );

  return (
    <div className='h-full flex justify-center py-24 bg-slate-100'>
      <div className='max-w-3xl space-y-8'>
        <h1 className='text-5xl text-slate-800 font-bold tracking-tight text-center'>Compare quotes from top-rated <span className='capitalize text-rose-500'>{ headerInsert }</span> Contractors</h1>
        <div className='bg-white py-10 shadow-sm rounded-lg px-8 w-3/5 mx-auto space-y-8'>
          <SurveyForm/>
        </div>
      </div>
    </div>
  );
}