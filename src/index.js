import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function MusicName(props) {
  return(
    <h2>Test</h2>
  );
}

function Playbutton(props) {
  return(
    <img src='playbutton.png' alt='load error' className='class-playbutton'></img>
  );
}

function Nextbutton(props) {
  return(
    <img src='nextbutton.png' alt='load error' className='class-nextbutton'></img>
  );
}

function Prevbutton(props) {
  return(
    <img src='prevbutton.png' alt='load error' className='class-prevbutton'></img>
  );
}

function ControlTable(props) {
  return(
    <div className='class-controltable'>
      <MusicName />
      <Prevbutton />
      <Playbutton />
      <Nextbutton />
    </div>
  );
}

function Progressbarcontrol(props) {
  return(
    <div id='id-seekobj'></div>
  );
}
function Progressbar(props) {
  return(
      <div className='class-progressbar'>
        <small>00:00</small>
        <div id='id-progressbar'>
          <Progressbarcontrol id='id-seekobj'/>
        </div>
        <small>00:00</small>
      </div>
  );
}

class Muisclist extends React.Component {
  render() {
    return(
      <table>
        <thead>
          <tr>
            <th>标题</th>
            <th>歌手</th>
            <th>时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>孤勇者</td>
            <td>陈奕迅</td>
            <td>00:00</td>
            <td><button>X</button></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>孤勇者</td>
            <td>陈奕迅</td>
            <td>00:00</td>
            <td><button>X</button></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>孤勇者</td>
            <td>陈奕迅</td>
            <td>00:00</td>
            <td><button>X</button></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>孤勇者</td>
            <td>陈奕迅</td>
            <td>00:00</td>
            <td><button>X</button></td>
          </tr>
        </tbody>
        
      </table>
    );
  }
}



class App extends React.Component {
  render() {
    return(
      <div className='class-app'>
        <ControlTable />
        <Progressbar />
        <Muisclist />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


