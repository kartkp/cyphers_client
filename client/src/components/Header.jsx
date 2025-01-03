import React, { useEffect, useState } from 'react';
import './Header.css';


const Header = () => {
  const colors = ['#1E1B4B', '#14B8A6', '#91DA6F', '#6FCE7C', '#0AAE9D', '#821D1B', '#63CA81', '#CAD233', '#FFFFFF'];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
                document.title = "Brightways - Home";
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, [colors.length]);

  const colorfulTextStyle = {
    fontFamily: 'Segoe UI, sans-serif',
    fontWeight: 700,
    fontSize: '1.3rem',
    marginBottom: '10px',
    paddingLeft: '150px',
    textAlign: 'left',
    color: colors[colorIndex],
    textShadow: '0px 0px 1px black',
  };;
  return (
    <header style={styles.header}>
      <br></br>
      <br></br>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{flex: 1}}>
          <br/><br/><br/>
          <h1 className="text-white font-bold lg:text-7xl md:text-[36px] text-[35px] md:leading-[42px] leading-[36px] max-w-lg">
            Elevate Young Minds with <span className="text-teal-500">Bright</span><span
              className="text-indigo-950">Ways</span>
          </h1>
          <br/>
          <div>
          <p style={colorfulTextStyle}>
              {["we turn ordinary lessons into extraordinary adventures!"].map((word, index) => (
                <span key={index} style={{
                  color: colors[(colorIndex + index) % colors.length],
                  transition: 'color 0.5s'
                }}>
                  {word}&nbsp;
                </span>
              ))}
            </p>
            <p style={colorfulTextStyle}>
              {["we cater to diverse learning styles."].map((word, index) => (
                <span key={index} style={{
                  color: colors[(colorIndex + index) % colors.length],
                  transition: 'color 0.5s'
                }}>
                  {word}&nbsp;
                </span>
              ))}
            </p></div>
        </div>
        <img classname="mainimage" src="https://res.cloudinary.com/dlhktanwi/image/upload/v1725047153/__Future-classrooms_now____Adaptive_learning_for_personalized_paths_%EF%B8%8F___Instant_feedback_loops_for_growth____Tech-enabled_inclusive_education_____Public_Trust_Solutions__Pioneering_tech_integration_in_learni_kexxvw.jpg" alt="Tech Background" style={{ ...styles.image, transition: 'transform 0.8s ease-in-out' }} className="zoom-image"  />
      </div>
    </header>
  );
};

const styles = {
  header: {
    textAlign: 'LEFT',
    padding: '50px 20px',
    backgroundColor: 'transparent',
    color: '#fff',
  },

  textOutline: {
    fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
    textShadow: '1px 1px 3px #1790E3;, -1px -1px 3px #1790E3;, 1px -1px 3px #1790E3;, -1px 1px 3px #1790E3;',
  },

  image: {
    width: '30%',
    height: 'auto',
    marginTop: '20px',
    border: '1px solid #2A4F55',
    borderRadius: '5px',
    
  },

};

export default Header;
