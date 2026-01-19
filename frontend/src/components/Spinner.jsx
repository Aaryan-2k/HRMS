export default function Spinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16 mb-4">
        {/* Outer spinning circle */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
        
        {/* Spinning gradient border */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>
      </div>
      <p className="text-center text-[#4c6c9a] dark:text-slate-400 font-medium">{message}</p>
    </div>
  );
}
