const getUserName = new URL(window.location.href);
const parsedUserName = getUserName.searchParams.get("u");
//console.log(parsedUserName);
const apiHeader = {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "tiktok33.p.rapidapi.com",
        "x-rapidapi-key": "4af404053bmshf9e7eda577b5334p1c6a1ajsn64905de242de"
    }
};
const userContainer = document.getElementById("userContainer");
const userFeedContainer = document.getElementById("userFeedContainer");


const specRound = (x) =>{
    if(x>=1000 && x<=99999){return (x/1000).toFixed(0) + 'k';}
    else if(x>=99999){return (x/1000000).toFixed(1) + 'M';}
    else{return x;}
}
//console.log(specRound(12345678));


const userTemplate = (theData) =>{
    //console.log(theData.user.nickname);
    return `
    <div class="userInfo__main">
        <div class="userInfo__logo"><img src="${theData.user.avatarThumb}" alt="avatar"></div>
        <div class="userInfo__names">
            <h1 class="userInfo__names__nickname">${theData.user.nickname}</h1>
            <h2 class="userInfo__names__idname">${theData.user.uniqueId}</h2>
        </div>
    </div>
    <div class="userInfo__counters">
        <div class="userInfo__counters__item">Videos: <span class="counter__big">${specRound(theData.stats.videoCount)}</span></div>
        <div class="userInfo__counters__item">Likes: <span class="counter__big">${specRound(theData.stats.heart)}</span></div>
        <div class="userInfo__counters__item">Following: <span class="counter__big">${specRound(theData.stats.followingCount)}9</span></div>
        <div class="userInfo__counters__item">Followers: <span class="counter__big">${specRound(theData.stats.followerCount)}</span></div>
    </div>
    <div class="userInfo__signature">${theData.user.signature}</div>
    `
};

const userFeedTemplate = (theData) => {
    return `   
        <div class="videoItem">
            <div class="videoItem__description__top">
                <div class="description__counters">
                    <div class="description__name"><img class="play__icon" src="img/play.jpg" alt="W"> ${specRound(theData.stats.playCount)}</div>
                </div>  
            </div>
            <div class="videoItem__cover" style="background-image: url('${theData.video.cover}')">
                <div class="videoItem__preloader"><img src="img/tail-spin.svg" alt="spinner"></div>
                <video class ="video" src="${theData.video.downloadAddr}" muted autoplay loop></video>

                <div class="videoItem__info__wrapp">
                    <div class="description__text">${theData.desc}</div>
                    <div class="description__hashTags"></div>
                </div>
            </div>

            <div class="videoItem__description">
                <div class="description__counters">
                    <div class="description__name"><img src="img/comment.jpg" alt="L"> ${specRound(theData.stats.commentCount)}</div>
                    <div class="description__name"><img src="img/like.jpg" alt="C"> ${specRound(theData.stats.diggCount)}</div>
                </div>  
            </div>
        </div>
    `
}

const showUserInfo = (username) =>{
    const userApiLink ='https://tiktok33.p.rapidapi.com/user/info/' + username;

    fetch(userApiLink, apiHeader)
    .then(response => response.json())
    .then(data => {
        if(data){
            //console.log(data);
            userContainer.innerHTML += userTemplate(data);
        }
    });
};


// Doesn't Work since from 2021.11.17 =(
// const showUserFeed = (username) =>{
//     const userApiLink ='https://tiktok33.p.rapidapi.com/user/feed/' + username;

//     fetch(userApiLink, apiHeader)
//     .then(responseFeed => responseFeed.json())
//     .then(dataFeed => {  console.log(dataFeed);
//         if(dataFeed){
//             dataFeed.forEach(element => {
//                 console.log(element);
//                 //userFeedContainer.innerHTML += userFeedTemplate(element);
//             })
//         }
//     });
// }

// Videos cant( download (Access Denied error)
const showUserFeed = (username) =>{

//console.log(data_X.itemList);

    if(data_X.itemList){
        const dataFeed= data_X.itemList;
        dataFeed.forEach(element => {
            console.log(element);
            userFeedContainer.innerHTML += userFeedTemplate(element);

            const videos = document.querySelectorAll('.video');
            videos.forEach((videoElement) => {
                videoElement.addEventListener('click', () => {
                    console.log(videoElement.paused);
                    if(videoElement.paused){videoElement.play();}
                    else{videoElement.pause();}
                });
            });

            videos.forEach((coverElement) => {
                coverElement.addEventListener('loadeddata', () => { 
                if(coverElement.readyState>0){
                    const preloader = document.querySelector('.videoItem__preloader');
                     if(preloader){preloader.remove();}
                    };
                });
            });
        });
    };

};


if(parsedUserName){
    console.log('Link have username!');
    showUserInfo(parsedUserName);
    showUserFeed(parsedUserName);
}
else{console.log('error: empty username in the link!');}