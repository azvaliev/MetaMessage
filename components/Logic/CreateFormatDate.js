const CreateDate = () => {
    return new Date();
}

const CompareDates = past => {
    const current = Date.now();
    let pastConv = new Date(past);
    const pastFormat = FormatDate(pastConv);
    let dif = current - Date.parse(pastConv);
    // convert difference from ms to minutes
    dif = dif / 60000;
    let displayMessage;
    
    if (dif <= 1.9) {
        displayMessage = "Just now"
    } else if (dif < 50) {
        displayMessage = `${Math.round(dif)} minutes ago`
    } else if (dif <=70 ) {
        displayMessage = `1 hour ago`
    } else if (dif <=100 ) {
        displayMessage = `1.5 hours ago`
    } else if (dif < 1380) {
        displayMessage = `${Math.round(dif/60)} hours ago`
    } else if (dif < 2800) {
        displayMessage = `Yesterday`
    } else if (dif < 8640) {
        displayMessage = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(pastConv);
    } else if (dif < 80320) {
        displayMessage = `${Math.round(dif/10080)} weeks ago`
    } else if (dif < 524160) {
        displayMessage = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(pastConv);
    } else {
        displayMessage = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(pastConv) + ', ' + pastConv.getFullYear();
    }
    return [pastFormat, displayMessage];

}

const FormatDate = date => {
    let tempDate = date.toDateString();
    return {
        year: date.getFullYear(),
        month: tempDate.substring(4, 7),
        dayOfWeek: tempDate.substring(0, 3),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes()
    }
}

export { CreateDate, CompareDates };