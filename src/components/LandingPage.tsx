import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Sparkles, Globe, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-subtle border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground-dark">PageTurner</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/translate">
                <Button variant="default" size="sm" className="bg-gradient-button">
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
            <h1 className="text-5xl md:text-7xl font-bold text-foreground-dark mb-6 leading-tight">
              Turn Pages into
              <span className="bg-gradient-button bg-clip-text text-transparent"> English</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Professional light novel translation with AI precision. Upload your EPUB, DOCX, or PDF and get polished English translations in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/translate">
                <Button size="lg" className="bg-gradient-button animate-glow text-lg px-8 py-3">
                  Start Translation
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="glass-subtle text-lg px-8 py-3">
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
            <h2 className="text-4xl font-bold text-foreground-dark mb-4">
              Professional Translation, Simplified
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Built specifically for light novels with cultural nuance preservation and style consistency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="glass h-full">
                <CardContent className="p-8 text-center">
                  <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground-dark mb-3">
                    Style Presets
                  </h3>
                  <p className="text-slate-300">
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
              <Card className="glass h-full">
                <CardContent className="p-8 text-center">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground-dark mb-3">
                    Cultural Preservation
                  </h3>
                  <p className="text-slate-300">
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
              <Card className="glass h-full">
                <CardContent className="p-8 text-center">
                  <Download className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground-dark mb-3">
                    Multiple Formats
                  </h3>
                  <p className="text-slate-300">
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
            className="glass rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground-dark mb-4">
              Ready to Translate Your Novel?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Upload your file, choose your settings, and get professional translations in minutes.
            </p>
            <Link to="/translate">
              <Button size="lg" className="bg-gradient-button animate-glow text-lg px-12 py-4">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border glass-subtle">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground-dark">PageTurner</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2024 PageTurner. Professional light novel translation service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}