// Centralized Language & Content System for IPA Interiors
// Standardized across website, client portal, mobile app, and admin tools.
// Principle: Simple words. Short sentences. Clear meaning. Warm tone. Quiet confidence.

export const COPY = {
  // Brand
  brand: {
    name: 'IPA Interiors',
    legalName: 'IPA Interiors International Ltd',
    tagline: 'For a touch of class',
    locations: 'London · Kampala · Dubai',
    fullLocations: 'Uganda (HQ): Nakasero, Kampala · UK: Belgravia, London · UAE: DIFC, Dubai',
    instagram: '@ipainteriors_international_ltd',
    email: 'concierge@ipainteriors.com',
    phoneDisplay: '+256 700 890 123',
    ukPhoneDisplay: '+44 20 7946 0192',
  },

  // Primary Navigation
  nav: {
    home: 'Home',
    explore: 'Explore',
    design: 'Design',
    shop: 'Shop',
    myHome: 'My Home',
    admin: 'Admin',
    mobileApp: 'Mobile App',
  },

  // Action Buttons
  buttons: {
    startProject: 'Start your project',
    talkToDesigner: 'Talk to a designer',
    bookConsultation: 'Book a consultation',
    explore: 'Explore',
    viewProject: 'View project',
    seeRoom: 'See the room',
    shopRoom: 'Shop the room',
    addToMySpace: 'Add to my space',
    addToBag: 'Add to bag',
    save: 'Save',
    saved: 'Saved',
    requestPrice: 'Request a price',
    askAboutPiece: 'Ask about this piece',
    viewDetails: 'View details',
    approve: 'Approve',
    approveDesign: 'Approve design',
    approveChange: 'Approve change',
    requestChanges: 'Request changes',
    makePayment: 'Make payment',
    continue: 'Continue',
    send: 'Send',
    upload: 'Upload',
    review: 'Review',
    trackOrder: 'Track order',
    messageTeam: 'Message the team',
    done: 'Done',
    cancel: 'Cancel',
    close: 'Close',
  },

  // Form Field Labels & Questions (Conversational)
  forms: {
    yourName: 'Your name',
    namePlaceholder: 'e.g. Patrick Mugisha',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    phone: 'Phone',
    phonePlaceholder: '+256 772 123 456',
    propertyType: 'What are you working on?',
    roomTypeQuestion: 'What will you use the room for?',
    styleQuestion: 'What kind of space do you like?',
    materialsQuestion: 'Which materials do you like?',
    budgetQuestion: "What's your budget?",
    roomSizeQuestion: 'Approximate size',
    roomSizePlaceholder: 'e.g. 120 sqm (or 3-4 rooms)',
    locationQuestion: 'Where is your property?',
    locationPlaceholder: 'e.g. Nakasero, Kampala or Belgravia, London',
    dateQuestion: 'When would you like to talk?',
    notesQuestion: 'Anything else we should know?',
    notesPlaceholder: 'Tell us a bit about your space, how you want it to feel, and any specific ideas you have...',
  },

  // Customer Project Terminology
  project: {
    title: 'Your home',
    subtitle: 'Your space is coming together.',
    rooms: 'Your rooms',
    timeline: 'Timeline',
    nextStep: 'Next step',
    progress: 'Progress',
    estimatedFinish: 'Estimated finish',
    totalCost: 'Total cost',
    paid: 'Paid',
    balanceDue: 'Balance due',
    paymentPlan: 'Your payment plan',
    approvalNeeded: 'Your approval is needed',
    projectChanges: 'Project changes',
    projectChangeDesc: 'A change to the agreed project that may affect the cost or timeline.',
    piecesForRoom: 'Pieces for this room',
    siteUpdates: 'Site updates',
    warranty: 'Two-Year Warranty',
    warrantyDesc: 'Every project includes ongoing care and maintenance for two years after completion.',
    savedPieces: 'Saved pieces',
  },

  // Status Labels (Human & Calm)
  status: {
    // Project & room phases
    concept: 'Concept design',
    inReview: 'Waiting for your approval',
    approved: 'Approved',
    ordering: 'Ordering',
    beingMade: 'Being made',
    onTheWay: 'On the way',
    arrived: 'Arrived',
    installation: 'Installation',
    almostThere: 'Almost there',
    complete: 'Complete',

    // Invoices & payments
    paidInFull: 'Paid',
    due: 'Balance due',
    overdue: 'Payment due',

    // Procurement
    sourcing: 'Sourcing materials',
    ordered: 'Ordered',
    inWorkshop: 'In the workshop',
    shipped: 'On the way',
    customsCleared: 'Cleared customs',
    delivered: 'Delivered',
    installed: 'Installed',
  },

  // Success States
  success: {
    formSubmitted: "You're all set. We'll be in touch.",
    formSubmittedDetail: "We'll review your brief and get back to you shortly.",
    paymentReceived: 'Payment received. Thank you.',
    approved: 'Approved.',
    changesSent: 'Your feedback has been sent to your designer.',
    addedToSpace: 'Saved to your space.',
    savedToVault: 'Saved to your pieces.',
    quoteSent: "We've received your request and will send details shortly.",
  },

  // Empty States (Helpful, not software)
  empty: {
    noItems: 'Nothing here yet.',
    noSavedPieces: 'Your saved pieces will appear here.',
    noSavedSpaces: 'Your saved spaces will appear here.',
    noProjects: 'Your projects will appear here.',
    allCaughtUp: "You're all caught up.",
  },

  // Loading States
  loading: {
    moment: 'Just a moment...',
    space: 'Bringing your space together...',
    opening: 'Opening the room...',
    preparing: 'Preparing your inspiration...',
  },

  // Error States (Helpful & polite)
  errors: {
    generic: 'Something went wrong. Please try again.',
    pinInvalid: "That PIN doesn't look right.",
    paymentFailed: "We couldn't complete the payment. Please try again.",
    notFound: "We couldn't find that.",
  },

  // Shop & Pieces
  shop: {
    title: 'The Shop',
    tagline: 'Furniture, lighting and pieces chosen for your space.',
    description: 'Designed in-house or made to order with our workshops in Kampala and Italy.',
    madeToOrder: 'Made to order',
    customSizing: 'Custom sizing available',
    fromPrice: 'From',
    leadTime: (weeks: number) => `Made to order · ${weeks} weeks`,
  },
};
