import About from "./About";
import Event from "./Events";
import Home from "./Home";



const Main = () => {
  
  return (
    <div >
       
      <section id="home"><Home /></section>
      <section id="event"><Event /></section>
      <section id="about"><About /></section>
    </div>
  );
};

export default Main;

  