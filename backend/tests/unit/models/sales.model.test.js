const { expect } = require('chai');
const assert = require('assert');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

describe('Sales Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve buscar venda por id do DB', async function () {
    const mockSale = { date: '2022-01-01', productId: 1, quantity: 1 };
    sinon.stub(connection, 'execute').resolves([[mockSale]]);

    const result = await salesModel.getSaleById(1);
    expect(result).to.deep.equal([mockSale]);
  });

  it('deve retornar nulo se a venda não for encontrada pelo id do DB', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const result = await salesModel.getSaleById(1);
    assert.strictEqual(result, null);
  });

  it('deve criar venda e retornar insertId', async function () {
    const mockResult = { insertId: 1 };
    sinon.stub(connection, 'execute').resolves([mockResult]);

    const result = await salesModel.createSale();
    expect(result).to.equal(mockResult.insertId);
  });
});
