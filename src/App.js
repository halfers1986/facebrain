import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';

const particleOptions = {
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      resize: true,
      },
      modes: {
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
    },
  particles: {
    number: {
      value: 80,
      density:  {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({data: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

calculateFaceLocation = (data) => {
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  const faces = data.outputs[0].data.regions
  return (
    faces.map((face, i) => {
      return {
        leftCol: faces[i].region_info.bounding_box.left_col * width,
        topRow: faces[i].region_info.bounding_box.top_row * height,
        rightCol: width - (faces[i].region_info.bounding_box.right_col * width),
        bottomRow: height - (faces[i].region_info.bounding_box.bottom_row * height),
      }
    })
  )
}

displayFaceBox = (box) => {
  this.setState({box: box})
}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.user.input
      })        
    })
    .then(response => response.json())
  .then(response =>{
    if (response) {
      fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
        })        
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(console.log)
    }
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err => console.log(err));
}

onRouteChange = () => {
  if (route === 'signout') {
    this.setState(initialState)
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
        <Particles className='particles'
        params={particleOptions}
       />
       <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      { route === 'home' 
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (
          route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
      }
    </div>
  );
}
}

export default App;
