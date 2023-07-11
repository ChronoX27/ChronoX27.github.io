const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3 + -0.005 * document.body.getBoundingClientRect().top;


const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// BACKGROUND
backgroundTexture = new THREE.TextureLoader().load('images/Space_background.jpg');
scene.background = backgroundTexture;

// LIGHTS + HELPERS
const pointLight1 = new THREE.PointLight(0x3c00FE, 1, 10); // GREEN
const pointLight2 = new THREE.PointLight(0x048F42, 1, 10); // BLUE
const pointLight3 = new THREE.PointLight(0xFF3F42, 0.7, 10); // RED
pointLight1.position.set(7, 3, 2);
pointLight2.position.set(1, -1, 0);
pointLight3.position.set(3, 0, 1.5);
const ambientLight = new THREE.AmbientLight(0xF8F8F8, 0.4);

scene.add(pointLight1, pointLight2, pointLight3);
scene.add(ambientLight);


// RANDOM LIGHTS
function addRandomLights() {

    [r, g, b] = Array(3).fill().map(() => THREE.MathUtils.randInt(0, 255));
    colorString = `rgb(${String(r)}, ${String(g)}, ${String(b)})`;
    const color = new THREE.Color(colorString);

    const light = new THREE.PointLight(color, 2, 17);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randInt(-40, 40));
    light.position.set(x, y, z);

    scene.add(light);
}


// STARS
function addStar() {
    const geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloat(0.07, 0.25));
    const material = new THREE.MeshStandardMaterial( {color: 0xFFFFFF} );
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randInt(-50, 50));
    star.position.set(x, y, z);
    scene.add(star);
}


Array(600).fill().forEach(addStar);
Array(75).fill().forEach(addRandomLights);


// TORUS
const geometry = new THREE.TorusGeometry(1.5, 0.4, 20, 200);
const material = new THREE.MeshStandardMaterial({ color: 0xECECFF, });
const torus = new THREE.Mesh(geometry, material);
torus.position.x = 3
scene.add(torus);


// BOX
const boxTexture = new THREE.TextureLoader().load('images/Chrono1.png');
const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.MeshBasicMaterial( { map: boxTexture } )
);
box.position.x = 3;
scene.add(box);


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    torus.rotation.x += 0.05;
    torus.position.x = 3 + t * -0.004;

    box.position.z =  t * -0.004;
    box.rotation.x += 0.02;
    box.rotation.y += 0.001;
    box.rotation.z += 0.001;

    camera.position.z = 3 + t * -0.005;
    camera.position.y = t * 0.0002;
  
    pointLight3.position.x = torus.position.x;
}


document.body.onscroll = moveCamera;
direction = 1;
const MAX_ROT = 8000;
const MIN_ROT = 1700;
const X_ROT = 1 / Math.floor(Math.random() * (MAX_ROT - MIN_ROT) + MIN_ROT);
const Y_ROT = 1 / Math.floor(Math.random() * (MAX_ROT - MIN_ROT) + MIN_ROT);
const Z_ROT = 0.6 / Math.floor(Math.random() * (MAX_ROT - MIN_ROT) + MIN_ROT);


function animate() {
    requestAnimationFrame(animate);

    // BOX + TORUS ANIMATION
    torus.rotation.y += 0.003;
    box.rotation.x += 0.003;
    box.rotation.y -= 0.003;
    box.rotation.z += 0.003;
 
    // CAMERA ROTATION
    // X-ROTATION
    if (camera.rotation.x > 0.2) { direction = -1 }
    else if (camera.rotation.x < -0.17) { direction = 1 }
    camera.rotation.x += direction * X_ROT;

    // Y-ROTATION
    if (camera.rotation.y > 0.25){ direction = -1 } 
    else if (camera.rotation.y < -0.185) { direction = 1 }
    camera.rotation.y += direction * Y_ROT;
    
    // Z-ROTATION
    if (camera.rotation.z > 0.15) { direction = -1 }
    else if (camera.rotation.z < -0.18) { direction = 1 }
    camera.rotation.z += direction * Z_ROT;

    renderer.render(scene, camera);
};

animate();