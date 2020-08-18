/* eslint-disable */

const mFs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/* ------------------------------------------------------------------
 * Class: WavPlayer(params)
 * - params  | Object  | Required |
 *   - path  | String  | Required | Path of a wav file
 *   - loop  | Boolean | Optional | Default is `false`
 * ---------------------------------------------------------------- */
class WavPlayer {
  constructor({ fileName, loop }) {
    this._OS = process.platform;
    this._proc = null;
    this.path =
      process.env.NODE_ENV === 'development'
        ? path.join(__static, `/audio/${fileName}`)
        : path.join(__dirname, `../static/audio/${fileName}`);
    this.loop = loop;
  }

  play() {
    if (!this.path) {
      throw new Error('The `path` is required.');
    }
    if (typeof this.path !== 'string' || this.path === '') {
      throw new Error('The `path` must be a non-empty string.');
    }
    if (!mFs.existsSync(this.path)) {
      throw new Error('The file of the `path` was not found.');
    }
    if (typeof this.loop !== 'boolean') {
      throw new Error('The `loop` must be a boolean.');
    }
    this._play();
  }

  _play() {
    switch (this._OS) {
      case 'win32':
        this._proc = spawn('powershell', [
          '-c',
          `(New-Object System.Media.SoundPlayer ${this.path}).PlaySync();`,
        ]);
        this._proc.stdin.end();
        break;
      case 'darwin':
        this._proc = spawn('afplay', [this.path]);
        break;
      case 'linux':
        this._proc = spawn('aplay', [this.path]);
        break;
      default:
        throw new Error('The wav file can not be played on this platform.');
    }

    this._proc.on('close', (code) => {
      if (code === 0) {
        if (this.loop) {
          this._play();
        }
      } else {
        throw new Error(`Failed to play the wav file ${code}`);
      }
    });
  }

  stop() {
    if (!this._proc) return;
    this._proc.removeAllListeners('close');
    this._proc.kill();
  }
}

module.exports = WavPlayer;
