import moment from 'moment';
export default function formatLastSeen(timestamp) {
    const now = moment();
    const lastSeen = moment(timestamp);

    if (lastSeen.isSame(now, 'day')) {
        return 'Today at ' + lastSeen.format('h:mm A');
    } else if (lastSeen.isSame(now.subtract(1, 'day'), 'day')) {
        return 'Yesterday at ' + lastSeen.format('h:mm A');
    } else if (lastSeen.isBetween(now.subtract(7, 'days'), now)) {
         return lastSeen.format('dddd') + ' at ' + lastSeen.format('h:mm A');
    }
    else {
        return lastSeen.format('MMMM D, YYYY h:mm A');
    }
}

// // Example usage:
// const timestamp = 1678886400000; // Example timestamp in milliseconds
// const formattedTime = formatLastSeen(timestamp);
// console.log(formattedTime);