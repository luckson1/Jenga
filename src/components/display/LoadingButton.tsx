import React from 'react'

const LoadingButton = () => {
  return (
    <div className="flex items-center justify-center m-auto w-full">
    <button type="button"
        className=" btn inline-flex w-full items-center px-4 py-1 text-sm font-semibold leading-6 text-violet-600 transition duration-150 ease-in-out border-[1px] border-violet-600 rounded-md shadow cursor-not-allowed"
        disabled>
        <svg className="w-5 h-5 mr-3 -ml-1 text-violet-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        Loading...
    </button>
</div>
  )
}

export default LoadingButton