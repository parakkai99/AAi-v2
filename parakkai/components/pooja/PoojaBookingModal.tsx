/**
 * P-PARAKKAI-001
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.0
 */

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Calendar, Clock, User, Phone, Mail, Shield } from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { PoojaOfferingItem, PoojaBookingRecord } from '../../contracts/temple';

interface PoojaBookingModalProps {
  activeTheme: ParakkaiThemeDefinition;
  initialOfferingId?: string;
  onClose: () => void;
  onSuccess?: (booking: PoojaBookingRecord) => void;
}

export const PoojaBookingModal: React.FC<PoojaBookingModalProps> = ({
  activeTheme,
  initialOfferingId,
  onClose,
  onSuccess
}) => {
  const offerings = parakkaiService.getPoojaOfferings();
  const currentUser = parakkaiService.getCurrentUser();

  const [selectedOfferingId, setSelectedOfferingId] = useState(
    initialOfferingId || offerings[0]?.id || ''
  );
  const [devoteeName, setDevoteeName] = useState(currentUser.name || '');
  const [devoteePhone, setDevoteePhone] = useState(currentUser.phone || '');
  const [devoteeEmail, setDevoteeEmail] = useState(currentUser.email || '');
  const [devoteeGothram, setDevoteeGothram] = useState('');
  const [devoteeNakshatram, setDevoteeNakshatram] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('08:00 AM – 09:30 AM (Kaala Santhi)');
  const [sankalpamNotes, setSankalpamNotes] = useState('');

  const [confirmedBooking, setConfirmedBooking] = useState<PoojaBookingRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedOffering = offerings.find((o) => o.id === selectedOfferingId) || offerings[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!devoteeName.trim() || !devoteePhone.trim()) {
      setErrorMsg('Please provide your name and contact phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const record = parakkaiService.bookPooja({
        offeringId: selectedOfferingId,
        devoteeName,
        devoteePhone,
        devoteeEmail,
        devoteeGothram,
        devoteeNakshatram,
        preferredDate,
        preferredTimeSlot,
        sankalpamNotes
      });

      setConfirmedBooking(record);
      if (onSuccess) onSuccess(record);
    } catch (err: unknown) {
      setErrorMsg('Failed to process booking reservation. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl my-8 rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderGold
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl border border-amber-400">
              🪷
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">
                Book Temple Pooja Offering
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                Arulmigu Madhusoodhana Perumal Sannadhi • Parakkai
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation View */
          <div className="space-y-6 text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full mx-auto bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-3xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
                Pooja Slot Reserved
              </span>
              <h4 className="text-xl font-serif font-bold text-white">
                {confirmedBooking.offeringName}
              </h4>
              <p className="text-xs text-slate-300 font-sans">
                Devotee: <strong>{confirmedBooking.devoteeName}</strong>
              </p>
            </div>

            {/* Reference Number Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 text-center space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Official Booking Reference Code
              </span>
              <div className="text-xl sm:text-2xl font-mono font-black text-amber-400 tracking-wider">
                {confirmedBooking.referenceNumber}
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Date: {confirmedBooking.preferredDate} • Slot: {confirmedBooking.preferredTimeSlot}
              </p>
              <div className="text-xs font-serif font-bold text-slate-300 pt-1">
                Amount: ₹{confirmedBooking.amountINR} (Payable at Temple Counter or Online Link)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs text-slate-300 space-y-1 font-sans">
              <strong className="text-amber-300 block font-serif">Prasadam Collection Guidelines:</strong>
              <p>
                Please present this reference number at the temple outer archana counter on the booked date. Consecrated Vibhuti, Kumkum, and sacred Tulsi Prasadam will be handed to your family after archana deeparadhana.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-serif font-bold bg-amber-500 hover:bg-amber-400 text-black transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Offering Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-slate-300">
                Select Pooja Offering
              </label>
              <select
                value={selectedOfferingId}
                onChange={(e) => setSelectedOfferingId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
              >
                {offerings.map((o: PoojaOfferingItem) => (
                  <option key={o.id} value={o.id}>
                    {o.name} — ₹{o.priceINR} ({o.category})
                  </option>
                ))}
              </select>
              {selectedOffering && (
                <p className="text-[11px] text-slate-400 font-sans pt-0.5">
                  {selectedOffering.description}
                </p>
              )}
            </div>

            {/* Devotee Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-medium text-slate-300">
                  Devotee Name *
                </label>
                <input
                  type="text"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder="e.g. Vijay Kumar K."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-medium text-slate-300">
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  value={devoteePhone}
                  onChange={(e) => setDevoteePhone(e.target.value)}
                  placeholder="+91 94430 00000"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Devotee Gothram & Nakshatram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-medium text-slate-300">
                  Gothram (கோத்திரம்)
                </label>
                <input
                  type="text"
                  value={devoteeGothram}
                  onChange={(e) => setDevoteeGothram(e.target.value)}
                  placeholder="e.g. Kasyapa / Haritha / Bharadwaja"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-medium text-slate-300">
                  Nakshatram (நட்சத்திரம்)
                </label>
                <input
                  type="text"
                  value={devoteeNakshatram}
                  onChange={(e) => setDevoteeNakshatram(e.target.value)}
                  placeholder="e.g. Rohini / Thiruvonam / Hastham"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-medium text-slate-300">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-medium text-slate-300">
                  Pooja Kaalam / Time Slot
                </label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="06:30 AM – 07:00 AM (Viswaroopa & Dawn Light)">06:30 AM (Viswaroopa & Dawn Light)</option>
                  <option value="08:00 AM – 09:30 AM (Kaala Santhi)">08:00 AM – 09:30 AM (Kaala Santhi)</option>
                  <option value="11:30 AM – 12:00 PM (Uchikalam)">11:30 AM – 12:00 PM (Uchikalam)</option>
                  <option value="05:30 PM – 06:30 PM (Sayaratchai)">05:30 PM – 06:30 PM (Sayaratchai)</option>
                  <option value="07:00 PM – 08:00 PM (Sahasranamam)">07:00 PM – 08:00 PM (Sahasranamam)</option>
                  <option value="08:30 PM – 08:45 PM (Arthajamam)">08:30 PM – 08:45 PM (Arthajamam)</option>
                </select>
              </div>
            </div>

            {/* Sankalpam Prayer Notes */}
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-slate-300">
                Sankalpam Intent / Prayer Notes (Optional)
              </label>
              <textarea
                value={sankalpamNotes}
                onChange={(e) => setSankalpamNotes(e.target.value)}
                placeholder="Specific prayers for family health, birthday, wedding anniversary, education, peace..."
                rows={2}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Total Fee & Submit */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Dakshina / Seva Amount</span>
                <span className="text-xl font-serif font-bold text-amber-400">
                  ₹{selectedOffering?.priceINR || 0}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl font-serif font-bold text-xs bg-amber-500 hover:bg-amber-400 text-black transition-colors flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{submitting ? 'Reserving...' : 'Confirm Pooja Reservation'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
