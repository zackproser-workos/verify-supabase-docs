import Link from 'next/link';
import {
  getSignInUrl,
  getSignUpUrl,
  withAuth,
  signOut,
} from '@workos-inc/authkit-nextjs';

export default async function HomePage() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();

  if (!user) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-4 p-8 max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <h2 className="text-2xl font-semibold mb-8 text-gray-600">to Supabase + WorkOS Authkit!</h2>
        <div className="flex gap-4">
          <Link 
            href={signInUrl}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Sign in
          </Link>
          <Link 
            href={signUpUrl}
            className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-6 rounded-lg border border-gray-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto">
      <p className="text-xl mb-4">
        Welcome back{user.firstName && `, ${user.firstName}`}
      </p>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
