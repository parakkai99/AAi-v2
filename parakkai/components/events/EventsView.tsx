/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React, { useState } from 'react';
import {
  Calendar,
  Flame,
  Sparkles,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  X
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { ParakkaiEvent, EventBookingRecord } from '../../contracts/event';

interface EventsViewProps {
  activeTheme: ParakkaiThemeDefinition;
}

export const EventsView: React.FC<EventsViewProps> = ({ activeTheme }) => {
  const [events, setEvents] = useState(() => parakkaiService.getEvents());
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [bookingEvent, setBookingEvent] = useState<ParakkaiEvent | null>(null);

  // Booking Form State
  const [devoteeName, setDevoteeName] = useState('');
  const [devoteePhone, setDevoteePhone] = useState('');
  const [attendeesCount, setAttendeesCount] = useState(2);
  const [bookingResult, setBookingResult] = useState<EventBookingRecord | null>(null);

  const filtered = selectedCategory === 'ALL'
    ? events
    : events.filter((e) => e.category === selectedCategory);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEvent || !devoteeName.trim() || !devoteePhone.trim()) return;

    const res = parakkaiService.bookEvent(
      bookingEvent.eventId,
      devoteeName,
      devoteePhone,
      attendeesCount
    );
    setBookingResult(res);
    setEvents(parakkaiService.getEvents());
  };

  return (
    <div id="parakkai-events-view" className="w-full space-y-10 py-4 animate-fadeIn">
      {/* Header Banner */}
      <section
        className="rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: `${activeTheme.colors.surfaceElevated}`,
          borderColor: activeTheme.colors.borderGold
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>Utsavam & Utsava Murthy Sevas</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Festival Calendar 2026-2027
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Parakkai Festival & Utsavam Calendar
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Experience the ancient pomp and devotion of the Panguni Therottam (Chariot Festival), Garuda Sevai, Vaikunta Ekadasi Sorga Vasal Opening, and seasonal temple utsavams.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['ALL', 'ANNUAL_BRAHMOTSAVAM', 'SPECIAL_POOJA', 'MONTHLY_UTSAVAM'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((event: ParakkaiEvent) => (
          <div
            key={event.eventId}
            className="rounded-2xl border overflow-hidden transition-all flex flex-col justify-between hover:shadow-xl"
            style={{
              backgroundColor: `${activeTheme.colors.surfaceElevated}`,
              borderColor: activeTheme.colors.borderSubtle
            }}
          >
            {/* Event Card Header */}
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {event.category.replace('_', ' ')}
                </span>
                <span className="text-xs text-amber-400 font-mono font-bold">
                  {event.startDate}
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold text-white">
                {event.title}
              </h3>
              {event.tamilTitle && (
                <span className="text-xs text-amber-300/80 font-sans block">
                  {event.tamilTitle}
                </span>
              )}

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {event.description}
              </p>

              <div className="pt-2 space-y-1 text-xs text-slate-400 font-sans">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Timings: {event.timing}</span>
                </div>
                {event.requiresBooking && (
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Users className="w-3.5 h-3.5" />
                    <span>Seating Capacity: {event.maxCapacity} devotees</span>
                  </div>
                )}
              </div>
            </div>

            {/* Event Card Action */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {event.requiresBooking ? 'Devotee RSVP Encouraged' : 'Open to All Devotees'}
              </span>

              {event.requiresBooking ? (
                <button
                  type="button"
                  onClick={() => {
                    setBookingEvent(event);
                    setBookingResult(null);
                  }}
                  className="px-4 py-1.5 rounded-xl text-xs font-serif font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Reserve Devotee Seats</span>
                </button>
              ) : (
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Free Public Entry</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Booking RSVP Modal */}
      {bookingEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setBookingEvent(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border p-6 space-y-4 shadow-2xl bg-slate-950 border-amber-500/40 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-serif font-bold">
                Reserve Seats for {bookingEvent.title}
              </h4>
              <button
                type="button"
                onClick={() => setBookingEvent(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingResult ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 rounded-full mx-auto bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase font-mono text-emerald-400 font-bold">
                    Reservation Confirmed
                  </div>
                  <div className="text-lg font-mono font-black text-amber-400">
                    {bookingResult.referenceNumber}
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    Reserved for {bookingResult.devoteeName} ({bookingResult.attendeesCount} devotees).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingEvent(null)}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-amber-500 text-black cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Name *</label>
                  <input
                    type="text"
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    required
                    placeholder="Devotee name"
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Phone *</label>
                  <input
                    type="tel"
                    value={devoteePhone}
                    onChange={(e) => setDevoteePhone(e.target.value)}
                    required
                    placeholder="+91 94430 00000"
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Devotees Count</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={attendeesCount}
                    onChange={(e) => setAttendeesCount(parseInt(e.target.value) || 1)}
                    className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs font-serif font-bold bg-amber-500 hover:bg-amber-400 text-black transition-colors cursor-pointer"
                  >
                    Confirm RSVP Seat Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
