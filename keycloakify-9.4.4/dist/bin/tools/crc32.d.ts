/// <reference types="node" />
/// <reference types="node" />
import { Readable } from "stream";
/**
 *
 * @param input either a byte stream, a string or a buffer, you want to have the checksum for
 * @returns a promise for a checksum (uint32)
 */
export declare function crc32(input: Readable | String | Buffer): Promise<number>;
