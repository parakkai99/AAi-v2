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
        className="rounded-3xl border p-6 sm:p-10 shadow-xl relative overflow-hidden transition-colors duration-200"
        style={{
          backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderGold || activeTheme.colors.borderSubtle
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Utsavam & Utsava Murthy Sevas</span>
              </span>
              <span
                className="text-xs sm:text-sm font-mono font-semibold"
                style={{ color: activeTheme.colors.textSecondary }}
              >
                Festival Calendar 2026-2027
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight"
              style={{ color: activeTheme.colors.textPrimary }}
            >
              Parakkai Festival & Utsavam Calendar
            </h2>
            <p
              className="text-sm sm:text-base font-sans leading-relaxed font-normal"
              style={{ color: activeTheme.colors.textSecondary }}
            >
              Experience the ancient pomp and devotion of the Panguni Therottam (Chariot Festival), Garuda Sevai, Vaikunta Ekadasi Sorga Vasal Opening, and seasonal temple utsavams.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl border" style={{ borderColor: activeTheme.colors.borderSubtle, backgroundColor: `${activeTheme.colors.surfaceCanvas}80` }}>
            {[
              { id: 'ALL', label: 'All Events' },
              { id: 'ANNUAL_BRAHMOTSAVAM', label: 'Brahmotsavam' },
              { id: 'SPECIAL_POOJA', label: 'Special Pooja' },
              { id: 'MONTHLY_UTSAVAM', label: 'Monthly Utsavam' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-sans transition-all cursor-pointer border ${
                  selectedCategory === cat.id ? 'font-bold shadow-sm' : 'font-medium hover:opacity-80'
                }`}
                style={
                  selectedCategory === cat.id
                    ? {
                        backgroundColor: activeTheme.colors.primarySkyBlue,
                        color: '#ffffff',
                        borderColor: 'transparent'
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: activeTheme.colors.textSecondary,
                        borderColor: 'transparent'
                      }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filtered.map((event: ParakkaiEvent) => (
          <div
            key={event.eventId}
            className="rounded-2xl border overflow-hidden transition-all flex flex-col justify-between hover:shadow-xl"
            style={{
              backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceElevated,
              borderColor: activeTheme.colors.borderSubtle
            }}
          >
            {/* Event Card Header */}
            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-semibold border"
                  style={{
                    backgroundColor: `${activeTheme.colors.primarySkyBlue}18`,
                    color: activeTheme.colors.primarySkyBlue,
                    borderColor: `${activeTheme.colors.primarySkyBlue}30`
                  }}
                >
                  {event.category.replace('_', ' ')}
                </span>
                <span
                  className="text-sm sm:text-base font-mono font-bold"
                  style={{ color: activeTheme.colors.textGold || activeTheme.colors.sacredGold }}
                >
                  {event.startDate}
                </span>
              </div>

              <div className="space-y-1">
                <h3
                  className="text-xl sm:text-2xl font-serif font-bold leading-snug"
                  style={{ color: activeTheme.colors.textPrimary }}
                >
                  {event.title}
                </h3>
                {event.tamilTitle && (
                  <span
                    className="text-sm sm:text-base font-sans font-medium block"
                    style={{ color: activeTheme.colors.textGold || activeTheme.colors.sacredGold }}
                  >
                    {event.tamilTitle}
                  </span>
                )}
              </div>

              <p
                className="text-sm sm:text-base font-sans leading-relaxed"
                style={{ color: activeTheme.colors.textSecondary }}
              >
                {event.description}
              </p>

              <div
                className="pt-2 space-y-2 text-sm font-sans"
                style={{ color: activeTheme.colors.textSecondary }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-medium">Timings: {event.timing}</span>
                </div>
                {event.requiresBooking && (
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Seating Capacity: {event.maxCapacity} devotees</span>
                  </div>
                )}
              </div>
            </div>

            {/* Event Card Action */}
            <div
              className="p-4 sm:p-5 border-t flex items-center justify-between gap-3"
              style={{
                borderColor: activeTheme.colors.borderSubtle,
                backgroundColor: activeTheme.colors.surfaceCanvas
              }}
            >
              <span
                className="text-xs sm:text-sm font-mono font-semibold"
                style={{ color: activeTheme.colors.textSecondary }}
              >
                {event.requiresBooking ? 'Devotee RSVP Encouraged' : 'Open to All Devotees'}
              </span>

              {event.requiresBooking ? (
                <button
                  type="button"
                  onClick={() => {
                    setBookingEvent(event);
                    setBookingResult(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reserve Devotee Seats</span>
                </button>
              ) : (
                <span className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
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
            className="w-full max-w-md rounded-2xl border p-6 space-y-4 shadow-2xl"
            style={{
              backgroundColor: activeTheme.colors.surfaceElevated,
              borderColor: activeTheme.colors.borderGold,
              color: activeTheme.colors.textPrimary,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: activeTheme.colors.borderSubtle }}>
              <h4 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Reserve Seats for {bookingEvent.title}
              </h4>
              <button
                type="button"
                onClick={() => setBookingEvent(null)}
                className="cursor-pointer"
                style={{ color: activeTheme.colors.textSecondary }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingResult ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 rounded-full mx-auto bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    Reservation Confirmed
                  </div>
                  <div className="text-lg font-mono font-black" style={{ color: activeTheme.colors.textGold }}>
                    {bookingResult.referenceNumber}
                  </div>
                  <p className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                    Reserved for {bookingResult.devoteeName} ({bookingResult.attendeesCount} devotees).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingEvent(null)}
                  className="w-full py-2 rounded-xl text-xs font-bold cursor-pointer"
                  style={{ backgroundColor: activeTheme.colors.sacredGold, color: '#000000' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Name *</label>
                  <input
                    type="text"
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    required
                    placeholder="Devotee name"
                    className="w-full p-2 rounded-lg border text-xs outline-none"
                    style={{
                      backgroundColor: activeTheme.colors.surfaceCanvas,
                      borderColor: activeTheme.colors.borderSubtle,
                      color: activeTheme.colors.textPrimary,
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Phone *</label>
                  <input
                    type="tel"
                    value={devoteePhone}
                    onChange={(e) => setDevoteePhone(e.target.value)}
                    required
                    placeholder="+91 94430 00000"
                    className="w-full p-2 rounded-lg border text-xs outline-none"
                    style={{
                      backgroundColor: activeTheme.colors.surfaceCanvas,
                      borderColor: activeTheme.colors.borderSubtle,
                      color: activeTheme.colors.textPrimary,
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Devotees Count</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={attendeesCount}
                    onChange={(e) => setAttendeesCount(parseInt(e.target.value) || 1)}
                    className="w-full p-2 rounded-lg border text-xs outline-none"
                    style={{
                      backgroundColor: activeTheme.colors.surfaceCanvas,
                      borderColor: activeTheme.colors.borderSubtle,
                      color: activeTheme.colors.textPrimary,
                    }}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs font-serif font-bold transition-opacity hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: activeTheme.colors.sacredGold,
                      color: '#000000'
                    }}
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
