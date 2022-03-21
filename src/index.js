import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function MusicName(props) {
  return(
    <h2 className='class-musicname'>{props.title}</h2>
  );
}

function Playbutton(props) {
  return(
    <div>
      <img src={props.imgValue} alt='load error' className='class-playbutton' onClick={props.onClick}></img>
      <audio id='id-player' preload='auto'>
        <source id='id-src' src={props.audioname} type='audio/mp3'/>
      </audio>
    </div>
  );
}

function Nextbutton(props) {
  return(
    <img src='nextbutton.png' alt='load error' className='class-nextbutton' onClick={props.onClick}></img>
  );
}

function Prevbutton(props) {
  return(
    <img src='prevbutton.png' alt='load error' className='class-prevbutton' onClick={props.onClick}></img>
  );
}

class Progressbar extends React.Component {

  componentDidMount() {
    this.props.getElementById();
  }
  render() {
    return(
    <div className='class-progressbar'>
      <small>{this.props.starttime}</small>
      <div id='id-progressbar' onClick={this.props.onClick}>
        <div id='id-seekobj'></div> 
      </div>
      <small>{this.props.endtime}</small>
    </div>
    );
  }

}

class ControlTable extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      isplayer: true,
      imgValue: 'playbutton.png',
      filename: this.props.data[0].filename,
      index: 0,
      time: this.props.data[0].time,
      currenttime: 0,
      player: null,
      seekobje: null,
      progressbar: null
    };
  }

  pausesong(song) {
    song.pause();
    this.setState({
      isplayer: true,
      imgValue: 'playbutton.png'
    });
  }

  playsong() {
    let song = document.getElementById('id-player');
    if(this.state.isplayer){
      song.play();
      this.setState({
        isplayer: false,
        imgValue: 'pause.png'
      });
    }else {
      this.pausesong(song)
    }
  }

  reloadsrc(filename) {
    document.getElementById('id-src').src = filename;
    document.getElementById('id-player').load();
    if(!this.state.isplayer){
      document.getElementById('id-player').play();
    }
  }
  
  playnext() {
    if(this.state.index === this.props.data.length - 1){
      this.setState({
        filename: this.props.data[0].filename,
        time: this.props.data[0].time,
        index: 0
      });
      this.reloadsrc(this.state.filename);
      return;
    }else{
      this.setState({
        filename: this.props.data[this.state.index + 1].filename,
        time: this.props.data[this.state.index + 1].time,
        index: this.state.index + 1
      });
      this.reloadsrc(this.state.filename);
    }
  }

  playPrev() {
    if(this.state.index === 0){
      this.setState({
        filename: this.props.data[this.props.data.length - 1].filename,
        time: this.props.data[this.props.data.length - 1].time,
        index: this.props.data.length - 1
      });
      this.reloadsrc(this.state.filename);
      return;
    }else{
      this.setState({
        filename: this.props.data[this.state.index - 1].filename,
        time: this.props.data[this.state.index - 1].time,
        index: this.state.index - 1
      });
      this.reloadsrc(this.state.filename);
    }
  }

  fancyTimeFormat(duration)
  {   
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
  }
  currentTime(player) {
    this.setState({
      currenttime: player.currentTime
    });
    let timelinewidth = this.state.progressbar.offsetWidth - this.state.seekobje.offsetWidth;
    this.state.seekobje.style.marginLeft = (timelinewidth * (player.currentTime / player.duration))+ "px";
  }
  getElementById() {
    this.setState({
      player: document.getElementById('id-player'),
      seekobje: document.getElementById('id-seekobj'),
      progressbar: document.getElementById('id-progressbar')
    });
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.currentTime(this.state.player), 
      1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  clickprogressbar(event) {
    this.state.player.currentTime = this.state.player.duration * 
    (event.clientX - this.state.progressbar.getBoundingClientRect().left) / 
    (this.state.progressbar.offsetWidth - this.state.seekobje.offsetWidth);
  }

  render() {
    return(
      <div>
        <MusicName title={this.props.data[this.state.index].title}/>
        <div className='class-controltable'>
          <Prevbutton 
            onClick={() => this.playPrev()}
          />
          <Playbutton  
            onClick={() => this.playsong()}
            imgValue={this.state.imgValue}
            audioname={this.state.filename}
          />
          <Nextbutton 
            onClick={() => this.playnext()}/>
        </div>
        <Progressbar
          endtime={this.state.time}
          starttime={this.fancyTimeFormat(this.state.currenttime)}
          getElementById={() => this.getElementById()}
          currentTime={() => this.currentTime()}
          onClick={(event) => this.clickprogressbar(event)}
        />
      </div>
    );
  }
}

class Muisclist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.data
    }
  }

  spliceRow(index) {
    this.state.rows.splice(index,1);
    this.setState({
      row: this.state.rows
    });
  }

  render() {
    return(
      <div className='calss-musiclist'>
        <table id='id-table'>
          <thead>
            <tr>
              <th>标题</th>
              <th>歌手</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((row,index) => {
              return(
                <tr key={row.title}>
                  <td>{row.title}</td>
                  <td>{row.singer}</td>
                  <td>{row.time}</td>
                  <td><button onClick={() => this.spliceRow(index)}>X</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}


/*以下为修复的bug
*1.删除当前选中歌曲会报错导致程序崩溃 
*2.播放过程中如果删除当前选择歌曲会继续播放
*3.以及音乐播放完毕未切换播放图标
*4.进度条点击反应过慢
*同时程序结构十分丑陋需要重构
*/
class App extends React.Component {
  render() {
    return(
      <div className='class-app'>
        <ControlTable data={this.props.data}/>
        <Muisclist data={this.props.data}/>
      </div>
    );
  }
}

//模拟json数据
const musicData = [
  {title:'稻香', time:'3:43', singer:'周杰伦', filename:'4113470514.mp3'},
  {title:'晴天', time:'4:29', singer:'周杰伦', filename:'814703912.mp3'},
  {title:'明明就', time:'4:18', singer:'周杰伦', filename:'2419740775.mp3'},
  {title:'珊瑚海', time:'4:14', singer:'周杰伦', filename:'2130102047.mp3'}
];

ReactDOM.render(
  <App data={musicData}/>,
  document.getElementById('root')
);


