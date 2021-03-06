
module.exports = { 
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}", 
  ], 
  theme: { 
    container: { 
      center: true, 
      padding: { 
        DEFAULT: '1rem', 
        sm: '2rem', 
        lg: '4rem', 
        xl: '5rem', 
        '2xl': '7rem', 
      }, 
    },
    extend: {
      backgroundImage: {
        'signupbg': "url('assets/images/signup-bg.jpg')",
        'bg_signin': "url('assets/images/bg_signin.jpg')",
        'introduction': "url('assets/images/introduction3.jpg')"
      },
      colors: {
        'overlay': "rgba(0, 0, 0, 0.01)",
        'darkoverlay': "rgba(0, 0, 0, 0.3)",
        'overlay-light': "rgba(0, 0, 0, 0.02)",
      }
    } 
  }, 
  plugins: [], 
}