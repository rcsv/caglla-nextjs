// /src/components/LogoutButton.tsx

'use client';

import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return <button onClick={logout}>ログアウト</button>;
}
