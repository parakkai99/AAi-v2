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
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  MapPin,
  Phone,
  User
} from 'lucide-react';
import { ParakkaiThemeDefinition } from '../../contracts/theme';
import { parakkaiService } from '../../services/parakkaiService';
import { CartItem, HypermarketOrderRecord } from '../../contracts/marketplace';

interface CartDrawerProps {
  activeTheme: ParakkaiThemeDefinition;
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  activeTheme,
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const currentUser = parakkaiService.getCurrentUser();
  const [customerName, setCustomerName] = useState(currentUser.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState('Parakkai Temple Counter Pickup');

  const [confirmedOrder, setConfirmedOrder] = useState<HypermarketOrderRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !customerName.trim() || !customerPhone.trim()) return;

    setSubmitting(true);
    try {
      const order = parakkaiService.createOrder(
        cart,
        customerName,
        customerPhone,
        deliveryAddress
      );
      setConfirmedOrder(order);
      onClearCart();
    } catch {
      // Error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full border-l flex flex-col justify-between shadow-2xl animate-slideLeft"
        style={{
          backgroundColor: activeTheme.colors.surfaceElevated,
          borderColor: activeTheme.colors.borderGold,
          color: activeTheme.colors.textPrimary
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: activeTheme.colors.borderSubtle }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center border"
              style={{
                backgroundColor: `${activeTheme.colors.sacredGold}20`,
                borderColor: activeTheme.colors.borderGold,
                color: activeTheme.colors.textGold
              }}
            >
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                Parakkai Hypermarket Cart
              </h3>
              <p className="text-[11px] font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                {cart.length} unique items
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg cursor-pointer"
            style={{ color: activeTheme.colors.textSecondary }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {confirmedOrder ? (
            <div className="space-y-4 text-center py-8 animate-fadeIn">
              <div className="w-16 h-16 rounded-full mx-auto bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-3xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase text-emerald-400 font-bold">
                  Order Placed Successfully
                </div>
                <div className="text-xl font-mono font-black" style={{ color: activeTheme.colors.sacredGold }}>
                  {confirmedOrder.orderId}
                </div>
                <p className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                  Total Amount: <strong style={{ color: activeTheme.colors.textPrimary }}>₹{confirmedOrder.totalAmountINR}</strong>
                </p>
              </div>

              <div
                className="p-3.5 rounded-xl border text-left text-xs space-y-1 font-sans"
                style={{
                  backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                  borderColor: activeTheme.colors.borderSubtle,
                  color: activeTheme.colors.textSecondary
                }}
              >
                <strong className="block font-serif" style={{ color: activeTheme.colors.textGold }}>Pickup / Delivery Instructions:</strong>
                <p>
                  Your order has been notified to the temple trust vendor desk. Please present order ID <strong style={{ color: activeTheme.colors.textPrimary }}>{confirmedOrder.orderId}</strong> at the outer prasadam counter.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-serif font-bold cursor-pointer shadow-xs"
                style={{
                  backgroundColor: activeTheme.colors.sacredGold,
                  color: '#000000'
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl border"
                style={{
                  backgroundColor: `${activeTheme.colors.sacredGold}15`,
                  borderColor: activeTheme.colors.borderSubtle,
                  color: activeTheme.colors.textSecondary
                }}
              >
                🛍️
              </div>
              <p className="text-sm font-serif" style={{ color: activeTheme.colors.textPrimary }}>Your cart is empty.</p>
              <p className="text-xs font-sans" style={{ color: activeTheme.colors.textSecondary }}>
                Explore consecrated temple prasadam kits, hand-polished brass lamps, and village produce!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item: CartItem) => (
                <div
                  key={item.product.productId}
                  className="p-3 rounded-xl border flex items-center gap-3"
                  style={{
                    backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                    borderColor: activeTheme.colors.borderSubtle
                  }}
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    style={{ backgroundColor: activeTheme.colors.surfaceElevated }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-serif font-bold truncate" style={{ color: activeTheme.colors.textPrimary }}>
                      {item.product.name}
                    </h4>
                    <div className="text-xs font-mono font-bold mt-0.5" style={{ color: activeTheme.colors.sacredGold }}>
                      ₹{item.product.priceINR}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="flex items-center border rounded-lg"
                        style={{
                          borderColor: activeTheme.colors.borderSubtle,
                          backgroundColor: activeTheme.colors.surfaceElevated
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.productId, -1)}
                          className="p-1 cursor-pointer"
                          style={{ color: activeTheme.colors.textSecondary }}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs font-bold" style={{ color: activeTheme.colors.textPrimary }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.productId, 1)}
                          className="p-1 cursor-pointer"
                          style={{ color: activeTheme.colors.textSecondary }}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.productId)}
                        className="p-1 cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ color: activeTheme.colors.textSecondary }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="pt-4 border-t space-y-3" style={{ borderColor: activeTheme.colors.borderSubtle }}>
                <div className="space-y-1">
                  <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    placeholder="Recipient name"
                    className="w-full p-2 rounded-lg border text-xs focus:outline-none"
                    style={{
                      backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                      borderColor: activeTheme.colors.borderSubtle,
                      color: activeTheme.colors.textPrimary
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Phone *</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    placeholder="+91 94430 00000"
                    className="w-full p-2 rounded-lg border text-xs focus:outline-none"
                    style={{
                      backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                      borderColor: activeTheme.colors.borderSubtle,
                      color: activeTheme.colors.textPrimary
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Pickup / Address</label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-2 rounded-lg border text-xs focus:outline-none"
                    style={{
                      backgroundColor: activeTheme.colors.surfaceCard || activeTheme.colors.surfaceCanvas,
                      borderColor: activeTheme.colors.borderSubtle,
                      color: activeTheme.colors.textPrimary
                    }}
                  />
                </div>

                <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: activeTheme.colors.borderSubtle }}>
                  <span className="text-xs font-mono" style={{ color: activeTheme.colors.textSecondary }}>Total Payable:</span>
                  <span className="text-lg font-mono font-black" style={{ color: activeTheme.colors.sacredGold }}>
                    ₹{totalAmount}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-serif font-bold transition-colors cursor-pointer shadow-lg disabled:opacity-50"
                  style={{
                    backgroundColor: activeTheme.colors.sacredGold,
                    color: '#000000'
                  }}
                >
                  {submitting ? 'Placing Order...' : 'Confirm Order (Pay at Counter)'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
