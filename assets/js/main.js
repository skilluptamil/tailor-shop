/**
 * SARTORIA ROYALE - Main Interactive JavaScript (main.js)
 * High-performance UI interactions, filtering, sticky header & animations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Sticky Navbar on Scroll
  -------------------------------------------------------------------------- */
  const navbar = document.querySelector('.navbar-atelier');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Active Navigation Highlight
  -------------------------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-custom');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------------------------------------
     3. Portfolio Filter
  -------------------------------------------------------------------------- */
  const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-grid-item');

  if (portfolioFilterBtns.length > 0) {
    portfolioFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        portfolioFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
  /* --------------------------------------------------------------------------
     4. Service Filtering & Direct In-Page Service Linking
  -------------------------------------------------------------------------- */
  const serviceFilterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-grid-card');

  // Helper map for service slugs to category filters
  const serviceCategoryMap = {
    'bridal': 'bridal',
    'suits': 'men',
    'blouse': 'women',
    'shirts': 'men',
    'dresses': 'women',
    'alterations': 'alterations'
  };

  function filterServicesByCategory(category, targetId = null) {
    if (serviceFilterBtns.length > 0) {
      serviceFilterBtns.forEach(b => {
        if (b.getAttribute('data-filter') === category) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    }

    if (serviceCards.length > 0) {
      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const parentCol = card.closest('.col-md-6, .col-lg-4, .col-lg-3') || card.parentElement;
        
        if (targetId && (card.id === targetId || parentCol.id === targetId)) {
          parentCol.style.display = 'block';
          card.classList.add('service-highlight-pulse');
          setTimeout(() => card.classList.remove('service-highlight-pulse'), 2500);
        } else if (category === 'all' || cat === category) {
          parentCol.style.display = 'block';
        } else {
          parentCol.style.display = 'none';
        }
      });
    }

    if (targetId) {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  // Handle service-filter-btn clicks
  if (serviceFilterBtns.length > 0) {
    serviceFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');
        filterServicesByCategory(filter);
      });
    });
  }

  // In-page smooth scroll & filter for footer service links
  document.querySelectorAll('a[data-service]').forEach(link => {
    link.addEventListener('click', function (e) {
      const serviceKey = this.getAttribute('data-service');
      const targetId = 'service-' + serviceKey;
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        // Target service exists on the current page -> scroll & filter in-place without page reload/redirect
        e.preventDefault();
        const cat = serviceCategoryMap[serviceKey] || 'all';
        filterServicesByCategory(cat, targetId);
        window.history.pushState(null, '', '#' + targetId);
      }
    });
  });

  // Automatically handle hash or URL parameter when entering the page
  function checkServiceURLParams() {
    const hash = window.location.hash.replace('#', '');
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const filterParam = urlParams.get('filter');

    if (hash && hash.startsWith('service-')) {
      const serviceKey = hash.replace('service-', '');
      const cat = serviceCategoryMap[serviceKey] || 'all';
      setTimeout(() => filterServicesByCategory(cat, hash), 350);
    } else if (serviceParam) {
      const targetId = 'service-' + serviceParam;
      const cat = serviceCategoryMap[serviceParam] || 'all';
      setTimeout(() => filterServicesByCategory(cat, targetId), 350);
    } else if (filterParam) {
      setTimeout(() => filterServicesByCategory(filterParam), 350);
    }
  }

  checkServiceURLParams();

  /* --------------------------------------------------------------------------
     4b. Dynamic Service Details Page Data Hydration
  -------------------------------------------------------------------------- */
  const serviceDetailsData = {
    'bridal': {
      title: "Bridal Gown & Lehenga Couture",
      badge: "Bridal Haute Couture",
      price: "$199",
      rating: "4.99 / 5 from 420+ reviews",
      image: "assets/images/services/service-bridal.jpg",
      subheading: "Timeless Bespoke Bridal Wear & Heirloom Trousseau",
      desc1: "Our couture bridal service offers an unforgettable bespoke experience for brides and bridal parties. From hand-draped silk organza ballgowns to ornate velvet lehengas adorned with genuine zardozi, crystals, and heritage gota patti work, each piece is engineered with couture corsetry for a sublime silhouette.",
      desc2: "Our master bridal artisans work closely with you through initial sketch consultations, muslin mock-up fittings, and intricate hand-embroidery sampling to ensure your wedding ensemble is an everlasting heirloom.",
      buttonText: "Book Bridal Fitting"
    },
    'suits': {
      title: "Men's Bespoke 2 & 3-Piece Suits",
      badge: "Menswear Haute Couture",
      price: "$249",
      rating: "4.98 / 5 from 340+ reviews",
      image: "assets/images/services/service-suit.jpg",
      subheading: "Uncompromising Savile Row Quality Tailoring",
      desc1: "Our bespoke suiting service is the ultimate synthesis of traditional British tailoring architecture and Italian softness. Hand-cut from individual 2D paper patterns drafted solely for your silhouette, each suit features a floating horsehair canvas chest piece that naturally molds to your body shape over time.",
      desc2: "Whether you are commissioning a boardroom navy wool suit, an opulent velvet smoking jacket, or a black-tie peak lapel tuxedo, our master tailors guide you through every choice of fabric weight, drape, shoulder construction, and horn button selection.",
      buttonText: "Book Suit Fitting"
    },
    'blouse': {
      title: "Designer Blouse Stitching",
      badge: "Women's Couture Stitching",
      price: "$49",
      rating: "4.97 / 5 from 290+ reviews",
      image: "assets/images/services/service-blouse.jpg",
      subheading: "Precision Pattern Drafting for Saree & Lehenga Blouses",
      desc1: "Experience artisanal designer blouse stitching crafted with padded cups, princess-cut panels, backless latkan ties, and high-neck embroidery borders. Every blouse is shaped to fit seamlessly with zero shoulder slipping.",
      desc2: "Choose from sheer illusion necklines, boat necks, scalloped edges, and custom piping tailored with genuine silk linings.",
      buttonText: "Book Blouse Fitting"
    },
    'dresses': {
      title: "Custom Evening Gowns & Dresses",
      badge: "Women's Haute Couture",
      price: "$119",
      rating: "4.96 / 5 from 210+ reviews",
      image: "assets/images/services/service-dress.jpg",
      subheading: "Red Carpet Silhouettes & Cocktail Gowns",
      desc1: "From fluid bias-cut silk satin gowns to structured corset cocktail dresses, our custom gown studio crafts showstopping evening wear tailored to your exact anatomical proportions.",
      desc2: "Features hand-pleated bodices, invisible side zips, luxury inner boning, and bespoke train lengths.",
      buttonText: "Book Gown Fitting"
    },
    'shirts': {
      title: "Bespoke Shirts & Tailored Trousers",
      badge: "Menswear Craftsmanship",
      price: "$65",
      rating: "4.98 / 5 from 230+ reviews",
      image: "assets/images/fabrics/fabric-twill-cotton.jpg",
      subheading: "Single-Needle Stitching & Mother-of-Pearl Buttons",
      desc1: "Custom dress shirts and tailored trousers drafted to individual measurements. Featuring split yokes, hand-set collars, Australian mother-of-pearl buttons, and English side-tab waist adjusters.",
      desc2: "Tailored with premium 2-ply Egyptian Giza cottons and Irish flax linens for unexcelled all-day comfort and crisp sartorial lines.",
      buttonText: "Book Shirt & Trouser Fitting"
    },
    'alterations': {
      title: "Express 24h Alterations & Restorations",
      badge: "Master Garment Restorations",
      price: "$45",
      rating: "4.99 / 5 from 560+ reviews",
      image: "assets/images/services/service-restoration.jpg",
      subheading: "Invisible Mending, Hemming & Tapering",
      desc1: "Express precision alterations for luxury suits, bridal gowns, jeans, and coats. From original hem shortening to waist tapering and delicate vintage silk lining replacements.",
      desc2: "Equipped with specialized blind-stitch and lock-stitch machines to preserve the garment's original factory stitching appearance.",
      buttonText: "Book Alteration Service"
    }
  };

  function hydrateServiceDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceKey = urlParams.get('service');
    if (!serviceKey || !serviceDetailsData[serviceKey]) return;

    const data = serviceDetailsData[serviceKey];
    
    // Update breadcrumb & headings
    const titleEl = document.querySelector('h1.display-5');
    if (titleEl) titleEl.textContent = data.title;

    const breadcrumbActive = document.querySelector('.breadcrumb-item.active');
    if (breadcrumbActive) breadcrumbActive.textContent = data.title;

    const badgeEl = document.querySelector('.py-5.bg-sand .badge.badge-gold');
    if (badgeEl) badgeEl.textContent = data.badge;

    const mainImg = document.querySelector('.col-lg-8 img.rounded-4');
    if (mainImg) {
      mainImg.src = data.image;
      mainImg.alt = data.title;
    }

    const subheadEl = document.querySelector('.col-lg-8 h2.h3');
    if (subheadEl) subheadEl.textContent = data.subheading;

    const descParagraphs = document.querySelectorAll('.col-lg-8 p.text-muted');
    if (descParagraphs.length >= 2) {
      descParagraphs[0].textContent = data.desc1;
      descParagraphs[1].textContent = data.desc2;
    }

    const priceEl = document.querySelector('.col-lg-4 .h3.text-gold');
    if (priceEl) priceEl.textContent = data.price;

    const bookBtn = document.querySelector('.col-lg-4 button[data-bs-target="#appointmentModal"]');
    if (bookBtn) {
      bookBtn.innerHTML = `<i class="bi bi-calendar-check"></i> ${data.buttonText}`;
      bookBtn.setAttribute('data-service-select', data.title);
    }
  }

  hydrateServiceDetailsPage();

  /* --------------------------------------------------------------------------
     4c. Dynamic Blog Details Page Data Hydration
  -------------------------------------------------------------------------- */
  const blogArticlesData = {
    'master-cut': {
      title: "The Art of the Master Cut: Inside Sartoria's 40-Hour Bespoke Construction",
      category: "Featured Editorial",
      readTime: "• 8 min read • Published Nov 15, 2026",
      authorName: "Arthur Vance",
      authorRole: "Master Tailor & Founder",
      authorAvatar: "assets/images/team/team-1.jpg",
      heroImage: "assets/images/blog/blog-hero.jpg",
      lead: "From hand-padded lapels to full floating horsehair chest canvas, discover the time-honored artisanal techniques that distinguish true bespoke tailoring from commercial mass production.",
      sections: [
        {
          heading: "The 3D Blueprint: Drafting From Raw Chalk",
          content: "Every bespoke journey begins with over 35 anatomical measurements. Unlike made-to-measure systems that modify pre-existing block patterns, our master cutters draw an original paper template exclusively for your posture, shoulder slope, and chest expansion."
        },
        {
          heading: "The Floating Horsehair Chest Piece",
          content: "Inside every Sartoria jacket lies a loose, non-adhesive internal canvas composed of natural Mongolian horsehair and Irish linen. Over 4,000 hand pad stitches secure the canvas, granting the garment the unique ability to mold itself to your chest contours with body heat."
        },
        {
          heading: "The Multi-Stage Basted Fitting",
          content: "Before any permanent seam is sewn, clients experience the skeleton baste fitting. Held together with white basting thread, the master tailor adjusts sleeve pitch, waist balance, and gorge height directly on the client's body for effortless posture alignment."
        }
      ],
      quote: "Bespoke is not merely a method of garment construction; it is an architectural dialogue between human silhouette and living natural textiles.",
      authorBio: "Master Tailor with 30+ years crafting bespoke suiting in Savile Row and New York. Dedicated to preserving historic haute couture craftsmanship."
    },
    'suit-canvas': {
      title: "The Anatomy of a Bespoke Suit: Canvas vs Fused Construction",
      category: "Style & Trends",
      readTime: "• 5 min read • Published Oct 14, 2026",
      authorName: "Arthur Vance",
      authorRole: "Master Tailor & Founder",
      authorAvatar: "assets/images/team/team-1.jpg",
      heroImage: "assets/images/blog/blog-1.jpg",
      lead: "When investing in a tailored suit, the single most critical structural element is invisible to the casual observer: the interlining hidden between the outer wool shell and inner silk lining.",
      sections: [
        {
          heading: "What is Fused Construction?",
          content: "Most ready-to-wear commercial suits use a chemical glue interlining called fusing. While cost-effective to produce rapidly by machine, fused jackets can become stiff, bubble after repeated dry cleanings, and lack the ability to adapt to body warmth and movements."
        },
        {
          heading: "The Magic of Full Floating Canvas",
          content: "True bespoke tailoring utilizes a free-floating canvas cut from natural horsehair and wool. This canvas is suspended inside the jacket chest piece with thousands of loose pad stitches. As you wear the suit, the natural fibers warm up and gradually mold to the unique curvature of your chest and shoulders."
        },
        {
          heading: "How to Test Your Existing Suits",
          content: "Perform the simple pinch test: Pinch the fabric on the chest of your jacket just below the breast pocket. Gently pull the outer wool and inner lining apart. If you feel a distinct third layer floating freely in the middle, you have a canvas jacket!"
        }
      ],
      quote: "A full canvas suit is living tailoring. It breathes with you, drapes gracefully over your torso, and looks even better on year five than it did on day one.",
      authorBio: "Master Tailor with 30+ years crafting bespoke suiting in London and New York. Dedicated to educating discerning gentlemen on artisanal craftsmanship."
    },
    'natural-textiles': {
      title: "Natural Textiles 101: Silk Momme, Wool Super Counts & Linen GSM",
      category: "Fabric Guide",
      readTime: "• 7 min read • Published Oct 18, 2026",
      authorName: "Helena Vance",
      authorRole: "Creative Director & Couturier",
      authorAvatar: "assets/images/team/team-2.jpg",
      heroImage: "assets/images/blog/blog-2.jpg",
      lead: "An essential primer on fabric density, yarn micron grades, and breathability metrics when choosing custom stitching materials.",
      sections: [
        {
          heading: "Demystifying Wool Super Counts (Super 110s to Super 180s)",
          content: "The 'Super' number represents the fineness of raw wool fibers measured in microns. Super 110s offer durable daily boardroom wear, whereas Super 150s and 180s create butter-soft, fluid evening suits that drape with liquid grace."
        },
        {
          heading: "Understanding Silk Momme Weight in Couture",
          content: "Momme (mm) measures silk density per square yard. For lightweight bridal scarves and sheer blouse sleeves, 8-12 mm chiffon provides ethereal flow. For structured lehenga skirts and corsets, 19-30 mm mulberry silk satin provides luxurious body and zero transparency."
        },
        {
          heading: "Linen GSM and Seasonal Breathability",
          content: "Grams per Square Meter (GSM) indicates fabric heaviness. Crisp Irish linen ranges between 220-280 GSM for summer safari jackets, maintaining sharp crease lines while allowing optimal air circulation even in humid climates."
        }
      ],
      quote: "Quality cloth is the soul of bespoke tailoring. When raw fibers are pure and ethically harvested, the finished garment drapes with unmistakable majesty.",
      authorBio: "Couture designer specializing in European luxury textiles, hand-painted organzas, and bridal draping techniques."
    },
    'bridal-timeline': {
      title: "Bridal Fitting Timelines: When to Book Your Trousseau",
      category: "Bridal Couture",
      readTime: "• 6 min read • Published Oct 22, 2026",
      authorName: "Rajesh K.",
      authorRole: "Master Embroiderer & Bridal Couturier",
      authorAvatar: "assets/images/team/team-3.jpg",
      heroImage: "assets/images/blog/blog-3.jpg",
      lead: "Plan your wedding ensemble journey with our comprehensive 6-month countdown from initial sketch consultations to final veil styling.",
      sections: [
        {
          heading: "Month 6 to 5: Silhouette & Swatch Consultation",
          content: "Begin with moodboards, color palette curation, and textile selection. We measure your exact posture and create personalized 3D fashion sketches illustrating neckline options, can-can volume, and embroidery placement."
        },
        {
          heading: "Month 4 to 3: The Muslin Toile Fitting",
          content: "A trial garment in cotton calico is tailored to test the bustier boning, waist slope, and skirt drop. Any proportion tweaks are finalized on the pattern before expensive silk brocade or velvet is cut."
        },
        {
          heading: "Month 2 to 1: Zardozi Hand-Embroidering & Final Pressing",
          content: "Over 120 hours of intricate dabka, sequin, and threadwork are completed by our master artisans. The final fitting takes place with your bridal footwear and jewelry to ensure perfect floor sweep."
        }
      ],
      quote: "A bridal trousseau should celebrate who you are. Giving the artisans sufficient lead time turns custom dressmaking into an unforgettable milestone of your wedding celebration.",
      authorBio: "Bridal couture artisan with 20+ years expertise in Indian royal lehengas, zardozi needlework, and European bridal corsetry."
    },
    'alterations-guide': {
      title: "5 Precision Alterations That Instantly Elevate Any Outfit",
      category: "Alteration Tips",
      readTime: "• 4 min read • Published Oct 25, 2026",
      authorName: "Matteo Rossi",
      authorRole: "Senior Alterations Specialist",
      authorAvatar: "assets/images/team/team-4.jpg",
      heroImage: "assets/images/blog/blog-4.jpg",
      lead: "How subtle adjustments to sleeve pitch, trouser break, and waist suppression can give off-the-rack garments an authentic bespoke posture.",
      sections: [
        {
          heading: "1. Correcting Sleeve Length to Show 1/2 Inch Shirt Cuff",
          content: "Jacket sleeves should end right above the wrist bone, allowing exactly 1/4 to 1/2 inch of crisp shirt cuff to emerge. This small detail visually balances arm proportions and frames luxury watches."
        },
        {
          heading: "2. Precision Trouser Break Calibration",
          content: "Whether you prefer a modern No-Break (clean crop over shoe top), slight break, or traditional medium break, tailored hem tapering prevents fabric pooling and elongates your leg silhouette."
        },
        {
          heading: "3. Waist Suppression and Back Seam Tapering",
          content: "Taking in the jacket side seams and back vent eliminates boxiness, accentuating a clean V-taper across the shoulder and waist without creating pull lines across the button stance."
        }
      ],
      quote: "Fit is 90% of style. A $300 suit tailored with anatomical precision will always look more commanding than a $3,000 designer suit with poor sleeve pitch.",
      authorBio: "Master alteration artisan trained in Milan. Specialist in vintage restoration, invisible mending, and leather tailoring."
    },
    'blouse-necklines': {
      title: "Modern Saree Blouse Necklines: From Princess Cut to Sweetheart",
      category: "Style & Trends",
      readTime: "• 5 min read • Published Nov 02, 2026",
      authorName: "Helena Vance",
      authorRole: "Creative Director & Couturier",
      authorAvatar: "assets/images/team/team-2.jpg",
      heroImage: "assets/images/services/service-blouse.jpg",
      lead: "Discover which necklines best compliment your shoulder width, torso length, and jewellery selection for festive couture ensembles.",
      sections: [
        {
          heading: "The Classic Sweetheart Neckline",
          content: "The sweetheart cut features a gentle heart dip that elongates the neck and flatters both petite and fuller bustlines. Pairs exquisitely with choker necklaces and heavy polki collar sets."
        },
        {
          heading: "Princess Cut Panels vs Traditional Darting",
          content: "Princess cut seams curve seamlessly from the armhole down to the waistline, providing smooth anatomical shaping without bulk. Padded inner cups eliminate the need for separate undergarments, ensuring sleek comfort."
        },
        {
          heading: "Sheer Illusion Backs & Handcrafted Latkan Tassels",
          content: "For cocktail sarees, sheer organza back panels with embroidered border trims and custom silk thread tassels add modern drama while keeping shoulders securely upright."
        }
      ],
      quote: "A well-stitched designer blouse frames the saree like fine jewelry. Comfort, cup positioning, and seamless arm movement are the true marks of master tailoring.",
      authorBio: "Couture designer specializing in modern Indian silhouettes, blouse drafting, and bridal embroidery."
    },
    'brocade-care': {
      title: "Brocade & Zardozi Care: How to Prevent Thread Tarnish",
      category: "Fabric Guide",
      readTime: "• 6 min read • Published Nov 08, 2026",
      authorName: "Arthur Vance",
      authorRole: "Master Tailor & Conservator",
      authorAvatar: "assets/images/team/team-1.jpg",
      heroImage: "assets/images/fabrics/fabric-showcase.jpg",
      lead: "Proven conservation practices for metallic gold threads, real silver zari borders, and pure Banarasi silk garments.",
      sections: [
        {
          heading: "Wrap in Pure Unbleached Muslin (Mulmul)",
          content: "Never store heirloom zari sarees or zardozi jackets in plastic covers. Plastic traps humidity and chemical gases that oxidize metallic threads. Wrap garments in breathable, unbleached white muslin cloth."
        },
        {
          heading: "Refold Along Opposite Crease Lines Annually",
          content: "Heavy metallic threads can weaken along permanent folds. Air out your brocades every six months on a shaded, dry day and re-crease them along alternate fold lines to prevent fiber fatigue."
        },
        {
          heading: "Avoid Direct Perfume or Cedar Contact",
          content: "Alcohol in perfumes and natural acids in raw cedar wood tarnish silver and copper core threads instantly. Apply fragrances before wearing garments, and place neem leaves or silica packets inside wardrobes instead."
        }
      ],
      quote: "Real zari is jewelry in textile form. With proper archival care, handwoven Banarasi and Kanjeevaram weaves retain their luminous radiance for generations.",
      authorBio: "Master Tailor with 30+ years experience in garment restoration, historic textiles, and bespoke tailoring."
    }
  };

  function hydrateBlogDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    let blogId = urlParams.get('id') || urlParams.get('article');
    
    // Also check hash
    if (!blogId && window.location.hash) {
      const hashKey = window.location.hash.replace('#', '');
      if (blogArticlesData[hashKey]) {
        blogId = hashKey;
      }
    }

    if (!blogId || !blogArticlesData[blogId]) return;

    const data = blogArticlesData[blogId];

    // Page Title & Meta
    document.title = `${data.title} | Sartoria Royale Journal`;

    // Category badge & Read Time
    const badgeEl = document.getElementById('blogDetailCategory') || document.querySelector('.py-5.bg-sand .badge.badge-gold');
    if (badgeEl) badgeEl.textContent = data.category;

    const metaEl = document.getElementById('blogDetailMeta') || document.querySelector('.py-5.bg-sand .text-muted.small');
    if (metaEl) metaEl.textContent = data.readTime;

    // Main Title
    const titleEl = document.getElementById('blogDetailTitle') || document.querySelector('h1.display-5');
    if (titleEl) titleEl.textContent = data.title;

    // Author Header
    const authorImg = document.getElementById('blogDetailAuthorAvatar') || document.querySelector('.py-5.bg-sand img.rounded-circle');
    if (authorImg) {
      authorImg.src = data.authorAvatar;
      authorImg.alt = data.authorName;
    }

    const authorNameEl = document.getElementById('blogDetailAuthorName') || document.querySelector('.py-5.bg-sand .fw-bold.text-heading');
    if (authorNameEl) authorNameEl.textContent = data.authorName;

    const authorRoleEl = document.getElementById('blogDetailAuthorRole') || document.querySelector('.py-5.bg-sand small.text-muted');
    if (authorRoleEl) authorRoleEl.textContent = data.authorRole;

    // Hero Image
    const heroImg = document.getElementById('blogDetailHeroImg') || document.querySelector('article img.rounded-4');
    if (heroImg) {
      heroImg.src = data.heroImage;
      heroImg.alt = data.title;
    }

    // Lead Paragraph
    const leadEl = document.getElementById('blogDetailLead') || document.querySelector('article .fs-5.leading-relaxed');
    if (leadEl) leadEl.textContent = data.lead;

    // Dynamic Sections & Quote
    const bodyContainer = document.getElementById('blogDetailSections');
    if (bodyContainer) {
      let sectionsHTML = '';
      data.sections.forEach((sec, idx) => {
        sectionsHTML += `
          <h2 class="h3 text-heading mt-5 mb-3">${sec.heading}</h2>
          <p class="text-muted leading-relaxed">${sec.content}</p>
        `;
        if (idx === 1 && data.quote) {
          sectionsHTML += `
            <blockquote class="p-4 my-4 bg-sand border-start border-4 border-warning rounded-3 fst-italic text-heading">
              "${data.quote}"
            </blockquote>
          `;
        }
      });
      bodyContainer.innerHTML = sectionsHTML;
    }

    // Author Bio Box
    const bioNameEl = document.getElementById('blogDetailBioName') || document.querySelector('.card.bg-sand h5.h6');
    if (bioNameEl) bioNameEl.textContent = `Written by ${data.authorName}`;

    const bioDescEl = document.getElementById('blogDetailBioDesc') || document.querySelector('.card.bg-sand p.small.text-muted');
    if (bioDescEl) bioDescEl.textContent = data.authorBio;

    const bioImg = document.getElementById('blogDetailBioAvatar') || document.querySelector('.card.bg-sand img.rounded-circle');
    if (bioImg) {
      bioImg.src = data.authorAvatar;
      bioImg.alt = data.authorName;
    }
  }

  hydrateBlogDetailsPage();

  /* --------------------------------------------------------------------------
     5. Fabric Filtering & Search
  -------------------------------------------------------------------------- */
  const fabricFilterBtns = document.querySelectorAll('.fabric-filter-btn');
  const fabricCards = document.querySelectorAll('.fabric-grid-item');

  if (fabricFilterBtns.length > 0) {
    fabricFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        fabricFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        fabricCards.forEach(card => {
          const cat = (card.getAttribute('data-category') || '').trim();
          const categories = cat.split(/\s+/);
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. Blog Search & Filter
  -------------------------------------------------------------------------- */
  const blogSearchInput = document.getElementById('blogSearchInput');
  const blogArticles = document.querySelectorAll('.blog-card-item');
  const blogCategoryLinks = document.querySelectorAll('.blog-category-filter');

  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', function () {
      const term = this.value.toLowerCase().trim();
      blogArticles.forEach(article => {
        const title = article.querySelector('.blog-title')?.textContent.toLowerCase() || '';
        const desc = article.querySelector('.blog-desc')?.textContent.toLowerCase() || '';
        const cat = article.querySelector('.blog-category')?.textContent.toLowerCase() || '';

        if (title.includes(term) || desc.includes(term) || cat.includes(term)) {
          article.parentElement.style.display = 'block';
        } else {
          article.parentElement.style.display = 'none';
        }
      });
    });
  }

  if (blogCategoryLinks.length > 0) {
    blogCategoryLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const selectedCat = this.getAttribute('data-category').toLowerCase();
        blogCategoryLinks.forEach(l => l.classList.remove('fw-bold', 'text-gold'));
        this.classList.add('fw-bold', 'text-gold');

        blogArticles.forEach(article => {
          const cat = article.getAttribute('data-category').toLowerCase();
          if (selectedCat === 'all' || cat === selectedCat) {
            article.parentElement.style.display = 'block';
          } else {
            article.parentElement.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. Password Visibility Toggle
  -------------------------------------------------------------------------- */
  const passwordToggles = document.querySelectorAll('.password-toggle-btn');
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      const icon = this.querySelector('i');
      if (input && icon) {
        if (input.type === 'password') {
          input.type = 'text';
          icon.className = 'bi bi-eye-slash';
        } else {
          input.type = 'password';
          icon.className = 'bi bi-eye';
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     8. Appointment Modal - Auto Pre-Select Service
  -------------------------------------------------------------------------- */
  const appointmentModal = document.getElementById('appointmentModal');
  if (appointmentModal) {
    const serviceSelect = appointmentModal.querySelector('#appointmentService');
    document.querySelectorAll('[data-service-select]').forEach(btn => {
      btn.addEventListener('click', function () {
        const serviceName = this.getAttribute('data-service-select');
        if (serviceSelect && serviceName) {
          serviceSelect.value = serviceName;
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. Coming Soon Live Countdown
  -------------------------------------------------------------------------- */
  const countdownContainer = document.getElementById('countdownTimer');
  if (countdownContainer) {
    // Set target date 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('countDays');
        const hoursEl = document.getElementById('countHours');
        const minutesEl = document.getElementById('countMinutes');
        const secondsEl = document.getElementById('countSeconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* --------------------------------------------------------------------------
     10. Bootstrap Tooltips & Dropdown Initialization
  -------------------------------------------------------------------------- */
  if (window.bootstrap && typeof bootstrap.Tooltip === 'function') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  /* --------------------------------------------------------------------------
     11. Strict Form Validation Engine (Contact, Appointment, Inquiry)
  -------------------------------------------------------------------------- */
  function initStrictFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const appointmentForms = document.querySelectorAll('#appointmentForm');

    // Validation patterns & rules
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z\s]{2,60}$/;

    // Helper: validate a single input or select element
    function validateElement(field, isSubmitCheck = false) {
      if (!field) return { isValid: true, message: '' };

      const value = field.value.trim();
      const type = field.type || field.tagName.toLowerCase();
      const id = field.id || '';
      const isRequired = field.hasAttribute('required');

      // 1. Name validation
      if (id.includes('Name') || field.name === 'name' || id === 'appName') {
        if (!value) {
          return { isValid: false, message: 'Please enter your name.' };
        }
        if (!nameRegex.test(value)) {
          return { isValid: false, message: 'Name must contain letters (A–Z) and spaces only.' };
        }
        return { isValid: true, message: 'Looks good!' };
      }

      // 2. Email validation
      if (type === 'email' || id.includes('Email') || field.name === 'email') {
        if (!value) {
          return { isValid: false, message: 'Please enter your email address.' };
        }
        if (!value.includes('@')) {
          return { isValid: false, message: "Email must include an '@' symbol." };
        }
        const parts = value.split('@');
        if (parts.length !== 2 || !parts[0] || !parts[1]) {
          return { isValid: false, message: 'Please enter a valid username and domain.' };
        }
        if (!parts[1].includes('.')) {
          return { isValid: false, message: "Please include a top-level domain (e.g., '.com', '.in')." };
        }
        const domainParts = parts[1].split('.');
        const tld = domainParts[domainParts.length - 1];
        if (!tld || tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
          return { isValid: false, message: 'Please provide a valid domain extension (e.g., .com, .in, .org).' };
        }
        if (!emailRegex.test(value)) {
          return { isValid: false, message: 'Please enter a valid email address (e.g., name@example.com).' };
        }
        return { isValid: true, message: 'Valid email address!' };
      }

      // 3. Phone validation
      if (type === 'tel' || id.includes('Phone') || field.name === 'phone') {
        const digits = value.replace(/\D/g, '');
        if (isRequired && !value) {
          return { isValid: false, message: 'Please enter your phone number.' };
        }
        if (value && digits.length < 10) {
          return { isValid: false, message: 'Phone number must be at least 10 digits.' };
        }
        if (value && digits.length > 15) {
          return { isValid: false, message: 'Phone number cannot exceed 15 digits.' };
        }
        if (!isRequired && !value) {
          return { isValid: true, message: '' };
        }
        return { isValid: true, message: 'Valid phone number!' };
      }

      // 4. Select dropdown validation
      if (field.tagName.toLowerCase() === 'select') {
        if (isRequired && (!value || value === '')) {
          return { isValid: false, message: 'Please select an option from the list.' };
        }
        return { isValid: true, message: 'Option selected!' };
      }

      // 5. Textarea / Message validation
      if (field.tagName.toLowerCase() === 'textarea') {
        if (isRequired && !value) {
          return { isValid: false, message: 'Please enter your message.' };
        }
        if (isRequired && value.length < 10) {
          return { isValid: false, message: 'Please enter at least 10 characters so we can understand your request.' };
        }
        if (!isRequired && !value) {
          return { isValid: true, message: '' };
        }
        return { isValid: true, message: 'Message looks complete!' };
      }

      // 6. Generic required input
      if (isRequired && !value) {
        return { isValid: false, message: 'This field is required.' };
      }

      return { isValid: true, message: 'Looks good!' };
    }

    // Helper: update field UI state
    function applyValidationUI(field, result, triggerFeedback = true) {
      const parent = field.closest('.col-md-6, .col-12, .mb-3, div');
      let feedbackEl = parent ? parent.querySelector('.invalid-feedback') : null;

      if (!result.isValid) {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        if (feedbackEl && triggerFeedback) {
          feedbackEl.textContent = result.message;
        }
      } else {
        field.classList.remove('is-invalid');
        // Only apply is-valid if field has non-empty value
        if (field.value.trim() !== '') {
          field.classList.add('is-valid');
        } else {
          field.classList.remove('is-valid');
        }
      }
    }

    // Attach real-time character blocking & validation listeners to a form
    function setupFormValidation(form) {
      if (!form) return;

      const inputs = form.querySelectorAll('input, select, textarea');

      inputs.forEach(input => {
        const id = input.id || '';
        const type = input.type || input.tagName.toLowerCase();

        // 1. Real-time Name Sanitization (A-Z and spaces ONLY)
        if (id.includes('Name') || input.name === 'name' || id === 'appName') {
          input.addEventListener('input', function () {
            const cleanVal = this.value.replace(/[^a-zA-Z\s]/g, '');
            if (this.value !== cleanVal) {
              this.value = cleanVal;
            }
            if (this.classList.contains('is-invalid')) {
              const res = validateElement(this);
              applyValidationUI(this, res);
            }
          });
        }

        // 2. Real-time Phone Sanitization (Digits and optional leading + ONLY)
        if (type === 'tel' || id.includes('Phone') || input.name === 'phone') {
          input.addEventListener('input', function () {
            let val = this.value;
            const hasLeadingPlus = val.startsWith('+');
            val = val.replace(/[^\d]/g, '');
            if (hasLeadingPlus) val = '+' + val;
            if (this.value !== val) {
              this.value = val;
            }
            if (this.classList.contains('is-invalid')) {
              const res = validateElement(this);
              applyValidationUI(this, res);
            }
          });
        }

        // 3. Email, Select, Textarea real-time error recovery on input/change
        input.addEventListener('input', function () {
          if (this.classList.contains('is-invalid')) {
            const res = validateElement(this);
            applyValidationUI(this, res);
          }
        });

        if (input.tagName.toLowerCase() === 'select') {
          input.addEventListener('change', function () {
            const res = validateElement(this);
            applyValidationUI(this, res);
          });
        }

        // 4. Strict Validation on Blur (when leaving the field)
        input.addEventListener('blur', function () {
          const res = validateElement(this);
          applyValidationUI(this, res);
        });
      });

      // 5. Form Submit Handler
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        let isFormValid = true;
        let firstInvalidField = null;

        inputs.forEach(input => {
          const res = validateElement(input, true);
          applyValidationUI(input, res, true);
          if (!res.isValid) {
            isFormValid = false;
            if (!firstInvalidField) {
              firstInvalidField = input;
            }
          }
        });

        if (!isFormValid) {
          if (firstInvalidField) {
            firstInvalidField.focus();
          }
          return;
        }

        // Handle successful submission
        if (form.id === 'contactForm') {
          const successAlert = document.getElementById('contactSuccessAlert');
          const submitBtn = document.getElementById('contactSubmitBtn');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
          }

          setTimeout(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="bi bi-check-circle me-1"></i> Sent!';
            }
            if (successAlert) {
              successAlert.style.display = 'block';
              successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            form.reset();
            inputs.forEach(i => i.classList.remove('is-valid', 'is-invalid'));

            setTimeout(() => {
              if (submitBtn) {
                submitBtn.innerHTML = '<i class="bi bi-send-fill me-1"></i> Send Inquiry';
              }
              if (successAlert) {
                successAlert.style.display = 'none';
              }
            }, 6000);
          }, 800);
        } else {
          // Generic appointment/inquiry form submission
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) {
            const originalHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Booked Successfully!';
            setTimeout(() => {
              form.reset();
              inputs.forEach(i => i.classList.remove('is-valid', 'is-invalid'));
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalHTML;

              // If inside a bootstrap modal, close it
              const modalEl = form.closest('.modal');
              if (modalEl && window.bootstrap && bootstrap.Modal) {
                const modalInstance = bootstrap.Modal.getInstance(modalEl);
                if (modalInstance) modalInstance.hide();
              }
            }, 1500);
          }
        }
      });
    }

    // Initialize on contact form and all appointment forms
    if (contactForm) setupFormValidation(contactForm);
    appointmentForms.forEach(form => setupFormValidation(form));

    // Also look for other forms with class needs-validation
    document.querySelectorAll('form.needs-validation').forEach(f => {
      if (f !== contactForm) setupFormValidation(f);
    });
  }

  initStrictFormValidation();
});
