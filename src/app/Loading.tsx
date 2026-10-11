const Loading = (): React.JSX.Element => {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-12">
      {/* Animated Logo */}
      <div className="relative mb-8 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-3xl bg-emerald-200/50" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-600 text-3xl font-black text-white shadow-xl shadow-emerald-200">
          B<span className="text-lime-300">D</span>
        </div>
      </div>

      {/* Loading Text */}
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
        Bazar<span className="text-emerald-600">Dor</span>
      </h1>

      <p className="mt-2 text-center text-sm text-gray-500 sm:text-base">
        আপনার প্রতিদিনের বাজারদর লোড হচ্ছে...
      </p>

      {/* Loading Spinner */}
      <div className="mt-7 flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-[3px] border-emerald-100 border-t-emerald-600" />

        <span className="text-sm font-semibold text-emerald-700">
          Please wait
        </span>
      </div>

      {/* Skeleton Cards */}
      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-emerald-100/80 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 animate-pulse rounded-xl bg-emerald-100" />

              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-200" />
                <div className="h-2.5 w-1/2 animate-pulse rounded-full bg-gray-100" />
              </div>
            </div>

            <div className="mt-6 h-7 w-2/3 animate-pulse rounded-lg bg-gray-100" />

            <div className="mt-3 h-2 w-full animate-pulse rounded-full bg-emerald-50" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs font-medium tracking-wide text-gray-400">
        SMART DAILY MARKET PRICES
      </p>
    </main>
  );
};

export default Loading;