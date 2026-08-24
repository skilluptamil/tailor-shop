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
    'sherwani': 'men',
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
    'sherwani': {
      title: "Royal Sherwani & Silk Kurtas",
      badge: "Men's Traditional Couture",
      price: "$179",
      rating: "4.98 / 5 from 180+ reviews",
      image: "assets/images/services/service-kurta.jpg",
      subheading: "Regal Heritage Embroidery & Mandarin Collars",
      desc1: "Exquisite hand-embroidered groom sherwanis, bandhgalas, and pure raw silk kurtas tailored with rich zari embroidery, handcrafted metallic buttons, and matching churidar trousers.",
      desc2: "Engineered with tailored shoulder pads and breathable silk-blend inner linings for majestic comfort throughout celebratory functions.",
      buttonText: "Book Sherwani Fitting"
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
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
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
});
