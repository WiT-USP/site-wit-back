export function formatDateTime(dateTimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate = new Date(dateTimeString).toLocaleString(
    "pt-BR",
    options
  );
  return formattedDate;
}
