export default function AboutPage()
{
  return (
    <section className='px-[5%] lg:px-[6.5%] py-10 h-fit text-prose'>
      <div className='h-full max-w-2xl xl:max-w-3xl leading-loose text-xl text-prose mx-auto'>
        <p className='mb-4'>
          <strong>ProsFindr</strong> is your all-in-one platform for getting your new home set up—fast, easy, and free. Whether you just moved or need help with a project, we connect you with trusted, top-rated local professionals.
        </p>
        <h2 className='mb-4'><strong>What We Offer:</strong></h2>
        <h3 className='text-lg font-medium'>🛒 Get Discounts</h3>
        <p className='mb-4'>
          Access exclusive deals on home products, furniture, and décor from local retailers in your area.
        </p>
        <h3 className='text-lg font-medium'>🛠️ Get Quotes</h3>
        <p className='mb-4'>
          Need a pro for a big job like pest control, pool installation, A/C, landscaping, or plumbing? Submit a request and get quotes from vetted local experts—no fees, no pressure.
        </p>
        <h3 className='text-lg font-medium'>🔧 Setup & Installation Help</h3>
        <p className='mb-4'>
          From mounting TVs to cleaning your space or installing blinds, book trusted pros for small, everyday home tasks with just a few clicks.
        </p>
        <h2 className='mb-4'><strong>How It Works</strong></h2>
        <h3 className='text-lg font-medium'>For Homeowners</h3>
        <ul className='list-disc list-inside mb-4'>
          <li>Choose the service you need: discounts, quotes, or quick help.</li>
          <li>Tell us what you need done and when</li>
          <li>We match you with reliable, local pros—fast and free.</li>
        </ul>
        <h3 className='text-lg font-medium'>For Professionals</h3>
        <ul className='list-disc list-inside'>
          <li>Join for free and start receiving local customer requests in your trade.</li>
          <li>Get matched with high-intent homeowners looking for exactly what you offer.</li>
        </ul>
      </div>
    </section>
  );
}