'use strict';

const Controller = require('egg').Controller;
const ChatBot = require('dingtalk-robot-sender');
const userMap = require('../constant/user');

const robot = new ChatBot({
  baseUrl: 'https://oapi.dingtalk.com/robot/send',
  accessToken: 'a6be50f1a09860a1911db138813e462069215b7f55528c48991323535da3df3c',
  secret: 'SEC40827781301b6afe827c88e075849bbf8bfd5a134c03eb3787f50440cc908066',
});

class WebhookController extends Controller {
  async index() {
    const { ctx } = this;
    const { user: { name: username }, object_attributes: { action, url }, assignee: { name: assigneeName } } = ctx.request.body;
    let content;
    let name;
    if (action === 'open') {
      content = `你有一个merge请求待合并\n链接：${url}`;
      name = assigneeName;
    } else if (action === 'merge') {
      content = `你的merge请求已合并\n链接：${url}`;
      name = username;
    } else if (action === 'close') {
      content = `你的merge请求已关闭\n链接：${url}`;
      name = username;
    }
    const textContent = {
      msgtype: 'text',
      text: {
        content,
      },
      at: {
        atMobiles: [
          userMap[name],
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
