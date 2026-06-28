export type Language = "en" | "mr";

export const content = {
  en: {
    nav: {
      events: "Events",
      mission: "Mission",
      insights: "Pune Need",
      contact: "Contact",
      join: "Join",
      register: "Register"
    },
    hero: {
      titleLine1: "SOW A FUTURE",
      titleLine2Start: "ONE ",
      titleHighlight: "TREE",
      titleLine2End: " AT A TIME",
      body: "Join our campaign to plant over 10 Million trees. We are on a journey to save the forest, Join us!",
      primary: "Join the Drive",
      stat: "Help us plant\n1 million trees in Pune over the\nnext 5 years."
    },
    mission: {
      eyebrow: "Why GreenPune",
      title: "Every event becomes part of a long-term urban forest portfolio.",
      body:
        "We are starting with Mahadji Shinde Nagar and building a repeatable system for future tree drives: posters, registrations, local participation, and follow-up care."
    },
    stats: [
      ["40%", "Tree canopy target often used by urban forest planners"],
      ["9 m2", "Minimum urban green space per person benchmark"],
      ["2026", "First GreenPune event year"],
      ["80%", "Survival rate target with 3-year post-plantation care"]
    ],
    event: {
      eyebrow: "Current Event",
      date: "Date",
      location: "Location",
      theme: "Theme",
      cta: "Open form"
    },
    insights: {
      eyebrow: "Pune Tree Requirement",
      title: "Pune needs shade where people actually live, walk, and wait.",
      intro:
        "Public reports do not give one final tree-deficit number for every ward. GreenPune therefore treats Pune's need as a planning signal: protect existing canopy, plant native shade trees near daily life, and track survival instead of only counting plantation-day saplings.",
      cards: [
        {
          title: "Canopy monitoring",
          value: "620 ha",
          text:
            "Recent reporting on WRI India's Pune work cited about 620 hectares of tree-cover loss between 2016 and 2019, showing why satellite-backed monitoring matters."
        },
        {
          title: "Official count is not enough",
          value: "55L+",
          text:
            "PMC environment reporting has claimed more than 55 lakh trees, but researchers and activists have questioned geolocation, validation, and compensatory-plantation transparency."
        },
        {
          title: "Survival first",
          value: "3-year care",
          text:
            "The highest-impact drives plan watering, guards, species choice, and local ownership from day one."
        }
      ],
      sourcesTitle: "Research references",
      sources: [
        {
          label: "WRI India urban tree canopy work",
          href: "https://wri-india.org/research/measuring-and-monitoring-tree-cover-and-plant-canopy-height-pune-city-india"
        },
        {
          label: "Pune Municipal Corporation environment reporting",
          href: "https://www.pmc.gov.in/"
        },
        {
          label: "CEEW Maharashtra urban forestry co-benefits",
          href: "https://www.ceew.in/publications/roadmaps-measure-climate-co-benefits-methodologies-strengthening-climate-action-uf"
        }
      ]
    },
    portfolio: {
      eyebrow: "Events Portfolio",
      title: "Built to host many events next.",
      nextTitle: "Next community event",
      nextBody: "Ready to add when the next poster and details arrive."
    },
    footer: {
      line: "Harit Nagar. Sundar Nagar. Samruddha Nagar.",
      share: "Share form link"
    },
    registerPage: {
      eyebrow: "Event Registration",
      title: "Enter your details for the tree plantation drive.",
      body:
        "Share this page in WhatsApp groups so residents can register directly. Details are saved securely through the server."
    },
    form: {
      name: "Name",
      namePlaceholder: "Your full name",
      phone: "Contact number",
      phonePlaceholder: "10 digit mobile number",
      address: "Address",
      addressPlaceholder: "House / society / area",
      canBringTree: "Can you bring your own tree sapling?",
      yes: "Yes",
      no: "No",
      submit: "Submit registration",
      pending: "Submitting...",
      success: "Thank you! Your registration is complete.",
      error: "Please check the required details.",
      nameError: "Please enter a valid name.",
      phoneError: "Please enter a valid 10 digit mobile number.",
      addressError: "Please enter your complete address.",
      canBringTreeError: "Please choose one option."
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Memories from the Ground",
      uploadTitle: "Upload Event Image",
      uploadCta: "Choose File",
      submit: "Upload Image",
      captionPlaceholder: "Add a caption...",
      noImages: "No images in the gallery yet.",
      joinTitle: "Share your own tree plantation memory!",
      successMessage: "Image uploaded successfully!",
      errorMessage: "Failed to upload image. Please try again."
    }
  },
  mr: {
    nav: {
      events: "कार्यक्रम",
      mission: "ध्येय",
      insights: "पुण्याची गरज",
      contact: "संपर्क",
      join: "सहभाग",
      register: "नोंदणी"
    },
    hero: {
      titleLine1: "भविष्य पेरा",
      titleLine2Start: "एक ",
      titleHighlight: "वृक्ष",
      titleLine2End: " एका वेळी",
      body: "पुण्यात १० लाखांपेक्षा जास्त झाडे लावण्याच्या मोहिमेत सहभागी व्हा. आम्ही जंगले वाचवण्याच्या प्रवासावर आहोत, आमच्याशी जोडा!",
      primary: "मोहिमेत सहभागी व्हा",
      stat: "पुण्यात पुढील ५ वर्षात\n१० लाख झाडे लावण्यासाठी\nआम्हाला मदत करा."
    },
    mission: {
      eyebrow: "ग्रीनपुणे का",
      title: "प्रत्येक कार्यक्रम दीर्घकालीन शहरी वन मोहिमेचा भाग बनेल.",
      body:
        "श्री महादजी शिंदे नगरपासून सुरुवात करून पुढील वृक्षारोपण मोहिमांसाठी पोस्टर, नोंदणी, स्थानिक सहभाग आणि झाडांची देखभाल यांची पुनरावृत्ती होणारी पद्धत तयार करत आहोत."
    },
    stats: [
      ["४०%", "शहरी वन नियोजनात वापरला जाणारा कॅनोपी उद्देश"],
      ["९ चौ.मी.", "प्रति नागरिक किमान हरित जागेचा बेंचमार्क"],
      ["२०२६", "पहिले ग्रीनपुणे कार्यक्रम वर्ष"],
      ["८०%", "३ वर्षांच्या देखभालीसह रोपे जगवण्याचे लक्ष्य"]
    ],
    event: {
      eyebrow: "सध्याचा कार्यक्रम",
      date: "दिनांक",
      location: "स्थान",
      theme: "संकल्पना",
      cta: "फॉर्म उघडा"
    },
    insights: {
      eyebrow: "पुण्याची वृक्ष गरज",
      title: "लोक जिथे राहतात, चालतात आणि थांबतात तिथे पुण्याला सावली हवी.",
      intro:
        "प्रत्येक वॉर्डसाठी एकच अंतिम वृक्ष-तुटीचा आकडा उपलब्ध नाही. त्यामुळे ग्रीनपुणे पुण्याची गरज नियोजन संकेत म्हणून पाहते: विद्यमान कॅनोपीचे संरक्षण, दैनंदिन जीवनाजवळ देशी सावलीची झाडे आणि फक्त लागवड नव्हे तर जगवण्याचे ट्रॅकिंग.",
      cards: [
        {
          title: "कॅनोपी मॉनिटरिंग",
          value: "६२० हे.",
          text:
            "WRI India च्या पुणे कामावरील अलीकडील रिपोर्टिंगमध्ये २०१६ ते २०१९ दरम्यान सुमारे ६२० हेक्टर वृक्षाच्छादन घट झाल्याचा उल्लेख आहे."
        },
        {
          title: "फक्त अधिकृत आकडा पुरेसा नाही",
          value: "५५ लाख+",
          text:
            "PMC अहवालांमध्ये ५५ लाखांपेक्षा जास्त झाडांचा दावा आहे, पण जिओलोकेशन, पडताळणी आणि भरपाई वृक्षारोपण पारदर्शकतेवर प्रश्न उपस्थित झाले आहेत."
        },
        {
          title: "जगवणे प्रथम",
          value: "३ वर्षे काळजी",
          text:
            "प्रभावी मोहिमेत पाणी, संरक्षक जाळी, योग्य प्रजाती आणि स्थानिक जबाबदारी पहिल्या दिवसापासून ठरते."
        }
      ],
      sourcesTitle: "संदर्भ",
      sources: [
        {
          label: "WRI India शहरी वृक्ष कॅनोपी काम",
          href: "https://wri-india.org/research/measuring-and-monitoring-tree-cover-and-plant-canopy-height-pune-city-india"
        },
        {
          label: "पुणे महानगरपालिका पर्यावरण अहवाल",
          href: "https://www.pmc.gov.in/"
        },
        {
          label: "CEEW महाराष्ट्र शहरी वन सह-लाभ",
          href: "https://www.ceew.in/publications/roadmaps-measure-climate-co-benefits-methodologies-strengthening-climate-action-uf"
        }
      ]
    },
    portfolio: {
      eyebrow: "कार्यक्रम पोर्टफोलिओ",
      title: "पुढील अनेक कार्यक्रमांसाठी तयार.",
      nextTitle: "पुढील सामुदायिक कार्यक्रम",
      nextBody: "पुढील पोस्टर आणि तपशील मिळताच जोडण्यासाठी तयार."
    },
    footer: {
      line: "हरित नगर. सुंदर नगर. समृद्ध नगर.",
      share: "फॉर्म लिंक शेअर करा"
    },
    registerPage: {
      eyebrow: "कार्यक्रम नोंदणी",
      title: "वृक्षारोपण मोहिमेसाठी आपली माहिती भरा.",
      body:
        "ही लिंक WhatsApp ग्रुपमध्ये शेअर करा, जेणेकरून नागरिक थेट नोंदणी करू शकतील. माहिती सर्व्हरमार्फत सुरक्षितरीत्या जतन केली जाते."
    },
    form: {
      name: "नाव",
      namePlaceholder: "आपले पूर्ण नाव",
      phone: "संपर्क क्रमांक",
      phonePlaceholder: "१० अंकी मोबाइल क्रमांक",
      address: "पत्ता",
      addressPlaceholder: "घर / सोसायटी / परिसर",
      canBringTree: "आपण आपले वृक्ष स्वतः आणू शकता का?",
      yes: "हो",
      no: "नाही",
      submit: "नोंदणी करा",
      pending: "नोंदणी होत आहे...",
      success: "धन्यवाद! तुमची नोंदणी यशस्वी झाली.",
      error: "कृपया आवश्यक माहिती तपासा.",
      nameError: "कृपया योग्य नाव टाका.",
      phoneError: "कृपया १० अंकी संपर्क क्रमांक टाका.",
      addressError: "कृपया पूर्ण पत्ता टाका.",
      canBringTreeError: "कृपया एक पर्याय निवडा."
    },
    gallery: {
      eyebrow: "गॅलरी",
      title: "वृक्षारोपणाचे क्षण",
      uploadTitle: "इव्हेंटचे छायाचित्र अपलोड करा",
      uploadCta: "फाईल निवडा",
      submit: "छायाचित्र अपलोड करा",
      captionPlaceholder: "कॅप्शन लिहा...",
      noImages: "गॅलरीमध्ये अद्याप कोणतीही चित्रे नाहीत.",
      joinTitle: "तुमची स्वतःची वृक्षारोपणाची आठवण शेअर करा!",
      successMessage: "छायाचित्र यशस्वीरित्या अपलोड झाले!",
      errorMessage: "छायाचित्र अपलोड करण्यात त्रुटी आली. कृपया पुन्हा प्रयत्न करा."
    }
  }
} as const;
