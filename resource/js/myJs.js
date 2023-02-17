



// start
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.control_play')
const cd = $('.cd .frames_cd img')
const name_music = $('.info_music .name_music h2')
const author_music = $('.info_music .author_music h2')
const audio = $('#audio')
const progress = $('#progress')
const frame_cd = $('.cd .frames_cd')
const btn_next = $('.control_step.step-for')
const btn_back = $('.control_step.step-back')
const btn_random = $('.control_random')
const btn_repeat =  $('.control_repeat')
const playList = $('.playlist')

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'
const app = {
    currentIndex: 4,
    isPlaying: false,
    isRandom: false,
    onRepeat: false,
    playedSong:[

    ],
    config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name:'Hơn cả mây trời',
            singer:'Như việt',
            path:'./resource/audio/HonCaMayTroiLofiVersion-NhuViet-6362241.mp3',
            image:'./resource/album/heart_music.jpg',
        },
        {
            name:'1 Phút',
            singer:'Andiez',
            path:'./resource/audio/1-Phut-Andiez.mp3',
            image:'./resource/album/1pht.jpg',
        },
        {
            name:'Nắng đã làm má em thêm hồng ^^',
            singer:'Charles x CM1X',
            path:'./resource/audio/NANG-DA-LAM-MA-EM-THEM-HONG-Charles-x-CM1X-CM1X-Charles.mp3',
            image:'./resource/album/xedap.jpg',
        },
        {
            name:'Bông hoa chẳng thuộc về ta',
            singer:'Như Việt',
            path:'./resource/audio/BongHoaChangThuocVeTaLofiVersion-NhuVietVux-7005872.mp3',
            image:'./resource/album/bonghoachangthuocveta.jpg',
        },
        {
            name:'Anh thương em nhất mà',
            singer:'Lã., Long, TiB',
            path:'./resource/audio/Anh-Thuong-Em-Nhat-Ma-La-Log-TiB.mp3',
            image:'./resource/album/anhthuongemnhatma.jpg',
        },
        {
            name:'Có lẽ quá khó để quên một người',
            singer:'1nG x Namlee x D.Blue',
            path:'./resource/audio/Co-Le-Qua-Kho-De-Quen-Mot-Nguoi-1nG-Namlee-D-Blue.mp3',
            image:'./resource/album/raido.jpg',
        },
        {
            name:'Yêu lại chút thôi',
            singer:'Clow x Linh Thộn',
            path:'./resource/audio/YÊU LẠI CHÚT THÔI.mp3',
            image:'./resource/album/medicine.jpg',
        },
        {
            name:'Phố cũ còn anh (Lofi Version)',
            singer:'Quinn x Chilly x FreakD',
            path:'./resource/audio/PhoCuConAnhLofiVersion-QuinnChillyFreakD-6804653.mp3',
            image:'./resource/album/phocuconanh.jpg',
        },
        // {
        //     name:'Về phía mưa',
        //     singer:'Thế bảo',
        //     path:'./resource/audio/Ve-Phia-Mua-The-Bao.mp3',
        //     image:'./resource/album/vephiamua.jpg',
        // },
        // {
        //     name:'Tháng tư là lời nói dối của em',
        //     singer:'Hà Anh Tuấn',
        //     path:'./resource/audio/Thang-Tu-La-Loi-Noi-Doi-Cua-Em-Ha-Anh-Tuan.mp3',
        //     image:'./resource/album/thang4laloinoidoicuaem.jpg',
        // },
        {
            name:'Chiều hôm ấy',
            singer:'Jaykii',
            path:'./resource/audio/Chieu-Hom-Ay-JayKii.mp3',
            image:'./resource/album/chieuhomay1.jpg',
        },
        // {
        //     name:'Bao tiền một mớ bình yên',
        //     singer:'14 Casper',
        //     path:'./resource/audio/BaoTienMotMoBinhYen-14CasperBon-6897329.mp3',
        //     image:'./resource/album/mobinhyen1.gif',
        // },
        
    ],
    setConfig:function(key, value){
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function(){
        const htmls = this.songs.map((song,idx) => {
            return `
                <div class="box_song ${idx === this.currentIndex ? 'active': ' '}" id-song="${idx}">
                    <div class="flex flex-middle song">
                        <div class="frames_img img-cover img-zoomin">
                            <img src="${song.image}" alt="" class="">
                        </div>
                        <div class="info_song flex1">
                            <div class="name_song">${song.name}</div>
                            <div class="author_song">${song.singer}</div>
                        </div>
                        <div class="option">
                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            `
        })
        playList.innerHTML = htmls.join('')
        audio.volume = 1   
       
    },
    defineProperties : function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent : function(){
        
        const _this = this;
        // xử lí cd quay và dừng
        const animate_cd = frame_cd.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration:50000,
            iterations:Infinity

        })
        animate_cd.pause();
        // xử lí click play
        player.onclick = function(){
            if(_this.isPlaying) {
                audio.pause()

            }else{
                audio.play();
            }
        }
        
        // khi song được play
        audio.onplay = function(){
            _this.isPlaying = true;
            player.classList.add('playing')
            animate_cd.play();
        }
        // khi song bị pause
        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove('playing')
            animate_cd.pause();
        }
        // key space
        document.onkeyup = function(e){
            if(e.which == 32){
                player.click();
            }
        }


        // xử lý khi tua
        var timeoutProgress = 0;
        progress.oninput = function(e){
            timeoutProgress = 100000;
            const seekTime = audio.duration / 100 * e.target.value
            progress.onmouseup = function(et){
                audio.currentTime = seekTime;
                timeoutProgress = 0
            }
        }
        // khi tiến độ bài hát thay đổi
       audio.ontimeupdate = function(){
           if(audio.duration){
              setTimeout(() => {
                   const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                   progress.value = progressPercent
                   
           },timeoutProgress)
           }
       }
        //  khi next song
        btn_next.onclick = function(){
            if(_this.isRandom){
                _this.randomSong();
            }else{
                _this.nextSong();
            }
            audio.play();
            _this.ScrollToActiveSong();

        }

        //  khi next song
        btn_back.onclick = function(){
            if(_this.isRandom){
                _this.randomSong();
            }else{
                _this.backSong();
            }
            audio.play();
            _this.ScrollToActiveSong();
        }
        //  random song
        btn_random.onclick  = function(){
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom',_this.isRandom);
            this.classList.toggle('active',_this.isRandom)
        }
        // xu li khi bai hat ket thuc
        audio.onended = function(){
            if(_this.onRepeat){
                audio.play();
            }
            else{
                btn_next.click();
            }
           
        }
        // xi li bat tat repeat
        btn_repeat.onclick = function(e){
            _this.onRepeat = !_this.onRepeat;
            _this.setConfig('onRepeat', _this.onRepeat)
            this.classList.toggle('active',_this.onRepeat)
        }
        // hight light current song in list songs
        audio.oncanplay  = function(e){
            $('.box_song.active').classList.remove('active')
            const list_boxSong = $$('.box_song')
            for(const val of list_boxSong){
                if(val.getAttribute('id-song') == _this.currentIndex){
                    val.classList.add('active');
                }
            }
        }
        // chọn bài hát
        playList.onclick = function(e){
            const boxSong = e.target.closest('.box_song:not(.active)')
            const optionSong = e.target.closest('.option')
            if(boxSong && !optionSong){
                const boxSong_id = Number(boxSong.getAttribute('id-song'))
                _this.currentIndex = boxSong_id;
                _this.loadCurrentSong();
                audio.play()
            }
            else if(optionSong){
               console.log('chua xu li')
           }
        }

    },
    ScrollToActiveSong: function(){
        setTimeout(() => {
            $('.box_song.active').scrollIntoView({
                bihavior: 'smooth',
                block :'nearest',
                inline :'nearest'
            })
        },500)
    },
    loadCurrentSong: function() {
        cd.src = this.currentSong.image
        name_music.textContent = this.currentSong.name
        author_music.textContent = this.currentSong.singer
        audio.src = this.currentSong.path
        this.setConfig('currentIndex',this.currentIndex)        

    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    backSong: function(){
        this.currentIndex--;
        if(this.currentIndex <= 0){
            this.currentIndex = this.songs.length-1;
        }
        this.loadCurrentSong();
    },
    randomSong: function(){
        const _this = this;
        this.playedSong.push(this.currentIndex)
        const leg_played = this.playedSong.length;

        if(leg_played >= Math.floor(_this.songs.length / 2)){
            this.playedSong.shift();
        }
        var newIndex
        do {
            newIndex = Math.floor(Math.random() * (this.songs.length))
        }while(this.playedSong.includes(newIndex))
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    
    },
    loadConfig: function(){
        this.onRepeat = this.config.onRepeat
        this.isRandom = this.config.isRandom
        if(this.config.currentIndex !== undefined){
            this.currentIndex = this.config.currentIndex
        }
        btn_random.classList.toggle('active', this.isRandom)
        btn_repeat.classList.toggle('active', this.onRepeat)

    },
    start: function(){
        this.loadConfig();
        this.defineProperties();
        this.handleEvent();
        this.loadCurrentSong();
        this.render();


    }     
}
app.start();
