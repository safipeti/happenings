export function textualDate(date){

    const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date(date);

    var month = months[d.getMonth()]

    return `${month} ${d.getDate()}`
}