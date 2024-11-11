import { withAuth, signOut } from '@workos-inc/authkit-nextjs';

export default async function ProtectedPage() {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <div className="p-8 max-w-md mx-auto">
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
    </div>
  );
}