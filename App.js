import { useState, useRef, useEffect } from "react";
import Navigation from "./Navigation/Navigation";
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

Notifications.setNotificationChannelAsync("default", {
  name: "default",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C",
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
        // console.log("aqui en App.js", notification.request.content.data);

        if (notification.request.content.data?.key) {
          console.log("aqui en App.js", notification.request.content.data.key);
          queryClient.invalidateQueries(notification.request.content.data.key);
        }

        if (notification.request.content.data?.identifier) {
          console.log(
            "aqui en App.js",
            notification.request.content.data.identifier
          );
          Notifications.dismissNotificationAsync(
            notification.request.content.data.identifier
          );
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Aqui en App.js: ", response);
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
      <Navigation />
    </QueryClientProvider>
  );
}
