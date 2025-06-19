export default function AboutPage()
{
  return (
    <section className='px-[5%] lg:px-[6.5%] py-10 space-y-12 min-h-screentext-prose'>
      <h1 className='text-2xl font-medium tracking-wide '>About Us</h1>
      <div className='w-full h-full sm:text-lg lg:text-xl'>
        <p className='max-w-prose leading-10 mb-10'>ProsFindr is an online local services marketplace that connects homeowners with vetted professionals covering categories like security systems, pest control, landscaping, pool service, A/C, plumbing, and more.</p>

        <h2 className='text-xl font-medium tracking-wide mb-6'>How ProsFindr Works</h2>

        <ul className='max-w-prose leading-10 list-disc list-inside [&_span]:font-medium'>
          <li>
            <span >For homeowners/users:</span> You post a job request (e.g., &quot;need a landscaper&quot;), and it gets sent to multiple local pros. You compare quotes, communicate and read reviews—all free for you.
          </li>
          <li>
            <span >For homeowners/users:</span> You register for free. You get leads in bulk and can be featured as top or popular pro.
          </li>
        </ul>
      </div>
    </section>
  );
}