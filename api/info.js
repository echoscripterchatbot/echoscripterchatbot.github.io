import name from '../scripts/visual.js'
import aboutHayk from "../api/aboutHayk.js";
const fullSymb = [':)' , '', ")"]
const info = {
    "hi" : {
        'answer' : ["Hello", "Hi"],
        'select' : ['Can you help me'],
        'functional' : false,
        'addRandSymbool' : fullSymb,
    },
    "help" : {
        'answer' : ["Yes", "Sure", "Yes I'm created for it"],
        'select' : ['Math', "Search Info(from wikipedia)", 'more(write can I help and search it)'],
        'functional' : false,
        'addRandSymbool' : fullSymb,
    },
    "math" : {
        'answer' : ['Write expression', 'Please write expression'],
        'select' : ['back'],
        'functional' : true,
        'function' : (text, func) => {
            let result;
            try{
                result = text + ' ' + func(['=', 'equal', 'is equal']) + ' ' + eval(text);
            }
            catch{
                result = "Something is wrong (write only number soon sin cos tan ... function be success to use)";
            }
            return result;
        },
        'call' : ['{text}', '{randFunc}'],
        'addRandSymbool' : [')'],
    },
    "WAY" : {
        'answer' : [`Hello, my name is ${name}. I am a chatbot created by Hayk Antonyan.</br>Read more about Hayk Antonyan`],
        'select' : ['read about Hayk Antonyan', 'back'],
    },
    "R_ABOUT_HAYK" : {
        'answer' : [aboutHayk],
        'select' : ['back'],
    },
    "search info": {
        'answer' : ["soon!!!"],
    //     'select' : [],
    //     'functional' : true,
    //     'function' : (text, f) => {
    //         const arr = [...infoArr];
    //         const information = [];
    //         while(text.length >= 2){
    //             for(let i = 0; i < arr.length; i++){
    //                 const el = arr[i];
    //                 if(el === text){
    //                     f([]);
    //                     console.log(info)
    //                     return `About <span class="title">${el}</span> <br/> ${info[el]}`
    //                 }
    //                 if(el.indexOf(text) !== -1 && !information.includes(el)){
    //                     information.push(el)
    //                 }
    //             }
    //             text = text.slice(0, text.length - 1)
    //         }
    //         if(information.length){
    //             f(information);
    //             return `I'm find information about ...`;
    //         }
    //         return "Oh I'm nothing find please try again";
    //     },
    //     'call' : ['{text}', '{addSelector}'],
    //     'addRandSymbool' : fullSymb,
    },
}
export const quenstions = Object.keys(info)//or object keys

export default info