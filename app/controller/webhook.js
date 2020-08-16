'use strict';

const Controller = require('egg').Controller;

class WebhookController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.logger.info('some request data: %j', ctx.request.body);
    ctx.body = {
      success: true,
      data: {
        name: 'yyc',
      },
    };
  }
}

module.exports = WebhookController;
