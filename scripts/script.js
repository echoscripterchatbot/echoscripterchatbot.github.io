import data, {quenstions} from "../api/info.js"
import name from "./visual.js"
import replace from '../homanishner/info.js'
const textArea = document.querySelector("textarea");
const activeChat = document.getElementById("chatwrite");
const selectDiv = document.getElementById('select')
const generationElmProcessAnim  = document.getElementById("gen")
const startSelectors = ['HI', 'Can you help me', "Who are you?"]
const stack= [startSelectors];
let sending = false;
let functional = {f: false};
// textArea.addEventListener('input', (e) => {
//     if(e.currentTarget.value){
//         selectDiv.classList.add('write')
//     }
//     else{
//         selectDiv.classList.remove('write')
//     }
// })
textArea.addEventListener("keydown", (e) => {
    if(e.key === 'Enter' && !sending){
        e.preventDefault()
        const t = (textArea.value.trim());
        if(!t.length){
            return;
        }
        sendingProcess(t)
    }
})


function sendChat(text){
    activeChat.innerHTML += `<div class='sender'><p>${text}</p></div>`
}
async function sendingProcess(t){
    if(sending){
        return;
    }
    sending = true;
    textArea.value = '';
    if(t === 'back' ){ //todo finded bug (it's fixed but not 100%)
        functional.f = false;
        sending = false;
        if(stack.length){
            stack.pop();
            addSelector(stack[stack.length - 1] || startSelectors);
        }
        return;
    }
    sendChat(t);
    generationElmProcessAnim.classList.add("active")
    await generate(t.toLowerCase()).then((t) => {
        chatToUser(t);
    }).catch((err) =>{
        alert(err);
    })
}
function chatToUser(text){
    if(text === ''){
        return;
    }
    // selectDiv.classList.remove('write')
    generationElmProcessAnim.classList.remove("active")
    activeChat.innerHTML += `<div class='chat'><div><p class="mBottom">${name}</p><p>${text}</p></div></div>`
}
function textConverter(t){
    //replace all names
    for(const elm of replace){
        const replaceTo = elm.replace;
        for(const rep of elm.words){
            t = t.replaceAll(rep, replaceTo)
        }
    }
    return t;
}
async function generate(text){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            sending = false;
            const info = {'{text}' : text, '{name}' : name, '{randFunc}' : randomAnswer, '{stack}' : stack, '{addSelector}' : addSelector};
            text = textConverter(text);
            //const el = data[text];
            let answer = '';
            let lastEl;
            quenstions.map((el) => {//select in quenstion words
                if(text.indexOf(el) !== -1){
                    const infoElm = data[el];
                    lastEl = infoElm;
                    answer += randomAnswer(infoElm.answer) + ' ' + randomAnswer(infoElm.addRandSymbool) +' ';
                }
            })
            const {call, f, func} = functional;
            if(!answer){ //if answer is not found
                if(f){
                    let callArg = call.map((el) => {
                        const elm = info[el];
                        if(elm){
                            return elm;
                        }
                        return el;
                    })
                    resolve(func(...callArg) || '');
                }
                resolve("I can't understand please select quenstions :)");
            }
            // functional.f = false;
            function randomAnswer(answers){ //random gen text
                if (!answers){
                    return '';
                }
                return answers[Math.floor(Math.random() * answers.length)];
            }
            if(lastEl){
                stack.push(lastEl.select)
                if(lastEl.functional){
                    functional.f = true;
                    functional.func = lastEl.function
                    functional.call = lastEl.call;
                }
                addSelector(lastEl.select)
            }
            resolve(answer + '.')
        }, 2000)
    })
}
function addSelector(arr){
    if(!Array.isArray(arr)){
        console.info("call and give array in args");
        return;
    }
    selectDiv.innerHTML = '';
    arr.map((el) => {
        const elm = document.createElement("div");
        elm.innerHTML = el;
        elm.addEventListener('click', () => {
            sendingProcess(el);
        })
        selectDiv.appendChild(elm);
    })
}
addSelector(startSelectors)