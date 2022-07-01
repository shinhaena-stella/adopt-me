import { Component } from "react";
import { useParams } from "react-router-dom"; // useParams is the only way to get params from react router 
import Carousel from "./Carousel";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

/* internal state would be updated like
{
  loading: true
  name: Luna
  city : Seattle
}
*/

class Details extends Component {
  // doesn't need this with babel
  // constructor(props) { // it works without this props.. hm..
  //   super(props); // super: let the parent (react) know that this class has props
  
  //   this.state = { loading: true };
  
  state = { loading: true, showModal: false };

  // not has to be async but it's best practice
  async componentDidMount() {
    const res = await fetch (
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}` // this works only when it's wrapped by wrapper and use useParams
    );
    const json = await res.json();

    /* json looks like:
    {
      "numberOfResults": 1,
      "startIndex": 0,
      "endIndex": 0,
      "hasNext": false,
      "pets": [
        {
          "id": 1,
          "name": "Luna",
          "animal": "dog",
          "city": "Seattle",
          "state": "WA",
          "description": "Luna is actually the most adorable dog in the world. Her hobbies include yelling at squirrels, aggressively napping on her owners' laps, and asking to be fed two hours before IT'S DAMN WELL TIME LUNA. Luna is beloved by her puppy parents and lazily resides currently in Seattle, Washington.",
          "breed": "Havanese",
          "images": [
            "http://pets-images.dev-apis.com/pets/dog25.jpg",
            "http://pets-images.dev-apis.com/pets/dog26.jpg",
            "http://pets-images.dev-apis.com/pets/dog27.jpg",
            "http://pets-images.dev-apis.com/pets/dog28.jpg",
            "http://pets-images.dev-apis.com/pets/dog29.jpg"
          ]
        }
      ]
    }
    */
    
    // this is equivelent to following codes but update at once 
    this.setState({ loading: false, ...json.pets[0] });
    
    // this.setState({
    //   loading: false
    // })
    // this.setState(json.pets[0]);
    
  }
  
  toggleModal = () => this.setState({ showModal: !this.state.showModal }); // if flips the state

  render() {
    if (this.state.loading) {
      return <h2>loading ... </h2>
    }

    // testing error
    // throw new Error("ERROR!!");

    const { animal, breed, city, state, description, name, images, showModal } = this.state;
  
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
          {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    ); 
  }
}


// this class component could be just a fuctional component something like this:

// const Details = () => {
//   const { id } = useParams();
//   return <h2>My id is {id}</h2>
// };

//export default Details;


// React Router's API only exposes hooks. 
// If you have a class component that is a route, this is how you can use it, 
// make a wrapper component that uses the hook you need, and then pass that into the component. 

// And the ErrorBoundary has to be outside of the component we want to track error
// when the component has error, it crashes and the error bubbles up
// we want to catch the error, not crashing together with the component

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />;
    </ErrorBoundary>
  );
};

export default WrappedDetails;

// or instead of using ThemeContext.Consumer you can just pass it (in a functional component)

// const WrappedDetails = () => {
//   const params = useParams();
//   const [ theme ] = useContext(ThemeContext);
//   return (
//     <ErrorBoundary>
//       <Details theme={theme} params={params} />;
//     </ErrorBoundary>
//   )
// };

// export default WrappedDetails;