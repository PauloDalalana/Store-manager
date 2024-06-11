const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

describe('Products Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve buscar produto por id do DB', async function () {
    const mockProduct = { id: 1, name: 'Produto Teste' };
    sinon.stub(connection, 'execute').resolves([[mockProduct]]);

    const result = await productModel.fetchProductByIdFromDB(1);
    expect(result).to.deep.equal(mockProduct);
  });

  it('deve retornar nulo se o produto não for encontrado pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const result = await productModel.fetchProductByIdFromDB(1);
    expect(result).to.be.equal(null);
  });

  it('deve atualizar o produto no DB e retornar verdadeiro', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productModel.updateProductInDB(1, 'Produto Atualizado');
    expect(result).to.be.equal(true);
  });

  it('deve retornar falso se a atualização do produto no DB não for bem-sucedida', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

    const result = await productModel.updateProductInDB(1, 'Produto Atualizado');
    expect(result).to.be.equal(false);
  });
  it('deve deletar o produto do DB e retornar verdadeiro', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productModel.deleteProductFromDB(1);
    expect(result).to.be.equal(true);
  });
  it('deve retornar falso se a exclusão do produto do DB não for bem-sucedida', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);

    const result = await productModel.deleteProductFromDB(1);
    expect(result).to.be.equal(false);
  });
});