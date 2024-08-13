'use client'

import NotificationsNav from "@/components/notifications/notifications"
import { useSession } from "@/components/useSession"

export default function NotificationNav() {
  const { status, notifications, markAsAllRead, markAsRead } = useSession({ redirect: false })

  return status !== 'authenticated' ? null : (
    <div className="mr-4 ml-2 hidden md:flex">
      <NotificationsNav onMarkAsRead={markAsRead} onMarkAllRead={markAsAllRead} notifications={notifications} />
    </div>
  )
}