export const getTimeDifference = (fromTime) => {
    const now = new Date();
    const created = new Date(fromTime);

    const timeDifference = now - created;
    const years = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
    const months = Math.floor(timeDifference / (30 * 24 * 60 * 60 * 1000));
    const weeks = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutes = Math.floor(timeDifference / (60 * 1000));
    const seconds = Math.floor(timeDifference / 1000);

    if (years > 0) {
        return `${years} years, ${months} months`;
    } else if (months > 0) {
        return `${months} months, ${weeks} weeks`;
    } else if (weeks > 0) {
        return `${weeks} weeks, ${days} days`;
    } else if (days > 0) {
        return `${days} days, ${hours} hours`;
    } else if (hours > 0) {
        return `${hours} hours, ${minutes} minutes`;
    } else if (minutes > 0) {
        return `${minutes} minutes, ${seconds} seconds`;
    } else if (seconds > 0) {
        return `${seconds} seconds`;
    }
};

export const getAvatarColors = (char) => {
    const colors = [
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#673ab7",
        "#3f51b5",
        "#2196f3",
        "#03a9f4",
        "#00bcd4",
        "#009688",
        "#4caf50",
        "#8bc34a",
        "#cddc39",
        "#ffeb3b",
        "#ffc107",
        "#ff9800",
        "#ff5722",
        "#795548",
        "#9e9e9e",
        "#607d8b",
    ];
    console.log("char----->", char)
    if (char && char.length > 0) {
        const charCode = char.charCodeAt(0);
        const index = charCode % colors.length;
        return colors[index];
    }
    
    return colors[0];
};
