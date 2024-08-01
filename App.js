import { useState, useRef, useEffect } from "react";
import Navigation from "./Navigation/Navigation";
import { StatusBar } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

const queryClient = new QueryClient();

export default function App() {
  // const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);

        if (notification.request.content.data?.key) {
          queryClient.invalidateQueries(notification.request.content.data.key);
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("Aqui en App.js: ", response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar hidden={true} />
      <Navigation />
    </QueryClientProvider>
  );
}
