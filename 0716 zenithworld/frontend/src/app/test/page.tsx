export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Test Page
        </h1>
        <p className="text-gray-600">
          Next.js routing is working correctly!
        </p>
        <div className="mt-8">
          <a 
            href="/admin" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Go to Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
} 