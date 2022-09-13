const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// BACKGROUND
const backgroundTexture = new THREE.TextureLoader().load('images/Space5.jpg');
scene.background = backgroundTexture;

// LIGHTS + HELPERS
const pointLight1 = new THREE.PointLight(0x3c00FE, 1, 10);
const pointLight2 = new THREE.PointLight(0x048F42, 1, 10);
const pointLight3 = new THREE.PointLight(0xFF3F42, 0.7, 10);
pointLight1.position.set(7, 0, 2);
pointLight2.position.set(1, 0, 0);
pointLight3.position.set(4, 0, 1.5)
const lightHelper1 = new THREE.PointLightHelper(pointLight1, 0.1, 0x0000FF);
const lightHelper2 = new THREE.PointLightHelper(pointLight2, 0.1, 0x00FF00);
const lightHelper3 = new THREE.PointLightHelper(pointLight3, 1, 0xFF0000);
const ambientLight = new THREE.AmbientLight(0xE8A0C2, 0.4);

// const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);


scene.add(pointLight1, pointLight2, pointLight3);
//scene.add(lightHelper1, lightHelper2, lightHelper3);
scene.add(lightHelper3);
scene.add(ambientLight);
//scene.add(hemisphereLight)

// RANDOM LIGHTS
function addRandomLights() {

    r = THREE.MathUtils.randInt(0, 255)
    g = THREE.MathUtils.randInt(0, 255)
    b = THREE.MathUtils.randInt(0, 255)
    colorString = 'rgb(' + String(r) + ', ' + String(g) + ', ' + String(b) +')'
    const color = new THREE.Color(colorString);

    const light = new THREE.PointLight(color, 2, 15);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randInt(-40, 40));
    light.position.set(x, y, z);
    
    //const lightHelper = new THREE.PointLightHelper(light, 0.1, color);
    scene.add(light) //, lightHelper);
}

// STARS
function addStar() {
    const geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloat(0.1, 0.25));
    const material = new THREE.MeshStandardMaterial( {color: 0xFFFFFF} );
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randInt(-50, 50));
    star.position.set(x, y, z);
    scene.add(star);
}

 Array(500).fill().forEach(addStar);
 Array(70).fill().forEach(addRandomLights);



// TORUS
const geometry = new THREE.TorusGeometry(1.5, 0.4, 20, 200);
const material = new THREE.MeshStandardMaterial({ color: 0xECECFF, });
const torus = new THREE.Mesh(geometry, material);
torus.position.x = 3
scene.add(torus);

// BOX
const boxTexture = new THREE.TextureLoader().load('images/Chrono1.png');
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
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
    // camera.position.x = t * -0.0002;
    camera.position.y = t * 0.0002;

  
    pointLight3.position.set(torus.position);
}

document.body.onscroll = moveCamera;
direction = 1;

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.y += 0.002;
    box.rotation.x += 0.003;
    box.rotation.y -= 0.003;
    box.rotation.z += 0.003;
 
    if (camera.rotation.y > 0.25){ direction = -1 } 
    else if (camera.rotation.y < -0.18) { direction = 1 }
    camera.rotation.y += direction * 0.0003;

    renderer.render(scene, camera);
};

animate();
