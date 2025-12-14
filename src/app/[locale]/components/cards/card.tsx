import { PhoneCall } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface ICard {
  title: string
  position: string
  number: string
  name: string
  image?: string
}

function Card(item: ICard) {
  return (
    <div className="p-4 w-full">
      <div
        className="flex flex-col md:flex-row border rounded-lg bg-white dark:bg-gray-800 shadow-md w-full max-w-[1200px] mx-auto"
        style={{ height: '200px' }} // Kartaning balandligi bir xil
      >
        {/* Rasm bloki */}
        <div
          className="flex-shrink-0"
          style={{ width: '250px', height: '100%' }} // Rasm kengligi va balandligi bir xil
        >
          <Image
            src={item.image || '/placeholder.png'}
            alt={item.title}
            width={250}
            height={200}
            className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        {/* Matn bloki */}
        <div className="flex-grow p-6 flex flex-col justify-between">
          {/* Sarlavha */}
          <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-2">
            {item.title}
          </h2>

          {/* Lavozim */}
          <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
            {item.position.slice(0, 60)}...
          </p>

          {/* Quyidagi bo'lim */}
          <div className="flex justify-between items-center">
            <a
              href="#"
              className="text-indigo-500 dark:text-white text-lg font-medium"
            >
              {item.name}
            </a>
            <div className="flex items-center text-sm font-medium text-indigo-500 dark:text-white space-x-2">
              <PhoneCall size={16} className="text-indigo-500 dark:text-white" />
              <span className='font-medium'>{item.number}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
