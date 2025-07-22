import React from 'react';
import './AboutUs.css';

const About = () => {
  return (
    <div className="about-page">
      <h1 className="page-title">LADS</h1>

      <section className="features">
        <h2>Our Platform Features</h2>
        <ul>
          <li>🔎 Advanced hotel search with filters and real-time availability</li>
          <li>💳 Secure and flexible online payments</li>
          <li>📝 Create and manage your user account effortlessly</li>
          <li>🔐 Persistent login with secure token authentication</li>
          <li>🚀 Autofill booking details for faster checkouts</li>
          <li>🌐 Interactive map integration to locate nearby hotels</li>
          <li>⭐ Read and leave reviews from real users</li>
        </ul>
      </section>

      <section className="creators">
        <div className="creator-section creator1">
          <img src="https://resizing.flixster.com/AxQLzP2tj0dJaPZRzO0kEhuEqUo=/620x336/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p11813552_e_h10_aa.jpg" alt="Creator 1" className="creator-img" />
          <div className="creator-info">
            <h3>Aditya Chowdhury</h3>
            <p>Hi, I’m Aditya — a 21-year-old tech enthusiast from Kolkata, currently pursuing my B.Tech from Jadavpur University. I’m deeply passionate about problem-solving and love building dynamic, interactive websites that offer real value to users. One of my biggest aspirations is to launch my own business someday and make a lasting impact through innovation.<br></br><br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I'd describe myself as an introvert who finds comfort in video games and strength in the gym. While I may not have faced major challenges yet, my biggest motivators are the fear of failure and the desire to make my parents proud. I live by the principle that everything is fair in love and war — which keeps me bold in ambition and unafraid to take risks where it matters.</p>
          </div>
        </div>

        <div className="creator-section creator2">
          <div className="creator-info">
            <h3>Lekharshav Sengupta</h3>
            <p>Hi, I'm Lekharshav — a 22-year-old tech enthusiast from Kolkata, currently pursuing my B.Tech from Jadavpur University. I have a strong passion for problem-solving and enjoy crafting dynamic, interactive websites that bring genuine value to users.<br></br><br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I'm someone who finds comfort in late-night gaming and quiet focus. I haven’t had to weather anything too heavy yet, but what drives me is a quiet fire: the fear of falling short.I live by the hope that one day the things i do might have some impact on the real world.</p>
          </div>
          <img src="https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru-824x490.jpg" alt="Creator 2" className="creator-img" />
        </div>
      </section>
    </div>
  );
};

export default About;
