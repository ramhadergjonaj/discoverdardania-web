import { useState, useMemo, useEffect } from "react";
import { CheckCircle2, Calendar, Users, Car, UtensilsCrossed, Home, Mountain, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { cn } from "./lib/utils";

// Opsionet Statike
const destinations = [
    { id: 1, name: "Rugova Canyon", location: "Peja" },
    { id: 2, name: "Mirusha Waterfalls", location: "Klina" },
    { id: 3, name: "Sharri Mountains", location: "Prizren" },
    { id: 4, name: "Brezovica", location: "Shtërpcë" },
    { id: 5, name: "Gjakova Old Bazaar", location: "Gjakova" },
    { id: 6, name: "Germia Park", location: "Prishtina" }
];

const transportOptions = [
    { id: "none", label: "No transport", price: 0 },
    { id: "shared", label: "Shared minibus", price: 15 },
    { id: "private", label: "Private transfer", price: 45 },
];

const foodOptions = [
    { id: "none", label: "No meals", price: 0 },
    { id: "lunch", label: "Lunch included", price: 12 },
    { id: "full", label: "Full board", price: 30 },
];

const accommodationOptions = [
    { id: "none", label: "Day trip only", price: 0 },
    { id: "guesthouse", label: "Local guesthouse", price: 35 },
    { id: "hotel", label: "3-star hotel", price: 65 },
];

const BASE_PRICE = 25;

// Header Local (për konsistencë vizuale brenda React)
const Header = () => {
    const navLinks = [
        { id: "home", label: "Home", href: "../index.html" },
        { id: "destinations", label: "Destinations", href: "../destinations.html" },
        { id: "tours", label: "Tours", href: "../tours.html" },
        { id: "booking", label: "Book Now", href: "index.html" },
        { id: "contact", label: "Contact", href: "../contact.html" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-soft transition-all duration-300">
            <nav className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Mountain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif font-semibold text-lg leading-tight text-foreground">DiscoverDardania</span>
                        <span className="text-xs text-muted-foreground">Explore Kosovo</span>
                    </div>
                </div>
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <li key={link.id}>
                            <a href={link.href} className={cn("relative py-2 text-sm font-medium transition-colors text-foreground/70 hover:text-foreground", link.id === "booking" && "text-[#FFD700] hover:text-[#FFD700]")}>
                                {link.label}
                                {link.id === "booking" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD700]" />}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

// Footer Local
const Footer = () => (
    <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-sm opacity-60">© {new Date().getFullYear()} DiscoverDardania. All rights reserved.</p>
        </div>
    </footer>
);

const App = () => {
    const [formData, setFormData] = useState({ destination: "", date: "", people: 1, transport: "none", food: "none", accommodation: "none", name: "", email: "" });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const totalPrice = useMemo(() => {
        const trans = transportOptions.find(o => o.id === formData.transport)?.price || 0;
        const food = foodOptions.find(o => o.id === formData.food)?.price || 0;
        const accom = accommodationOptions.find(o => o.id === formData.accommodation)?.price || 0;
        return (BASE_PRICE + trans + food + accom) * formData.people;
    }, [formData]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nE = {};
        if (!formData.destination) nE.destination = "Required";
        if (!formData.date) nE.date = "Required";
        if (!formData.name) nE.name = "Required";
        if (!formData.email) nE.email = "Required";
        if (Object.keys(nE).length > 0) { setErrors(nE); return; }
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-foreground">
            <Header />
            <main className="flex-grow pt-24 bg-background pb-12">
                {isSubmitted ? (
                    <section className="py-20 animate-fade-up container mx-auto text-center max-w-2xl px-4">
                        <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
                        <h1 className="text-4xl font-serif mb-4">Booking Confirmed!</h1>
                        <p className="text-muted-foreground mb-8">Thank you, {formData.name}! We'll contact you soon regarding your trip to {formData.destination}.</p>
                        <div className="bg-card p-8 rounded-xl shadow-card text-left space-y-4">
                            <p className="flex justify-between border-b pb-2"><span>Travelers</span> <span>{formData.people}</span></p>
                            <p className="flex justify-between border-b pb-2"><span>Destination</span> <span>{formData.destination}</span></p>
                            <p className="flex justify-between border-b pb-2"><span>Total Price</span> <span className="font-bold">€{totalPrice}</span></p>
                        </div>
                        <button onClick={() => setIsSubmitted(false)} className="mt-8 btn-primary w-full">Book Another Trip</button>
                    </section>
                ) : (
                    <>
                        <section className="bg-primary py-16 text-center text-primary-foreground mb-12">
                            <h1 className="text-4xl md:text-5xl font-serif mb-4">Book Your Adventure</h1>
                            <p className="max-w-2xl mx-auto opacity-80 px-4">Experience the heartbeat of Kosovo's wild nature.</p>
                        </section>
                        <section className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
                            <div className="lg:col-span-2">
                                <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl shadow-card space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div><label className="form-label">Destination *</label><select value={formData.destination} onChange={e => handleChange("destination", e.target.value)} className={cn("form-input", errors.destination && "border-destructive")}><option value="">Select...</option>{destinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}</select></div>
                                        <div><label className="form-label">Date *</label><input type="date" value={formData.date} onChange={e => handleChange("date", e.target.value)} className={cn("form-input", errors.date && "border-destructive")} /></div>
                                    </div>
                                    <div><label className="form-label">People ({formData.people})</label><input type="range" min="1" max="20" value={formData.people} onChange={e => handleChange("people", parseInt(e.target.value))} className="w-full accent-primary" /></div>
                                    
                                    <div><label className="form-label">Transport</label><div className="grid grid-cols-1 md:grid-cols-3 gap-3">{transportOptions.map(o => <div key={o.id} onClick={() => handleChange("transport", o.id)} className={cn("p-4 border rounded-lg cursor-pointer", formData.transport === o.id ? "border-primary bg-primary/5" : "")}><p className="font-medium">{o.label}</p><p className="text-xs text-accent font-bold">+{o.price}€</p></div>)}</div></div>

                                    <div><label className="form-label">Contact Info</label><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input type="text" placeholder="Name" value={formData.name} onChange={e => handleChange("name", e.target.value)} className={cn("form-input", errors.name && "border-destructive")} /><input type="email" placeholder="Email" value={formData.email} onChange={e => handleChange("email", e.target.value)} className={cn("form-input", errors.email && "border-destructive")} /></div></div>

                                    <button type="submit" className="w-full btn-accent py-4 text-lg shadow-elevated hover:scale-[1.02] active:scale-[0.98]">Confirm Booking</button>
                                </form>
                            </div>
                            <div className="lg:col-span-1">
                                <div className="bg-card p-6 rounded-xl shadow-card sticky top-24 space-y-4">
                                    <h3 className="text-xl font-serif">Price Summary</h3>
                                    <div className="flex justify-between items-center text-lg"><span className="font-bold">Total</span><span className="price-display">€{totalPrice}</span></div>
                                    <p className="text-xs text-center text-muted-foreground mt-4 italic">No upfront payment needed.</p>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default App;