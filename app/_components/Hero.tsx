import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Manage Your Expense
        <strong className="font-extrabold text-black-700 sm:block"> Control Your Money </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Start Creation Your budget and save ton of money
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow hover:bg-black-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="#"
        >
          Get Started
        </a>

       
      </div>
    </div>
  </div>
  <Image src={'/dashboard.png'} alt='dashboard' height={700} width={1000} className=' rounded-xl border-2'/>
</section>
  )
}

export default Hero