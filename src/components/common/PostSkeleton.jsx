import React from 'react';

export default function PostSkeleton() {
  return (
    <div className="m-5 w-full min-w-max animate-pulse rounded-lg border border-gray-400 bg-white py-6 px-4 sm:w-4/5 md:w-3/4 md:px-8 lg:w-3/5 xl:w-1/2">
      <div className="flex items-center justify-start">
        <div className="mr-2 h-12 w-12 rounded-full bg-gray-200"></div>
        <div className="h-3 w-20 rounded-2xl bg-gray-200"></div>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <div className="h-3 w-full rounded-2xl bg-gray-200"></div>
        <div className="h-3 w-full rounded-2xl bg-gray-200"></div>
        <div className="h-3 w-full rounded-2xl bg-gray-200"></div>
      </div>
      <div className=" mt-5 h-3 w-40 rounded-2xl bg-gray-200"></div>
    </div>
  );
}
