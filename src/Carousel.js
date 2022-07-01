import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0 // index of the active(selected) photo
  }

  // static property: all instances of Carousel have this property by default
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  // custom handler
  // use it arrow function so we keep it in the same context and can use "this"
  handelIndexClick = (event) => { 
    this.setState({
      // +: convert string to number
      // dataset.index: access to the dataset named index (data-index)
      active: +event.target.dataset.index, 
    })
  };

  render () {
    const { active } = this.state; // state is from the class itself, mutable
    const { images } = this.props; // props is from its parent, immutable

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handelIndexClick}
              key={photo}
              src={photo}
              data-index={index} // it passes the index as a string so we need to convert it to number 
              className={index === active ? "active" : ""} // if the index of photo is active, give a classname active or not
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel;