"use client";

import { useState } from "react";
import { Bell, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotifyMeButton() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setEmail("");
    }, 2000);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-3 font-body font-semibold text-lg px-8 py-5 bg-accent hover:bg-accent/90 dark:bg-accent dark:hover:bg-accent/90 text-white rounded-sm transition-all shadow-lg hover:shadow-xl"
      >
        <Bell className="w-5 h-5" />
        <span>Me notifier au lancement</span>
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-white p-8 rounded-lg shadow-2xl z-50"
            >
              {submitted ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary dark:text-primary" />
                  <h3 className="font-display text-2xl font-bold text-dark dark:text-dark mb-2">
                    Inscrit!
                  </h3>
                  <p className="font-body text-dark/70 dark:text-dark/70">
                    Nous vous préviendrons dès le lancement
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-dark dark:text-dark mb-2">
                        Soyez le premier informé
                      </h3>
                      <p className="font-body text-sm text-dark/70 dark:text-dark/70">
                        Recevez un email dès le lancement
                      </p>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-dark/40 dark:text-dark/40 hover:text-dark dark:hover:text-dark text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-body text-sm font-semibold text-dark dark:text-dark mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-dark/20 dark:border-dark/30 rounded-lg focus:outline-none focus:border-primary dark:focus:border-primary transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 font-body font-semibold px-6 py-3 bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-white rounded-lg transition-all"
                    >
                      <Bell className="w-4 h-4" />
                      M'avertir
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
