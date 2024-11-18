import { ChatbotUIContext } from "@/context/context"

import { supabase } from "@/lib/supabase/browser-client"

import {
  IconLogout,
  IconUser
} from "@tabler/icons-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC, useContext, useRef, useState } from "react"
import { SIDEBAR_ICON_SIZE } from "../sidebar/sidebar-switcher"
import { Button } from "../ui/button"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet"

import { ThemeSwitcher } from "./theme-switcher"

interface ProfileSettingsProps {}

export const ProfileSettings: FC<ProfileSettingsProps> = ({}) => {
  const {
    profile,
  } = useContext(ChatbotUIContext)

  const router = useRouter()

  const buttonRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
    return
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      buttonRef.current?.click()
    }
  }

  if (!profile) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {profile.image_url ? (
          <Image
            className="mt-2 size-[34px] cursor-pointer rounded hover:opacity-50"
            src={profile.image_url + "?" + new Date().getTime()}
            height={34}
            width={34}
            alt={"Image"}
          />
        ) : (
          <Button size="icon" variant="ghost">
            <IconUser size={SIDEBAR_ICON_SIZE} />
          </Button>
        )}
      </SheetTrigger>

      <SheetContent
        className="flex flex-col justify-between"
        side="left"
        onKeyDown={handleKeyDown}
      >
        <div className="grow overflow-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between space-x-2">
              {/* <div>User Settings</div> */}

              <Button
                tabIndex={-1}
                className="text-xs"
                size="sm"
                onClick={handleSignOut}
              >
                <IconLogout className="mr-1" size={20} />
                Logout
              </Button>
            </SheetTitle>
          </SheetHeader>

        </div>

        <div className="mt-6 flex items-center">
          <div className="flex items-center space-x-1">
            <ThemeSwitcher />
          </div>

          <div className="ml-auto space-x-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            {/* <Button ref={buttonRef} onClick={handleSave}>
              Save
            </Button> */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
