'use strict';

const Controller = require('egg').Controller;

class WebhookController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.request.body);
    ctx.logger.info('request data: %j', ctx.request.body);
    ctx.body = {
      success: true,
      data: {
        name: 'yyc',
      },
    };
  }
}

module.exports = WebhookController;
