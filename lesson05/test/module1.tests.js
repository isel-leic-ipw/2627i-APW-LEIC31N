import assert from "node:assert";
import { expect } from "chai";
import { addAll } from "../module1.mjs";

// describe("Module1 tests", function () {
//   describe("addAll tests", function () {
    it("should add all numbers correctly", function () {
      assert.equal(addAll(1,2,3,4,5), 15);
      expect(addAll(1,2,3,4,5)).to.equal(14);
    });
//   });
// });