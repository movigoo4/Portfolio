'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">
      <h2 className="mb-4 font-outfit text-3xl font-bold text-white md:text-5xl">
        Something went wrong!
      </h2>
      <p className="mb-8 font-mono text-sm text-zinc-400">
        We encountered an error while loading the experience.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-full bg-white px-8 py-3 font-mono text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95"
      >
        Try again
      </button>
    </div>
  );
}
