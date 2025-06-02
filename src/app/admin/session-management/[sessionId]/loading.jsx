// app/sessions/[sessionId]/loading.jsx
const Loading = () => {
  return (
    <div className="bg-[#343434] p-6 rounded-lg shadow-lg text-white max-w-4xl mx-auto my-8 animate-pulse">
      <div className="h-10 bg-gray-700 rounded w-3/4 mb-6 mx-auto"></div> {/* Title skeleton */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column Skeletons */}
        <div>
          <div className="mb-6">
            <div className="h-6 w-1/3 bg-gray-700 rounded mb-2"></div> {/* Thumbnail title */}
            <div className="h-48 w-full bg-gray-700 rounded-lg"></div> {/* Thumbnail box */}
          </div>
          <div className="mb-6">
            <div className="h-6 w-1/2 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-700 rounded mb-1"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
          </div>
          <div className="mb-6">
            <div className="h-6 w-1/3 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-700 rounded mb-1"></div>
            <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
          </div>
          <div className="mb-6">
            <div className="h-6 w-1/3 bg-gray-700 rounded mb-2"></div>
            <ul className="space-y-2">
              <li className="h-4 w-full bg-gray-700 rounded"></li>
              <li className="h-4 w-5/6 bg-gray-700 rounded"></li>
              <li className="h-4 w-full bg-gray-700 rounded"></li>
            </ul>
          </div>
          <div>
            <div className="h-6 w-1/4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Right Column Skeletons */}
        <div>
          <div className="mb-6">
            <div className="h-6 w-1/3 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
          </div>
          <div className="mb-6">
            <div className="h-6 w-1/3 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-700 rounded"></div>
          </div>
          <div className="mb-6">
            <div className="h-6 w-1/3 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
          </div>
          <div className="mb-6">
            <div className="h-6 w-1/3 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
          </div>
          <div className="mb-6">
            <div className="h-6 w-1/3 bg-gray-700 rounded mb-2"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="h-4 w-1/3 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;