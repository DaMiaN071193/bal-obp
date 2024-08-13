'use client';
import { useSession } from "@/components/useSession";
import { UserRoles } from "@/lib/models/interfaces";
import { destroySession } from "@/lib/session";
import { Avatar, CogIcon, LogOutIcon, Menu, NotificationsIcon, Popover, Position } from "evergreen-ui";
import NextLink from "next/link";
import { useCallback } from "react";

export default function AvatarNav() {

  const { data: session, status, notifications } = useSession({
    redirect: false
  })

  const signout = destroySession.bind(null, UserRoles.User)

  const onLogout = useCallback(() => {
    signout()
      .then(async () => {
        window.location.href = '/'
      })
  }, [signout])

  return status !== 'authenticated' ? null : (
    <div className="flex items-center justify-center max-h-[50px]">
      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item className="capitalize">{session?.user?.firstName} {!!session?.user?.middleName && `${session?.user?.middleName?.[0]}. `}{session?.user?.lastName}</Menu.Item>
              <Menu.Item is={NextLink} href={'/' + session?.user?.role + '/notifications'} icon={NotificationsIcon}>
                Notifications ({notifications.length})
              </Menu.Item>
              <Menu.Item is={NextLink} icon={<CogIcon />} href={'/' + session?.user?.role + '/settings'}>Account Settings</Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Group>
              <Menu.Item icon={<LogOutIcon />} onSelect={onLogout} intent="danger">
                Logout
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <Avatar name={session?.user ? `${session?.user?.firstName} ${session?.user?.lastName}` : ''} size={40} marginRight={16} />
      </Popover>
    </div>)
}