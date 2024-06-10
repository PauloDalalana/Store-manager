const { expect } = require('chai');
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

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('deve retornar erro 422 se o campo "name" tiver menos de 5 caracteres', function () {
    const req = { body: { name: 'abc' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateProduct(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('deve chamar o next middleware se o campo "name" for válido', function () {
    const req = { body: { name: 'Produto Válido' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateProduct(req, res, next);

    expect(res.status.called).to.be.equal(false);
    expect(res.json.called).to.be.equal(false);
    expect(next.called).to.be.equal(true);
  });
});