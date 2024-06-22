import moment from "moment";

export const getLastMonths = () => {
    const currentDate = moment(); // we took the currenct data

    currentDate.date(1); // here we set date = 1 i.e, current month ki pahili tarik

    const lastSixMonths: string[] = [];
    const lastTwelveMonths: string[] = [];

    for (let i = 0; i < 6; i++) {
        const monthDate = currentDate.clone().subtract(i, "months");
        const monthName = monthDate.format("MMMM");
        lastSixMonths.unshift(monthName); // unshift means we have to add at the first
    }

    for (let i = 0; i < 12; i++) {
        const monthDate = currentDate.clone().subtract(i, "months");
        const monthName = monthDate.format("MMMM");
        lastTwelveMonths.unshift(monthName); // unshift means we have to add at the first
    }

    return {
        lastSixMonths,
        lastTwelveMonths
    }
}
