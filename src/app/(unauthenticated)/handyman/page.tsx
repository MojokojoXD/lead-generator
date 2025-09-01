import { HandymanSurveyForm } from './components/HandymanSurveryForm'

export default function HandymanSurveyPage()
{
  return (
    <div className='min-h-full container mx-auto flex justify-center items-center py-16'>
          <div className='h-full max-w-3xl text-prose'>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tighter text-center mb-10 mx-5'>Compare quotes from top-rated <span className='text-primary'>handymen</span></h1>
            <div className='bg-white py-6 sm:py-10 shadow-sm rounded-lg px-4 sm:px-8 max-w-lg mx-1.5 sm:mx-auto space-y-8 border '>
              <HandymanSurveyForm  />
            </div>
          </div>
    </div>
  )
}