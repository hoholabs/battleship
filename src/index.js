import './style.css';

const shipFactory = (length) => {
    return {length};
}

const boardFactory = (name, age) => {
    const sayHello = () => console.log('hello!');
    return { name, age, sayHello };
  };

 // module.exports = shipFactory;

  module.exports = {
    shipFactory
};