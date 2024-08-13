import NotificationsPage from "@/components/notifications/notification-page-component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications - OBO",
};

export default function Page() {
  return <NotificationsPage />
}