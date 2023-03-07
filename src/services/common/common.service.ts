const formatDate = (dateObj: Date) => {
    const formattedDate = dateObj.toLocaleString('default', { month: 'short' }) + " " + dateObj.getDate() + " " + dateObj.getFullYear();
    return formattedDate;
}

export default formatDate;