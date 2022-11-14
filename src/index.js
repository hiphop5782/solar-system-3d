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
camera.position.set(1, 2, 10);

//light
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight('white', 1);
scene.add(directionalLight);

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
controls.maxDistance = 20;

//helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(10);
scene.add(gridHelper);

//mesh
const geometry = new THREE.SphereGeometry(1, 32, 32);
const solarMaterial = new THREE.MeshPhongMaterial({
    color:"red",
})
const solar = new THREE.Mesh(geometry, solarMaterial);

const mercuryMaterial = new THREE.MeshPhongMaterial({
    color:"dodgerblue",
});
const mercury = new THREE.Mesh(geometry, mercuryMaterial);
mercury.scale.set(0.1, 0.1, 0.1);
mercury.position.set(2, 0, 0);

//group
const solarGroup1 = new THREE.Group();
solarGroup1.add(mercury);
solarGroup1.add(solar);

//mesh add scene
scene.add(solarGroup1);

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
    solarGroup1.rotation.y += delta;
    
    //render
    renderer.render(scene, camera);
    
    //continue animation
    //requestAnimationFrame(refresh);
    renderer.setAnimationLoop(refresh);
};

refresh();