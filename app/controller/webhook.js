'use strict';

const Controller = require('egg').Controller;
const ChatBot = require('dingtalk-robot-sender');
const userMap = require('../constant/user');

const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: '66dc633cef834675ff2687d412be039670742c949a53d86140ad8eff16202b24',
  secret: 'SEC6cfaf6231273cf8e4b8e1b1f10c3e3746358da75ff139566ce4fc4a7136d5397',
});

class WebhookController extends Controller {
  async index() {
    const { ctx } = this;
    const { object_attributes: { action, url }, assignee: { name } } = ctx.request.body;
    const mobile = userMap[name];
    let content;
    if (action === 'open') {
      content = `你有一个请求待合并，链接：${url}`;
    }
    const textContent = {
      msgtype: 'text',
      text: {
        content,
      },
      at: {
        atMobiles: [
          mobile,
        ],
        isAtAll: false,
      },
    };
    robot.send(textContent);
    ctx.body = {
      success: true,
    };
    ctx.logger.info('request data: %j', ctx.request.body);
  }
}

module.exports = WebhookController;
