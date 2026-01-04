
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const booking = location.state?.booking;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!booking) {
            navigate('/my-bookings');
            return;
        }
        initiatePayment();
    }, [booking]);

    const initiatePayment = async () => {
        try {
            setLoading(true);
            setError(null);

            // 1. Call custom Initiate Payment endpoint manually added by user
            // This creates the Payment record and returns a UUID
            const initResponse = await apiClient.post('/api/payments/initiate/', {
                booking_id: booking.id,
                payment_type: 'RENTAL_FEE'
            });

            const { payment_uuid } = initResponse.data;

            // 2. Call existing Create Checkout Session endpoint
            // This gets the Stripe Checkout URL using the UUID
            const sessionResponse = await apiClient.post(`/api/payments/create-session/${payment_uuid}/`);
            
            const { checkout_url } = sessionResponse.data;

            if (checkout_url) {
                // 3. Redirect to Stripe
                window.location.href = checkout_url;
            } else {
                throw new Error("No checkout URL received");
            }

        } catch (err) {
            console.error("Payment initiation failed:", err);
            setError(err.response?.data?.error || err.message || "Failed to start payment processing.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
                {loading ? (
                    <div className="py-8">
                        <div className="w-16 h-16 border-4 border-gray-100 border-t-gray-900 rounded-full animate-spin mx-auto mb-6"></div>
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Processing Payment</h2>
                        <p className="text-gray-400 text-sm mt-2">Securely redirecting to Stripe...</p>
                    </div>
                ) : error ? (
                    <div className="py-4">
                         <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fi fi-rr-cross text-2xl text-red-500"></i>
                        </div>
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Payment Error</h2>
                        <p className="text-red-500 font-bold text-sm mb-6">{error}</p>
                        <button 
                            onClick={() => navigate('/my-bookings')}
                            className="bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200"
                        >
                            Return to Bookings
                        </button>
                    </div>
                ) : (
                    <div>Initializing...</div>
                )}
            </div>
        </div>
    );
}
