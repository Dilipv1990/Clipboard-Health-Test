const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (data) =>
  crypto.createHash("sha3-512").update(data).digest("hex");

/**
 * @param {Object} event
 * @param {string} event.partitionKey
 * @returns {string}
 * @description
 * This function is used to determine the partition key for a given event.
 * If the event has a partition key, it is returned.
 * If the event does not have a partition key, a hash of the event is returned.
 * If the event does not have a partition key and the hash of the event is
 * longer than 256 characters, the hash of the hash is returned.
 * If the partition key length is more than 256, the hash of the partition key is returned.
 */
exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    if (typeof event.partitionKey !== "string") {
      return createHash(JSON.stringify(event.partitionKey));
    }
    if (event.partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
      return createHash(event.partitionKey);
    }
    return event.partitionKey;
  }

  const data = JSON.stringify(event);
  const candidate = createHash(data);
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(candidate);
  }
  return candidate;
};
