import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import Particles from 'react-tsparticles';
import './App.css';

const options = {
          fpsLimit: 60,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 700,
              },
              value: 80,
            },
            opacity: {
              value: 0.25,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 3,
            },
          },
          detectRetina: true,
        };

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
    }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  };

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  };

  calculateFaceLocation = (data) => {
    const emptArr = [];
    const faceData1 = data.outputs[0].data.regions;
    const image = document.getElementById('inputImg');
    const width = Number(image.width);
    const height = Number(image.height);
    for(let i=0;i < faceData1.length; i++){
      emptArr[i] = {
        leftCol: faceData1[i].region_info.bounding_box.left_col * width,
        topRow: faceData1[i].region_info.bounding_box.top_row * height,
        rightCol: width - (faceData1[i].region_info.bounding_box.right_col * width),
        bottomRow: height - (faceData1[i].region_info.bounding_box.bottom_row * height)
      };
    };
    return emptArr;
  };

  displayFaceBox = (box) => {
    this.setState({box: box});
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://frozen-wave-79143.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
              })
            })
    .then(response => response.json())
      .then(response => {
        if (response !== 'Api not available') {
          console.log(response);
          fetch('https://frozen-wave-79143.herokuapp.com/image', {
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
      .catch(err => console.log("ERROR!", err)
      );
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    }else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  };

  render(){
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" id="tsparticles" options={options}  />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={ this.onButtonSubmit }/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (route === 'signin'
            ?<div> 
                <Logo />
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              </div>
            :<div> 
                <Logo />
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              </div>)
        }
      </div>
    );
  }
};

export default App;
