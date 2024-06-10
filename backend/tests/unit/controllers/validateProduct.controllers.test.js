const assert = require('assert');
const sinon = require('sinon');
const validateProduct = require('../../../src/middlewares/validateProduct');

describe('Middleware validateProduct', function () {
  it('deve retornar erro 400 se o campo "name" não for fornecido', function () {
    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateProduct(req, res, next);

    assert.strictEqual(res.status.calledWith(400), true);
    assert.strictEqual(res.json.calledWith({ message: '"name" is required' }), true);
    assert.strictEqual(next.called, false);
  });

  it('deve retornar erro 422 se o campo "name" tiver menos de 5 caracteres', function () {
    const req = { body: { name: 'abc' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateProduct(req, res, next);

    assert.strictEqual(res.status.calledWith(422), true);
    assert.strictEqual(res.json.calledWith({ message: '"name" length must be at least 5 characters long' }), true);
    assert.strictEqual(next.called, false);
  });

  it('deve chamar o next middleware se o campo "name" for válido', function () {
    const req = { body: { name: 'Produto Válido' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateProduct(req, res, next);

    assert.strictEqual(res.status.called, false);
    assert.strictEqual(res.json.called, false);
    assert.strictEqual(next.called, true);
  });
});