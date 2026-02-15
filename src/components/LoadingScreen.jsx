import { Loader } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <Loader className="w-16 h-16 mx-auto text-white animate-spin" />
        <h2 className="text-2xl font-bold text-white">
          Loading Netflix Movies...
        </h2>
        <p className="text-pink-200">Getting the latest releases for you</p>
      </div>
    </div>
  );
}
