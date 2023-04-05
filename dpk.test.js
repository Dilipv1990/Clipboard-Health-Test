const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partitionKey when partitionKey is string and it's length is less than 256", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: "1",
    });
    expect(trivialKey).toBe("1");
  });

  it("Returns the hash of event if the partitionKey is null or undefined", () => {
    const event = {
      partitionKey: null,
    };
    const trivialKey = deterministicPartitionKey(event);
    const hash = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    expect(trivialKey).toBe(hash);
  });

  it("Returns the hash of partitionKey if the partitionKey length is more than 256", () => {
    const event = {
      partitionKey: "2".repeat(257),
    };
    const trivialKey = deterministicPartitionKey(event);
    const hash = crypto
      .createHash("sha3-512")
      .update(event.partitionKey)
      .digest("hex");
    expect(trivialKey).toBe(hash);
  });
});
