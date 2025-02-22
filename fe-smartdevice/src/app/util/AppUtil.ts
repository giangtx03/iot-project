export const formatDate = (timeArray: any) => {
  if (Array.isArray(timeArray)) {
    const [year, month, day, hour, minute, second] = timeArray;
    return (
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )} ` +
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}:${String(second).padStart(2, "0")}`
    );
  }
  if (typeof timeArray === "string") {
    // Nếu là chuỗi ISO thì chuyển thành Date và format lại thành chuỗi
    const date = new Date(timeArray);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ` +
           `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  }
};

export const translateDeviceName = (deviceName: string): string => {
  const translations: Record<string, string> = {
    fan: "Quạt",
    dehumidifier: "Máy hút ẩm",
    bulb: "Bóng đèn",
  };

  return translations[deviceName] || deviceName;
};

export const parseISOToArray = (isoString: string): number[] => {
  const date = new Date(isoString);
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds() * 1e6,
  ];
};
