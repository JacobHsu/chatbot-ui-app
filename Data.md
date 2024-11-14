# API

app/[locale]/layout.tsx

```js
import { GlobalState } from "@/components/utility/global-state"

<div className="bg-background text-foreground flex h-dvh flex-col items-center overflow-x-auto">
    {session ? <GlobalState>{children}</GlobalState> : children}
</div>
```

components/utility/global-state.tsx

```js
import { getProfileByUserId } from "@/db/profile"
const profile = await getProfileByUserId(user.id)
setProfile(profile)
```

/db/profile

[supabase](https://supabase.com/) table > profiles

```js
import { supabase } from "@/lib/supabase/browser-client"
export const getProfileByUserId = async (userId: string) => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (!profile) {
    throw new Error(error.message)
  }

  return profile
}
```