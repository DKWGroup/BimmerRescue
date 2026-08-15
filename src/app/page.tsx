'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type DriveMode = 'COMFORT' | 'SPORT' | 'SPORT_PLUS' | 'M_TRACK';

export default function BmwHelloWorldPage() {
  const [engineStarted, setEngineStarted] = useState(false);
  const [currentMode, setCurrentMode] = useState<DriveMode>('SPORT');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [rpm, setRpm] = useState(0);
  const [isRevving, setIsRevving] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Live time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pl-PL', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio Twin-Turbo V8 Sound Synthesizer
  const playEngineSound = (type: 'start' | 'rev' | 'mode') => {
    if (!soundEnabled) return;

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0.15, ctx.currentTime);

      if (type === 'start') {
        // Starter motor high pitch sound
        const starterOsc = ctx.createOscillator();
        const starterGain = ctx.createGain();
        starterOsc.type = 'sawtooth';
        starterOsc.frequency.setValueAtTime(180, ctx.currentTime);
        starterOsc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
        starterGain.gain.setValueAtTime(0.3, ctx.currentTime);
        starterGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

        starterOsc.connect(starterGain);
        starterGain.connect(masterGain);
        starterOsc.start(ctx.currentTime);
        starterOsc.stop(ctx.currentTime + 0.35);

        // V8 Ignition Roar
        const v8Osc = ctx.createOscillator();
        const v8Gain = ctx.createGain();
        v8Osc.type = 'triangle';
        v8Osc.frequency.setValueAtTime(45, ctx.currentTime + 0.2);
        v8Osc.frequency.linearRampToValueAtTime(240, ctx.currentTime + 0.7);
        v8Osc.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 1.8);

        v8Gain.gain.setValueAtTime(0.01, ctx.currentTime + 0.2);
        v8Gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.6);
        v8Gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.8);

        // Sub bass rumble
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(30, ctx.currentTime + 0.2);
        subOsc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.6);
        subOsc.frequency.linearRampToValueAtTime(35, ctx.currentTime + 1.8);

        subGain.gain.setValueAtTime(0.01, ctx.currentTime + 0.2);
        subGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.6);
        subGain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.8);

        v8Osc.connect(v8Gain);
        subOsc.connect(subGain);
        v8Gain.connect(masterGain);
        subGain.connect(masterGain);

        v8Osc.start(ctx.currentTime + 0.2);
        subOsc.start(ctx.currentTime + 0.2);
        v8Osc.stop(ctx.currentTime + 1.9);
        subOsc.stop(ctx.currentTime + 1.9);
      } else if (type === 'rev') {
        // High rev burst
        const revOsc = ctx.createOscillator();
        const revGain = ctx.createGain();
        revOsc.type = 'sawtooth';
        revOsc.frequency.setValueAtTime(90, ctx.currentTime);
        revOsc.frequency.linearRampToValueAtTime(380, ctx.currentTime + 0.4);
        revOsc.frequency.exponentialRampToValueAtTime(95, ctx.currentTime + 1.1);

        revGain.gain.setValueAtTime(0.1, ctx.currentTime);
        revGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.4);
        revGain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.1);

        // Turbo spool whistle
        const turboOsc = ctx.createOscillator();
        const turboGain = ctx.createGain();
        turboOsc.type = 'sine';
        turboOsc.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
        turboOsc.frequency.linearRampToValueAtTime(3200, ctx.currentTime + 0.5);
        turboOsc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 1.1);

        turboGain.gain.setValueAtTime(0.01, ctx.currentTime + 0.1);
        turboGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.5);
        turboGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);

        revOsc.connect(revGain);
        turboOsc.connect(turboGain);
        revGain.connect(masterGain);
        turboGain.connect(masterGain);

        revOsc.start(ctx.currentTime);
        turboOsc.start(ctx.currentTime + 0.1);
        revOsc.stop(ctx.currentTime + 1.2);
        turboOsc.stop(ctx.currentTime + 1.2);
      } else if (type === 'mode') {
        const modeOsc = ctx.createOscillator();
        const modeGain = ctx.createGain();
        modeOsc.type = 'sine';
        modeOsc.frequency.setValueAtTime(440, ctx.currentTime);
        modeOsc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

        modeGain.gain.setValueAtTime(0.1, ctx.currentTime);
        modeGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        modeOsc.connect(modeGain);
        modeGain.connect(masterGain);
        modeOsc.start(ctx.currentTime);
        modeOsc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // Audio fallback
    }
  };

  // Toggle Engine Start / Stop
  const handleEngineStart = () => {
    if (!engineStarted) {
      setEngineStarted(true);
      playEngineSound('start');
      // Tachometer sweep
      setRpm(3500);
      setTimeout(() => setRpm(800), 1800);
    } else {
      setEngineStarted(false);
      setRpm(0);
    }
  };

  // Trigger Rev
  const handleRevEngine = () => {
    if (!engineStarted) {
      handleEngineStart();
      return;
    }
    setIsRevving(true);
    playEngineSound('rev');
    setRpm(6800);
    setTimeout(() => {
      setRpm(900);
      setIsRevving(false);
    }, 1100);
  };

  // Change Drive Mode
  const handleModeChange = (mode: DriveMode) => {
    setCurrentMode(mode);
    playEngineSound('mode');
    if (engineStarted) {
      if (mode === 'M_TRACK' || mode === 'SPORT_PLUS') {
        setRpm(1200);
      } else {
        setRpm(800);
      }
    }
  };

  // Dynamic Theme Colors based on Mode
  const getModeColor = () => {
    switch (currentMode) {
      case 'COMFORT':
        return {
          primary: '#0086bf', // Light Blue
          glow: 'rgba(0, 134, 191, 0.4)',
          text: 'text-sky-400',
          border: 'border-sky-500/40',
          bgGlow: 'from-sky-900/30',
        };
      case 'SPORT':
        return {
          primary: '#00205b', // M Dark Blue
          glow: 'rgba(0, 32, 91, 0.5)',
          text: 'text-blue-400',
          border: 'border-blue-500/50',
          bgGlow: 'from-blue-900/40',
        };
      case 'SPORT_PLUS':
        return {
          primary: '#e0040b', // Crimson Red
          glow: 'rgba(224, 4, 11, 0.6)',
          text: 'text-red-500',
          border: 'border-red-500/60',
          bgGlow: 'from-red-950/50',
        };
      case 'M_TRACK':
        return {
          primary: '#eab308', // Laser Gold
          glow: 'rgba(234, 179, 8, 0.6)',
          text: 'text-amber-400',
          border: 'border-amber-500/60',
          bgGlow: 'from-amber-950/40',
        };
    }
  };

  const modeColors = getModeColor();

  return (
    <main
      className={`relative h-screen w-screen overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 box-border carbon-pattern transition-colors duration-700 ${
        isRevving ? 'animate-rev-shake' : ''
      }`}
    >
      {/* Background Hero Image with Dynamic Ambient Gradients */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/bmw_hero.png"
          alt="BMW M Performance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 transform scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/60 to-slate-950" />

        {/* Dynamic Light Beam Glow matched with Mode */}
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-b ${modeColors.bgGlow} to-transparent blur-3xl opacity-60 transition-all duration-700 pointer-events-none`}
        />

        {/* Engine Running Headlight Glow Animation */}
        {engineStarted && (
          <div className="absolute inset-0 bg-sky-400/5 mix-blend-screen animate-pulse pointer-events-none" />
        )}
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto py-2 px-4 rounded-2xl glass-panel">
        {/* BMW Emblem Logo & Branding */}
        <div className="flex items-center gap-3">
          {/* Authentic SVG BMW Emblem */}
          <div className="relative w-10 h-10 rounded-full shadow-lg p-0.5 bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-400">
            <svg viewBox="0 0 100 100" className="w-full h-full rounded-full">
              {/* Outer Ring */}
              <circle cx="50" cy="50" r="48" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="50" cy="50" r="34" fill="#000000" stroke="#64748b" strokeWidth="1" />
              {/* BMW Quadrants */}
              <path d="M 50 16 A 34 34 0 0 1 84 50 L 50 50 Z" fill="#ffffff" />
              <path d="M 84 50 A 34 34 0 0 1 50 84 L 50 50 Z" fill="#0086bf" />
              <path d="M 50 84 A 34 34 0 0 1 16 50 L 50 50 Z" fill="#ffffff" />
              <path d="M 16 50 A 34 34 0 0 1 50 16 L 50 50 Z" fill="#0086bf" />
              {/* BMW Letters text arch */}
              <text x="50" y="27" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                BMW
              </text>
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron tracking-widest text-lg font-bold text-slate-100">
                BMW
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gradient-to-r from-[#0086bf] via-[#00205b] to-[#e0040b] text-white tracking-wider">
                M POWER
              </span>
            </div>
            <p className="text-[10px] tracking-widest text-slate-400 uppercase">
              Sheer Driving Pleasure
            </p>
          </div>
        </div>

        {/* Live Clock & Vehicle Status */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-slate-400 tracking-wider">STATUS</div>
            <div className="flex items-center gap-2 text-xs font-orbitron font-semibold">
              <span
                className={`w-2 h-2 rounded-full ${
                  engineStarted ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
                }`}
              />
              <span className={engineStarted ? 'text-emerald-400' : 'text-slate-400'}>
                {engineStarted ? 'ENGINE READY' : 'SYSTEM STANDBY'}
              </span>
            </div>
          </div>

          <div className="h-7 w-[1px] bg-slate-800" />

          <div className="text-right">
            <div className="text-xs text-slate-400 tracking-wider">TIME</div>
            <div className="text-sm font-orbitron font-bold text-sky-400 tracking-widest">
              {currentTime || '00:00:00'}
            </div>
          </div>
        </div>

        {/* Sound & Audio Controls */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-slate-500 text-xs font-semibold text-slate-300 hover:text-white transition-all"
          title="Przełącz dźwięk silnika"
        >
          <span>{soundEnabled ? '🔊 V8 AUDIO ON' : '🔇 MUTE'}</span>
        </button>
      </header>

      {/* Hero Greeting Section (Center Content) */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-4 max-w-4xl mx-auto w-full">
        {/* BMW M Tri-Color Top Accent Line */}
        <div className="h-1 w-36 rounded-full m-stripe-bg mb-6 shadow-lg shadow-sky-500/20" />

        {/* Hello World Header */}
        <div className="relative mb-2">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-orbitron tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-2xl">
            HELLO WORLD
          </h1>
          <div
            className={`absolute -inset-1 blur-2xl opacity-30 -z-10 transition-colors duration-700 ${modeColors.text}`}
          >
            HELLO WORLD
          </div>
        </div>

        {/* Polish BMW Welcome Subtitle */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-light text-slate-300 tracking-widest uppercase mb-6">
          WITAMY W ŚWIECIE <span className={`font-semibold ${modeColors.text}`}>BMW PERFORMANCE</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed mb-8">
          Poznaj niezwykłą precyzję niemieckiej inżynierii i innowacji. Aplikacja Next.js
          zbudowana w pełnej skali 100vh dla czystej przyjemności z jazdy.
        </p>

        {/* Engine Start / Stop Interactive Centerpiece Button */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <button
            onClick={handleEngineStart}
            className={`group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all duration-500 cursor-pointer shadow-2xl ${
              engineStarted
                ? 'bg-gradient-to-br from-red-600 via-red-700 to-slate-900 ring-4 ring-red-500/50 shadow-red-600/50 scale-105'
                : 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-2 border-slate-700 hover:border-slate-400 shadow-sky-500/10 hover:scale-105'
            }`}
          >
            {/* Outer Pulsing Ring */}
            <div
              className={`absolute inset-0 rounded-full border border-white/20 ${
                engineStarted ? 'animate-ping opacity-40' : ''
              }`}
            />

            <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 tracking-widest uppercase">
              START
            </span>
            <span className="text-xs sm:text-sm font-black font-orbitron tracking-wider text-white">
              ENGINE
            </span>
            <span className="text-[8px] font-semibold text-slate-400 tracking-widest">
              STOP
            </span>

            {/* Glowing Indicator Dot */}
            <span
              className={`absolute top-2.5 w-2 h-2 rounded-full ${
                engineStarted ? 'bg-red-400 shadow-[0_0_8px_#ef4444]' : 'bg-slate-600'
              }`}
            />
          </button>

          {/* Rev Engine Secondary Action */}
          {engineStarted && (
            <button
              onClick={handleRevEngine}
              disabled={isRevving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600/30 to-amber-600/30 border border-red-500/50 hover:border-red-400 text-xs font-orbitron font-bold text-red-300 hover:text-white tracking-widest transition-all active:scale-95 shadow-lg"
            >
              {isRevving ? '🔥 REVVING V8...' : '🏎️ DODAJ GAZU (REV V8)'}
            </button>
          )}
        </div>

        {/* Drive Mode Selection Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl glass-panel max-w-md w-full">
          {(['COMFORT', 'SPORT', 'SPORT_PLUS', 'M_TRACK'] as DriveMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-orbitron font-bold tracking-wider transition-all cursor-pointer ${
                currentMode === mode
                  ? 'bg-slate-800 text-white shadow-lg border border-slate-600 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              {mode.replace('_', '+ ')}
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Dashboard Telemetry HUD Bar */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto rounded-2xl glass-panel p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Tachometer RPM Display */}
        <div className="flex items-center gap-3 border-r border-slate-800/80 pr-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-lg">
            ⚡
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              SILNIK (RPM)
            </div>
            <div className="text-lg sm:text-xl font-orbitron font-black text-sky-400">
              {rpm.toLocaleString()} <span className="text-xs text-slate-500 font-normal">obr/min</span>
            </div>
          </div>
        </div>

        {/* Acceleration Metric */}
        <div className="flex items-center gap-3 border-r border-slate-800/80 pr-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-lg">
            ⏱️
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              0 - 100 KM/H
            </div>
            <div className="text-lg sm:text-xl font-orbitron font-black text-emerald-400">
              3.2 <span className="text-xs text-slate-500 font-normal">sekundy</span>
            </div>
          </div>
        </div>

        {/* Engine Specs */}
        <div className="flex items-center gap-3 border-r border-slate-800/80 pr-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-lg">
            🐎
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              MOC SILNIKA
            </div>
            <div className="text-lg sm:text-xl font-orbitron font-black text-red-400">
              625 <span className="text-xs text-slate-500 font-normal">KM (M TwinPower)</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-lg">
            🚀
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              FRAMEWORK
            </div>
            <div className="text-lg sm:text-xl font-orbitron font-black text-slate-200">
              Next.js <span className="text-xs text-slate-500 font-normal">100vh</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
