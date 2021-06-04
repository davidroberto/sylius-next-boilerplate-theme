export const formatDateToLocale = (dateString: string): string => {
    const timestamp = Date.parse(dateString);
    const dateObject = new Date(timestamp);
    return dateObject.toLocaleDateString();
}