console.log("js from staticFile in clientside");

// // https://puzzle.mead.io/puzzle this url is a sample json data to learn how to fetch 
// // fetch js data from url
// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// to add content on js
// messageOne.textContent = 'Javascript learner'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then(data=>{
            if (data.error){
                // console.log(data.error);
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})