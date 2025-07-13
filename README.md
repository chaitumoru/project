# Personal Resume Website

A modern, responsive, and feature-rich personal resume website built with HTML5, CSS3, and JavaScript. This template includes all the essential sections and interactive features you need to create an impressive online presence.

## 🚀 Features

### ✨ Core Sections
- **Hero Section** - Eye-catching introduction with typing animation
- **About Me** - Career objective, personal story, and fun facts
- **Skills & Expertise** - Interactive progress bars and tech stack showcase
- **Work Experience** - Timeline with detailed job history
- **Projects Portfolio** - Filterable project showcase with hover effects
- **Education & Certifications** - Academic background and professional certifications
- **Testimonials** - Rotating client/colleague recommendations
- **Contact Form** - Functional form with real-time validation

### 🎨 Modern Design Features
- **Dark/Light Theme Toggle** - User preference with localStorage persistence
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - Scroll-triggered animations and hover effects
- **Interactive Elements** - Animated counters, progress bars, and typing effects
- **Professional Typography** - Modern fonts with proper hierarchy
- **Clean Layout** - Minimalist design with plenty of white space

### 🔧 Interactive Features
- **Smooth Scrolling Navigation** - Seamless navigation between sections
- **Mobile-Friendly Menu** - Hamburger menu for mobile devices
- **Project Filtering** - Filter projects by category (Web Apps, Mobile, APIs)
- **Form Validation** - Real-time validation with error handling
- **Back to Top Button** - Convenient navigation helper
- **Auto-Playing Testimonials** - Rotating testimonials with manual controls
- **Resume Download** - PDF download functionality

### ⚡ Performance & Accessibility
- **Optimized Performance** - Lazy loading, throttled scroll events
- **SEO Friendly** - Semantic HTML structure
- **Accessibility Compliant** - Screen reader friendly, keyboard navigation
- **Cross-Browser Compatible** - Works on all modern browsers
- **Print Optimized** - Clean print styles

## 🛠️ Quick Start

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/personal-resume-website.git
cd personal-resume-website
```

### 2. Customize Content
Edit the `index.html` file to replace the placeholder content with your own information:

#### Personal Information
- Replace "John Doe" with your name
- Update the professional title and tagline
- Add your profile photo (replace the placeholder image URL)
- Update contact information (email, phone, location)

#### About Section
- Write your career objective
- Add your personal story and what drives you
- Update fun facts with your own hobbies/interests

#### Skills Section
- List your technical skills with proficiency levels
- Update the `data-width` attribute for skill progress bars
- Add your tech stack in the Tools & Technologies section

#### Experience Section
- Replace job titles, companies, and dates
- Update job descriptions and achievements
- Add technologies used in each role

#### Projects Section
- Replace project screenshots and descriptions
- Update project categories and technologies
- Add live demo and GitHub repository links

#### Education & Certifications
- Update degree information and institutions
- Add your certifications and achievements
- Replace certification icons if needed

### 3. Customize Styling
Edit `styles.css` to match your brand:

#### Colors
```css
:root {
    --primary-color: #4A90E2;    /* Your brand color */
    --secondary-color: #50C878;  /* Accent color */
    --accent-color: #FF6B6B;     /* Error/warning color */
}
```

#### Typography
```css
:root {
    --font-primary: 'Poppins', sans-serif; /* Change to your preferred font */
}
```

### 4. Update JavaScript
Modify `script.js` for custom functionality:

#### Typing Animation Text
```javascript
this.typingAnimation = new TypingAnimation(typedText, [
    'Your Title 1',
    'Your Title 2',
    'Your Title 3',
    // Add your professional titles
]);
```

#### Resume Download
```javascript
function handleDownloadResume() {
    const link = document.createElement('a');
    link.href = 'path/to/your/resume.pdf'; // Add your PDF path
    link.download = 'Your_Name_Resume.pdf';
    link.click();
}
```

### 5. Add Your Images
Replace placeholder images:
- Profile photo in the hero section
- Project screenshots
- Testimonial author photos
- Certification badges (optional)

### 6. Launch
Simply open `index.html` in a web browser or deploy to your preferred hosting platform.

## 📱 Responsive Breakpoints

The website is optimized for the following screen sizes:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Customization Guide

### Adding New Sections
1. Add HTML structure in `index.html`
2. Style the section in `styles.css`
3. Add any interactive functionality in `script.js`
4. Update navigation menu if needed

### Changing Color Scheme
Update CSS variables in `:root` selector:
```css
:root {
    --primary-color: #YOUR_COLOR;
    --secondary-color: #YOUR_COLOR;
    /* Update other color variables */
}
```

### Adding New Project Categories
1. Add filter button in HTML:
```html
<button class="filter-btn" data-filter="new-category">New Category</button>
```

2. Add `data-category="new-category"` to relevant project cards

### Modifying Animations
Adjust animation settings in JavaScript:
```javascript
// Typing speed
typeSpeed: 100, // milliseconds per character

// Counter animation duration
duration: 2000, // milliseconds

// Testimonial autoplay interval
autoPlayInterval: 5000, // milliseconds
```

## 🚀 Deployment Options

### GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts to deploy

### Traditional Web Hosting
Upload all files to your web hosting provider's public folder (usually `public_html` or `www`).

## 🔧 Advanced Features

### PWA Support
The template includes service worker registration for Progressive Web App features. Create a `sw.js` file for offline functionality.

### Form Backend Integration
Replace the form submission simulation with actual backend integration:
```javascript
async submitForm(formData) {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData
        });
        // Handle response
    } catch (error) {
        // Handle error
    }
}
```

### Analytics Integration
Add Google Analytics or other tracking scripts before the closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_TRACKING_ID');
</script>
```

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure all file paths are correct
3. Verify that all images exist and are accessible
4. Test in different browsers and devices

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)
- **Inspiration**: Modern web design trends and best practices

---

**Happy coding!** 🚀 Create an amazing online presence with this template!