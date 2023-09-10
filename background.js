function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
  
  //new
function nof() 
{
 // alert("old version");
    var token = '6374492794:AAEf-upfx9tKUCWTDEPPSQZKCQ0I07bBqJE';    //  telegram bot token
    var chat_id = '1347884201'; // telegram user chat id
    var currentDate = new Date(); // current date
    var options = { 
        timeZone: 'Asia/Kolkata', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: false 
    };// format of the date which i will send on telegream
    var formattedDate = currentDate.toLocaleString('en-US', options); // formatted the the current date in the above format -- internationalization
    var message = `New Question Arrived on Chegg!!!! ${formattedDate}`;// message to be sent to telegram
    var url = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chat_id + '&text=' + message;
    fetch(url)// making api call to telegram bot api for sending the message to chatid user with the help of token.
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
}
  
//new
function clickExpert() // to just to come to answering page that is expert tab
{
  const element = document.evaluate(
    '//*[@id="__next"]/main/div/header/div/nav/a[2]/span', // xpath of expert tab
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
  
  // element will contain boolean value.

  if (element) {
    element.click();
  }
}
  
async function refreshPage() 
{
   // nof(1);
    if (location.href === "https://expert.chegg.com/qna/authoring/answer" || location.href === "https://expert.chegg.com/qna/authoring") // yadi done me se koi location hoga to andr wala code kam karega
    {
        clickExpert(); // expert tab pr click karne ka function  
        await sleep(10000);
        if (document.body.textContent.includes('Time Left :')) //Time left aa rha dom me to andr wale kam karenge
        {
             clearInterval(intervalID); 
            while(document.body.textContent.includes('Start Solving') || document.body.textContent.includes('Student question'))// yadi dome me start solving ya student question aaya to nof() call kar denge
            {
                nof();// notify karne wala function hain
                await sleep(610000); // 10 minute k liye so jao
                if (location.href === "https://expert.chegg.com/qna/authoring") // 10 minute khtm ho gya and uske bad bhi user authoring page pr hain to use answering page pr lao
                {
                  clickExpert();
                  await sleep(10000);
                }
            }
            while(document.body.textContent.includes('Time Left :'))// ab answering page pr aa gya and 10 minute k bad bhi time chal rhi to mtlb wo koi question ka answer likh rha and jab tak likh rha, tab tak sote raho
            {
               await sleep(60000);
            }
            intervalID = setInterval(refreshPage, 15000); // wrna refreshPage call karlo.
        }
        else
        {
           location.reload();//yadi time left nhi hain to reload karo page ko
        }
    }
}
  

var intervalID = setInterval(refreshPage, 15000); // that's where we call our main function at every 15 second.