import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Sparkles, Globe, Download } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-surface/80 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-brand" />
              <span className="text-xl font-bold text-ink">PageTurner</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/translate">
                <Button variant="sakura" size="sm">
                  Start Translating
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-ink mb-6 leading-tight">
              Turn Pages into
              <span className="bg-gradient-sakura bg-clip-text text-transparent"> English</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto">
              Professional light novel translation with AI precision. Upload your EPUB, DOCX, or PDF and get polished English translations in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/translate">
                <Button variant="sakura" size="lg" className="text-lg px-8 py-3">
                  Start Translation
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="text-lg px-8 py-3">
                See Examples
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-ink mb-4">
              Professional Translation, Simplified
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Built specifically for light novels with cultural nuance preservation and style consistency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardContent className="p-8 text-center">
                  <Sparkles className="h-12 w-12 text-brand mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-ink mb-3">
                    Style Presets
                  </h3>
                  <p className="text-muted">
                    Choose between literal, natural, or academic translation styles. Perfect for different novel genres and target audiences.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardContent className="p-8 text-center">
                  <Globe className="h-12 w-12 text-brand mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-ink mb-3">
                    Cultural Preservation
                  </h3>
                  <p className="text-muted">
                    Keep honorifics, preserve character names, and maintain cultural context. Optional glossary support for consistent terminology.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-8 text-center">
                  <Download className="h-12 w-12 text-brand mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-ink mb-3">
                    Multiple Formats
                  </h3>
                  <p className="text-muted">
                    Get your translated novel as both EPUB and PDF. Ready for e-readers, tablets, or printing with professional formatting.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-surface border border-border rounded-3xl p-12 shadow-sm"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              Ready to Translate Your Novel?
            </h2>
            <p className="text-xl text-muted mb-8">
              Upload your file, choose your settings, and get professional translations in minutes.
            </p>
            <Link to="/translate">
              <Button variant="sakura" size="lg" className="text-lg px-12 py-4">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-brand" />
              <span className="text-lg font-semibold text-ink">PageTurner</span>
            </div>
            <p className="text-sm text-muted">
              © 2024 PageTurner. Professional light novel translation service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}