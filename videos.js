const apiUrl ='https://tiktok33.p.rapidapi.com/trending/feed';
const videoContainer = document.getElementById('videoContainer');
//const videos = document.querySelectorAll('.video');
// const preloader = document.querySelectorAll('.videoItem__preloader');


const specRound = (x) =>{
    if(x>=1000 && x<=99999){return (x/1000).toFixed(0) + 'k';}
    else if(x>=99999){return (x/1000000).toFixed(1) + 'M';}
    else{return x;}
}
//console.log(specRound(12345678));


const videoTemplate = (theData) => {
    let hashTagsList = [];
    let showTags = [];

    if(theData.hashtags.length){

        theData.hashtags.forEach(el => {
            //console.log(el.name);
            hashTagsList.push(el.name);
        });
      
        showTags = hashTagsList.reduce((acc, item) => {
              return  "#" + acc + ", " + item;
        });

    }
    else{hashTagsList = 'none';}

    return `
        <div class="videoItem">
            <div class="videoItem__cover" style="background-image: url(${theData.covers.default});">
                <div class="videoItem__preloader"><img src="img/tail-spin.svg" alt="spinner"></div>
                <video class ="video" src="${theData.videoUrl}" muted autoplay loop></video>

                <div class="videoItem__info__wrapp">
                    <div class="description__text">${theData.text}</div>
                    <div class="description__hashTags">${showTags}</div>
                </div>
            </div>
            <div class="videoItem__description">
    
                <div class="videoItem__description__wrapp">
                    <div class="description__logoName">
                        <div class="description__avatar">
                            <a href="user.html?u=${theData.authorMeta.name}"><img src="${theData.authorMeta.avatar}" alt="avatar"></a>
                        </div>
                        <a href="user.html?u=${theData.authorMeta.name}" class="description__name">${theData.authorMeta.nickName}</a>
                    </div>
                    <div class="description__counters">
                        <div class="description__name"><img src="img/comment.jpg" alt="L"> ${specRound(theData.commentCount)}</div>
                        <div class="description__name"><img src="img/like.jpg" alt="C"> ${specRound(theData.diggCount)}</div>
                    </div>
                </div>
            </div>
        </div>
        `
    //console.log(hashTagsList);
    //console.log(showTags);
}

fetch(apiUrl, {
    "method": "GET",
	"headers": {
		"x-rapidapi-host": "tiktok33.p.rapidapi.com",
		"x-rapidapi-key": "4af404053bmshf9e7eda577b5334p1c6a1ajsn64905de242de"
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data){
            data.forEach(element => {
                console.log(element);
                videoContainer.innerHTML += videoTemplate(element);

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
    }
});

