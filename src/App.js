import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
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

const app = new Clarifai.App({
 apiKey: 'fb8dc8f1f3a94223a454421adc8c573d'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
    }
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
  console.log(box);
  this.setState({box: box})
}

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  .catch(err => console.log(err));
}

  render() {
  return (
    <div className="App">
        <Particles className='particles'
        params={particleOptions}
       />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
  );
}
}

export default App;
