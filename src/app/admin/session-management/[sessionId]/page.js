// app/sessions/[sessionId]/page.jsx
import { getSessionById } from '@/components/lib/sessions';
import SessionDetailPageContent from '@/components/SessionManagement/SessionDetailPageContent';
 // Use alias
// Use the reusable content component
import { notFound } from 'next/navigation'; // To handle 404s

// Optional: If you want to pre-render ALL session detail pages at build time (SSG)
// Uncomment the following function. This is good for SEO and performance
// if your sessions don't change very frequently.
// export async function generateStaticParams() {
//   const sessions = await getAllSessions();
//   return sessions.map((session) => ({
//     sessionId: session.id,
//   }));
// }

export async function generateMetadata({ params }) {
  const session = await getSessionById(params.sessionId);

  if (!session) {
    return {
      title: 'Session Not Found',
      description: 'The requested session could not be found.',
    };
  }

  return {
    title: `Session: ${session.name}`,
    description: session.aboutTherapySession,
    // Add openGraph images if you have them for social sharing
    openGraph: {
      images: [session.thumbnail],
    },
  };
}

export default async function SessionDetailsPage({ params }) {
  const { sessionId } = params;
  const session = await getSessionById(sessionId);

  if (!session) {
    // If the session is not found, Next.js will render the nearest not-found.js
    // or its default 404 page.
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      {/* Render the reusable content component */}
      <SessionDetailPageContent sessionData={session} />
    </div>
  );
}