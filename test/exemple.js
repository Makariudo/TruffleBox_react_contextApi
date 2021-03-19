var chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  , assert = chai.assert;

const truffleAssert = require('truffle-assertions');

const {
  BN,           // Big Number support
  constants,    // Common constants, like the zero address and largest integers
  expectEvent,  // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const Storage = artifacts.require("SimpleStorage");

contract("SimpleStorage", accounts => {
  let [account1, account2, account3, account4] = accounts;
  let owner = account1;
  let StorageInstance;
    
  beforeEach(async () => {
    StorageInstance = await Storage.new();
  });

  it("should deploy", async () => {
    should.exist(StorageInstance.address)
  });

  context("set/get value", () => {
    it("should be able to set a value", async () => {
      await StorageInstance.set(3, { from: owner })
      const value = await StorageInstance.get.call();
      assert.equal(value,3);
    })
});

})