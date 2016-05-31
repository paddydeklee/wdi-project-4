// <script type="text/javascript">
// console.log(":)");
// // QUESTION: Why does this script not run?
// var scene, camera, renderer;
// var geometry, material, mesh;
//
// init();
// animate();
//
// function init() {
//
//   scene = new THREE.Scene();
//
//   camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
//   camera.position.z = 1000;
//
//   geometry = new THREE.BoxGeometry( 200, 200, 200 );
//
//   var loader = new THREE.STLLoader();
//   				loader.load( '..../3Dmodels/skull_art.stl', function ( geometry ) {
//   					var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
//   					var mesh = new THREE.Mesh( geometry, material );
//   					mesh.position.set( 0, - 0.25, 0.6 );
//   					mesh.rotation.set( 0, - Math.PI / 2, 0 );
//   					// mesh.scale.set( 0.5, 0.5, 0.5 );
//   					mesh.castShadow = true;
//   					mesh.receiveShadow = true;
//   					scene.add( mesh );
//   				} );
//
//
//   material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
//
//   mesh = new THREE.Mesh( geometry, material );
//   scene.add( mesh );
//
//   renderer = new THREE.WebGLRenderer();
//   renderer.setSize( window.innerWidth, window.innerHeight );
//
//   document.body.appendChild( renderer.domElement );
//
// }
//
//
//
//
// function animate() {
//
//   requestAnimationFrame( animate );
//
//   mesh.rotation.x += 0.01;
//   mesh.rotation.y += 0.02;
//
//   renderer.render( scene, camera );
//
// }
// </script>
