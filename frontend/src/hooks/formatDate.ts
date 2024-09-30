const useFormatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();

    const suffix = day % 10 === 1 && day !== 11 ? 'st' :
                   day % 10 === 2 && day !== 12 ? 'nd' :
                   day % 10 === 3 && day !== 13 ? 'rd' : 'th';

    return `${day}${suffix} ${formattedDate.split(' ')[0]} ${formattedDate.split(' ')[2]}`;
}

export default useFormatDate;