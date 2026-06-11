export type Language = 'en' | 'el';

export type ServiceText = {
  name: string;
  description: string;
  price: string;
};

export type ScheduleText = {
  day: string;
  hours: string;
  closed?: boolean;
};

export type Translation = {
  languageLabel: string;
  switchLabel: string;
  nav: {
    home: string;
    about: string;
    gallery: string;
    services: string;
    schedule: string;
    book: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    logoAlt: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    alt: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: ServiceText[];
  };
  schedule: {
    eyebrow: string;
    title: string;
    days: ScheduleText[];
  };
  booking: {
    eyebrow: string;
    title: string;
    intro: string;
    name: string;
    phone: string;
    service: string;
    servicePlaceholder: string;
    date: string;
    time: string;
    message: string;
    submit: string;
    note: string;
    error: string;
    success: string;
    calendarTitle: string;
    previousMonth: string;
    nextMonth: string;
    available: string;
    unavailable: string;
    today: string;
    selectedDate: string;
    selectedTime: string;
    chooseDateFirst: string;
    weekdays: string[];
    months: string[];
    whatsappMessage: (values: {
      name: string;
      phone: string;
      service: string;
      date: string;
      time: string;
      message: string;
    }) => string;
  };
  area: {
    eyebrow: string;
    title: string;
    text: string;
    mapTitle: string;
    mapLocation: string;
    openMap: string;
    getDirections: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    links: {
      call: string;
      viber: string;
      whatsapp: string;
      instagram: string;
    };
    phone: string;
    location: string;
    locationValue: string;
  };
  footer: {
    rights: string;
    tagline: string;
  };
};

export const translations: Record<Language, Translation> = {
  en: {
    languageLabel: 'EL',
    switchLabel: 'Translate to Greek',
    nav: {
      home: 'Home',
      about: 'About',
      gallery: 'Gallery',
      services: 'Services',
      schedule: 'Schedule',
      book: 'Book',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Mobile car wash in Larnaca',
      title: 'Shine Argyrou CarWash',
      subtitle: 'Premium Mobile Detailing & Car Wash in Larnaca',
      cta: 'Book an Appointment',
      logoAlt: 'Shine Argyrou CarWash logo',
    },
    about: {
      eyebrow: 'Detailing delivered',
      title: 'About Us',
      paragraphs: [
        "Welcome to Shine Argyrou CarWash, Larnaca's premier mobile car detailing service. We bring the ultimate shine directly to you. Our dedicated team uses top-tier products and modern techniques to ensure your vehicle looks as pristine as the day it left the showroom.",
        "With a passion for perfection and an eye for detail, we specialize in everything from thorough exterior washes to deep interior detailing. Sit back, relax, and let us restore your car's true neon shine.",
      ],
    },
    gallery: {
      eyebrow: 'Results',
      title: 'Our Work',
      alt: 'Shine Argyrou Detailing Work',
    },
    services: {
      eyebrow: 'Packages',
      title: 'Our Services',
      items: [
        {
          name: 'Basic Wash',
          description:
            'Exterior & Interior hand wash, wheel cleaning, tire dressing, and streak-free window cleaning.',
          price: 'From €20',
        },
        {
          name: 'Exterior Wash',
          description:
            'Active foam pre-wash, premium shampoo for zero scratches, outerside of windows clean, deep rims cleaning, and high quality tyre shine.',
          price: 'From €10',
        },
        {
          name: 'Interior Cleaning',
          description:
            'Intensive interior focus. Stain removal, steam cleaning, odor neutralization, and UV protection plastic coating.',
          price: 'From €10',
        },
        {
          name: 'Revive Your Seats',
          description:
            'Deep cleaning for leather and fabric using soft brushes and safe protective tools. Eliminates deep dirt, stains, and bad odors without damage - leaving your interior fresh, clean, and protected like new.',
          price: 'From €80',
        },
      ],
    },
    schedule: {
      eyebrow: 'Availability',
      title: 'Working Hours',
      days: [
        { day: 'Monday', hours: 'Closed', closed: true },
        { day: 'Tuesday', hours: '2:15 PM - 8:00 PM' },
        { day: 'Wednesday', hours: '2:15 PM - 8:00 PM' },
        { day: 'Thursday', hours: '2:15 PM - 8:00 PM' },
        { day: 'Friday', hours: '2:15 PM - 8:00 PM' },
        { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
        { day: 'Sunday', hours: 'Closed', closed: true },
      ],
    },
    booking: {
      eyebrow: 'Appointments',
      title: 'Request an Appointment',
      intro: 'Select your preferred date and time. We will contact you to confirm.',
      name: 'Full Name',
      phone: 'Phone Number',
      service: 'Service',
      servicePlaceholder: 'Select a service',
      date: 'Preferred Date',
      time: 'Preferred Time',
      message: 'Message / Notes',
      submit: 'Submit Request',
      note: '* Note: ALL PACKAGES ARE NECESSARILY WEEKLY, EVERY 2 WEEKS AND MONTHLY',
      error: 'Please fill in your name, phone number, service, date, and time.',
      success: 'Your request is ready. WhatsApp will open so you can send it.',
      calendarTitle: 'Appointment Calendar',
      previousMonth: 'Previous month',
      nextMonth: 'Next month',
      available: 'Available',
      unavailable: 'Unavailable',
      today: 'Today',
      selectedDate: 'Selected date',
      selectedTime: 'Selected time',
      chooseDateFirst: 'Choose an available date to see appointment times.',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      whatsappMessage: ({ name, phone, service, date, time, message }) => `Hello Shine Argyrou CarWash, I would like to request an appointment.

Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred Date: ${date}
Preferred Time: ${time}
Notes: ${message || 'None'}`,
    },
    area: {
      eyebrow: 'Where we work',
      title: 'Our Service Area',
      text: 'We proudly serve Larnaca and the surrounding areas in Cyprus.',
      mapTitle: 'Larnaca',
      mapLocation: 'Larnaca, Cyprus',
      openMap: 'Open in Google Maps',
      getDirections: 'Get directions',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Get In Touch',
      links: {
        call: 'Call Us',
        viber: 'Viber',
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
      },
      phone: 'Phone',
      location: 'Location',
      locationValue: 'Larnaca, Cyprus',
    },
    footer: {
      rights: 'Copyright 2026 Shine Argyrou CarWash. All rights reserved.',
      tagline: 'Premium Mobile Detailing in Larnaca.',
    },
  },
  el: {
    languageLabel: 'EN',
    switchLabel: 'Translate to English',
    nav: {
      home: 'Αρχική',
      about: 'Σχετικά',
      gallery: 'Gallery',
      services: 'Υπηρεσίες',
      schedule: 'Ωράριο',
      book: 'Κράτηση',
      contact: 'Επικοινωνία',
    },
    hero: {
      eyebrow: 'Mobile car wash στη Λάρνακα',
      title: 'Shine Argyrou CarWash',
      subtitle: 'Premium Mobile Detailing & Car Wash στη Λάρνακα',
      cta: 'Κλείστε Ραντεβού',
      logoAlt: 'Λογότυπο Shine Argyrou CarWash',
    },
    about: {
      eyebrow: 'Detailing στον χώρο σας',
      title: 'Σχετικά με εμάς',
      paragraphs: [
        'Καλώς ήρθατε στο Shine Argyrou CarWash, την premium υπηρεσία mobile car detailing στη Λάρνακα. Φέρνουμε την απόλυτη λάμψη απευθείας σε εσάς. Η ομάδα μας χρησιμοποιεί κορυφαία προϊόντα και σύγχρονες τεχνικές ώστε το όχημά σας να δείχνει τόσο καθαρό όσο την ημέρα που βγήκε από την έκθεση.',
        'Με πάθος για την τελειότητα και προσοχή στη λεπτομέρεια, αναλαμβάνουμε από ολοκληρωμένα εξωτερικά πλυσίματα μέχρι βαθύ καθαρισμό εσωτερικού. Χαλαρώστε και αφήστε μας να επαναφέρουμε την πραγματική neon λάμψη του αυτοκινήτου σας.',
      ],
    },
    gallery: {
      eyebrow: 'Αποτελέσματα',
      title: 'Η δουλειά μας',
      alt: 'Δουλειά detailing Shine Argyrou',
    },
    services: {
      eyebrow: 'Πακέτα',
      title: 'Οι Υπηρεσίες μας',
      items: [
        {
          name: 'Basic Wash',
          description:
            'Πλύσιμο στο χέρι εξωτερικού & εσωτερικού, καθαρισμός τροχών, γυάλισμα ελαστικών και καθαρισμός τζαμιών χωρίς σημάδια.',
          price: 'Από €20',
        },
        {
          name: 'Exterior Wash',
          description:
            'Προπλύσιμο με ενεργό αφρό, premium σαμπουάν για μηδενικές γρατζουνιές, καθαρισμός εξωτερικής πλευράς τζαμιών, βαθύς καθαρισμός ζαντών και υψηλής ποιότητας γυάλισμα ελαστικών.',
          price: 'Από €10',
        },
        {
          name: 'Interior Cleaning',
          description:
            'Εντατικός καθαρισμός εσωτερικού. Αφαίρεση λεκέδων, καθαρισμός με ατμό, εξουδετέρωση οσμών και προστατευτική επίστρωση UV για τα πλαστικά.',
          price: 'Από €10',
        },
        {
          name: 'Revive Your Seats',
          description:
            'Βαθύς καθαρισμός για δερμάτινα και υφασμάτινα καθίσματα με μαλακές βούρτσες και ασφαλή προστατευτικά εργαλεία. Αφαιρεί βαθιά βρωμιά, λεκέδες και δυσάρεστες οσμές χωρίς φθορά - αφήνοντας το εσωτερικό φρέσκο, καθαρό και προστατευμένο σαν καινούριο.',
          price: 'Από €80',
        },
      ],
    },
    schedule: {
      eyebrow: 'Διαθεσιμότητα',
      title: 'Ωράριο Λειτουργίας',
      days: [
        { day: 'Δευτέρα', hours: 'Κλειστά', closed: true },
        { day: 'Τρίτη', hours: '2:15 μ.μ. - 8:00 μ.μ.' },
        { day: 'Τετάρτη', hours: '2:15 μ.μ. - 8:00 μ.μ.' },
        { day: 'Πέμπτη', hours: '2:15 μ.μ. - 8:00 μ.μ.' },
        { day: 'Παρασκευή', hours: '2:15 μ.μ. - 8:00 μ.μ.' },
        { day: 'Σάββατο', hours: '9:00 π.μ. - 4:00 μ.μ.' },
        { day: 'Κυριακή', hours: 'Κλειστά', closed: true },
      ],
    },
    booking: {
      eyebrow: 'Ραντεβού',
      title: 'Αίτημα Ραντεβού',
      intro: 'Επιλέξτε την ημερομηνία και ώρα που προτιμάτε. Θα επικοινωνήσουμε μαζί σας για επιβεβαίωση.',
      name: 'Ονοματεπώνυμο',
      phone: 'Τηλέφωνο',
      service: 'Υπηρεσία',
      servicePlaceholder: 'Επιλέξτε υπηρεσία',
      date: 'Προτιμώμενη Ημερομηνία',
      time: 'Προτιμώμενη Ώρα',
      message: 'Μήνυμα / Σημειώσεις',
      submit: 'Υποβολή Αιτήματος',
      note: '* Σημείωση: ΟΛΑ ΤΑ ΠΑΚΕΤΑ ΕΙΝΑΙ ΑΠΑΡΑΙΤΗΤΑ ΕΒΔΟΜΑΔΙΑΙΑ, ΚΑΘΕ 2 ΕΒΔΟΜΑΔΕΣ ΚΑΙ ΜΗΝΙΑΙΑ',
      error: 'Συμπληρώστε όνομα, τηλέφωνο, υπηρεσία, ημερομηνία και ώρα.',
      success: 'Το αίτημά σας είναι έτοιμο. Θα ανοίξει το WhatsApp για να το στείλετε.',
      calendarTitle: 'Ημερολόγιο Ραντεβού',
      previousMonth: 'Προηγούμενος μήνας',
      nextMonth: 'Επόμενος μήνας',
      available: 'Διαθέσιμο',
      unavailable: 'Μη διαθέσιμο',
      today: 'Σήμερα',
      selectedDate: 'Επιλεγμένη ημερομηνία',
      selectedTime: 'Επιλεγμένη ώρα',
      chooseDateFirst: 'Επιλέξτε διαθέσιμη ημερομηνία για να δείτε ώρες.',
      weekdays: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],
      months: [
        'Ιανουάριος',
        'Φεβρουάριος',
        'Μάρτιος',
        'Απρίλιος',
        'Μάιος',
        'Ιούνιος',
        'Ιούλιος',
        'Αύγουστος',
        'Σεπτέμβριος',
        'Οκτώβριος',
        'Νοέμβριος',
        'Δεκέμβριος',
      ],
      whatsappMessage: ({ name, phone, service, date, time, message }) => `Γεια σας Shine Argyrou CarWash, θα ήθελα να ζητήσω ένα ραντεβού.

Όνομα: ${name}
Τηλέφωνο: ${phone}
Υπηρεσία: ${service}
Προτιμώμενη Ημερομηνία: ${date}
Προτιμώμενη Ώρα: ${time}
Σημειώσεις: ${message || 'Καμία'}`,
    },
    area: {
      eyebrow: 'Περιοχές εξυπηρέτησης',
      title: 'Περιοχή Εξυπηρέτησης',
      text: 'Εξυπηρετούμε με υπερηφάνεια τη Λάρνακα και τις γύρω περιοχές της Κύπρου.',
      mapTitle: 'Λάρνακα',
      mapLocation: 'Λάρνακα, Κύπρος',
      openMap: 'Άνοιγμα στους Χάρτες Google',
      getDirections: 'Λήψη οδηγιών',
    },
    contact: {
      eyebrow: 'Επικοινωνία',
      title: 'Επικοινωνήστε μαζί μας',
      links: {
        call: 'Καλέστε μας',
        viber: 'Viber',
        whatsapp: 'WhatsApp',
        instagram: 'Instagram',
      },
      phone: 'Τηλέφωνο',
      location: 'Τοποθεσία',
      locationValue: 'Λάρνακα, Κύπρος',
    },
    footer: {
      rights: 'Copyright 2026 Shine Argyrou CarWash. Με επιφύλαξη παντός δικαιώματος.',
      tagline: 'Premium Mobile Detailing στη Λάρνακα.',
    },
  },
};
