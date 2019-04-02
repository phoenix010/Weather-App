console.log("Client side JS is loaded!")

const weatherForm = document.querySelector('form')
const searchItem = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    // console.log(searchItem.value)
    // console.log('testing')
    const location = searchItem.value
    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ""

    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
                }
        })
    })
})