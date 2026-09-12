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
        <div className="flex items-start justify-between border-b pb-4" style={{ borderColor: activeTheme.colors.borderSubtle }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
              style={{
                backgroundColor: `${activeTheme.colors.sacredGold}20`,
                borderColor: activeTheme.colors.borderGold,
                color: activeTheme.colors.textGold
              }}
            >
              🪷
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Book Temple Pooja Offering
              </h3>
              <p className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                Arulmigu Madhusoodhana Perumal Sannadhi • Parakkai
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors cursor-pointer"
            style={{ color: activeTheme.colors.textSecondary }}
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
              <h4 className="text-xl font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                {confirmedBooking.offeringName}
              </h4>
              <p className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                Devotee: <strong style={{ color: activeTheme.colors.textPrimary }}>{confirmedBooking.devoteeName}</strong>
              </p>
            </div>

            {/* Reference Number Card */}
            <div
              className="p-4 rounded-2xl border text-center space-y-1"
              style={{
                backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                borderColor: activeTheme.colors.borderGold
              }}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: activeTheme.colors.textSecondary }}>
                Official Booking Reference Code
              </span>
              <div className="text-xl sm:text-2xl font-mono font-black tracking-wider" style={{ color: activeTheme.colors.sacredGold }}>
                {confirmedBooking.referenceNumber}
              </div>
              <p className="text-[11px] font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                Date: {confirmedBooking.preferredDate} • Slot: {confirmedBooking.preferredTimeSlot}
              </p>
              <div className="text-xs font-serif font-bold pt-1" style={{ color: activeTheme.colors.textPrimary }}>
                Amount: ₹{confirmedBooking.amountINR} (Payable at Temple Counter or Online Link)
              </div>
            </div>

            <div
              className="p-3.5 rounded-xl border text-left text-xs space-y-1 font-sans"
              style={{
                backgroundColor: activeTheme.colors.surfaceElevated,
                borderColor: activeTheme.colors.borderSubtle,
                color: activeTheme.colors.textSecondary
              }}
            >
              <strong className="block font-serif" style={{ color: activeTheme.colors.textGold }}>Prasadam Collection Guidelines:</strong>
              <p>
                Please present this reference number at the temple outer archana counter on the booked date. Consecrated Vibhuti, Kumkum, and sacred Tulsi Prasadam will be handed to your family after archana deeparadhana.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-serif font-bold transition-colors cursor-pointer shadow-xs"
              style={{
                backgroundColor: activeTheme.colors.sacredGold,
                color: '#000000'
              }}
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
              <label className="text-xs font-mono font-medium" style={{ color: activeTheme.colors.textSecondary }}>
                Select Pooja Offering
              </label>
              <select
                value={selectedOfferingId}
                onChange={(e) => setSelectedOfferingId(e.target.value)}
                className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                style={{
                  backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                  borderColor: activeTheme.colors.borderSubtle,
                  color: activeTheme.colors.textPrimary
                }}
              >
                {offerings.map((o: PoojaOfferingItem) => (
                  <option key={o.id} value={o.id}>
                    {o.name} — ₹{o.priceINR} ({o.category})
                  </option>
                ))}
              </select>
              {selectedOffering && (
                <p className="text-[11px] font-sans pt-0.5" style={{ color: activeTheme.colors.textSecondary }}>
                  {selectedOffering.description}
                </p>
              )}
            </div>

            {/* Devotee Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-medium" style={{ color: activeTheme.colors.textSecondary }}>
                  Devotee Name *
                </label>
                <input
                  type="text"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder="e.g. Vijay Kumar K."
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-medium" style={{ color: activeTheme.colors.textSecondary }}>
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  value={devoteePhone}
                  onChange={(e) => setDevoteePhone(e.target.value)}
                  placeholder="+91 94430 00000"
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
                  required
                />
              </div>
            </div>

            {/* Devotee Gothram & Nakshatram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-medium" style={{ color: activeTheme.colors.textSecondary }}>
                  Gothram (கோத்திரம்)
                </label>
                <input
                  type="text"
                  value={devoteeGothram}
                  onChange={(e) => setDevoteeGothram(e.target.value)}
                  placeholder="e.g. Kasyapa / Haritha / Bharadwaja"
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-medium" style={{ color: activeTheme.colors.textSecondary }}>
                  Nakshatram (நட்சத்திரம்)
                </label>
                <input
                  type="text"
                  value={devoteeNakshatram}
                  onChange={(e) => setDevoteeNakshatram(e.target.value)}
                  placeholder="e.g. Rohini / Thiruvonam / Hastham"
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
                />
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono font-medium" style={{ color: activeTheme.colors.textSecondary }}>
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-medium" style={{ color: activeTheme.colors.textSecondary }}>
                  Pooja Kaalam / Time Slot
                </label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle,
                    color: activeTheme.colors.textPrimary
                  }}
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
              <label className="text-xs font-mono font-medium" style={{ color: activeTheme.colors.textSecondary }}>
                Sankalpam Intent / Prayer Notes (Optional)
              </label>
              <textarea
                value={sankalpamNotes}
                onChange={(e) => setSankalpamNotes(e.target.value)}
                placeholder="Specific prayers for family health, birthday, wedding anniversary, education, peace..."
                rows={2}
                className="w-full p-2.5 rounded-xl border text-xs focus:outline-none"
                style={{
                  backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                  borderColor: activeTheme.colors.borderSubtle,
                  color: activeTheme.colors.textPrimary
                }}
              />
            </div>

            {/* Total Fee & Submit */}
            <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: activeTheme.colors.borderSubtle }}>
              <div>
                <span className="text-[10px] font-mono block" style={{ color: activeTheme.colors.textSecondary }}>Dakshina / Seva Amount</span>
                <span className="text-xl font-serif font-bold" style={{ color: activeTheme.colors.textGold }}>
                  ₹{selectedOffering?.priceINR || 0}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl font-serif font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                style={{
                  backgroundColor: activeTheme.colors.sacredGold,
                  color: '#000000'
                }}
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
