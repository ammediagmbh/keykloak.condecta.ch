/// <reference types="node" />
/// <reference types="node" />
import { Readable } from "stream";
/**
 * @param data buffer containing the data to be compressed
 * @returns a buffer containing the compressed/deflated data and the crc32 checksum
 *  of the source data
 */
export declare function deflateBuffer(data: Buffer): Promise<{
    deflated: Buffer;
    crc32: number;
}>;
/**
 * @param input a byte stream, containing data to be compressed
 * @param sink a method that will accept chunks of compressed data; We don't pass
 *   a writable here, since we don't want the writablestream to be closed after
 *   a single file
 * @returns a promise, which will resolve with the crc32 checksum and the
 * compressed size
 */
export declare function deflateStream(input: Readable, sink: (chunk: Buffer) => void): Promise<{
    crc32: number;
    compressedSize: number;
}>;
