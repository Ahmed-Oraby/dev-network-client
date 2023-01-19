import React from 'react';

export default function ProfileSkeleton() {
  return (
    <div className="m-5 mx-auto w-full animate-pulse rounded-lg bg-white py-6 px-4 sm:w-4/5 md:w-3/4 md:px-8 lg:w-3/5 xl:w-1/2">
      <div className="flex flex-col items-center justify-start">
        <div className="mr-2 h-40 w-40 rounded-full bg-gray-300"></div>
        <div className="mt-5 h-5 w-60 rounded-2xl bg-gray-300"></div>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <div className="h-3 w-full rounded-2xl bg-gray-300"></div>
        <div className="h-3 w-full rounded-2xl bg-gray-300"></div>
        <div className="h-3 w-full rounded-2xl bg-gray-300"></div>
        <div className="h-3 w-full rounded-2xl bg-gray-300"></div>
      </div>
      <div className=" mt-5 h-3 w-1/2 rounded-2xl bg-gray-300"></div>
    </div>
  );
}
