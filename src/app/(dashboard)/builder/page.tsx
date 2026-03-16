
export default function RemovedBuilder() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Moved</h1>
        <p className="text-gray-600">
          This page has been moved. Please use the main dashboard builder.
        </p>
        <a href="/dashboard/builder" className="text-blue-600 hover:underline">
          Go to Dashboard Builder
        </a>
      </div>
    </div>
  );
}
