import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

var camera, scene, renderer, stats;

var mesh;
var lineText = new THREE.Object3D();
var lineMesh;
var amount = parseInt(window.location.search.substr(1)) || 10;
var count = Math.pow(amount, 3);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(1, 1);

var rotationMatrix = new THREE.Matrix4().makeRotationY(0.1);
var instanceMatrix = new THREE.Matrix4();
var matrix = new THREE.Matrix4();

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, -400, 600);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  var geometry = new THREE.SphereBufferGeometry(0.5);
  var material = new THREE.MeshPhongMaterial({ flatShading: true });
  mesh = new THREE.InstancedMesh(geometry, material, count);

  //end load function

  var loader = new THREE.FontLoader();
  console.log('hello');
  loader.load('helvetiker.json', function(font) {
    var xMid, text1;
    var color = 0x006699;

    var matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });

    var message1 = '   Three.js\nSimple text.';

    var shapes = font.generateShapes(message1, 100);

    var geometry = new THREE.ShapeBufferGeometry(shapes);

    geometry.computeBoundingBox();

    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 10, 0);

    // make shape ( N.B. edge view not visible )

    var text1 = new THREE.Mesh(geometry, matLite);
    text1.position.z = -1500;
    text1.position.y = -500;
    scene.add(text1);

    var message1 = '   Three.js\nSimple text.';

    var shapes = font.generateShapes(message1, 200);

    var geometry = new THREE.ShapeBufferGeometry(shapes);

    geometry.computeBoundingBox();

    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 10, 0);

    // make shape ( N.B. edge view not visible )

    var text2 = new THREE.Mesh(geometry, matLite);
    text2.position.z = -1500;

    scene.add(text2);
    var text3 = new THREE.Mesh(geometry, matLite);
    text1.position.z = -1500;
    text1.position.y = -500;
    scene.add(text1);

    var message2 = 'yoyoyoyoyo';

    var shapes = font.generateShapes(message2, 100);

    var geometry = new THREE.ShapeBufferGeometry(shapes);

    geometry.computeBoundingBox();

    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 10, 0);

    // make shape ( N.B. edge view not visible )

    var text3 = new THREE.Mesh(geometry, matLite);
    text3.position.z = -1000;
    text3.position.y = -800;
    scene.add(text3);
    ///    scene.add(lineText);
  });

  console.log('goodbye');

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  stats = new Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('mousedown', onMouseClick, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseClick(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersection = raycaster.intersectObject(lineText, true);

  if (intersection.length > 0) {
    console.log(intersection);
    var instanceId = intersection[0].instanceId;
    //deleteText(intersection[0].object);
    console.log('click', instanceId);
  }
}
function onMouseMove(event) {
  //  event.preventDefault();
  //
  //  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);

  stats.update();
}
