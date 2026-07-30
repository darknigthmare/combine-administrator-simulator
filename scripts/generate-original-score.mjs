#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const sampleRate = 24000;
const durationSeconds = 24;
const frameCount = sampleRate * durationSeconds;
const outputDirectory = resolve('public/audio');

const scores = [
  { id: 'control', root: 36.71, pulse: 0.5, color: 0.18, progression: [0, 3, -2, 5] },
  { id: 'tension', root: 34.65, pulse: 1, color: 0.34, progression: [0, 1, -1, 6] },
  { id: 'xen', root: 41.2, pulse: 0.375, color: 0.58, progression: [0, 6, 1, -5] },
  { id: 'nova', root: 38.89, pulse: 0.75, color: 0.26, progression: [0, 7, 2, -1] },
];

function seededNoise(index, seed) {
  const value = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
}

function midiRatio(semitones) {
  return 2 ** (semitones / 12);
}

function renderScore(score) {
  const samples = new Float32Array(frameCount);
  let lowNoise = 0;

  for (let index = 0; index < frameCount; index += 1) {
    const time = index / sampleRate;
    const phase = time / durationSeconds;
    const bar = Math.floor(time / 6) % score.progression.length;
    const root = score.root * midiRatio(score.progression[bar]);
    const loopEnvelope = Math.min(1, time / 1.8, (durationSeconds - time) / 1.8);
    const pulsePhase = (time * score.pulse) % 1;
    const pulseEnvelope = Math.exp(-pulsePhase * (score.id === 'tension' ? 7 : 4.5));
    const slowMovement = 0.68 + Math.sin(phase * Math.PI * 2) * 0.12;

    const drone =
      Math.sin(Math.PI * 2 * root * time) * 0.34
      + Math.sin(Math.PI * 2 * root * 1.5 * time + 0.4) * 0.2
      + Math.sin(Math.PI * 2 * root * 2.01 * time + 1.1) * 0.09;
    const sequenceFrequency = root * midiRatio(score.progression[(bar + Math.floor(time * score.pulse)) % score.progression.length] + 12);
    const sequence = Math.sin(Math.PI * 2 * sequenceFrequency * time) * pulseEnvelope * (0.08 + score.color * 0.08);
    const rawNoise = seededNoise(index, score.root);
    lowNoise = lowNoise * 0.985 + rawNoise * 0.015;
    const texture = (score.id === 'xen' ? rawNoise - lowNoise : lowNoise) * score.color * 0.09;
    const subPulse = Math.sin(Math.PI * 2 * root * 0.5 * time) * pulseEnvelope * (score.id === 'tension' ? 0.16 : 0.05);
    samples[index] = Math.tanh((drone * slowMovement + sequence + texture + subPulse) * loopEnvelope * 1.35);
  }

  return samples;
}

function encodeWav(samples) {
  const bytesPerSample = 2;
  const buffer = Buffer.alloc(44 + samples.length * bytesPerSample);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(buffer.length - 8, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * bytesPerSample, 28);
  buffer.writeUInt16LE(bytesPerSample, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(samples.length * bytesPerSample, 40);
  samples.forEach((sample, index) => buffer.writeInt16LE(Math.round(Math.max(-1, Math.min(1, sample)) * 32767), 44 + index * 2));
  return buffer;
}

await mkdir(outputDirectory, { recursive: true });
for (const score of scores) {
  const path = resolve(outputDirectory, `coan-${score.id}.wav`);
  await writeFile(path, encodeWav(renderScore(score)));
  console.log(`Generated ${path}`);
}
