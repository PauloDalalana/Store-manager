const assert = require('assert');
const sinon = require('sinon');
const validateSale = require('../../../src/middlewares/validateSale');

describe('Middleware validateSale', function () {
  it('deve retornar erro 400 se o campo productId estiver ausente', function () {
    const req = { body: [{ quantity: 1 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateSale(req, res, next);

    assert.strictEqual(res.status.calledWith(400), true);
    assert.strictEqual(res.json.calledWith(sinon.match({ message: '"productId" is required' })), true);
    assert.strictEqual(next.called, false);
  });

  it('deve retornar erro 400 se o campo quantity estiver ausente', function () {
    const req = { body: [{ productId: 1 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateSale(req, res, next);

    assert.strictEqual(res.status.calledWith(400), true);
    assert.strictEqual(res.json.calledWith(sinon.match({ message: '"quantity" is required' })), true);
    assert.strictEqual(next.called, false);
  });

  it('deve retornar erro 422 se o campo quantity for menor ou igual a 0', function () {
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateSale(req, res, next);

    assert.strictEqual(res.status.calledWith(422), true);
    assert.strictEqual(res.json.calledWith(sinon.match({ message: '"quantity" must be greater than or equal to 1' })), true);
    assert.strictEqual(next.called, false);
  });

  it('deve chamar o next middleware se o corpo da requisição for válido', function () {
    const req = { body: [{ productId: 1, quantity: 5 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateSale(req, res, next);

    assert.strictEqual(res.status.called, false);
    assert.strictEqual(res.json.called, false);
    assert.strictEqual(next.called, true);
  });
});