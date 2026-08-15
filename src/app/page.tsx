'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Phone,
  MapPin,
  CheckCircle2,
  Play,
  Gauge,
  Cpu,
  Smartphone,
  Compass,
  Wrench,
  ShieldCheck,
  Zap,
  ChevronDown,
  X,
  Send,
  Calendar,
  Layers,
  Menu,
} from 'lucide-react';

interface CodingOption {
  id: string;
  name: string;
  category: string;
  description: string;
  enabled: boolean;
}

export default function BimmerRescueHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [codingListModalOpen, setCodingListModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // Quick interactive coding toggles for the feature card
  const [quickCodingToggles, setQuickCodingToggles] = useState({
    startStop: true,
    mCluster: true,
    mirrorsFold: false,
    videoInMotion: true,
  });

  // Interactive Booking Form State
  const [selectedSeries, setSelectedSeries] = useState('BMW Seria 3 (G20 / F30)');
  const [selectedService, setSelectedService] = useState('CarPlay Full-OEM');
  const [selectedCity, setSelectedCity] = useState('Katowice (Strefa 1 - Dojazd Gratis)');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Full list of coding options for modal
  const [codingList, setCodingList] = useState<CodingOption[]>([
    {
      id: '1',
      name: 'Pamięć wyłączenia Start-Stop',
      category: 'Silnik & Komfort',
      description: 'Auto pamięta ostatni stan przycisku po ponownym uruchomieniu silnika.',
      enabled: true,
    },
    {
      id: '2',
      name: 'Cyfrowy prędkościomierz M-Performance',
      category: 'Zegary & HUD',
      description: 'Aktywacja loga M i dodatkowego wskaźnika prędkości na zegarach cyfrowych/analogowych.',
      enabled: true,
    },
    {
      id: '3',
      name: 'Składanie lusterek z pilota',
      category: 'Komfort & Nadwozie',
      description: 'Automatyczne domykanie szyb i składanie lusterek jednym kliknięciem pilota.',
      enabled: true,
    },
    {
      id: '4',
      name: 'Video in Motion (VIM)',
      category: 'Multimedia',
      description: 'Możliwość odtwarzania filmów z pamięci USB podczas jazdy.',
      enabled: false,
    },
    {
      id: '5',
      name: 'Wyłączenie gongu pasów na postoju',
      category: 'Ostrzeżenia',
      description: 'Dezaktywacja sygnału dźwiękowego przy manewrowaniu na parkingu.',
      enabled: true,
    },
    {
      id: '6',
      name: 'Tylne światła do jazdy dziennej (DRL)',
      category: 'Oświetlenie',
      description: 'Światła pozycyjne z tyłu świecą razem z przednimi ringami w trybie dziennym.',
      enabled: true,
    },
    {
      id: '7',
      name: 'Temperatura opon w iDrive',
      category: 'Wskaźniki',
      description: 'Wyświetlanie temperatury obok ciśnienia dla każdego koła na ekranie iDrive.',
      enabled: false,
    },
    {
      id: '8',
      name: 'Tryb Sport Plus / Comfort Plus',
      category: 'Skrzynia & Zawieszenie',
      description: 'Odblokowanie ukrytych fabrycznie trybów dynamiki i tłumienia.',
      enabled: true,
    },
  ]);

  const toggleCodingItem = (id: string) => {
    setCodingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0c0f0f] text-[#e2e2e2] flex flex-col font-sans selection:bg-[#e00000] selection:text-white">
      {/* TopAppBar / Header */}
      <header className="sticky top-0 z-50 w-full bg-[#0c0f0f]/95 backdrop-blur-md border-b border-[#282a2b] transition-all">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
          >
            <div className="w-3 h-3 rounded-full bg-[#e00000] shadow-[0_0_10px_#e00000] animate-pulse" />
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter uppercase text-white">
              BimmerRescue <span className="text-[#e2e2e2]/70 font-light">Silesia</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#pakiety"
              className="text-[#e9bcb5]/80 hover:text-white transition-colors duration-200"
            >
              Pakiety Specjalne
            </a>
            <a
              href="#uslugi"
              className="text-[#e9bcb5]/80 hover:text-white transition-colors duration-200"
            >
              Usługi & Cennik
            </a>
            <a
              href="#obszar"
              className="text-[#e9bcb5]/80 hover:text-white transition-colors duration-200"
            >
              Obszar Operacji
            </a>
            <a
              href="#faq"
              className="text-[#e9bcb5]/80 hover:text-white transition-colors duration-200"
            >
              FAQ
            </a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+48500123456"
              className="hidden sm:inline-flex items-center gap-2 bg-[#e00000] hover:bg-[#c00000] active:scale-95 text-white px-4 py-2 rounded text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-md shadow-[#e00000]/20"
            >
              <Phone className="w-4 h-4" />
              Zadzwoń teraz
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded text-gray-300 hover:text-white hover:bg-[#1a1c1c] transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#121414] border-b border-[#282a2b] px-5 py-4 space-y-3 font-medium text-sm animate-in slide-in-from-top duration-200">
            <a
              href="#pakiety"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#e9bcb5] hover:text-white"
            >
              Pakiety Specjalne
            </a>
            <a
              href="#uslugi"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#e9bcb5] hover:text-white"
            >
              Usługi & Cennik
            </a>
            <a
              href="#obszar"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#e9bcb5] hover:text-white"
            >
              Obszar Operacji
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#e9bcb5] hover:text-white"
            >
              FAQ
            </a>
            <a
              href="tel:+48500123456"
              className="flex items-center justify-center gap-2 w-full bg-[#e00000] text-white py-3 rounded text-xs font-mono uppercase tracking-wider font-semibold"
            >
              <Phone className="w-4 h-4" />
              Zadzwoń: 500 123 456
            </a>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-5 sm:px-8 py-20 md:py-28 overflow-hidden min-h-[75vh] flex items-center justify-center border-b border-[#282a2b] bg-tech-grid">
          {/* Background Image with Authentic Tone */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-garage.jpg"
              alt="BMW M-Performance Mobilny Serwis Śląsk"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-35 filter brightness-90"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0f] via-[#0c0f0f]/80 to-[#0c0f0f]/40" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0c0f0f]/60 to-[#0c0f0f]" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
            {/* Top Status Pill */}
            <div className="inline-flex items-center gap-2 border border-[#af8781]/40 bg-[#121414]/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[#ffb4a8] font-mono text-xs uppercase tracking-widest shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#e00000] shadow-[0_0_8px_#e00000] animate-pulse" />
              Mobilny Serwis Premium
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl leading-[1.1] text-white tracking-tighter text-balance">
              Serwis BMW bez kolejki.
              <br />
              <span className="text-[#e00000] drop-shadow-[0_0_35px_rgba(224,0,0,0.3)]">
                My przyjeżdżamy do Ciebie.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-body text-base sm:text-lg md:text-xl text-[#c8c6c6] max-w-2xl mx-auto leading-relaxed">
              Profesjonalna diagnostyka, kodowanie i instalacja CarPlay bezpośrednio pod Twoim domem
              lub biurem. Oszczędź czas, wybierz jakość.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="bg-[#e00000] hover:bg-[#c00000] active:scale-95 text-white px-8 py-4 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#e00000]/25 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
                Umów Wizytę
              </button>

              <a
                href="#obszar"
                className="border border-[#4a4a4a] bg-[#1a1c1c]/90 hover:bg-[#282a2b] hover:border-[#ffb4a8] active:scale-95 text-white px-8 py-4 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 justify-center"
              >
                <MapPin className="w-4 h-4 text-[#e00000]" />
                Sprawdź Strefę Dojazdu
              </a>
            </div>

            {/* Quick Benefits Ticker */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#282a2b]/80 w-full text-left">
              <div className="flex items-center gap-2.5 text-xs text-[#c8c6c6]">
                <ShieldCheck className="w-4 h-4 text-[#e00000] shrink-0" />
                <span>Brak utraty gwarancji OEM</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#c8c6c6]">
                <Zap className="w-4 h-4 text-[#e00000] shrink-0" />
                <span>Dojazd w 24-48h na Śląsku</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#c8c6c6]">
                <Cpu className="w-4 h-4 text-[#e00000] shrink-0" />
                <span>Narzędzia ISTA & E-Sys</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#c8c6c6]">
                <CheckCircle2 className="w-4 h-4 text-[#e00000] shrink-0" />
                <span>Płatność po wykonaniu usługi</span>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Packages (Bento Grid) */}
        <section id="pakiety" className="px-5 sm:px-8 py-20 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-10">
            <span className="w-1.5 h-8 bg-[#e00000] rounded-sm" />
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Pakiety Specjalne
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* CarPlay Feature (8 Cols) */}
            <div className="md:col-span-8 bg-[#121414] border border-[#4A4A4A] rounded-xl overflow-hidden group relative flex flex-col justify-between hover:border-[#af8781] transition-all duration-300 shadow-xl">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/carplay-idrive.jpg"
                  alt="CarPlay BMW iDrive BimmerRescue"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover object-center opacity-30 group-hover:opacity-45 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#121414] via-[#121414]/90 to-transparent z-10" />
              </div>

              {/* Content */}
              <div className="relative z-20 p-6 sm:p-8 flex flex-col h-full justify-between">
                <div>
                  <span className="text-[#ffb4a8] font-mono text-[11px] font-semibold uppercase tracking-widest border border-[#ffb4a8]/30 px-3 py-1 rounded bg-[#0c0f0f]/60 backdrop-blur-sm">
                    Bestseller
                  </span>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-4 tracking-tight">
                    CarPlay Full-OEM
                  </h3>

                  <p className="text-[#c8c6c6] font-body text-sm sm:text-base mt-2 max-w-lg leading-relaxed">
                    Bezprzewodowy Apple CarPlay & Android Auto zintegrowany z oryginalnym systemem
                    iDrive. Pełna obsługa z kierownicy, joysticka i ekranu dotykowego.
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    <li className="flex items-center gap-2.5 text-[#e2e2e2] text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#e00000] shrink-0" />
                      <span>Instalacja u klienta w 60 minut</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-[#e2e2e2] text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#e00000] shrink-0" />
                      <span>Brak utraty gwarancji producenta</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-[#e2e2e2] text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#e00000] shrink-0" />
                      <span>Pełnoekranowy widok (Full Screen CarPlay)</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="inline-flex items-center gap-2 text-white bg-[#282a2b] px-6 py-3 rounded border border-[#5f3f3a] hover:border-[#ffb4a8] hover:bg-[#333535] transition-all font-mono text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Zobacz Wideo Z Instalacji
                    <Play className="w-3.5 h-3.5 text-[#e00000] fill-[#e00000]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Odpal & Jedź Feature (4 Cols) */}
            <div className="md:col-span-4 bg-[#121212] border border-[#4A4A4A] rounded-xl overflow-hidden relative flex flex-col justify-between hover:border-[#af8781] transition-all duration-300 shadow-xl">
              {/* Top Accent Red Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#e00000]" />

              <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded bg-[#282a2b] flex items-center justify-center border border-[#5f3f3a] mb-5">
                    <Gauge className="w-6 h-6 text-[#e00000]" />
                  </div>

                  <h3 className="font-display font-bold text-xl text-white tracking-tight">
                    Pakiet &quot;Odpal &amp; Jedź&quot;
                  </h3>

                  <p className="text-[#c8c6c6] text-xs sm:text-sm mt-2 leading-relaxed">
                    Kompleksowe kodowanie funkcji ukrytych. Dostosuj BMW do swoich potrzeb jednym
                    zleceniem.
                  </p>
                </div>

                {/* Interactive Toggles Widget */}
                <div className="mt-6 space-y-3">
                  <div
                    onClick={() =>
                      setQuickCodingToggles((prev) => ({ ...prev, startStop: !prev.startStop }))
                    }
                    className="bg-[#1a1c1c] p-3.5 rounded border border-[#282a2b] hover:border-[#af8781]/50 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] text-[#c8c6c6] uppercase font-mono font-medium">
                        Wyłączenie Start-Stop
                      </span>
                      <span
                        className={`text-xs font-mono font-semibold ${
                          quickCodingToggles.startStop ? 'text-[#e00000]' : 'text-gray-500'
                        }`}
                      >
                        {quickCodingToggles.startStop ? 'Włączone' : 'Wyłączone'}
                      </span>
                    </div>
                    <div className="w-full bg-[#0c0f0f] h-1.5 rounded overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          quickCodingToggles.startStop ? 'bg-[#e00000] w-full' : 'bg-gray-700 w-0'
                        }`}
                      />
                    </div>
                  </div>

                  <div
                    onClick={() =>
                      setQuickCodingToggles((prev) => ({ ...prev, mCluster: !prev.mCluster }))
                    }
                    className="bg-[#1a1c1c] p-3.5 rounded border border-[#282a2b] hover:border-[#af8781]/50 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] text-[#c8c6c6] uppercase font-mono font-medium">
                        Zegary M-Performance 330 km/h
                      </span>
                      <span
                        className={`text-xs font-mono font-semibold ${
                          quickCodingToggles.mCluster ? 'text-[#e00000]' : 'text-gray-500'
                        }`}
                      >
                        {quickCodingToggles.mCluster ? 'Aktywne' : 'Standard'}
                      </span>
                    </div>
                    <div className="w-full bg-[#0c0f0f] h-1.5 rounded overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          quickCodingToggles.mCluster ? 'bg-[#e00000] w-full' : 'bg-gray-700 w-0'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCodingListModalOpen(true)}
                  className="mt-6 w-full text-center border-t border-[#282a2b] pt-4 text-white font-mono text-xs uppercase tracking-wider hover:text-[#ffb4a8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Sprawdź Pełną Listę Opcji
                  <ChevronDown className="w-3.5 h-3.5 text-[#e00000]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Pricing Section */}
        <section id="uslugi" className="px-5 sm:px-8 py-20 bg-[#121414] border-t border-b border-[#282a2b]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-8 bg-[#e00000] rounded-sm" />
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Nasze Usługi Mobilne
              </h2>
            </div>
            <p className="text-[#c8c6c6] text-sm sm:text-base max-w-2xl mb-12">
              Każda usługa realizowana jest pod wskazanym adresem przy użyciu certyfikowanych głowic
              ICOM oraz zasilacza laboratoryjnego Deutronic.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Service 1 */}
              <div className="bg-[#1a1c1c] border border-[#282a2b] hover:border-[#e00000]/60 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group">
                <div>
                  <div className="w-10 h-10 rounded bg-[#282a2b] flex items-center justify-center text-[#ffb4a8] mb-4 group-hover:bg-[#e00000] group-hover:text-white transition-colors">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    Diagnostyka Komputerowa
                  </h3>
                  <p className="text-xs text-[#c8c6c6] leading-relaxed mb-4">
                    Pełny skan sterowników programem ISTA+. Odczyt kodów błędów, podgląd parametrów
                    rzeczywistych na żywo oraz adaptacje podzespołów.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#282a2b] flex items-center justify-between">
                  <span className="text-xs text-[#c8c6c6] font-mono">od 150 PLN</span>
                  <button
                    onClick={() => {
                      setSelectedService('Diagnostyka Komputerowa OEM');
                      setBookingModalOpen(true);
                    }}
                    className="text-xs font-mono text-[#ffb4a8] hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    Wybierz
                  </button>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-[#1a1c1c] border border-[#282a2b] hover:border-[#e00000]/60 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group">
                <div>
                  <div className="w-10 h-10 rounded bg-[#282a2b] flex items-center justify-center text-[#ffb4a8] mb-4 group-hover:bg-[#e00000] group-hover:text-white transition-colors">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    Kodowanie Funkcji
                  </h3>
                  <p className="text-xs text-[#c8c6c6] leading-relaxed mb-4">
                    Odblokowanie ukrytych opcji fabrycznych: Start-Stop, zegary M, światła DRL,
                    składanie lusterek, konwersja USA &gt; EU.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#282a2b] flex items-center justify-between">
                  <span className="text-xs text-[#c8c6c6] font-mono">od 200 PLN</span>
                  <button
                    onClick={() => {
                      setSelectedService('Kodowanie Funkcji Ukrytych');
                      setBookingModalOpen(true);
                    }}
                    className="text-xs font-mono text-[#ffb4a8] hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    Wybierz
                  </button>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-[#1a1c1c] border border-[#282a2b] hover:border-[#e00000]/60 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group">
                <div>
                  <div className="w-10 h-10 rounded bg-[#282a2b] flex items-center justify-center text-[#ffb4a8] mb-4 group-hover:bg-[#e00000] group-hover:text-white transition-colors">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    CarPlay & Android Auto
                  </h3>
                  <p className="text-xs text-[#c8c6c6] leading-relaxed mb-4">
                    Aktywacja Full Screen CarPlay lub montaż modułu MMI dla systemów CCC, CIC, NBT,
                    EVO, MGU bez cięcia instalacji.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#282a2b] flex items-center justify-between">
                  <span className="text-xs text-[#c8c6c6] font-mono">od 350 PLN</span>
                  <button
                    onClick={() => {
                      setSelectedService('CarPlay Full-OEM');
                      setBookingModalOpen(true);
                    }}
                    className="text-xs font-mono text-[#ffb4a8] hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    Wybierz
                  </button>
                </div>
              </div>

              {/* Service 4 */}
              <div className="bg-[#1a1c1c] border border-[#282a2b] hover:border-[#e00000]/60 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group">
                <div>
                  <div className="w-10 h-10 rounded bg-[#282a2b] flex items-center justify-center text-[#ffb4a8] mb-4 group-hover:bg-[#e00000] group-hover:text-white transition-colors">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    Aktualizacja Map & Sterowników
                  </h3>
                  <p className="text-xs text-[#c8c6c6] leading-relaxed mb-4">
                    Najnowsze mapy nawigacji BMW Road Map Europe na rok bieżący wraz z kodem FSC.
                    Aktualizacja oprogramowania sterowników (I-Level).
                  </p>
                </div>
                <div className="pt-4 border-t border-[#282a2b] flex items-center justify-between">
                  <span className="text-xs text-[#c8c6c6] font-mono">od 250 PLN</span>
                  <button
                    onClick={() => {
                      setSelectedService('Aktualizacja Map & Sterowników');
                      setBookingModalOpen(true);
                    }}
                    className="text-xs font-mono text-[#ffb4a8] hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    Wybierz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Map Area */}
        <section id="obszar" className="px-5 sm:px-8 py-20 bg-[#0c0f0f]">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center">
            {/* Left Info Column */}
            <div className="lg:w-1/3">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-8 bg-[#e00000] rounded-sm" />
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  Obszar Operacji
                </h2>
              </div>

              <p className="text-[#c8c6c6] mb-8 text-sm sm:text-base leading-relaxed">
                Działamy na terenie całego Śląska. Nasz mobilny warsztat dojeżdża bezpośrednio we
                wskazane miejsce - niezależnie czy to parking podziemny, czy podjazd przed domem.
              </p>

              <div className="space-y-4">
                {/* Zone 1 */}
                <div className="flex items-start gap-3.5 bg-[#121414] p-4 rounded-xl border border-[#4a4a4a] hover:border-[#e00000]/60 transition-colors">
                  <MapPin className="w-5 h-5 text-[#e00000] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-sm text-white">
                      Strefa 1 (Dojazd Gratis)
                    </h4>
                    <p className="text-xs text-[#c8c6c6] mt-1 leading-normal">
                      Katowice, Gliwice, Zabrze, Chorzów, Ruda Śląska, Świętochłowice, Siemianowice
                    </p>
                  </div>
                </div>

                {/* Zone 2 */}
                <div className="flex items-start gap-3.5 bg-[#121414] p-4 rounded-xl border border-[#282a2b] hover:border-[#4a4a4a] transition-colors">
                  <Layers className="w-5 h-5 text-[#c8c6c6] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-sm text-white">
                      Strefa 2 (Dopłata 50 PLN)
                    </h4>
                    <p className="text-xs text-[#c8c6c6] mt-1 leading-normal">
                      Tychy, Sosnowiec, Dąbrowa Górnicza, Bytom, Mysłowice, Mikołów, Jaworzno
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Map Image Container */}
            <div className="lg:w-2/3 w-full h-[380px] sm:h-[430px] rounded-xl border border-[#4a4a4a] overflow-hidden relative group shadow-2xl">
              <Image
                src="/images/silesia-map.jpg"
                alt="Mapa obszaru operacyjnego Śląsk BimmerRescue"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#0c0f0f]/35 pointer-events-none" />

              {/* Map UI Badges Overlay */}
              <div className="absolute top-4 left-4 z-10 bg-[#121414]/90 backdrop-blur-md border border-[#282a2b] px-3 py-1.5 rounded text-xs font-mono text-[#ffb4a8] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Dojazd aktywny: Katowice & Aglomeracja
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Booking Calculator / Banner */}
        <section className="px-5 sm:px-8 py-16 bg-gradient-to-b from-[#121414] to-[#0c0f0f] border-t border-[#282a2b]">
          <div className="max-w-4xl mx-auto bg-[#1a1c1c] border border-[#4a4a4a] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e00000]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-8">
              <span className="text-[#ffb4a8] font-mono text-xs uppercase tracking-widest">
                Rezerwacja Online
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
                Zarezerwuj wizytę serwisową pod domem
              </h2>
              <p className="text-xs sm:text-sm text-[#c8c6c6] mt-2">
                Wybierz model i usługę, a my skontaktujemy się w celu potwierdzenia dogodnego terminu.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#c8c6c6] mb-1.5">
                    Model Twojego BMW
                  </label>
                  <select
                    value={selectedSeries}
                    onChange={(e) => setSelectedSeries(e.target.value)}
                    className="w-full bg-[#121414] border border-[#282a2b] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#e00000]"
                  >
                    <option>BMW Seria 1 (F20 / F40)</option>
                    <option>BMW Seria 3 (G20 / F30 / E90)</option>
                    <option>BMW Seria 4 (G22 / F32)</option>
                    <option>BMW Seria 5 (G30 / F10 / E60)</option>
                    <option>BMW Seria 7 (G11 / F01)</option>
                    <option>BMW X3 / X4 / X5 / X6 (G05 / F15 / F25)</option>
                    <option>BMW M2 / M3 / M4 / M5 / M8</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#c8c6c6] mb-1.5">
                    Wybór Usługi
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#121414] border border-[#282a2b] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#e00000]"
                  >
                    <option>CarPlay Full-OEM</option>
                    <option>Pakiet Kodowania &quot;Odpal &amp; Jedź&quot;</option>
                    <option>Diagnostyka Komputerowa OEM ISTA</option>
                    <option>Aktualizacja Map Nawigacji 2026</option>
                    <option>Kompleksowy Pakiet Diagnostyka + Kodowanie</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#c8c6c6] mb-1.5">
                    Lokalizacja (Miasto)
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-[#121414] border border-[#282a2b] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#e00000]"
                  >
                    <option>Katowice (Strefa 1 - Dojazd Gratis)</option>
                    <option>Gliwice (Strefa 1 - Dojazd Gratis)</option>
                    <option>Zabrze (Strefa 1 - Dojazd Gratis)</option>
                    <option>Chorzów (Strefa 1 - Dojazd Gratis)</option>
                    <option>Ruda Śląska (Strefa 1 - Dojazd Gratis)</option>
                    <option>Sosnowiec / Dąbrowa Górnicza (Strefa 2)</option>
                    <option>Tychy / Mikołów (Strefa 2)</option>
                    <option>Bytom (Strefa 2)</option>
                    <option>Inna miejscowość na Śląsku</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#c8c6c6] mb-1.5">
                    Numer Telefonu
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+48 000 000 000"
                    className="w-full bg-[#121414] border border-[#282a2b] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#e00000]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={bookingSuccess}
                  className="w-full bg-[#e00000] hover:bg-[#c00000] text-white py-3.5 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#e00000]/30"
                >
                  {bookingSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Dziękujemy! Skontaktujemy się w 15 minut.
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Wyślij zgłoszenie mobilne
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="px-5 sm:px-8 py-20 bg-[#0c0f0f] border-t border-[#282a2b]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-8 bg-[#e00000] rounded-sm" />
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Często Zadawane Pytania
              </h2>
            </div>
            <p className="text-[#c8c6c6] text-sm mb-10">
              Wszystko co musisz wiedzieć o wizycie naszego mobilnego serwisu BMW.
            </p>

            <div className="space-y-4">
              <div className="bg-[#121414] border border-[#282a2b] rounded-xl p-5">
                <h4 className="font-display font-semibold text-white text-base">
                  Czy podczas kodowania lub instalacji CarPlay tracę gwarancję fabryczną?
                </h4>
                <p className="text-xs sm:text-sm text-[#c8c6c6] mt-2 leading-relaxed">
                  Nie. Wszystkie modyfikacje wykonujemy na oryginalnych protokołach BMW zgodnych ze
                  standardem OEM. Kodowanie to odblokowanie opcji, które fabryka przewidziała dla
                  danego modułu, bez naruszania integralności oprogramowania silnika.
                </p>
              </div>

              <div className="bg-[#121414] border border-[#282a2b] rounded-xl p-5">
                <h4 className="font-display font-semibold text-white text-base">
                  Czy muszę zapewnić dostęp do prądu / gniazdka 230V?
                </h4>
                <p className="text-xs sm:text-sm text-[#c8c6c6] mt-2 leading-relaxed">
                  Nie! Nasz serwis mobilny posiada własne niezależne zasilanie akumulatorowo-przetwornicowe
                  oraz stabilizator laboratoryjny Deutronic. Możemy wykonać usługę na parkingu podziemnym,
                  pod pracą lub w dowolnym miejscu.
                </p>
              </div>

              <div className="bg-[#121414] border border-[#282a2b] rounded-xl p-5">
                <h4 className="font-display font-semibold text-white text-base">
                  Jak szybko możecie dojechać na Śląsku?
                </h4>
                <p className="text-xs sm:text-sm text-[#c8c6c6] mt-2 leading-relaxed">
                  Standardowy czas realizacji to 24 do 48 godzin od zgłoszenia. W nagłych przypadkach
                  (np. zablokowany moduł, błędy uniemożliwiające jazdę) staramy się dojechać tego samego dnia.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0c0f0f] border-t border-[#282a2b] w-full">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand Info */}
          <div>
            <div className="font-display text-xl sm:text-2xl font-extrabold uppercase text-white mb-2">
              BimmerRescue Silesia
            </div>
            <p className="text-[#c8c6c6] text-xs font-mono">Mobilny Serwis BMW.</p>
            <p className="text-[#8e8d8d] text-xs mt-3 leading-relaxed">
              Katowice • Gliwice • Zabrze • Cała Aglomeracja Śląska
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2.5 text-sm">
            <a
              href="tel:+48500123456"
              className="text-[#c8c6c6] hover:text-[#ffb4a8] transition-colors"
            >
              Kontakt (+48 500 123 456)
            </a>
            <a href="#obszar" className="text-[#c8c6c6] hover:text-[#ffb4a8] transition-colors">
              Obszar Operacji
            </a>
            <a href="#pakiety" className="text-[#c8c6c6] hover:text-[#ffb4a8] transition-colors">
              Pakiety Specjalne
            </a>
            <a href="#" className="text-[#c8c6c6] hover:text-[#ffb4a8] transition-colors">
              Polityka Prywatności &amp; Regulamin
            </a>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:items-end justify-between h-full text-xs text-[#c8c6c6] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e00000]" />
              <span>Gwarancja Satysfakcji OEM</span>
            </div>
            <div className="mt-6 md:mt-0 text-[#8e8d8d]">
              © {new Date().getFullYear()} BimmerRescue Silesia. Mobilny Serwis BMW.
            </div>
          </div>
        </div>
      </footer>

      {/* Video Demo Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#121414] border border-[#4a4a4a] rounded-2xl overflow-hidden shadow-2xl p-6">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-[#1a1c1c] border border-[#282a2b]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#ffb4a8] font-mono text-xs uppercase mb-2">
              <Play className="w-3.5 h-3.5 fill-[#e00000] text-[#e00000]" />
              Prezentacja wideo instalacji CarPlay
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-4">
              Instalacja bezprzewodowego CarPlay w BMW iDrive
            </h3>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center border border-[#282a2b]">
              <Image
                src="/images/carplay-idrive.jpg"
                alt="CarPlay Video Demo"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute flex flex-col items-center gap-3 z-10 text-center px-4">
                <div className="w-14 h-14 rounded-full bg-[#e00000] flex items-center justify-center text-white shadow-xl animate-pulse">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-white">
                  Instalacja w pełni bezinwazyjna (Plug &amp; Play). Czas montażu: ok. 45-60 min pod
                  domem klienta.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  setBookingModalOpen(true);
                }}
                className="bg-[#e00000] hover:bg-[#c00000] text-white px-6 py-2.5 rounded font-mono text-xs uppercase tracking-wider font-bold"
              >
                Umów montaż CarPlay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Coding List Modal Drawer */}
      {codingListModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#121414] border border-[#4a4a4a] rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center justify-between border-b border-[#282a2b] pb-4 mb-4">
              <div>
                <span className="text-[#ffb4a8] font-mono text-xs uppercase">
                  BimmerRescue Coding Catalog
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  Pełna Lista Opcji Kodowania BMW
                </h3>
              </div>
              <button
                onClick={() => setCodingListModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-full bg-[#1a1c1c] border border-[#282a2b]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto pr-2 space-y-3 flex-grow">
              {codingList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCodingItem(item.id)}
                  className="bg-[#1a1c1c] border border-[#282a2b] hover:border-[#af8781]/60 p-3.5 rounded-xl flex items-start justify-between gap-4 cursor-pointer transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-sm text-white">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono bg-[#282a2b] text-[#c8c6c6] px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#c8c6c6] mt-1 leading-normal">
                      {item.description}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      item.enabled
                        ? 'bg-[#e00000] text-white shadow-[0_0_8px_#e00000]'
                        : 'border border-gray-600 text-transparent'
                    }`}
                  >
                    ✓
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#282a2b] flex items-center justify-between mt-4">
              <span className="text-xs font-mono text-[#c8c6c6]">
                Wybrano:{' '}
                <strong className="text-[#ffb4a8]">
                  {codingList.filter((i) => i.enabled).length}
                </strong>{' '}
                opcji
              </span>
              <button
                onClick={() => {
                  setCodingListModalOpen(false);
                  setSelectedService('Pakiet Kodowania "Odpal & Jedź"');
                  setBookingModalOpen(true);
                }}
                className="bg-[#e00000] hover:bg-[#c00000] text-white px-6 py-2.5 rounded font-mono text-xs uppercase tracking-wider font-bold"
              >
                Zamów ten pakiet kodowania
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Quick Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#121414] border border-[#4a4a4a] rounded-2xl shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-[#1a1c1c] border border-[#282a2b]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[#ffb4a8] font-mono text-xs uppercase">
              Mobilny Serwis Śląsk
            </span>
            <h3 className="font-display font-bold text-xl text-white mt-1 mb-4">
              Umów Wizytę pod Domem
            </h3>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#c8c6c6] mb-1">
                  Model BMW
                </label>
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="w-full bg-[#1a1c1c] border border-[#282a2b] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#e00000]"
                >
                  <option>BMW Seria 1 (F20 / F40)</option>
                  <option>BMW Seria 3 (G20 / F30 / E90)</option>
                  <option>BMW Seria 4 (G22 / F32)</option>
                  <option>BMW Seria 5 (G30 / F10 / E60)</option>
                  <option>BMW Seria 7 (G11 / F01)</option>
                  <option>BMW X3 / X4 / X5 / X6 (G05 / F15 / F25)</option>
                  <option>BMW M2 / M3 / M4 / M5 / M8</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#c8c6c6] mb-1">
                  Usługa
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#1a1c1c] border border-[#282a2b] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#e00000]"
                >
                  <option>CarPlay Full-OEM</option>
                  <option>Pakiet Kodowania &quot;Odpal &amp; Jedź&quot;</option>
                  <option>Diagnostyka Komputerowa OEM ISTA</option>
                  <option>Aktualizacja Map &amp; Sterowników</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#c8c6c6] mb-1">
                  Twój Numer Telefonu
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+48 000 000 000"
                  className="w-full bg-[#1a1c1c] border border-[#282a2b] rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#e00000]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={bookingSuccess}
                  className="w-full bg-[#e00000] hover:bg-[#c00000] text-white py-3.5 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#e00000]/30"
                >
                  {bookingSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Zgłoszenie przyjęte! Oddzwaniamy.
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Potwierdź rezerwację terminu
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
