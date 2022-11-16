var notice = [
    {
    name:"Mark Webber",
    img:"../ASSETS/IMG/avatar-mark-webber.webp",
    msg: 1,
    post:"My first tournament today!",
    receive:"",
    state: true,
    date: "1m ago",
    id: 1
    },
    {
    name:"Angela Gray",
    img:"../ASSETS/IMG/avatar-angela-gray.webp",
    msg: 2,
    post:"",
    receive:"",
    state: true,
    date: "5m ago",
    id: 2
    },
    {
    name:"Jacob Thompson",
    img:"../ASSETS/IMG/avatar-jacob-thompson.webp",
    msg: 3,
    post:"Chess Club",
    receive:"",
    state: true,
    date: "1 day ago",
    id: 3
    },
    {
    name:"Rizky Hasanuddin",
    img:"../ASSETS/IMG/avatar-rizky-hasanuddin.webp",
    msg: 4,
    post:"",
    receive:"Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm alredy having lots of fun and improving my game.",
    state: false,
    date: "5 days ago",
    id: 4
    },
    {
    name:"Kimberly Smith",
    img:"../ASSETS/IMG/avatar-kimberly-smith.webp",
    msg: 5,
    post:"../ASSETS/IMG/image-chess.webp",
    receive:"",
    state: true,
    date: "1 week ago",
    id: 5
    },
    {
    name:"Nathan Peterson",
    img:"../ASSETS/IMG/avatar-nathan-peterson.webp",
    msg: 1,
    post:"5 end-game strategies to increase your win rate",
    receive:"",
    state: false,
    date: "2 weeks ago",
    id: 6
    },
    {
    name:"Anna Kim",
    img:"../ASSETS/IMG/avatar-anna-kim.webp",
    msg: 6,
    post:"Chess Club",
    receive:"",
    state: false,
    date: "2 weeks ago",
    id: 7
    }
]

function noticeMsg(msg) {
    switch (msg) {
    case 1 :
        return " reacted to your recent post "
    break;
    case 2 :
        return " followed you "
    break;
    case 3 :
        return " has joined your group "
    break;
    case 4 :
        return " sent you a private message "
    break;
    case 5 :
        return " commented on your picture "
    break;
    case 6 :
        return " left the group "
    break;
    }
}

function typeClass(msg) {
    switch (msg) {
        case 1 :
            return "phrase"
        break;
        case 2 :
            return "phrase"
        break;
        case 3 :
            return "group"
        break;
        case 4 :
            return "phrase"
        break;
        case 5 :
            return "phrase"
        break;
        case 6 :
            return "group"
        break;
    }
}

notice.forEach(notice => makeNotice(notice))
countNoti();

function criaTag(el){
    return document.createElement(el);
}

function makeNotice(element) {
    const noticeGroup = document.getElementById("bodyNot");
    let noticePlace = criaTag("div")

    let noticeImg = criaTag("img");
    noticeImg.src = element.img;

    let noticeText = criaTag("div");
    let text = criaTag("p");
    let time = criaTag("p");

    if (element.msg != 5) {
        if(element.state == true){
            text.innerHTML = `<span class="name">${element.name}</span> <span class="msg">${noticeMsg(element.msg)}</span> <span class="${typeClass(element.msg)}">${element.post}</span> <span class="redCircle">&bull;</span>`;

            noticePlace.classList.add("notification", "dontRead");
        } else {
            text.innerHTML = `<span class="name">${element.name}</span> <span class="msg">${noticeMsg(element.msg)}</span> <span class="${typeClass(element.msg)}">${element.post}</span>`;

            noticePlace.classList.add("notification");
        }        
    } else {
        if(element.state == true){
            text.innerHTML = `<span class="name">${element.name}</span> <span class="msg">${noticeMsg(element.msg)}</span> <span class="redCircle">&bull;</span>`;

            noticePlace.classList.add("notification", "dontRead");
        } else {
            text.innerHTML = `<span class="name">${element.name}</span> <span class="msg">${noticeMsg(element.msg)}</span> <div class="redCircle">&bull;</div>`;

            noticePlace.classList.add("notification");
        }
    }

    time.innerHTML = `<span class="msg">${element.date}</span`;

    if(element.msg == 5){
        let yourImg = criaTag("img");
        yourImg.src = element.post;

        let space = criaTag("div");
        space.classList.add("space");

        noticeText.appendChild(text)
        noticeText.appendChild(time)

        space.appendChild(noticeImg)
        space.appendChild(noticeText)

        noticePlace.appendChild(space)
        noticePlace.appendChild(yourImg)

        noticePlace.classList.add("open");

        noticeGroup.appendChild(noticePlace)

    } else {
        noticeText.appendChild(text)
        noticeText.appendChild(time)

        if (element.receive){
            let receiveTXT = criaTag("p");
            receiveTXT.innerHTML = element.receive;
            receiveTXT.classList.add("ticket");

            noticeText.appendChild(receiveTXT) 
        }

        noticePlace.appendChild(noticeImg)
        noticePlace.appendChild(noticeText)
        noticeGroup.appendChild(noticePlace)
    }

    noticePlace.setAttribute("id", `notification_${element.id}`)
    noticePlace.addEventListener("click", function () {viewed(element)})

}

function countNoti() {
    let notificationNumber = 0;

    notice.forEach((element) => {
        if(element.state){
            notificationNumber++;
        }
    })

    document.getElementById("numberNot").innerHTML = notificationNumber;
}

function clearNoti(){
    notice.forEach(notice => setFalse(notice))
    countNoti(notice);


    const clearNoti = document.getElementsByClassName("dontRead");
    for (let i = clearNoti.length - 1; i >= 0; i--){
        let alvo = clearNoti[i].querySelector("span.redCircle");
            if(alvo){
                alvo.remove();
            }
        clearNoti[i].classList.remove("dontRead")
    }

}

function setFalse(element){
    element.state = false;
}

function viewed(element){
    element.state = false;

    const notiDiv = document.getElementById(`notification_${element.id}`)
    notiDiv.classList.remove("dontRead");

    const alvo = notiDiv.querySelector("span.redCircle");
    if (alvo){
        alvo.remove();
    }

    countNoti();
}