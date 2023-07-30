import * as THREE from "three";
//https://threejs.org/docs/

//https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xdddddd, 1);
document.body.appendChild(renderer.domElement);

// the scene object is where it is displayed
const scene = new THREE.Scene();
//the default values for camara x,y,z position are 0
const camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
camera.position.z = 50;

scene.background = new THREE.Color(0x1c28cc);
scene.add(camera);

/*
//physical object in this case a box that is visible
const boxGeometry = new THREE.BoxGeometry(20, 10, 10);
//Material: texture,style of the object
const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x00922d });
//a Mesh applies Material as specified to the rendered object
const cube = new THREE.Mesh(boxGeometry, basicMaterial);

scene.add(cube);
cube.rotation.set(0.2, 1, 0);
cube.position.x = -25;

//same procedure for a torus
const torusGeometry = new THREE.TorusGeometry(7, 1, 6, 12);
const phongMaterial = new THREE.MeshPhongMaterial({ color: 0xff9500 });
const torus = new THREE.Mesh(torusGeometry, phongMaterial);
scene.add(torus);*/

//and same procedure for a dodecahedron
const dodecahedronGeometry = new THREE.DodecahedronGeometry(7);
const lambertMaterial = new THREE.MeshLambertMaterial({
  color: 0x80f0,
});
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, lambertMaterial);
dodecahedron.position.x = 0;
dodecahedron.castShadow;
scene.add(dodecahedron);

//adds light to the scene
const light = new THREE.PointLight(0xffffff);
light.position.set(-10, 15, 50);
scene.add(light);

// soft white light
const alight = new THREE.AmbientLight(0x4040);
alight.position.set(10, 15, 50);
scene.add(alight);

function controls() {
  addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowDown":
        dodecahedron.position.y = dodecahedron.position.y - 0.008;
        break;
      case "ArrowUp":
        dodecahedron.position.y = dodecahedron.position.y + 0.008;
        break;
      case "ArrowLeft":
        dodecahedron.position.x = dodecahedron.position.x - 0.008;
        break;
      case "ArrowRight":
        dodecahedron.position.x = dodecahedron.position.x + 0.008;
        break;
      default:
        dodecahedron.position.x = dodecahedron.position.x;
    }
    console.log(e.code);
  });
}

let t = 0;
//this is where the magic happens requestAnimationFrame() is called on a loop
//call this function after all the objects are initialized
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);

  controls();
}
//dodecahedron.position.y = -7 * Math.sin(t * 2);
t += 0.001;
render();
