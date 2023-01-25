import fetch from 'node-fetch';
import file from 'fs';

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const classCalendar = []
let daysOfLessons
let gapInterval = false;

//Fix: promise inside promise

genFile("marcelo", "2023-01-17", '2', "marcelo-correa.txt")


export default async function genFile(name, date, frequency, fileName) {

    let month = parseInt(date[5]+date[6], 10);
    let day = parseInt(date.slice(-2), 10);
    let year = parseInt(date.slice(0, 4), 10);
    let header42 = `\n\t\t\t\tCalendar - ${name.charAt(0).toUpperCase() + name.slice(1)} - 42 lessons`;
    let header84 = `\n\t\t\t\tCalendar - ${name.charAt(0).toUpperCase() + name.slice(1)} - 84 lessons`;

    let data = await fetchHolidays(2023);
    const holidays = data.map(holiday => ({ 
        day : holiday.date.slice(-2),
        month : holiday.date.slice(5,7),
        name : holiday.name,
    }))

    // Contract twice a week
    if(frequency === '1') {
        
        file.writeFileSync(fileName, header42);

        for(let k = 0; k < 12; k++) {

            let monthName = months[month - 1];
            daysOfLessons = {[monthName]: []};

            let tableHeader = `\n${months[month - 1]}/${year}\n`;

            file.appendFileSync(fileName, tableHeader);

            while (true) {

                let aux = holidays.filter(holiday => parseInt(holiday.month, 10) === month && parseInt(holiday.day, 10) === day);
            
                if(month === 2 && day <= 28) 
                    if(aux.length)
                        file.appendFileSync(fileName, `${day} - ${aux[0].name}\n`);
                    else
                        file.appendFileSync(fileName, `${day}\n`);
                else if(day <= 31 && month != 2)
                    if(aux.length)
                        file.appendFileSync(fileName, `${day} - ${aux[0].name}\n`);
                    else
                        file.appendFileSync(fileName, `${day}\n`); 
                
                day += 7;

                if(month === 2 && day > 28 || day > 31) 
                    break;  
            }

            classCalendar.push(daysOfLessons)
            day = updateDayGap(day, month, year);
            month++;

        }
    }

    // Contract once a week
    if(frequency === '2') {
        
        file.writeFileSync(fileName, header84);

        for(let m = 0; m < 13; m++) {

            let monthName = months[month - 1];
            let tableHeader = `\n${months[month - 1]}/${year}\n`;

            daysOfLessons = {[monthName]: []};
            file.appendFileSync(fileName, tableHeader);
        
            while(true) {
                // daysOfLessons[monthName].push(day);
                let aux = holidays.filter(holiday => parseInt(holiday.month, 10) === month && parseInt(holiday.day, 10) === day);
            
                if(aux.length)
                    file.appendFileSync(fileName, `${day} - ${aux[0].name}\n`);
                else
                    file.appendFileSync(fileName, `${day}\n`);;
        
                if(gapInterval){
                    day += 5;
                    gapInterval = false;
                }
                else {
                    //Fix: leap year will not work!
                    if(month === 2 && day <= 28)
                        day += 2;
                    else if(day <= 31 && month != 2) 
                        day += 2;
                    gapInterval = true;
                }
        
        
                if(month === 2 && day > 28 || day > 31) 
                    break;  
            }
            classCalendar.push(daysOfLessons)
            day = updateDayGap(day, month, year);
            month++;
        
            if(months[month - 1] === "Dez"){
                month = 1;
                year++;
                data = await fetchHolidays(year);
            }
        }
    }
}

function updateDayGap(day, month, year){
        
    if(month === 2) {
        
        if ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0))){
            return day - 29;
        }
        else  
            return day - 28;    

    }    
    else if(month === 4 || month === 6 || month === 9 || month === 11) 
        return day - 30;
    else 
        return day - 31;

}

async function fetchHolidays(year) {
    try{
        const response = await fetch(`https://api.invertexto.com/v1/holidays/${year}?token=2405|yRFCMvFkvD7TBralRXM1aiuD48qYfj7j`);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Error when trying to fetch holidays!");
    }
}
