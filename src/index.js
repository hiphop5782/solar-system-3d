import '@/styles/index.css';

import * as Stats from 'stats-js';
import * as dat from 'dat.gui';

import * as THREE from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

//자전(rotate) 주기 / 공전(orbit) 주기
const sunRotate = 30;
const mercuryRotate = 58.6, mercuryOrbit = 88, mercuryAngle = 0;
const venusRotate = 243, venusOrbit = 224, venusAngle = 177.4;
const earthRotate = 23.93 / 24, earthOrbit = 365.25, earthAngle = 23.4;
const moonRotate = 27.3, moonOrbit = 27.3, moonAngle = 6.7;
const marsRotate = 24.6 / 24, marsOrbit = 687, marsAngle = 25.2;
const jupiterRotate = 9.9 / 24, jupiterOrbit = 12 * 365.25, jupiterAngle = 3.1;
const saturnRotate = 10.9 / 24, saturnOrbit = 29 * 365.25, saturnAngle = 26.7;
const uranusRotate = 17.2 / 24, uranusOrbit = 84 * 365.25, uranusAngle = 97.8;
const neptuneRotate = 16.1 / 24, neptuneOrbit = 165 * 365.25, neptuneAngle = 28.3;

//generate dom
const renderer = new THREE.WebGLRenderer({
    antialise:true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;//그림자 설정
document.body.appendChild(renderer.domElement);

//generate scene
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.00008);

//generate camera
const camera = new THREE.PerspectiveCamera(
    75,//field ov view
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1, //near
    1000 //far
)
camera.position.set(1, 2, 20);

//light
const ambientLight = new THREE.AmbientLight(0x222222, 1);
scene.add(ambientLight);
//const hemisphereLight = new THREE.HemisphereLight('white', 'white', 1);
//scene.add(hemisphereLight);
//const directionalLight = new THREE.DirectionalLight('white', 10);
//scene.add(directionalLight);
const sunLight = new THREE.PointLight('white', 2, 0);
sunLight.castShadow = true;//그림자 설정
sunLight.position.set(0, 0, 0);
scene.add(sunLight);
// const sunLightHelper = new THREE.PointLightHelper(sunLight);
// scene.add(sunLightHelper);

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

//sun
const sunMaterial = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('textures/sun.jpg'),
    side:THREE.DoubleSide,
    // map:sunTexture,
    // emissive:'rgba(255,179,39, 0.5)'
})
const sun = new THREE.Mesh(geometry, sunMaterial);
// sun.castShadow = true;

//sun flare
const sunFlareMaterial = new THREE.MeshBasicMaterial({
    color:'#ff6511',
    opacity:0.1,
    transparent:true,
});
const sunFlare = [];
for(let i=0; i < 10; i++){
    const flare = new THREE.Mesh(geometry, sunFlareMaterial);
    const s = 1 + (i+1) * 0.05;
    flare.scale.set(s, s, s);
    sun.add(flare);
    sunFlare.push(flare);
}

//mercury
const mercuryMaterial = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('textures/mercury.jpg'),
});
const mercury = new THREE.Mesh(geometry, mercuryMaterial);
mercury.scale.set(0.1, 0.1, 0.1);
mercury.position.set(2, 0, 0);
mercury.rotation.z = THREE.MathUtils.degToRad(mercuryAngle);
mercury.castShadow = true;
mercury.receiveShadow = true;

//venus
const venusMaterial = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('textures/venus.jpg'),
});
const venus = new THREE.Mesh(geometry, venusMaterial);
venus.scale.set(0.35, 0.35, 0.35);
venus.position.set(4, 0, 0);
venus.rotation.z = THREE.MathUtils.degToRad(venusAngle);
venus.castShadow = true;
venus.receiveShadow = true;

//earth - moon
const earthMaterial = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('textures/earth.jpg'),
});
const earth = new THREE.Mesh(geometry, earthMaterial);
earth.scale.set(0.38, 0.38, 0.38);
earth.position.set(6, 0, 0);

//earth axis rotation
const earthRadian = THREE.MathUtils.degToRad(earthAngle);
earth.rotation.z = earthRadian
// earth.geometry.applyMatrix4(new THREE.Matrix4().makeRotationZ(earthRadian));
// const earthAxis = new THREE.Vector3(Math.sin(-earthRadian), Math.cos(-earthRadian), 0).normalize();
earth.castShadow = true;
earth.receiveShadow = true;

const moonMaterial = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('textures/moon.jpg'),
});
const moon = new THREE.Mesh(geometry, moonMaterial);
moon.scale.set(0.1, 0.1, 0.1);
moon.position.set(1, 0, 0);
moon.rotation.z = THREE.MathUtils.degToRad(moonAngle);

//mars
const marsMaterial = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('textures/mars.jpg'),
});
const mars = new THREE.Mesh(geometry, marsMaterial);
mars.scale.set(0.2, 0.2, 0.2);
mars.position.set(8, 0, 0);
mars.rotation.z = THREE.MathUtils.degToRad(marsAngle);
mars.castShadow = true;
mars.receiveShadow = true;

//jupiter
const jupiterMaterial = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('textures/jupiter.jpg'),
});
const jupiter = new THREE.Mesh(geometry, jupiterMaterial);
jupiter.scale.set(0.6, 0.6, 0.6);
jupiter.position.set(14, 0, 0);
jupiter.rotation.z = THREE.MathUtils.degToRad(jupiterAngle);
jupiter.castShadow = true;
jupiter.receiveShadow = true;

//saturn
const saturnMaterial = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('textures/saturn.jpg'),
});
const saturn = new THREE.Mesh(geometry, saturnMaterial);
saturn.scale.set(0.55, 0.55, 0.55);
saturn.position.set(17, 0, 0);
//saturn.rotation.z = THREE.MathUtils.degToRad(saturnAngle);
// const saturnRadian = THREE.MathUtils.degToRad(saturnAngle);
// saturn.geometry.applyMatrix4(new THREE.Matrix4().makeRotationZ(saturnRadian));
// const saturnAxis = new THREE.Vector3(Math.sin(-saturnRadian), Math.cos(-saturnRadian), 0).normalize();
saturn.castShadow = true;
saturn.receiveShadow = true;

//saturn-ring
const saturnRingGeometry = new THREE.RingBufferGeometry(1, 3, 64);
const saturnRingGeometryPos = saturnRingGeometry.attributes.position;
const saturnRingVector = new THREE.Vector3();
for(let i=0; i < saturnRingGeometryPos.count; i++){
    saturnRingVector.fromBufferAttribute(saturnRingGeometryPos, i);
    saturnRingGeometry.attributes.uv.setXY(i, saturnRingVector.length() < 2 ? 0 : 1 , 1);
}
const saturnRingTexture = new THREE.TextureLoader().load('textures/saturn-ring.png');
const saturnRingMaterial = new THREE.MeshBasicMaterial({
    map : saturnRingTexture,
    color:'white',
    transparent:true,
    side : THREE.DoubleSide
});
const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
// saturnRing.scale.set(0.55, 0.55, 0.55);
saturnRing.rotation.x = THREE.MathUtils.degToRad(90);
saturn.add(saturnRing);

//uranus
const uranusMaterial = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('textures/uranus.jpg'),
});
const uranus = new THREE.Mesh(geometry, uranusMaterial);
uranus.scale.set(0.45, 0.45, 0.45);
uranus.position.set(20, 0, 0);
// uranus.rotation.z = THREE.MathUtils.degToRad(uranusAngle);
uranus.castShadow = true;
uranus.receiveShadow = true;

//neptune
const neptuneMaterial = new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('textures/neptune.jpg'),
});
const neptune = new THREE.Mesh(geometry, neptuneMaterial);
neptune.scale.set(0.43, 0.43, 0.43);
neptune.position.set(23, 0, 0);
//neptune.castShadow = true;
neptune.receiveShadow = true;

//group
const mercuryGroup = new THREE.Group();
mercuryGroup.add(mercury);
const venusGroup = new THREE.Group();
venusGroup.add(venus);

const moonGroup = new THREE.Group();
moonGroup.add(moon);
moonGroup.position.set(6, 0, 0);

const earthGroup = new THREE.Group();
earthGroup.add(moonGroup);
earthGroup.add(earth);

const marsGroup = new THREE.Group();
marsGroup.add(mars);

const jupiterGroup = new THREE.Group();
jupiterGroup.add(jupiter);

const saturnGroup = new THREE.Group();
saturnGroup.add(saturn);

const uranusGroup = new THREE.Group();
uranusGroup.add(uranus);

const neptuneGroup = new THREE.Group();
neptuneGroup.add(neptune);

//궤도(rail)
const orbitMaterial = new THREE.MeshBasicMaterial({
    color:'gray',
    transparent:true,
    opacity:0.3,
    side:THREE.DoubleSide
});
const mercuryRail = new THREE.Mesh(new THREE.TorusGeometry(2, 0.01, 30, 100), orbitMaterial);
mercuryRail.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(mercuryRail);
const venusRail = new THREE.Mesh(new THREE.TorusGeometry(4, 0.01, 30, 100), orbitMaterial);
venusRail.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(venusRail);
const earthRail = new THREE.Mesh(new THREE.TorusGeometry(6, 0.01, 30, 100), orbitMaterial);
earthRail.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(earthRail);
const marsRail = new THREE.Mesh(new THREE.TorusGeometry(8, 0.01, 30, 100), orbitMaterial);
marsRail.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(marsRail);
const jupiterRail = new THREE.Mesh(new THREE.TorusGeometry(14, 0.01, 30, 100), orbitMaterial);
jupiterRail.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(jupiterRail);
const saturnRail = new THREE.Mesh(new THREE.TorusGeometry(17, 0.01, 30, 100), orbitMaterial);
saturnRail.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(saturnRail);
const uranusRail = new THREE.Mesh(new THREE.TorusGeometry(20, 0.01, 30, 100), orbitMaterial);
uranusRail.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(uranusRail);
const neptuneRail = new THREE.Mesh(new THREE.TorusGeometry(23, 0.01, 30, 100), orbitMaterial);
neptuneRail.rotation.x = THREE.MathUtils.degToRad(90);
scene.add(neptuneRail);

const asteroidBelt = new THREE.Group();
const asteroidMaterial = {
    data:[
        new THREE.MeshBasicMaterial({color:'#2d2c2c'}),
        new THREE.MeshBasicMaterial({color:'#3a3232'}),
        new THREE.MeshBasicMaterial({color:'#493c3c'}),
        new THREE.MeshBasicMaterial({color:'#5c4949'}),
        new THREE.MeshBasicMaterial({color:'#655353'})
    ],
    random(){
        return this.data[Math.floor(Math.random() * this.data.length)];
    },
};
for(let i=0; i < 1000; i++){
    const asteroid = new THREE.Mesh(
        new THREE.SphereGeometry(
            Math.random() * 0.05 + 0.05,//size
            Math.random() * 20,
            Math.random() * 20
        ), asteroidMaterial.random()
    );
    const angle = THREE.MathUtils.degToRad(Math.random() * 360);
    asteroid.position.x = Math.cos(angle) * (11 + (Math.random() - 0.5) * 2);
    asteroid.position.z = Math.sin(angle) * (11 + (Math.random() - 0.5) * 2);
    asteroidBelt.add(asteroid);
}
console.log(asteroidBelt);
scene.add(asteroidBelt);

//mesh add scene
scene.add(sun);
scene.add(mercuryGroup);
scene.add(venusGroup);
scene.add(earthGroup);
scene.add(marsGroup);
scene.add(jupiterGroup);
scene.add(saturnGroup);
scene.add(uranusGroup);
scene.add(neptuneGroup);

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
    sun.rotation.y += delta * 10 / sunRotate;
    mercury.rotation.y += delta * 10 / mercuryRotate;
    venus.rotation.y += delta * 10 / venusRotate;
    earth.rotation.y += delta * 10 / earthRotate;
    // earth.rotateOnAxis(earthAxis, delta * 10 / earthRotate);
    moon.rotation.y += delta * 10 / moonRotate;
    mars.rotation.y += delta * 10 / marsRotate;
    asteroidBelt.rotation.y += delta * 10 / 365;
    jupiter.rotation.y += delta * 10 / jupiterRotate;
    saturn.rotation.y += delta * 10 / saturnRotate;
    // saturn.rotateOnAxis(saturnAxis, delta * 10 / saturnRotate);
    uranus.rotation.y += delta * 10 / uranusRotate;
    neptune.rotation.y += delta * 10 / neptuneRotate;

    mercuryGroup.rotation.y += delta * 500 / mercuryOrbit;
    venusGroup.rotation.y += delta * 500 / venusOrbit;
    earthGroup.rotation.y += delta * 500 / earthOrbit;
    moonGroup.rotation.y += delta * 500 / moonOrbit;
    marsGroup.rotation.y += delta * 500 / marsOrbit;
    jupiterGroup.rotation.y += delta * 500 / jupiterOrbit;
    saturnGroup.rotation.y += delta * 500 / saturnOrbit;
    uranusGroup.rotation.y += delta * 500 / uranusOrbit;
    neptuneGroup.rotation.y += delta * 500 / neptuneOrbit;
    
    //render
    renderer.render(scene, camera);
    
    //continue animation
    //requestAnimationFrame(refresh);
    renderer.setAnimationLoop(refresh);
};

refresh();