const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const [owner, account] = await ethers.getSigners();
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    return { game, owner, account };
  }
  it('should be a winner', async function () {
    const { game, owner, account } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(account).write(owner.getAddress());

    await game.win(account.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
