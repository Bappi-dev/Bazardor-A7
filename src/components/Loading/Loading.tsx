export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white">
      {/* Animated Shopping Cart or Spinner matching your branding */}
      <div className="relative flex items-center justify-center">
        {/* Outer spinning green circle */}
        <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
        
        {/* Optional inner icon or dot */}
        <div className="absolute w-4 h-4 bg-emerald-600 rounded-full animate-pulse"></div>
      </div>

      {/* Loading text in Bengali matching your app theme */}
      <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
        বাজারের তথ্য লোড হচ্ছে...
      </p>
      <p className="text-sm text-gray-400 mt-1">দয়া করে একটু অপেক্ষা করুন</p>
    </div>
  );
}