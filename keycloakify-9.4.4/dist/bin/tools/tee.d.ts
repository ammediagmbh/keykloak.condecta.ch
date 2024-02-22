/// <reference types="node" />
import { PassThrough, Readable } from "stream";
export default function tee(input: Readable): readonly [PassThrough, PassThrough];
