import '@/styles/index.css';

import * as Stats from 'stats-js';
import * as dat from 'dat.gui';

import * as THREE from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

//generate dom
const renderer = new THREE.WebGLRenderer({
    antialise:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
document.body.appendChild(renderer.domElement);

//generate scene
const scene = new THREE.Scene();

//generate camera
const camera = new THREE.PerspectiveCamera(
    75,//field ov view
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1, //near
    1000 //far
)
camera.position.set(1, 2, 20);

//light
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambientLight);
//const hemisphereLight = new THREE.HemisphereLight('white', 'white', 1);
//scene.add(hemisphereLight);
//const directionalLight = new THREE.DirectionalLight('white', 10);
//scene.add(directionalLight);
const pointLight = new THREE.PointLight('white', 5);
scene.add(pointLight);

//dat.gui
const gui = new dat.GUI();
gui.add(camera.position, 'x', -100, 100, 0.01).name("카메라X축");
gui.add(camera.position, 'y', -100, 100, 0.01).name("카메라Y축");
gui.add(camera.position, 'z', -100, 100, 0.01).name("카메라Z축");

//stats-js
const stats = new Stats();
stats.domElement.style.position = 'fixed';
stats.domElement.style.left = 0;
stats.domElement.style.top = 0;

//controls
const controls = new TrackballControls(camera, renderer.domElement);
controls.maxDistance = 40;

//helper
//const axesHelper = new THREE.AxesHelper(10);
//scene.add(axesHelper);
//const gridHelper = new THREE.GridHelper(40);
//scene.add(gridHelper);

//mesh
const geometry = new THREE.SphereGeometry(1, 32, 32);
const solarMaterial = new THREE.MeshPhongMaterial({
    color:"rgb(255, 36, 36)",
    side:THREE.DoubleSide,
})
const solar = new THREE.Mesh(geometry, solarMaterial);

//mercury
const mercuryMaterial = new THREE.MeshPhongMaterial({
    color:"skyblue",
});
const mercury = new THREE.Mesh(geometry, mercuryMaterial);
mercury.scale.set(0.1, 0.1, 0.1);
mercury.position.set(2, 0, 0);

//venus
const venusMaterial = new THREE.MeshPhongMaterial({
    color:"brown"
});
const venus = new THREE.Mesh(geometry, venusMaterial);
venus.scale.set(0.35, 0.35, 0.35);
venus.position.set(4, 0, 0);

//earth - moon
const earthMaterial = new THREE.MeshPhongMaterial({
    color:"dodgerblue",
});
const earth = new THREE.Mesh(geometry, earthMaterial);
earth.scale.set(0.38, 0.38, 0.38);
const moonMaterial = new THREE.MeshPhongMaterial({
    color:"lightgray",
});
const moon = new THREE.Mesh(geometry, moonMaterial);
moon.scale.set(0.1, 0.1, 0.1);
moon.position.set(1, 0, 0);

//mars
const marsMaterial = new THREE.MeshPhongMaterial({
    color:"#e67e22"
});
const mars = new THREE.Mesh(geometry, marsMaterial);
mars.scale.set(0.2, 0.2, 0.2);
mars.position.set(8, 0, 0);

//jupiter
const jupiterMaterial = new THREE.MeshPhongMaterial({
    color:"#f19066",
});
const jupiter = new THREE.Mesh(geometry, jupiterMaterial);
jupiter.scale.set(0.6, 0.6, 0.6);
jupiter.position.set(11, 0, 0);

//saturn
const saturnMaterial = new THREE.MeshPhongMaterial({
    color:"#f7d794"
});
const saturn = new THREE.Mesh(geometry, saturnMaterial);
saturn.scale.set(0.55, 0.55, 0.55);
saturn.position.set(13, 0, 0);

//uranus
const uranusMaterial = new THREE.MeshPhongMaterial({
    color:"#3dc1d3"
});
const uranus = new THREE.Mesh(geometry, uranusMaterial);
uranus.scale.set(0.45, 0.45, 0.45);
uranus.position.set(16, 0, 0);

//neptune
const neptuneMaterial = new THREE.MeshPhongMaterial({
    color:"#778beb"
});
const neptune = new THREE.Mesh(geometry, neptuneMaterial);
neptune.scale.set(0.43, 0.43, 0.43);
neptune.position.set(19, 0, 0);

//group
const solarGroup1 = new THREE.Group();
solarGroup1.add(mercury);
const solarGroup2 = new THREE.Group();
solarGroup2.add(venus);

const earthGroup = new THREE.Group();
earthGroup.add(earth);
earthGroup.add(moon);
earthGroup.position.set(6, 0, 0);

const solarGroup3 = new THREE.Group();
solarGroup3.add(earthGroup);

const solarGroup4 = new THREE.Group();
solarGroup4.add(mars);

const solarGroup5 = new THREE.Group();
solarGroup5.add(jupiter);

const solarGroup6 = new THREE.Group();
solarGroup6.add(saturn);

const solarGroup7 = new THREE.Group();
solarGroup7.add(uranus);

const solarGroup8 = new THREE.Group();
solarGroup8.add(neptune);

//mesh add scene
scene.add(solar);
scene.add(solarGroup1);
scene.add(solarGroup2);
scene.add(solarGroup3);
scene.add(solarGroup4);
scene.add(solarGroup5);
scene.add(solarGroup6);
scene.add(solarGroup7);
scene.add(solarGroup8);

//resize event handler
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
});

//clock
const clock = new THREE.Clock();

const refresh = ()=>{
    //delta
    const delta = clock.getDelta();

    //control update
    controls.update();
    
    //stats-js update
    stats.update();

    //rotate
    solarGroup1.rotation.y += delta * 5;
    solarGroup2.rotation.y += delta * 1.9555;
    solarGroup3.rotation.y += delta * 1.2054;
    earthGroup.rotation.y += delta * 10;
    solarGroup4.rotation.y += delta * 0.6404;
    solarGroup5.rotation.y += delta * 0.1097;
    solarGroup6.rotation.y += delta * 0.02//0.0008;
    solarGroup7.rotation.y += delta * 0.0914;
    solarGroup8.rotation.y += delta * 0.02;
    
    //render
    renderer.render(scene, camera);
    
    //continue animation
    //requestAnimationFrame(refresh);
    renderer.setAnimationLoop(refresh);
};

refresh();