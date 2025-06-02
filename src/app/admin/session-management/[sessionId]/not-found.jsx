// app/sessions/[sessionId]/not-found.jsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center bg-gray-800 text-white p-8 rounded-lg mx-auto max-w-lg my-8">
      <h2 className="text-4xl font-bold mb-4">Session Not Found!</h2>
      <p className="text-xl text-gray-300 mb-8">
        We could not find the session you're looking for. It might have been moved or deleted.
      </p>
      <Link href="/admin/session-management" className="text-cyan-500 hover:underline text-lg">
        View All Sessions
      </Link>
      <Link href="/" className="text-gray-400 hover:underline mt-2">
        Go to Homepage
      </Link>
    </div>
  );
}