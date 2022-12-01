import './App.scss';

import React, {Component} from 'react';
import moment from 'moment';

interface IState {
  phrase: string;
  timer: string;
  phraseIndex: number;
}

const TIMER_TO = moment('2023-03-24').hours(0).minutes(0).seconds(0);
const PHRASES = [
  'Мы будем жарить',
  'Игра началась...'
]

const delay = async (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), duration);
  })
}

class App extends Component<any, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      phrase: '',
      phraseIndex: 0,
      timer: ''
    }

    this.timer();
    this.animation().then();

    setInterval(() => {
      this.timer();
    }, 1000);

    setInterval(async () => {
      await this.animation()
    }, 9000);
  }

  timer() {
    const diff = (TIMER_TO.toDate().getTime() / 1000) - (Date.now() / 1000);
    const duration = moment.duration(diff, 'seconds');

    const hours = duration.hours() < 10 ? `0${duration.hours()}` : duration.hours();
    const minutes = duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes();
    const seconds = duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds();

    this.setState({
      timer: `${duration.asDays().toFixed(0)}:${hours}:${minutes}:${seconds}`
    })
  }

  async animation() {
    const targetPhrase = PHRASES[this.state.phraseIndex];
    let currentPhrase = '';

    const d = 1000 / targetPhrase.length;

    for (let i = 1; i <= targetPhrase.length; i++) {
      currentPhrase = targetPhrase.substring(0, i);
      this.setState({
        phrase: currentPhrase
      });
      await delay(d);
    }

    await delay(6000);

    for (let i = targetPhrase.length; i >= 0; i--) {
      currentPhrase = targetPhrase.substring(0, i);
      this.setState({
        phrase: currentPhrase
      })
      await delay(d);
    }

    let ind = this.state.phraseIndex + 1;
    if (ind === PHRASES.length) {
      ind = 0;
    }

    this.setState({
      phraseIndex: ind
    })
  }

  render() {
    return (
        <div>
            <div className='Header'>
                <h1>Студвесна 2023</h1>
            </div>
            <div className="Content">
                <div className="Content-Main">
                    <h3>Сборная факультетов</h3>
                    <h1>ИиВТ</h1>
                    <h1>ИОТ</h1>
                    <h1>СГ</h1>
                </div>
                <div className="Content-Animation">
                    <h2>{this.state.phrase}</h2>
                    <div className="blinking-cursor"></div>
                </div>
                <div className="Content-Timer">
                  <h2>{this.state.timer}</h2>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
