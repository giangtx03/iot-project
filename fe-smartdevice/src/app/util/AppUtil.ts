export const formatDate = (timeArray:any) => {
  const [year, month, day, hour, minute, second] = timeArray;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ` +
         `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
}


export const translateDeviceName = (deviceName: string): string => {
  const translations: Record<string, string> = {
    fan: "Quạt",
    dehumidifier: "Máy hút ẩm",
    bulb: "Bóng đèn",
  };

  return translations[deviceName] || deviceName;
};

