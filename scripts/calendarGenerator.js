import docxGen from './docxGenerator.js';
import fetch from 'node-fetch';
import file from 'fs';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dec"];
const lessonsCalendar = []
let gapInterval = false;

export default async function genFile(name, date, frequency, fileName) {

    let day = Number.parseInt(date.slice(8), 10);
    let month = parseInt(date.slice(5,7), 10);
    let year = parseInt(date.slice(0,4), 10);
    let numberOfLessons;

    let data = await fetchHolidays(year);
    const holidays = data.map(holiday => ({ 
        day : holiday.date.slice(-2),
        month : holiday.date.slice(5,7),
        name : holiday.name,
    }))

    // Contract twice a week
    if(frequency === '1') {
        
        numberOfLessons = 42;

        for(let m = 0; m < 13; m++) {

            let monthName = months[month - 1];
            let daysOfLessons = {month: monthName, days: [], year: year};

            if(monthName === 'Dec'){
                month = 0;
                year++;
            } 

            while (true) {

                let holiday = holidays.filter(holiday => Number.parseInt(holiday.month, 10) === month && Number.parseInt(holiday.day, 10) === day);
            
                if(month === 2 && day <= 28) {
                    if(holiday.length)
                        daysOfLessons.days.push(`${day} - ${holiday[0].name}`);
                    else
                        daysOfLessons.days.push(day);
                }
                else if(day <= 31 && month != 2) {
                    if(holiday.length)
                        daysOfLessons.days.push(`${day} - ${holiday[0].name}`);
                    else
                        daysOfLessons.days.push(day);
                }
                
                day += 7;

                if(month === 2 && day > 28 || day > 31) 
                    break;  
            }

            lessonsCalendar.push(daysOfLessons)
            day = updateDayGap(day, month, year);
            month++;

        }
    }

    // Contract once a week
    if(frequency === '2') {
        
        numberOfLessons = '84';

        for(let m = 0; m < 13; m++) {
            
            let monthName = months[month - 1];
            let daysOfLessons = {month: monthName, days: [], year: year};

            if(monthName === 'Dec'){
                month = 0;
                year++;
            } 

            while(true) {
                let holiday = holidays.filter(holiday => Number.parseInt(holiday.month, 10) === month && Number.parseInt(holiday.day, 10) === day);
            
                if(holiday.length)
                    daysOfLessons.days.push(`${day} - ${holiday[0].name}`);
                else
                    daysOfLessons.days.push(day);
        
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
        
                if((month === 2 && day > 28) || day > 31) 
                    break;  

            }
            lessonsCalendar.push(daysOfLessons);
            day = updateDayGap(day, month, year);
            month++;
        }
    }

    console.log(frequency, lessonsCalendar);
    docxGen(name, lessonsCalendar, numberOfLessons, fileName);

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
