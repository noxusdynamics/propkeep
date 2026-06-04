"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, HeartPulse, Home as HomeIcon, CheckCircle2, Check, Phone, MessageCircle, Building2, Scale, Clock, Star, Users, TrendingUp, Eye, Newspaper, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return <div ref={ref} className="text-4xl md:text-5xl font-black text-teal-600 font-number">{count}{suffix}</div>;
}

export default function Home() {
  const [desktopEmblaRef] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
    Fade()
  ]);

  const [mobileEmblaRef] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
    Fade()
  ]);

  const carouselImages = [
    "/images/hero-deep-cleaning.png",
    "/images/hero-senior-care.png",
    "/images/hero-property-mgmt.png",
    "/images/hero-elderly-comfort.png",
  ];

  return (
    <div className="flex flex-col min-h-screen z-10 relative bg-white overflow-hidden text-stone-800">

      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-[90vh] lg:h-screen flex items-center bg-gradient-to-br from-stone-50 via-white to-teal-50/30 overflow-hidden">
        {/* Right Slideshow - positioned absolutely to fill right half to viewport edge */}
        <div className="hidden lg:block absolute right-0 top-0 w-[58%] h-full z-10 overflow-hidden">
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-stone-50 via-stone-50/60 to-transparent w-[35%] pointer-events-none"></div>
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-stone-50/80 via-transparent to-transparent h-[15%] bottom-0 top-auto pointer-events-none"></div>
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-stone-50/40 via-transparent to-transparent h-[10%] pointer-events-none"></div>
          
          <div className="overflow-hidden h-full w-full" ref={desktopEmblaRef}>
            <div className="flex h-full touch-pan-y">
              {carouselImages.map((src, index) => (
                <div className="flex-[0_0_100%] min-w-0 h-full relative" key={index}>
                  <Image
                    src={src}
                    alt="Propkeep Services"
                    fill
                    className="object-cover object-center"
                    sizes="58vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-teal-900/5 mix-blend-multiply"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 xl:px-12 flex flex-col lg:flex-row items-center gap-8 h-full relative z-20">
          {/* Left Content */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center pt-24 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="section-label mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>Integrated Solutions for NRIs</span>
              </div>
              
              <div className="mb-6 space-y-3">
                <h1 className="text-4xl md:text-5xl xl:text-[3.5rem] font-serif font-black text-stone-900 leading-[1.15] mb-6">
                  Our <span className="text-teal-600">Solutions</span>
                </h1>
                <ul className="text-xl md:text-2xl font-bold text-stone-800 space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-amber-500 font-black">1.</span> Property Management Services
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-amber-500 font-black">2.</span> Property Maintenance Services
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-amber-500 font-black">3.</span> Property Legal Services
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-amber-500 font-black">4.</span> Aged Care Services
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-amber-500 font-black">5.</span> Tenant Sourcing Services
                  </li>
                </ul>
              </div>
              
              <p className="text-lg text-stone-600 mb-8 max-w-xl leading-relaxed">
                Propkeep Kerala is an integrated solution to safeguard your most valuable assets: your parents and your property. We serve as a point of contact for NRIs, offering comprehensive senior care, property management, and legal protection to ensure total peace of mind.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold rounded-lg transition-all shadow-lg shadow-teal-600/20 text-center"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Mobile Slideshow */}
          <div className="w-full h-[40vh] sm:h-[50vh] relative z-10 rounded-2xl overflow-hidden lg:hidden mt-8 mb-12 shadow-xl">
            <div className="overflow-hidden h-full" ref={mobileEmblaRef}>
              <div className="flex h-full touch-pan-y">
                {carouselImages.map((src, index) => (
                  <div className="flex-[0_0_100%] min-w-0 h-full relative" key={index}>
                    <Image
                      src={src}
                      alt="Propkeep Services"
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-teal-900/5 mix-blend-multiply"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS COUNTER BAR ============ */}
      <section className="py-16 bg-white border-y border-stone-100">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { target: 98, suffix: "%", label: "Service Reliability" },
              { target: 95, suffix: "%", label: "Property Management Quality" },
              { target: 97, suffix: "%", label: "Care & Legal Efficiency" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                <p className="text-stone-500 font-semibold uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT US SECTION ============ */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="section-label mx-auto w-fit mb-4">About Us</div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-stone-900 mb-6">
              A Synchronized System for Your Home, Health & Heritage
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              Living abroad shouldn&apos;t mean worrying about home. Propkeep Kerala was created for the NRI community to provide a single, reliable solution. We uniquely merge vital services: compassionate senior care, diligent property management, and expert legal protection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-5">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Expert Property Oversight</h3>
              <p className="text-stone-600 leading-relaxed">
                Our expertise ensures your assets and property are protected with professional management, regular inspections, and comprehensive maintenance support.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
                <HeartPulse className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Compassionate Senior Care</h3>
              <p className="text-stone-600 leading-relaxed">
                We provide integrated care with verified professionals, ensuring the comfort, dignity, and well-being of your loved ones with regular health check-ups and companionship.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-16">
            <Link href="/about" className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all">
              More About Us
            </Link>
            <a href="tel:+919495959569" className="text-teal-600 font-bold text-lg hover:text-teal-700 transition-colors flex items-center gap-2">
              <Phone className="w-5 h-5" /> +91 94959 59569
            </a>
          </div>

          {/* Legacy Trust Block */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">A Legacy You Can Trust</h3>
            <p className="text-teal-100 text-lg">
              We bring professional-grade property care and comprehensive senior wellness services to your home in Kerala, trusted by NRI families worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <div className="text-center mb-6">
            <div className="section-label mx-auto w-fit mb-4">Services</div>
          </div>
          <p className="text-stone-600 text-lg text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Propkeep Kerala offers a trusted, synchronized system of property, legal, and senior care management. Designed to care for your loved ones and your home with warmth, responsibility, and dignity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <HomeIcon className="w-8 h-8" />,
                title: "Complete Property Management",
                desc: "Utility payments, periodic inspections, maintenance supervision, and tenant management — keeping your property in perfect condition.",
                img: "/images/service-property-care.png",
              },
              {
                icon: <HeartPulse className="w-8 h-8" />,
                title: "Senior Care Support and Wellness",
                desc: "Verified caregivers, medication management, routine health checkups, and mental wellness support for your elderly loved ones.",
                img: "/images/service-senior-wellness.png",
              },
              {
                icon: <Scale className="w-8 h-8" />,
                title: "Legal Assistance for Family Security",
                desc: "Property documentation, legal disputes, family asset protection, and comprehensive legal advisory services.",
                img: "/images/service-legal-docs.png",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="service-card bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden group"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image src={service.img} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4 -mt-12 relative z-10 shadow-lg border-2 border-white">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{service.title}</h3>
                  <p className="text-stone-600 mb-4">{service.desc}</p>
                  <Link href="/services" className="text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-1 text-sm">
                    Read More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="text-teal-600 font-bold hover:text-teal-700 inline-flex items-center gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="section-label mb-4">Why Choose Us</div>
              <p className="text-stone-600 text-lg mb-10 leading-relaxed">
                We are the single, trusted partner NRIs need. We blend compassionate senior care with expert property management and legal protection, offering complete peace of mind for your family and assets in Kerala.
              </p>
              <a href="tel:+919495959569" className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold rounded-lg shadow-lg inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> Contact Us
              </a>
            </div>
            <div className="lg:w-1/2 space-y-8">
              {[
                { icon: <Star className="w-6 h-6" />, title: "Proven Care Legacy", desc: "We provide expert care services, from home wellness to assisted living, backed by years of experience." },
                { icon: <Scale className="w-6 h-6" />, title: "Property & Legal Expertise", desc: "Expert property law knowledge, documentation management, and senior legal protection for your assets." },
                { icon: <Eye className="w-6 h-6" />, title: "Total Property Management", desc: "Daily supervision, maintenance, tenant management, and regular video reports to protect your property value." },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="feature-block pl-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                      <p className="text-stone-600">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PACKAGES / PROJECTS ============ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <div className="text-center mb-16">
            <div className="section-label mx-auto w-fit mb-4">Our Packages</div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-stone-900 mb-4">Tailored Plans for Every Need</h2>
            <p className="text-stone-600 text-lg max-w-3xl mx-auto">
              Explore our specialized plans designed to give NRIs peace of mind. Whether you need dedicated eldercare, daily property supervision, or 24/7 nursing, we have a tailored plan.
            </p>
          </div>

          {/* Senior Care Packages */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Senior Care Packages</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Caring for Senior's Homes", price: "Custom", color: "bg-teal-100 text-teal-600", desc: "Home maintenance, cleaning & daily upkeep for elderly residents" },
                { title: "Supporting Senior's Health", price: "₹29,000/mo", color: "bg-amber-100 text-amber-600", desc: "24/7 caretaker, medication management & health checkups" },
                { title: "Legal Help for Seniors", price: "Custom", color: "bg-cyan-100 text-cyan-600", desc: "Property documentation, will drafting & legal advisory" },
                { title: "24/7 Senior Care Support", price: "₹35,000/mo", color: "bg-emerald-100 text-emerald-600", desc: "Round-the-clock nursing, post-surgery & palliative care" },
              ].map((pkg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="package-card bg-white rounded-2xl p-6 text-center group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-full ${pkg.color} flex items-center justify-center mx-auto mb-5`}>
                    <HeartPulse className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{pkg.title}</h3>
                  <p className="text-stone-500 text-sm mb-3 leading-relaxed">{pkg.desc}</p>
                  <p className="text-teal-600 font-bold text-lg mb-4">{pkg.price}</p>
                  <Link href="/packages" className="text-sm text-stone-500 group-hover:text-teal-600 font-semibold transition-colors flex items-center justify-center gap-1">
                    View Details <ChevronRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Property Management Packages */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Property Management — Yearly Subscriptions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Essential",
                  price: "₹18,000",
                  period: "/year",
                  bestFor: "Locked Plots / Apartments",
                  visits: "1 Visit / Month",
                  popular: false,
                  features: ["50-Point Health Audit", "Bill & Tax Payments", "Monsoon Prep Check", "Interior Airing Out", "Yard/Garden Cleanup (Quarterly)"],
                  color: "border-stone-200",
                  bg: "bg-white",
                },
                {
                  title: "Premium",
                  price: "₹32,000",
                  period: "/year",
                  bestFor: "Independent Villas",
                  visits: "2 Visits / Month",
                  popular: true,
                  features: ["50-Point Health Audit", "Bill & Tax Payments", "Monsoon Prep Check", "Interior Airing Out", "Cobweb Cleanup (Quarterly)", "Dust Cleanup / Dry Sweep (Quarterly)", "Yard/Garden Cleanup (Monthly)", "Pest Control Oversight", "Pre-Arrival Cleaning (1/Year)", "Key Holding Service"],
                  color: "border-amber-400 ring-2 ring-amber-400/20",
                  bg: "bg-gradient-to-b from-amber-50/50 to-white",
                },
                {
                  title: "Concierge",
                  price: "₹55,000",
                  period: "/year",
                  bestFor: "Luxury Estates",
                  visits: "4 Visits / Month",
                  popular: false,
                  features: ["50-Point Health Audit", "Bill & Tax Payments", "Monsoon Prep Check", "Interior Airing Out", "Cobweb Cleanup (Monthly)", "Dust Cleanup / Dry Sweep (Monthly)", "Yard/Garden Cleanup (Monthly)", "Pest Control Oversight", "Pre-Arrival Cleaning (Unlimited)", "Key Holding Service", "Grocery Stocking"],
                  color: "border-teal-300",
                  bg: "bg-gradient-to-b from-teal-50/30 to-white",
                },
              ].map((pkg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl p-6 border-2 ${pkg.color} ${pkg.bg} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">Most Popular</div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-stone-900 uppercase tracking-wide mb-1">{pkg.title}</h3>
                    <p className="text-stone-500 text-sm">Best For: {pkg.bestFor}</p>
                  </div>
                  <div className="text-center mb-6 pb-6 border-b border-stone-100">
                    <span className="text-4xl font-black text-stone-900">{pkg.price}</span>
                    <span className="text-stone-500 text-lg"> {pkg.period}</span>
                    <p className="text-teal-600 font-semibold text-sm mt-2">{pkg.visits}</p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-grow">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-600">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`block text-center py-3 rounded-xl font-bold transition-all ${pkg.popular ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg' : 'bg-stone-100 hover:bg-teal-600 hover:text-white text-stone-700'}`}>
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>
            <p className="text-stone-400 text-sm text-center mt-6">* Fees are subject to property size (sq. ft.) and location.</p>
          </div>

          <div className="text-center mt-10">
            <Link href="/packages" className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold rounded-lg shadow-lg inline-block">
              View All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* ============ HERITAGE SECTION ============ */}
      <section className="py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%2030h60M30%200v60%22%20stroke%3D%22%23ffffff%22%20stroke-opacity%3D%220.03%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="container mx-auto px-4 md:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="section-label mb-4 border-teal-500/30 bg-teal-500/10 text-teal-400">Our Heritage</div>
              <h2 className="text-3xl md:text-5xl font-serif font-black mb-6">
                A Journey Marked by Property Excellence & Trust
              </h2>
              <p className="text-stone-300 text-lg leading-relaxed mb-8">
                Propkeep Kerala is not just a service; it is built on a solid foundation of professional expertise and dedicated care. We bring years of disciplined property management and senior wellness experience to your doorstep in Kerala.
              </p>
              <Link href="/about" className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-teal-400 text-stone-900 font-bold rounded-lg shadow-lg inline-block hover:shadow-xl transition-all">
                Learn More
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Heritage"
                width={800} height={500}
                className="rounded-2xl shadow-2xl object-cover h-[400px] w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-teal-600 text-white p-6 rounded-xl shadow-xl">
                <p className="text-3xl font-black">100+</p>
                <p className="text-sm font-semibold text-teal-100">NRI Families Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BLOG & NEWS ============ */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4 md:px-8 xl:px-12">
          <div className="text-center mb-16">
            <div className="section-label mx-auto w-fit mb-4">Blog & News</div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-stone-900 mb-4">Expert Tips & Updates</h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              Our blog shares expert advice, industry trends, and actionable strategies for NRI property management and senior care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Essential Property Maintenance Checklist for NRIs", date: "May 2025", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { title: "How to Ensure Quality Senior Care from Abroad", date: "April 2025", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { title: "Legal Tips for Kerala Property Owners Living Abroad", date: "March 2025", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-teal-600 text-sm font-semibold mb-2">{post.date}</p>
                  <h3 className="text-lg font-bold text-stone-900 mb-3 group-hover:text-teal-600 transition-colors">{post.title}</h3>
                  <span className="text-teal-600 font-semibold text-sm flex items-center gap-1">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHATSAPP CTA STRIP ============ */}
      <section className="py-12 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="container mx-auto px-4 md:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-1">Need Quick Assistance?</h3>
            <p className="text-teal-100">Get quick responses about senior care or property management directly from our experts on WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/919495959569"
            className="whatsapp-cta text-white font-bold px-8 py-4 rounded-full flex items-center gap-3 shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>
      
    </div>
  );
}
