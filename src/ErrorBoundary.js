import { Component } from "react";;
import { Link, Navigate } from "react-router-dom"

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  // react function, asking what would you want to if there's error, come back to the class and rerender to what?
  static getDerivedStateFromError() {
    // so I'm like then set the hasError state as true and return
    return { hasError: true };
  }

  // componentDitcatch: when the component catch (something) 
  // componentDidCatch(error, info) {
  //   console.error(error, info);
  // }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 3000);
    }
  }

  render () {
    if (this.state.redirect) {
      return <Navigate to="/" />
    } else if (this.state.hasError) {
      return (
        // {" "}: keep the space if the line dosen't break - just to make it looks nice
        <h2>There was an error with this listing. <Link to="/">Click here</Link>{" "}
        to back to the home page or wait five seconds. </h2>
      )
    }

    // catch errors from any child node of this component
    // this is like the catch block from try/catch
    return this.props.children;
  }
}

export default ErrorBoundary;