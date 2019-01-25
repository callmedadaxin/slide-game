import DataBus from "../databus";
import Button from "../base/button";
import Piece from "../models/piece";
import GameMap from "../runtime/gameMap";
import Background from "./background";
import dayjs from "dayjs";

import PUZZLE_EASY_SRC from "../images/puzzle-easy.jpg";
import IMG_START_SRC from "../images/start.jpg";
import IMG_EASY_SRC from "../images/easy.png";
import IMG_TIME_SRC from "../images/time_bg.png";
import IMG_HELP_SRC from "../images/help.png";
import IMG_HELP_CONTENT_SRC from "../images/puzzle-help.png";
import IMG_HINT_SRC from "../images/hint.png";
import IMG_HINT_CONTENT_SRC from "../images/wrap.png";
import IMG_REPLAY_SRC from "../images/replay.png";
import IMG_LOGO from "../images/logo.png";

import { get, post } from "../base/fetch";

let databus = new DataBus();
let gameMap = new GameMap();
let nickName;

const helpButtonPadding = 15;

// 拼图图片
const PUZZLE_EASY_WIDTH = 860;
const PUZZLE_EASY_HEIGHT = 860;
const IMG_LOGO_WIDTH = 115 * 2;
const IMG_LOGO_HEIGHT = 54 * 2;

const IMG_EASY_WIDTH = 200;
const IMG_EASY_HEIGHT = 200;

const IMG_TIME_WIDTH = 400;
const IMG_TIME_HEIGHT = 200;

const IMG_HELP_WIDTH = 300;
const IMG_HELP_HEIGHT = 200;

const IMG_HELP_CONTENT_WIDTH = "640";
const IMG_HELP_CONTENT_HEIGHT = "907";

const IMG_HINT_WIDTH = 300;
const IMG_HINT_HEIGHT = 200;

const IMG_HINT_CONTENT_WIDTH = 300;
const IMG_HINT_CONTENT_HEIGHT = 300;

const IMG_REPLAY_WIDTH = 300;
const IMG_REPLAY_HEIGHT = 200;

let instance;

export default class GameInfo {
  constructor() {
    if (instance) return instance;
    instance = this;

    // 开始菜单背景
    this.imgStart = new Button(
      IMG_START_SRC,
      0,
      0,
      databus.screenWidth,
      databus.screenHeight
    );

    //开始菜单按钮
    let btnRatio = (databus.screenWidth * 0.4) / IMG_EASY_WIDTH;
    this.btnEasy = new Button(
      IMG_EASY_SRC,
      // 0,
      // 0,
      (databus.screenWidth - btnRatio * IMG_EASY_WIDTH) / 2,
      databus.screenHeight - btnRatio * IMG_EASY_HEIGHT * 1.2,
      btnRatio * IMG_EASY_WIDTH,
      btnRatio * IMG_EASY_HEIGHT
    );

    this.logo = new Button(
      IMG_LOGO,
      (databus.screenWidth - btnRatio * IMG_LOGO_WIDTH) / 2,
      databus.screenHeight - btnRatio * IMG_LOGO_HEIGHT * 6,
      btnRatio * IMG_LOGO_WIDTH,
      btnRatio * IMG_LOGO_HEIGHT
    );

    // this.btnStart = wx.createUserInfoButton({
    //   type: 'image',//类型改为图片
    //   image: IMG_EASY_SRC,//本地资源目录下的图片
    //   style: {
    //     left: (databus.screenWidth - btnRatio * IMG_EASY_WIDTH) / 2,
    //     top: databus.screenHeight - btnRatio * IMG_EASY_HEIGHT * 1.2,
    //     width: btnRatio * IMG_EASY_WIDTH,
    //     height: btnRatio * IMG_EASY_HEIGHT,
    //     lineHeight: 40,
    //     backgroundColor: '#ff0000',
    //     color: '#ffffff',
    //     textAlign: 'center',
    //     fontSize: 16,
    //     borderRadius: 10
    //   }
    // });

    // this.btnStart.onTap(res => {
    //   if (!res.userInfo) {
    //     return;
    //   }
    //   const userInfo = res.userInfo || {};
    //   const avatar = userInfo.avatarUrl;
    //   const avatarUrl = userInfo.avatarUrl;
    //   this.btnStart.hide();
    //   databus.gameCount = true;
    //   databus.countStart = Date.now();
    // });

    // 时间块
    let timeRatio = (databus.screenWidth * 0.16) / IMG_TIME_WIDTH;
    this.timeBanner = new Button(
      IMG_TIME_SRC,
      databus.contentPadding,
      databus.contentPaddingTop -
        (timeRatio * IMG_TIME_HEIGHT + helpButtonPadding),
      timeRatio * IMG_TIME_WIDTH,
      timeRatio * IMG_TIME_HEIGHT
    );

    // 重玩按钮
    let replayRatio = (databus.screenWidth * 0.12) / IMG_REPLAY_WIDTH;
    this.btnReplay = new Button(
      IMG_REPLAY_SRC,
      databus.contentPadding +
        databus.contentWidth -
        replayRatio * IMG_REPLAY_WIDTH,
      databus.contentPaddingTop -
        (replayRatio * IMG_REPLAY_HEIGHT + helpButtonPadding),
      replayRatio * IMG_REPLAY_WIDTH,
      replayRatio * IMG_REPLAY_HEIGHT
    );

    // 提示按钮
    let hintRatio = (databus.screenWidth * 0.12) / IMG_HINT_WIDTH;
    this.btnHint = new Button(
      IMG_HINT_SRC,
      this.btnReplay.x - (hintRatio * IMG_HINT_WIDTH + 10),
      databus.contentPaddingTop -
        (hintRatio * IMG_HINT_HEIGHT + helpButtonPadding),
      hintRatio * IMG_HINT_WIDTH,
      hintRatio * IMG_HINT_HEIGHT
    );

    let hintContentRatio =
      (databus.contentWidth * 0.6) / IMG_HINT_CONTENT_WIDTH;
    this.hintContent = new Button(
      IMG_HINT_CONTENT_SRC,
      databus.contentPadding +
        databus.contentWidth -
        hintContentRatio * IMG_HINT_CONTENT_WIDTH,
      databus.contentPaddingTop -
        (hintContentRatio * IMG_HINT_CONTENT_HEIGHT + helpButtonPadding),
      hintContentRatio * IMG_HINT_CONTENT_WIDTH,
      hintContentRatio * IMG_HINT_CONTENT_HEIGHT
    );

    // 帮助按钮
    let helpRatio = (databus.screenWidth * 0.12) / IMG_HELP_WIDTH;
    this.btnHelp = new Button(
      IMG_HELP_SRC,
      this.btnHint.x - (helpRatio * IMG_HELP_WIDTH + 10),
      databus.contentPaddingTop -
        (helpRatio * IMG_HELP_HEIGHT + helpButtonPadding),
      helpRatio * IMG_HELP_WIDTH,
      helpRatio * IMG_HELP_HEIGHT
    );

    // 帮助内容
    let helpContentHeight =
      (databus.screenWidth / IMG_HELP_CONTENT_WIDTH) * IMG_HELP_CONTENT_HEIGHT;
    this.helpContent = new Button(
      IMG_HELP_CONTENT_SRC,
      0,
      databus.screenHeight - helpContentHeight,
      databus.screenWidth,
      helpContentHeight
    );
  }

  tap(event) {
    if (databus.gameCount) {
      return;
    }
    if (!databus.gameStart) {
      return this.tapGameStart(event);
    }
    if (!databus.gameOver) {
      return this.tapGamePlaying(event);
    }

    return this.tapGameOver(event);
  }

  tapGameStart(event) {
    if (this.btnEasy.isTapped(event.x, event.y)) {
      get("/game/time", {}).then(time => {
        const t = dayjs(time);
        const now = dayjs();
        if (t > now) {
          alert("活动未开始！");
        } else {
          if (!nickName) {
            const name = window.prompt(
              "请输入你的姓名，必须为真实姓名。姓名一经填写，不得修改"
            );
            if (!name) {
              return window.alert("没有名字无法进入游戏！");
            }
            nickName = name;
            databus.nickName = name;
          } else {
            databus.nickName = nickName;
          }
          databus.gameCount = true;
          databus.countStart = Date.now();
        }
      });
    } else {
      databus.gameCount = false;
      return;
    }
  }

  gameStart() {
    databus.stage = 3;
    databus.gameStart = true;
    databus.gameCount = false;
    databus.puzzleImg = {
      src: PUZZLE_EASY_SRC,
      width: PUZZLE_EASY_WIDTH,
      height: PUZZLE_EASY_HEIGHT
    };

    // 设定初始的空位
    databus.emptyPosition = databus.stage * databus.stage - 1;

    // 选择随机地图并将图块放进数列中
    let randomMap = gameMap.getMap(databus.stage);
    for (let i = 0; i < randomMap.length; i++) {
      let position = randomMap[i] - 1;
      databus.pieces.push(new Piece(i, position, databus.stage));
    }

    databus.startTime = Date.now();
    this.puzzleImg = new Image();
    this.puzzleImg.src = databus.puzzleImg.src;
  }

  tapGamePlaying(event) {
    if (databus.showHelp && this.helpContent.isTapped(event.x, event.y)) {
      return (databus.showHelp = false);
    }

    if (databus.showHint && this.hintContent.isTapped(event.x, event.y)) {
      return (databus.showHint = false);
    }

    if (this.btnReplay.isTapped(event.x, event.y)) {
      databus.reset();
      // this.btnStart.show();
    }

    if (this.btnHelp.isTapped(event.x, event.y)) {
      return (databus.showHelp = true);
    }

    if (this.btnHint.isTapped(event.x, event.y)) {
      return (databus.showHint = true);
    }
  }

  tapGameOver(event) {
    if (this.btnReplay.isTapped(event.x, event.y)) {
      databus.reset();
    }
  }

  render(ctx) {
    if (databus.gameCount) {
      return this.renderGameCount(ctx);
    }
    if (!databus.gameStart) {
      return this.renderGameStart(ctx);
    }
    if (!databus.gameOver) {
      return this.renderGamePlaying(ctx);
    }
    return this.renderGameOver(ctx);
  }

  renderGameCount(ctx) {
    // 绘制半透明背景
    ctx.fillStyle = "white";
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, databus.screenWidth, databus.screenHeight);
    ctx.globalAlpha = 1;

    // 绘制倒计时
    const now = Date.now();
    const time = Math.floor(6 - (now - databus.countStart) / 1000);

    // 倒计时小于1的时候，开始游戏
    if (time < 1) {
      return this.gameStart();
    }

    ctx.fillStyle = "#000";
    ctx.font = "40px Arial";
    ctx.textAlign = "center"; //文本水平对齐方式

    this.logo.render(ctx);

    ctx.fillText(time, databus.screenWidth / 2, databus.screenHeight / 2);
    ctx.textAlign = "left";
  }
  renderGameStart(ctx) {
    // 绘制半透明背景
    ctx.fillStyle = "white";
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, databus.screenWidth, databus.screenHeight);
    ctx.globalAlpha = 1;

    this.imgStart.render(ctx);
    this.btnEasy.render(ctx);
  }
  renderGamePlaying(ctx) {
    // 绘制时间
    this.timeBanner.render(ctx);
    ctx.fillStyle = "#ffffff";
    ctx.font = "15px Arial";
    ctx.fillText(
      databus.getCurrentTime(),
      this.timeBanner.x + (this.timeBanner.width / 2 - 18),
      this.timeBanner.y + (this.timeBanner.height / 2 + 5)
    );

    this.btnHelp.render(ctx);
    this.btnHint.render(ctx);
    this.btnReplay.render(ctx);
    if (databus.showHelp) {
      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.6;
      ctx.fillRect(0, 0, databus.screenWidth, databus.screenHeight);
      ctx.globalAlpha = 1;
      this.helpContent.render(ctx);
    }
    if (databus.showHint) {
      ctx.drawImage(
        this.puzzleImg,
        this.hintContent.x,
        this.hintContent.y,
        this.hintContent.width,
        this.hintContent.height
      );
      this.hintContent.render(ctx);
    }
  }

  renderGameOver(ctx, score) {
    // this.puzzleImg = new Image()
    // this.puzzleImg.src = PUZZLE_EASY_SRC

    ctx.drawImage(
      this.puzzleImg,
      databus.contentPadding,
      databus.contentPaddingTop,
      databus.contentWidth,
      databus.contentWidth
    );

    this.btnReplay.render(ctx);

    // 绘制半透明背景
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(
      databus.contentPadding,
      databus.contentPaddingTop,
      databus.contentWidth,
      50
    );
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";
    ctx.fillText(
      "恭喜！您用" + databus.finalTime + "完成了拼图！",
      databus.contentPadding + 10,
      databus.contentPaddingTop + 30
    );
  }
}
