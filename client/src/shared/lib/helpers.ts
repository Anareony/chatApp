import moment from "moment";

const validateDate = (messageDate: number) =>
  String(messageDate).padStart(2, "0");

export const getDate = (messageDat: string) => {
  const today = new Date().getDate();
  const messageDate = new Date(messageDat);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const messageYear = messageDate.getFullYear();
  const messageMonth = messageDate.getMonth() + 1;
  const messageDay = messageDate.getDate();
  const messageHours = validateDate(messageDate.getHours());
  const messageMinutes = validateDate(messageDate.getMinutes());

  if (today === messageDay) {
    return `Today at ${messageHours}:${messageMinutes}`;
  }

  if (yesterday.getDate() === messageDay) {
    return `Yesterday at ${messageHours}:${messageMinutes}`;
  }

  return `${validateDate(messageDay)}/${validateDate(
    messageMonth
  )}/${messageYear} ${messageHours}:${messageMinutes}`;
};

export const formateDate = (messageDate: string) => {
  if (moment(messageDate).isSame(new Date(), "day")) {
    return "Today";
  }
  if (moment(messageDate).isBefore(new Date(), "day")) {
    return "Yesterday";
  }
  return moment(messageDate).format("LL");
};

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: "#fff",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
