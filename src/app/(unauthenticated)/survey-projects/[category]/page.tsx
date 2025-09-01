import { ProjectsSurveyForm } from '../components/ProjectsSurveryForm';

export default async function SurveyCategory( { params }: { params: Promise<{ category: string; }>; } )
{
  const slug = await params;

  const category = slug.category.split( '-' ).join( ' ' );

  return (
    <div className='min-h-full container mx-auto px-5 sm:px-0 flex justify-center items-center py-16'>
      <div className='h-2/3 max-w-3xl text-prose'>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tighter text-center mb-10 mx-5'>Compare quotes from top-rated <span className='text-primary'>{ category !== 'base' ? category : '' }</span> pros</h1>
        <div className='bg-white py-6 sm:py-10 shadow-sm rounded-lg px-4 sm:px-8 max-w-lg lg:max-w-2xl mx-1.5 sm:mx-auto space-y-8 border '>
          <ProjectsSurveyForm category={ category as Categories } />
        </div>
      </div>
    </div>
  );
}