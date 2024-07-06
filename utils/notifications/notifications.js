import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import useAuthStore from "../storage/auth";

const handleRegistrationError = (errorMessage) => {
  alert(errorMessage);
  throw new Error(errorMessage);
};

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }

    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      // console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
};

export const sendPushNotificationV1 = async (expoPushToken, fecha, hora) => {
  const { user } = useAuthStore.getState();

  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Consulta agendada!",
    body: `Saludos, ${user?.no_medico} ${user?.ap_medico} ha agendado una consulta para el ${fecha} a las ${hora}`,
    data: { key: "getConsultasById" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

export const sendPushNotificationV2 = async (expoPushToken, fecha, hora) => {
  const { user } = useAuthStore.getState();

  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Consulta cancelada!",
    body: `${user?.no_medico} ${user?.ap_medico} ha cancelado la consulta del ${fecha} a las ${hora}`,
    data: { key: "getConsultasById" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

export const sendPushNotificationV3 = async (expoPushToken, fecha, hora) => {
  const { user } = useAuthStore.getState();

  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Tratamiento asignado!",
    body: `${user?.no_medico} ${user?.ap_medico} le ha asignado un nuevo tratamiento`,
    data: { key: "assignTratamiento" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

export const timedNotificationV1 = async (timestamp) => {
  console.log("Aqui", new Date(timestamp).toLocaleString());
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hey!",
    },
    trigger: new Date(timestamp),
  });
  // await Notifications.cancelScheduledNotificationAsync(identifier);
  // await Notifications.cancelAllScheduledNotificationsAsync();
};
