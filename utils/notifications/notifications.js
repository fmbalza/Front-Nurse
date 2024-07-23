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

export const sendPushNotificationV2 = async (
  expoPushToken,
  id,
  fecha,
  hora
) => {
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

export const sendPushNotificationV3 = async (expoPushToken) => {
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

export const timedNotificationV1 = async (timestamp, id) => {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();

  let localeTimestamp = new Date(timestamp).toLocaleString();

  // const oneHourEarlier = new Date(timestamp);
  // oneHourEarlier.setHours(oneHourEarlier.getHours() - 1);

  const thirtyMinutesEarlier = new Date(timestamp);
  thirtyMinutesEarlier.setMinutes(thirtyMinutesEarlier.getMinutes() - 30);

  if (scheduledNotifications.length > 0) {
    if (
      new Date() < new Date(timestamp) &&
      !scheduledNotifications.some(
        (item) =>
          item.content.data.timestamp === timestamp &&
          item.content.data.key === "consulta"
      )
    ) {
      await Notifications.scheduleNotificationAsync({
        content: {
          priority: "high",
          title: "Recordatorio de consulta",
          body: `Su consulta para ${localeTimestamp} está por comenzar`,
          data: {
            timestamp: timestamp,
            key: "consulta",
          },
        },
        // trigger: new Date(timestamp),
        trigger: new Date(thirtyMinutesEarlier),
      });
      // console.log("got in here 1");
    } else {
      // console.log("got in here 2");
      // console.log("Notification already scheduled");
    }
  } else {
    await Notifications.scheduleNotificationAsync({
      content: {
        priority: "high",
        title: "Recordatorio de consulta",
        body: `Su consulta de las ${localeTimestamp} está por comenzar`,
        data: {
          timestamp: timestamp,
          key: "consulta",
        },
      },
      // trigger: new Date(timestamp),
      trigger: new Date(thirtyMinutesEarlier),
    });
    // console.log("got in here 3");
  }

  // await Notifications.cancelAllScheduledNotificationsAsync();
};

export const timedNotificationV2 = async (timestamp, data) => {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();

  if (scheduledNotifications.length > 0) {
    if (
      new Date() < new Date(timestamp) &&
      !scheduledNotifications.some(
        (item) =>
          item.content.data.timestamp === timestamp &&
          item.content.data.key === "Med/Trat"
      )
    ) {
      await Notifications.scheduleNotificationAsync({
        content: {
          priority: "high",
          title: data?.id_horario?.id_medicamento
            ? "Recordatorio de medicamento"
            : "Recordatorio de tratamiento",
          body: data?.id_horario?.id_medicamento?.cp_medicamento
            ? `Es hora de tomar su medicamento ${data.id_horario.id_medicamento.cp_medicamento}`
            : `Es hora de su tratamiento ${data.id_horario.id_tratamiento.no_tratamiento}`,
          data: {
            timestamp: timestamp,
            key: "Med/Trat",
          },
        },
        // trigger: new Date(timestamp),
        trigger: new Date(timestamp),
      });
      // console.log("got in here 1");
    } else {
      // console.log("got in here 2");
      // console.log("Notification already scheduled");
    }
  } else {
    await Notifications.scheduleNotificationAsync({
      content: {
        priority: "high",
        title: data?.id_horario?.id_medicamento
          ? "Recordatorio de medicamento"
          : "Recordatorio de tratamiento",
        body: data?.id_horario?.id_medicamento?.cp_medicamento
          ? `Es hora de tomar su medicamento ${data.id_horario.id_medicamento.cp_medicamento}`
          : `Es hora de aplicarse su tratamiento ${data.id_horario.id_tratamiento.no_tratamiento}`,
        data: {
          timestamp: timestamp,
          key: "Med/Trat",
        },
      },
      // trigger: new Date(timestamp),
      trigger: new Date(timestamp),
    });
    // console.log("got in here 3");
  }

  // await Notifications.cancelAllScheduledNotificationsAsync();
};
